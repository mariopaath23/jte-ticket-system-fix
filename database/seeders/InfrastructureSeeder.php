<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Infrastructure;

class InfrastructureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $infrastructures = [
            [
                'item_name' => 'Proyektor Epson',
                'category' => 'Elektronik',
                'location' => 'Gedung Jurusan Teknik Elektro, Lantai 1',
                'is_available' => true,
                'start_time' => null,
                'end_time' => null,
                'description' => 'Proyektor untuk presentasi dengan resolusi HD'
            ],
            [
                'item_name' => 'Laptop Dell Latitude',
                'category' => 'Komputer',
                'location' => 'Gedung Jurusan Teknik Elektro, Lantai 2',
                'is_available' => false,
                'start_time' => '2025-04-07T13:39:37.000Z',
                'end_time' => '2025-04-07T15:39:37.000Z',
                'description' => 'Laptop untuk keperluan akademik'
            ],
            [
                'item_name' => 'Papan Tulis Digital',
                'category' => 'Peralatan Pembelajaran',
                'location' => 'Gedung Jurusan Teknik Elektro, Lantai 1',
                'is_available' => false,
                'start_time' => '2025-04-07T13:39:37.000Z',
                'end_time' => '2025-04-07T15:39:37.000Z',
                'description' => 'Papan tulis interaktif untuk pembelajaran'
            ],
            [
                'item_name' => 'Sound System JBL',
                'category' => 'Audio',
                'location' => 'Gedung Jurusan Teknik Elektro, Lantai 3',
                'is_available' => true,
                'start_time' => null,
                'end_time' => null,
                'description' => 'Sistem audio untuk acara dan presentasi'
            ],
            [
                'item_name' => 'Kamera DSLR Canon',
                'category' => 'Fotografi',
                'location' => 'Gedung Jurusan Teknik Elektro, Lantai 2',
                'is_available' => false,
                'start_time' => '2025-04-07T13:39:37.000Z',
                'end_time' => '2025-04-07T15:39:37.000Z',
                'description' => 'Kamera untuk dokumentasi acara'
            ],
            [
                'item_name' => 'Printer HP LaserJet',
                'category' => 'Pencetakan',
                'location' => 'Gedung Jurusan Teknik Elektro, Lantai 1',
                'is_available' => true,
                'start_time' => null,
                'end_time' => null,
                'description' => 'Printer laser untuk keperluan cetak dokumen'
            ],
            [
                'item_name' => 'Scanner Epson',
                'category' => 'Pemindaian',
                'location' => 'Gedung Jurusan Teknik Elektro, Lantai 2',
                'is_available' => false,
                'start_time' => '2025-04-07T13:39:37.000Z',
                'end_time' => '2025-04-07T15:39:37.000Z',
                'description' => 'Scanner untuk digitalisasi dokumen'
            ],
            [
                'item_name' => 'Mikrofon Wireless',
                'category' => 'Audio',
                'location' => 'Gedung Jurusan Teknik Elektro, Lantai 3',
                'is_available' => true,
                'start_time' => null,
                'end_time' => null,
                'description' => 'Mikrofon nirkabel untuk presentasi'
            ],
            [
                'item_name' => 'Tablet iPad',
                'category' => 'Komputer',
                'location' => 'Gedung Jurusan Teknik Elektro, Lantai 1',
                'is_available' => false,
                'start_time' => '2025-04-07T13:39:37.000Z',
                'end_time' => '2025-04-07T15:39:37.000Z',
                'description' => 'Tablet untuk demonstrasi dan presentasi'
            ],
            [
                'item_name' => 'LED Display Panel',
                'category' => 'Display',
                'location' => 'Gedung Jurusan Teknik Elektro, Lantai 2',
                'is_available' => true,
                'start_time' => null,
                'end_time' => null,
                'description' => 'Panel LED untuk display informasi'
            ]
        ];

        foreach ($infrastructures as $infrastructure) {
            Infrastructure::create($infrastructure);
        }
    }
}
