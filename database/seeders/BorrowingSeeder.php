<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Borrowing;
use App\Models\User;
use App\Models\Room;
use App\Models\Infrastructure;

class BorrowingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $rooms = Room::all();
        $infrastructures = Infrastructure::all();

        if ($users->isEmpty() || $rooms->isEmpty() || $infrastructures->isEmpty()) {
            return;
        }

        $borrowings = [
            // Room borrowings
            [
                'user_id' => $users->first()->id,
                'borrowable_type' => Room::class,
                'borrowable_id' => $rooms->first()->id,
                'purpose' => 'Rapat Organisasi Himpunan Mahasiswa',
                'description' => 'Rapat bulanan untuk membahas program kerja periode mendatang',
                'start_time' => now()->addDays(2)->setTime(9, 0),
                'end_time' => now()->addDays(2)->setTime(12, 0),
                'status' => 'pending',
            ],
            [
                'user_id' => $users->first()->id,
                'borrowable_type' => Room::class,
                'borrowable_id' => $rooms->skip(1)->first()->id,
                'purpose' => 'Presentasi Tugas Akhir',
                'description' => 'Presentasi skripsi dengan judul "Sistem Manajemen Tiket Peminjaman"',
                'start_time' => now()->addDays(3)->setTime(14, 0),
                'end_time' => now()->addDays(3)->setTime(16, 0),
                'status' => 'approved',
                'approved_at' => now()->subDays(1),
                'approved_by' => $users->where('role', 'admin')->first()->id,
            ],
            [
                'user_id' => $users->last()->id,
                'borrowable_type' => Room::class,
                'borrowable_id' => $rooms->skip(2)->first()->id,
                'purpose' => 'Workshop Programming',
                'description' => 'Workshop dasar pemrograman untuk mahasiswa baru',
                'start_time' => now()->addDays(5)->setTime(8, 0),
                'end_time' => now()->addDays(5)->setTime(17, 0),
                'status' => 'rejected',
                'rejected_at' => now()->subDays(1),
                'approved_by' => $users->where('role', 'admin')->first()->id,
                'admin_notes' => 'Ruangan sudah dibooking untuk kegiatan lain pada waktu yang sama',
            ],

            // Infrastructure borrowings
            [
                'user_id' => $users->first()->id,
                'borrowable_type' => Infrastructure::class,
                'borrowable_id' => $infrastructures->first()->id,
                'purpose' => 'Presentasi Seminar',
                'description' => 'Seminar teknologi terbaru di bidang elektro',
                'start_time' => now()->addDays(1)->setTime(10, 0),
                'end_time' => now()->addDays(1)->setTime(12, 0),
                'status' => 'pending',
            ],
            [
                'user_id' => $users->last()->id,
                'borrowable_type' => Infrastructure::class,
                'borrowable_id' => $infrastructures->skip(1)->first()->id,
                'purpose' => 'Dokumentasi Acara',
                'description' => 'Dokumentasi kegiatan wisuda angkatan 2024',
                'start_time' => now()->addDays(4)->setTime(8, 0),
                'end_time' => now()->addDays(4)->setTime(18, 0),
                'status' => 'approved',
                'approved_at' => now()->subDays(2),
                'approved_by' => $users->where('role', 'admin')->first()->id,
            ],
            [
                'user_id' => $users->first()->id,
                'borrowable_type' => Infrastructure::class,
                'borrowable_id' => $infrastructures->skip(2)->first()->id,
                'purpose' => 'Praktikum Laboratorium',
                'description' => 'Praktikum mata kuliah Sistem Digital',
                'start_time' => now()->addDays(6)->setTime(13, 0),
                'end_time' => now()->addDays(6)->setTime(16, 0),
                'status' => 'completed',
                'approved_at' => now()->subDays(3),
                'approved_by' => $users->where('role', 'admin')->first()->id,
            ],
        ];

        foreach ($borrowings as $borrowing) {
            Borrowing::create([
                'ticket_number' => Borrowing::generateTicketNumber(),
                ...$borrowing,
            ]);
        }
    }
} 