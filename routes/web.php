<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return Inertia::render('landing');
})->name('home');

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
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/catalog.php';
