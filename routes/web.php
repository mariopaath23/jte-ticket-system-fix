<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\InfrastructureController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;

Route::get('/', function () {
    return Inertia::render('landing');
})->name('home');

Route::get('/status', function () {
    return Inertia::render('status/status');
})->name('status');

Route::get('/api/infrastructures', [InfrastructureController::class, 'getForStatus']);

// Test route for admin middleware
Route::get('/test-admin', function () {
    return response()->json(['message' => 'Admin access granted', 'user' => auth()->user()]);
})->middleware(['auth', 'admin']);

// Simple authentication helper for testing (remove in production)
Route::get('/auth-test', function () {
    $user = \App\Models\User::first();
    if ($user) {
        Auth::login($user);
        return redirect('/catalog');
    }
    return 'No users found in database';
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', \App\Http\Controllers\DashboardController::class)->name('dashboard');
});

Route::get('/test-room-create', function () {
    return response()->json(['message' => 'Route works']);
})->name('test.room.create');

Route::get('/test-inventory-create', function () {
    return response()->json(['message' => 'Route works']);
})->name('test.inventory.create');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/catalog.php';
require __DIR__.'/peminjaman.php';
