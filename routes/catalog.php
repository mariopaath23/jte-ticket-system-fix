<?php

use App\Http\Controllers\catalog\CatalogController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    // Main catalog index
    Route::get('/catalog', [CatalogController::class, 'index'])->name('catalog.index');
    
    // Rooms catalog
    Route::get('/catalog/rooms', [CatalogController::class, 'rooms'])->name('catalog.rooms');
    // Tambah ruangan (admin) - harus sebelum {roomId}
    Route::get('/catalog/rooms/create', [CatalogController::class, 'createRoom'])->name('catalog.rooms.create');
    Route::post('/catalog/rooms', [CatalogController::class, 'storeRoom'])->name('catalog.rooms.store');
    Route::get('/catalog/rooms/{roomId}', [CatalogController::class, 'showRoom'])->name('catalog.rooms.show');
    
    // Inventory catalog
    Route::get('/catalog/inventory', [CatalogController::class, 'inventory'])->name('catalog.inventory');
    // Tambah inventaris (admin) - harus sebelum {itemId}
    Route::get('/catalog/inventory/create', [CatalogController::class, 'createInventory'])->name('catalog.inventory.create');
    Route::post('/catalog/inventory', [CatalogController::class, 'storeInventory'])->name('catalog.inventory.store');
    Route::get('/catalog/inventory/{itemId}', [CatalogController::class, 'showInventory'])->name('catalog.inventory.show');
});
