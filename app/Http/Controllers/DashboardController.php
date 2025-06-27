<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Room;
use App\Models\Infrastructure;
use App\Models\Borrowing;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $user = Auth::user();
        if ($user->isAdmin()) {
            $totalUsers = User::count();
            $totalRooms = Room::count();
            $totalInfrastructures = Infrastructure::count();
            $totalBorrowings = Borrowing::count();
            $recentBorrowings = Borrowing::with(['user', 'borrowable'])
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get();
            return Inertia::render('dashboard', [
                'role' => 'admin',
                'totalUsers' => $totalUsers,
                'totalRooms' => $totalRooms,
                'totalInfrastructures' => $totalInfrastructures,
                'totalBorrowings' => $totalBorrowings,
                'recentBorrowings' => $recentBorrowings,
            ]);
        } else {
            $myBorrowings = Borrowing::with(['borrowable'])
                ->where('user_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get();
            $myBorrowingsCount = Borrowing::where('user_id', $user->id)->count();
            return Inertia::render('dashboard', [
                'role' => 'student',
                'myBorrowings' => $myBorrowings,
                'myBorrowingsCount' => $myBorrowingsCount,
            ]);
        }
    }
} 