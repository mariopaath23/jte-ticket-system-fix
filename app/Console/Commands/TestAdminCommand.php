<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Models\Borrowing;
use Illuminate\Console\Command;

class TestAdminCommand extends Command
{
    protected $signature = 'test:admin';
    protected $description = 'Test admin functionality';

    public function handle()
    {
        $this->info('Testing Admin Functionality...');
        
        // Test admin user
        $admin = User::where('role', 'admin')->first();
        if ($admin) {
            $this->info("✓ Found admin: {$admin->name} (ID: {$admin->id})");
            $this->info("✓ Admin role check: " . ($admin->isAdmin() ? 'PASS' : 'FAIL'));
        } else {
            $this->error('✗ No admin user found');
        }
        
        // Test student user
        $student = User::where('role', 'student')->first();
        if ($student) {
            $this->info("✓ Found student: {$student->name} (ID: {$student->id})");
            $this->info("✓ Student role check: " . ($student->isStudent() ? 'PASS' : 'FAIL'));
        } else {
            $this->error('✗ No student user found');
        }
        
        // Test pending borrowings
        $pendingBorrowings = Borrowing::where('status', 'pending')->count();
        $this->info("✓ Pending borrowings: {$pendingBorrowings}");
        
        // Test borrowing with details
        $borrowing = Borrowing::where('status', 'pending')->first();
        if ($borrowing) {
            $this->info("✓ Sample borrowing: {$borrowing->ticket_number}");
            $this->info("  - Status: {$borrowing->status}");
            $this->info("  - User: {$borrowing->user->name}");
            $this->info("  - Borrowable: " . ($borrowing->borrowable->name ?? $borrowing->borrowable->item_name));
        }
        
        $this->info('Test completed!');
    }
} 