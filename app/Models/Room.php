<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_id',
        'name',
        'image_url',
        'status',
        'capacity',
        'location',
        'type',
        'furniture_available',
        'display_available',
        'audio_available',
        'ac_available',
    ];

    protected $casts = [
        'furniture_available' => 'boolean',
        'display_available' => 'boolean',
        'audio_available' => 'boolean',
        'ac_available' => 'boolean',
        'capacity' => 'integer',
    ];

    public function inventories()
    {
        return $this->hasMany(Inventory::class, 'room_id', 'room_id');
    }
} 