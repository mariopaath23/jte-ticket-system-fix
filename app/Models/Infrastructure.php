<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

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

    public function borrowings(): MorphMany
    {
        return $this->morphMany(Borrowing::class, 'borrowable');
    }

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

    /**
     * Check if the infrastructure is available for the given time period
     */
    public function isAvailableForPeriod($startTime, $endTime, $excludeBorrowingId = null): bool
    {
        if (!$this->is_available) {
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
            $this->update([
                'is_available' => false,
                'start_time' => $activeBorrowing->start_time,
                'end_time' => $activeBorrowing->end_time,
            ]);
        } else {
            $this->update([
                'is_available' => true,
                'start_time' => null,
                'end_time' => null,
            ]);
        }
    }
}
