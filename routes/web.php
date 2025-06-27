<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\InfrastructureController;

Route::get('/', function () {
    return Inertia::render('landing');
})->name('home');

Route::get('/status', function () {
    return Inertia::render('status/status');
})->name('status');

Route::get('/api/infrastructures', [InfrastructureController::class, 'getForStatus']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
