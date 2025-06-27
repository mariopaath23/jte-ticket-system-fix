<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    protected $fillable = [
        'item_id',
        'name',
        'description',
        'category',
        'status',
        'location',
        'room_id',
        'image_url',
        'purchase_price',
        'purchase_date',
        'supplier',
        'serial_number',
    ];

    protected $casts = [
        'purchase_price' => 'decimal:2',
        'purchase_date' => 'date',
    ];

    public function room()
    {
        return $this->belongsTo(Room::class, 'room_id', 'room_id');
    }
}
