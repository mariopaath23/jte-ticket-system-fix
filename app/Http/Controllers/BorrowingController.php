<?php

namespace App\Http\Controllers;

use App\Models\Borrowing;
use App\Models\Room;
use App\Models\Infrastructure;
use App\Models\Inventory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class BorrowingController extends Controller
{
    /**
     * Display the borrowing index page
     */
    public function index(Request $request): Response
    {
        $user = Auth::user();
        $query = $request->get('query');
        $status = $request->get('status');
        $type = $request->get('type');

        $borrowings = Borrowing::query()
            ->with(['user', 'borrowable', 'approvedBy'])
            ->when($user->isStudent(), function ($q) use ($user) {
                $q->where('user_id', $user->id);
            })
            ->when($query, function ($q) use ($query) {
                $q->where('ticket_number', 'like', "%{$query}%")
                  ->orWhere('purpose', 'like', "%{$query}%");
            })
            ->when($status, function ($q) use ($status) {
                $q->where('status', $status);
            })
            ->when($type, function ($q) use ($type) {
                $q->where('borrowable_type', $type === 'room' ? Room::class : ($type === 'infrastructure' ? Infrastructure::class : Inventory::class));
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('peminjaman/index', [
            'borrowings' => $borrowings,
            'filters' => [
                'query' => $query,
                'status' => $status,
                'type' => $type,
            ],
            'userRole' => $user->role,
        ]);
    }

    /**
     * Show the form for creating a new borrowing
     */
    public function create(Request $request): Response
    {
        $type = $request->get('type', 'room');
        $itemId = $request->get('item_id');

        if ($type === 'room') {
            $items = Room::where('status', 'Available')->get();
            $selectedItem = $itemId ? Room::find($itemId) : null;
        } elseif ($type === 'infrastructure') {
            $items = Infrastructure::where('is_available', true)->get();
            $selectedItem = $itemId ? Infrastructure::find($itemId) : null;
        } else {
            $items = Inventory::where('status', 'Available')->get();
            $selectedItem = $itemId ? Inventory::find($itemId) : null;
        }

        return Inertia::render('peminjaman/create', [
            'type' => $type,
            'items' => $items,
            'selectedItem' => $selectedItem,
        ]);
    }

    /**
     * Store a newly created borrowing
     */
    public function store(Request $request)
    {
        $request->validate([
            'borrowable_type' => 'required|in:room,infrastructure,inventory',
            'borrowable_id' => 'required|integer',
            'purpose' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_time' => 'required|date|after:now',
            'end_time' => 'required|date|after:start_time',
        ]);

        $user = Auth::user();
        if ($request->borrowable_type === 'room') {
            $borrowableType = Room::class;
        } elseif ($request->borrowable_type === 'infrastructure') {
            $borrowableType = Infrastructure::class;
        } else {
            $borrowableType = Inventory::class;
        }
        $borrowable = $borrowableType::findOrFail($request->borrowable_id);

        // Check availability
        if (method_exists($borrowable, 'isAvailableForPeriod')) {
            if (!$borrowable->isAvailableForPeriod($request->start_time, $request->end_time, null)) {
                return back()->withErrors(['error' => 'Item tidak tersedia untuk waktu yang dipilih']);
            }
        } else if ($borrowable instanceof Inventory) {
            if ($borrowable->status !== 'Available') {
                return back()->withErrors(['error' => 'Inventaris tidak tersedia untuk dipinjam']);
            }
        }

        try {
            DB::beginTransaction();

            $borrowing = Borrowing::create([
                'ticket_number' => Borrowing::generateTicketNumber(),
                'user_id' => $user->id,
                'borrowable_type' => $borrowableType,
                'borrowable_id' => $borrowable->id,
                'purpose' => $request->purpose,
                'description' => $request->description,
                'start_time' => $request->start_time,
                'end_time' => $request->end_time,
                'status' => 'pending',
            ]);

            DB::commit();

            return redirect()->route('peminjaman.show', $borrowing)
                ->with('success', 'Tiket peminjaman berhasil dibuat');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Terjadi kesalahan saat membuat tiket peminjaman']);
        }
    }

    /**
     * Display the specified borrowing
     */
    public function show(Borrowing $borrowing): Response
    {
        $user = Auth::user();
        
        // Check if user can view this borrowing
        if ($user->isStudent() && $borrowing->user_id !== $user->id) {
            abort(403);
        }

        $borrowing->load(['user', 'borrowable', 'approvedBy']);

        return Inertia::render('peminjaman/show', [
            'borrowing' => $borrowing,
            'userRole' => $user->role,
        ]);
    }

    /**
     * Show the form for editing the specified borrowing
     */
    public function edit(Borrowing $borrowing): Response
    {
        $user = Auth::user();
        
        // Only allow editing if pending and user owns the borrowing
        if ($borrowing->status !== 'pending' || $borrowing->user_id !== $user->id) {
            abort(403);
        }

        $borrowing->load(['borrowable']);

        $type = $borrowing->borrowable_type === Room::class ? 'room' : ($borrowing->borrowable_type === Infrastructure::class ? 'infrastructure' : 'inventory');
        
        if ($type === 'room') {
            $items = Room::where('status', 'Available')->get();
        } elseif ($type === 'infrastructure') {
            $items = Infrastructure::where('is_available', true)->get();
        } else {
            $items = Inventory::where('status', 'Available')->get();
        }

        return Inertia::render('peminjaman/edit', [
            'borrowing' => $borrowing,
            'type' => $type,
            'items' => $items,
        ]);
    }

    /**
     * Update the specified borrowing
     */
    public function update(Request $request, Borrowing $borrowing)
    {
        $user = Auth::user();
        
        // Only allow updating if pending and user owns the borrowing
        if ($borrowing->status !== 'pending' || $borrowing->user_id !== $user->id) {
            abort(403);
        }

        $request->validate([
            'borrowable_type' => 'required|in:room,infrastructure,inventory',
            'borrowable_id' => 'required|integer',
            'purpose' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_time' => 'required|date|after:now',
            'end_time' => 'required|date|after:start_time',
        ]);

        $borrowableType = $request->borrowable_type === 'room' ? Room::class : ($request->borrowable_type === 'infrastructure' ? Infrastructure::class : Inventory::class);
        $borrowable = $borrowableType::findOrFail($request->borrowable_id);

        // Check availability (excluding current borrowing)
        if (!$borrowable->isAvailableForPeriod($request->start_time, $request->end_time, $borrowing->id)) {
            return back()->withErrors(['error' => 'Item tidak tersedia untuk waktu yang dipilih']);
        }

        try {
            DB::beginTransaction();

            $borrowing->update([
                'borrowable_type' => $borrowableType,
                'borrowable_id' => $borrowable->id,
                'purpose' => $request->purpose,
                'description' => $request->description,
                'start_time' => $request->start_time,
                'end_time' => $request->end_time,
            ]);

            DB::commit();

            return redirect()->route('peminjaman.show', $borrowing)
                ->with('success', 'Tiket peminjaman berhasil diperbarui');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Terjadi kesalahan saat memperbarui tiket peminjaman']);
        }
    }

    /**
     * Cancel the specified borrowing
     */
    public function cancel(Borrowing $borrowing)
    {
        $user = Auth::user();
        
        // Only allow cancellation if pending and user owns the borrowing
        if ($borrowing->status !== 'pending' || $borrowing->user_id !== $user->id) {
            abort(403);
        }

        $borrowing->update(['status' => 'cancelled']);

        return redirect()->route('peminjaman.index')
            ->with('success', 'Tiket peminjaman berhasil dibatalkan');
    }

    /**
     * Approve the specified borrowing (admin only)
     */
    public function approve(Borrowing $borrowing)
    {
        $user = Auth::user();
        
        \Log::info('Approve attempt', [
            'user_id' => $user->id,
            'user_role' => $user->role,
            'borrowing_id' => $borrowing->id,
            'borrowing_status' => $borrowing->status,
        ]);
        
        if (!$user->isAdmin()) {
            \Log::warning('Non-admin user attempted to approve', ['user_id' => $user->id]);
            abort(403);
        }

        if ($borrowing->status !== 'pending') {
            \Log::warning('Attempted to approve non-pending borrowing', [
                'borrowing_id' => $borrowing->id,
                'status' => $borrowing->status
            ]);
            return back()->withErrors(['error' => 'Tiket tidak dapat disetujui']);
        }

        // Check if item is still available (exclude current borrowing)
        $borrowable = $borrowing->borrowable;
        $isAvailable = $borrowable->isAvailableForPeriod($borrowing->start_time, $borrowing->end_time, $borrowing->id);
        
        \Log::info('Availability check', [
            'borrowable_id' => $borrowable->id,
            'borrowable_type' => get_class($borrowable),
            'start_time' => $borrowing->start_time,
            'end_time' => $borrowing->end_time,
            'is_available' => $isAvailable,
        ]);
        
        if (!$isAvailable) {
            \Log::warning('Item not available for approval', [
                'borrowable_id' => $borrowable->id,
                'borrowing_id' => $borrowing->id
            ]);
            return back()->withErrors(['error' => 'Item tidak tersedia untuk waktu yang dipilih']);
        }

        try {
            DB::beginTransaction();

            $borrowing->update([
                'status' => 'approved',
                'approved_at' => now(),
                'approved_by' => $user->id,
            ]);

            \Log::info('Borrowing approved successfully', [
                'borrowing_id' => $borrowing->id,
                'approved_by' => $user->id,
            ]);

            // Update item availability
            $borrowable->updateAvailability();

            DB::commit();

            return back()->with('success', 'Tiket peminjaman berhasil disetujui');

        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Error approving borrowing', [
                'borrowing_id' => $borrowing->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return back()->withErrors(['error' => 'Terjadi kesalahan saat menyetujui tiket peminjaman']);
        }
    }

    /**
     * Reject the specified borrowing (admin only)
     */
    public function reject(Request $request, Borrowing $borrowing)
    {
        $user = Auth::user();
        
        if (!$user->isAdmin()) {
            abort(403);
        }

        if ($borrowing->status !== 'pending') {
            return back()->withErrors(['error' => 'Tiket tidak dapat ditolak']);
        }

        $request->validate([
            'admin_notes' => 'required|string|max:500',
        ]);

        $borrowing->update([
            'status' => 'rejected',
            'rejected_at' => now(),
            'approved_by' => $user->id,
            'admin_notes' => $request->admin_notes,
        ]);

        return back()->with('success', 'Tiket peminjaman berhasil ditolak');
    }

    /**
     * Complete the specified borrowing (admin only)
     */
    public function complete(Borrowing $borrowing)
    {
        $user = Auth::user();
        
        if (!$user->isAdmin()) {
            abort(403);
        }

        if ($borrowing->status !== 'approved') {
            return back()->withErrors(['error' => 'Tiket tidak dapat diselesaikan']);
        }

        try {
            DB::beginTransaction();

            $borrowing->update(['status' => 'completed']);

            // Update item availability
            $borrowable = $borrowing->borrowable;
            $borrowable->updateAvailability();

            DB::commit();

            return back()->with('success', 'Tiket peminjaman berhasil diselesaikan');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Terjadi kesalahan saat menyelesaikan tiket peminjaman']);
        }
    }
} 