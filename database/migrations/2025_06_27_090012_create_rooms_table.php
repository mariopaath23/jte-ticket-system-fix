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
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string('room_id')->unique();
            $table->string('name');
            $table->string('image_url')->nullable();
            $table->enum('status', ['Available', 'In Use', 'Maintenance', 'Occupied'])->default('Available');
            $table->integer('capacity');
            $table->string('location');
            $table->enum('type', ['low', 'medium', 'high']);
            $table->boolean('furniture_available')->default(false);
            $table->boolean('display_available')->default(false);
            $table->boolean('audio_available')->default(false);
            $table->boolean('ac_available')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
