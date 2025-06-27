<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

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

    public function inventories(): HasMany
    {
        return $this->hasMany(Inventory::class, 'room_id', 'room_id');
    }

    public function borrowings(): MorphMany
    {
        return $this->morphMany(Borrowing::class, 'borrowable');
    }

    /**
     * Check if the room is available for the given time period
     */
    public function isAvailableForPeriod($startTime, $endTime, $excludeBorrowingId = null): bool
    {
        if ($this->status !== 'Available') {
            return false;
        }

        // Check if there are any conflicting borrowings
        $query = $this->borrowings()
            ->where('status', 'approved')
            ->where(function ($query) use ($startTime, $endTime) {
                $query->whereBetween('start_time', [$startTime, $endTime])
                      ->orWhereBetween('end_time', [$startTime, $endTime])
                      ->orWhere(function ($q) use ($startTime, $endTime) {
                          $q->where('start_time', '<=', $startTime)
                            ->where('end_time', '>=', $endTime);
                      });
            });

        // Exclude current borrowing if provided
        if ($excludeBorrowingId) {
            $query->where('id', '!=', $excludeBorrowingId);
        }

        $conflictingBorrowings = $query->exists();

        return !$conflictingBorrowings;
    }

    /**
     * Update availability based on current borrowings
     */
    public function updateAvailability(): void
    {
        $activeBorrowing = $this->borrowings()
            ->where('status', 'approved')
            ->where('start_time', '<=', now())
            ->where('end_time', '>=', now())
            ->first();

        if ($activeBorrowing) {
            $this->update(['status' => 'Occupied']);
        } else {
            $this->update(['status' => 'Available']);
        }
    }
} 