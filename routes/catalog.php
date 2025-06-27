<?php

use App\Http\Controllers\catalog\CatalogController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    // Main catalog index
    Route::get('/catalog', [CatalogController::class, 'index'])->name('catalog.index');
    
    // Rooms catalog
    Route::get('/catalog/rooms', [CatalogController::class, 'rooms'])->name('catalog.rooms');
    Route::get('/catalog/rooms/{roomId}', [CatalogController::class, 'showRoom'])->name('catalog.rooms.show');
    
    // Inventory catalog
    Route::get('/catalog/inventory', [CatalogController::class, 'inventory'])->name('catalog.inventory');
    Route::get('/catalog/inventory/{itemId}', [CatalogController::class, 'showInventory'])->name('catalog.inventory.show');
});
