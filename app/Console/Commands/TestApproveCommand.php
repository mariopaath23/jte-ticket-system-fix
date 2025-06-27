<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Models\Borrowing;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;

class TestApproveCommand extends Command
{
    protected $signature = 'test:approve {borrowing_id}';
    protected $description = 'Test approve functionality for a borrowing';

    public function handle()
    {
        $borrowingId = $this->argument('borrowing_id');
        
        $this->info("Testing approve for borrowing ID: {$borrowingId}");
        
        // Get borrowing
        $borrowing = Borrowing::with(['user', 'borrowable'])->find($borrowingId);
        if (!$borrowing) {
            $this->error("Borrowing with ID {$borrowingId} not found");
            return 1;
        }
        
        $this->info("✓ Found borrowing: {$borrowing->ticket_number}");
        $this->info("  - Status: {$borrowing->status}");
        $this->info("  - User: {$borrowing->user->name}");
        $this->info("  - Borrowable: " . ($borrowing->borrowable->name ?? $borrowing->borrowable->item_name));
        
        // Get admin user
        $admin = User::where('role', 'admin')->first();
        if (!$admin) {
            $this->error("No admin user found");
            return 1;
        }
        
        $this->info("✓ Using admin: {$admin->name}");
        
        // Simulate admin authentication
        Auth::login($admin);
        
        // Test availability check
        $borrowable = $borrowing->borrowable;
        $isAvailable = $borrowable->isAvailableForPeriod($borrowing->start_time, $borrowing->end_time, $borrowing->id);
        
        $this->info("✓ Availability check: " . ($isAvailable ? 'AVAILABLE' : 'NOT AVAILABLE'));
        
        if (!$isAvailable) {
            $this->error("Item not available for approval");
            return 1;
        }
        
        // Test approval
        try {
            $borrowing->update([
                'status' => 'approved',
                'approved_at' => now(),
                'approved_by' => $admin->id,
            ]);
            
            $this->info("✓ Borrowing approved successfully!");
            $this->info("  - New status: {$borrowing->status}");
            $this->info("  - Approved by: {$admin->name}");
            $this->info("  - Approved at: {$borrowing->approved_at}");
            
            // Update item availability
            $borrowable->updateAvailability();
            $this->info("✓ Item availability updated");
            
        } catch (\Exception $e) {
            $this->error("Error approving borrowing: " . $e->getMessage());
            return 1;
        }
        
        $this->info('Test completed successfully!');
        return 0;
    }
} 