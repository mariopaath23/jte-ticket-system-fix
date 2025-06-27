<?php

use App\Http\Controllers\BorrowingController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    // Borrowing routes
    Route::get('/peminjaman', [BorrowingController::class, 'index'])->name('peminjaman.index');
    Route::get('/peminjaman/create', [BorrowingController::class, 'create'])->name('peminjaman.create');
    Route::post('/peminjaman', [BorrowingController::class, 'store'])->name('peminjaman.store');
    Route::get('/peminjaman/{borrowing}', [BorrowingController::class, 'show'])->name('peminjaman.show');
    Route::get('/peminjaman/{borrowing}/edit', [BorrowingController::class, 'edit'])->name('peminjaman.edit');
    Route::put('/peminjaman/{borrowing}', [BorrowingController::class, 'update'])->name('peminjaman.update');
    Route::delete('/peminjaman/{borrowing}/cancel', [BorrowingController::class, 'cancel'])->name('peminjaman.cancel');

    // Admin-only routes
    Route::middleware(['admin'])->group(function () {
        Route::post('/peminjaman/{borrowing}/approve', [BorrowingController::class, 'approve'])->name('peminjaman.approve');
        Route::post('/peminjaman/{borrowing}/reject', [BorrowingController::class, 'reject'])->name('peminjaman.reject');
        Route::post('/peminjaman/{borrowing}/complete', [BorrowingController::class, 'complete'])->name('peminjaman.complete');
    });
}); 