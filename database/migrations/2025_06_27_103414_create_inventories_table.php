<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('inventories', function (Blueprint $table) {
            $table->id();
            $table->string('item_id')->unique();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('category');
            $table->string('status')->default('Available');
            $table->string('location')->nullable();
            $table->string('room_id')->nullable();
            $table->string('image_url')->nullable();
            $table->decimal('purchase_price', 10, 2)->nullable();
            $table->date('purchase_date')->nullable();
            $table->string('supplier')->nullable();
            $table->string('serial_number')->nullable();
            $table->timestamps();
            
            $table->foreign('room_id')->references('room_id')->on('rooms')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventories');
    }
};
