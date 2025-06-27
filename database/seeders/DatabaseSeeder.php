<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        DB::table('users')->insert([
            ['name' => 'Admin', 'email' => 'admin@unsrat.ac.id', 'password' => bcrypt('password'), 'role' => 'admin'],
            ['name' => 'Student', 'email' => 'student@unsrat.ac.id', 'password' => bcrypt('password'), 'role' => 'student'],
        ]);

        $this->call([
            InfrastructureSeeder::class,
            RoomSeeder::class,
            InventorySeeder::class,
        ]);
    }
}
