<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Borrowing extends Model
{
    use HasFactory;

    protected $fillable = [
        'ticket_number',
        'user_id',
        'borrowable_type',
        'borrowable_id',
        'purpose',
        'description',
        'start_time',
        'end_time',
        'status',
        'admin_notes',
        'approved_at',
        'rejected_at',
        'approved_by',
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'approved_at' => 'datetime',
        'rejected_at' => 'datetime',
    ];

    /**
     * Get the user who made the borrowing request
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the admin who approved/rejected the request
     */
    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    /**
     * Get the borrowable item (Room or Infrastructure)
     */
    public function borrowable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Generate a unique ticket number
     */
    public static function generateTicketNumber(): string
    {
        $prefix = 'TKT';
        $date = now()->format('Ymd');
        $lastTicket = self::where('ticket_number', 'like', "{$prefix}{$date}%")
            ->orderBy('ticket_number', 'desc')
            ->first();

        if ($lastTicket) {
            $lastNumber = (int) substr($lastTicket->ticket_number, -4);
            $newNumber = $lastNumber + 1;
        } else {
            $newNumber = 1;
        }

        return $prefix . $date . str_pad($newNumber, 4, '0', STR_PAD_LEFT);
    }

    /**
     * Check if the borrowing is currently active
     */
    public function isActive(): bool
    {
        $now = now();
        return $this->status === 'approved' && 
               $this->start_time <= $now && 
               $this->end_time >= $now;
    }

    /**
     * Check if the borrowing is overdue
     */
    public function isOverdue(): bool
    {
        return $this->status === 'approved' && 
               $this->end_time < now();
    }

    /**
     * Get the duration of the borrowing in hours
     */
    public function getDurationInHours(): float
    {
        return $this->start_time->diffInHours($this->end_time, true);
    }
} 