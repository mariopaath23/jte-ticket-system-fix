<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Infrastructure extends Model
{
    use HasFactory;

    protected $fillable = [
        'item_name',
        'category',
        'location',
        'is_available',
        'start_time',
        'end_time',
        'description',
    ];

    protected $casts = [
        'is_available' => 'boolean',
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];

    public function getTimeFrameAttribute()
    {
        if ($this->start_time && $this->end_time) {
            return [
                'start' => $this->start_time->toISOString(),
                'end' => $this->end_time->toISOString(),
            ];
        }
        return null;
    }
}
