<?php

namespace App\Http\Controllers\catalog;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Models\Inventory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CatalogController extends Controller
{
    /**
     * Display the catalog index page with rooms and inventory
     */
    public function index(Request $request)
    {
        $query = $request->get('query');
        $category = $request->get('category');
        $status = $request->get('status');

        // Get rooms with optional filtering
        $rooms = Room::query()
            ->when($query, function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                  ->orWhere('location', 'like', "%{$query}%")
                  ->orWhere('type', 'like', "%{$query}%");
            })
            ->when($status, function ($q) use ($status) {
                $q->where('status', $status);
            })
            ->with('inventories')
            ->orderBy('name')
            ->paginate(12);

        // Get inventory with optional filtering
        $inventories = Inventory::query()
            ->when($query, function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                  ->orWhere('description', 'like', "%{$query}%")
                  ->orWhere('category', 'like', "%{$query}%");
            })
            ->when($category, function ($q) use ($category) {
                $q->where('category', $category);
            })
            ->when($status, function ($q) use ($status) {
                $q->where('status', $status);
            })
            ->with('room')
            ->orderBy('name')
            ->paginate(12);

        // Get unique categories for filtering
        $categories = Inventory::distinct()->pluck('category')->filter()->values();

        return Inertia::render('catalog/index', [
            'rooms' => $rooms,
            'inventories' => $inventories,
            'categories' => $categories,
            'filters' => [
                'query' => $query,
                'category' => $category,
                'status' => $status,
            ],
        ]);
    }

    /**
     * Display rooms catalog
     */
    public function rooms(Request $request)
    {
        $query = $request->get('query');
        $status = $request->get('status');
        $type = $request->get('type');

        $rooms = Room::query()
            ->when($query, function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                  ->orWhere('location', 'like', "%{$query}%")
                  ->orWhere('type', 'like', "%{$query}%");
            })
            ->when($status, function ($q) use ($status) {
                $q->where('status', $status);
            })
            ->when($type, function ($q) use ($type) {
                $q->where('type', $type);
            })
            ->with('inventories')
            ->orderBy('name')
            ->paginate(12);

        // Get unique types for filtering
        $types = Room::distinct()->pluck('type')->filter()->values();

        return Inertia::render('catalog/rooms', [
            'rooms' => $rooms,
            'types' => $types,
            'filters' => [
                'query' => $query,
                'status' => $status,
                'type' => $type,
            ],
        ]);
    }

    /**
     * Display inventory catalog
     */
    public function inventory(Request $request)
    {
        $query = $request->get('query');
        $category = $request->get('category');
        $status = $request->get('status');

        $inventories = Inventory::query()
            ->when($query, function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                  ->orWhere('description', 'like', "%{$query}%")
                  ->orWhere('category', 'like', "%{$query}%");
            })
            ->when($category, function ($q) use ($category) {
                $q->where('category', $category);
            })
            ->when($status, function ($q) use ($status) {
                $q->where('status', $status);
            })
            ->with('room')
            ->orderBy('name')
            ->paginate(12);

        // Get unique categories for filtering
        $categories = Inventory::distinct()->pluck('category')->filter()->values();

        return Inertia::render('catalog/inventory', [
            'inventories' => $inventories,
            'categories' => $categories,
            'filters' => [
                'query' => $query,
                'category' => $category,
                'status' => $status,
            ],
        ]);
    }

    /**
     * Show a specific room with its inventory
     */
    public function showRoom($roomId)
    {
        $room = Room::where('room_id', $roomId)
            ->with('inventories')
            ->firstOrFail();

        return Inertia::render('catalog/room-detail', [
            'room' => $room,
        ]);
    }

    /**
     * Show a specific inventory item
     */
    public function showInventory($itemId)
    {
        $inventory = Inventory::where('item_id', $itemId)
            ->with('room')
            ->firstOrFail();

        return Inertia::render('catalog/inventory-detail', [
            'inventory' => $inventory,
        ]);
    }
}
