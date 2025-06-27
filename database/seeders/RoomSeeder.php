<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Room;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rooms = [
            [
                'room_id' => 'R001',
                'name' => 'Auditorium Dekanat',
                'image_url' => '/assets/ruangan/Auditorium.jpg',
                'status' => 'Available',
                'capacity' => 150,
                'location' => 'Gedung Dekanat Fakultas Teknik, Lantai 5',
                'type' => 'high',
                'furniture_available' => true,
                'display_available' => true,
                'audio_available' => true,
                'ac_available' => true,
            ],
            [
                'room_id' => 'R002',
                'name' => 'Creative Room',
                'image_url' => '/assets/ruangan/Creative1.jpg',
                'status' => 'In Use',
                'capacity' => 150,
                'location' => 'Gedung Jurusan Teknik Elektro, Lantai 2',
                'type' => 'medium',
                'furniture_available' => true,
                'display_available' => true,
                'audio_available' => true,
                'ac_available' => true,
            ],
            [
                'room_id' => 'R003',
                'name' => 'JTE-1',
                'image_url' => '',
                'status' => 'In Use',
                'capacity' => 30,
                'location' => 'Gedung Jurusan Teknik Elektro, Lantai 1',
                'type' => 'low',
                'furniture_available' => true,
                'display_available' => true,
                'audio_available' => false,
                'ac_available' => true,
            ],
            [
                'room_id' => 'R004',
                'name' => 'JTE-2',
                'image_url' => '',
                'status' => 'In Use',
                'capacity' => 30,
                'location' => 'Gedung Jurusan Teknik Elektro, Lantai 1',
                'type' => 'low',
                'furniture_available' => true,
                'display_available' => true,
                'audio_available' => false,
                'ac_available' => true,
            ],
            [
                'room_id' => 'R005',
                'name' => 'JTE-3',
                'image_url' => '',
                'status' => 'In Use',
                'capacity' => 30,
                'location' => 'Gedung Jurusan Teknik Elektro, Lantai 1',
                'type' => 'low',
                'furniture_available' => true,
                'display_available' => true,
                'audio_available' => false,
                'ac_available' => false,
            ],
            [
                'room_id' => 'R006',
                'name' => 'JTE-4',
                'image_url' => '',
                'status' => 'In Use',
                'capacity' => 30,
                'location' => 'Gedung Jurusan Teknik Elektro, Lantai 1',
                'type' => 'low',
                'furniture_available' => true,
                'display_available' => true,
                'audio_available' => false,
                'ac_available' => true,
            ],
            [
                'room_id' => 'R007',
                'name' => 'JTE-5',
                'image_url' => '',
                'status' => 'In Use',
                'capacity' => 30,
                'location' => 'Gedung Jurusan Teknik Elektro, Lantai 1',
                'type' => 'low',
                'furniture_available' => true,
                'display_available' => true,
                'audio_available' => false,
                'ac_available' => true,
            ],
            [
                'room_id' => 'R008',
                'name' => 'JTE-6',
                'image_url' => '',
                'status' => 'In Use',
                'capacity' => 30,
                'location' => 'Gedung Jurusan Teknik Elektro, Lantai 1',
                'type' => 'low',
                'furniture_available' => true,
                'display_available' => true,
                'audio_available' => false,
                'ac_available' => true,
            ],
            [
                'room_id' => 'R009',
                'name' => 'JTE-7',
                'image_url' => '',
                'status' => 'In Use',
                'capacity' => 30,
                'location' => 'Gedung Jurusan Teknik Elektro, Lantai 1',
                'type' => 'low',
                'furniture_available' => true,
                'display_available' => true,
                'audio_available' => false,
                'ac_available' => true,
            ],
            [
                'room_id' => 'R010',
                'name' => 'JTE-8',
                'image_url' => '',
                'status' => 'In Use',
                'capacity' => 50,
                'location' => 'Gedung Jurusan Teknik Elektro, Lantai 3',
                'type' => 'low',
                'furniture_available' => true,
                'display_available' => true,
                'audio_available' => true,
                'ac_available' => true,
            ],
            [
                'room_id' => 'R011',
                'name' => 'JTE-9',
                'image_url' => '',
                'status' => 'In Use',
                'capacity' => 50,
                'location' => 'Gedung Jurusan Teknik Elektro, Lantai 3',
                'type' => 'low',
                'furniture_available' => true,
                'display_available' => true,
                'audio_available' => true,
                'ac_available' => true,
            ]
        ];

        foreach ($rooms as $room) {
            Room::create($room);
        }
    }
}
