<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('nim_nip')->nullable()->after('email');
        });

        // Update existing users with a default NIM/NIP
        DB::table('users')->whereNull('nim_nip')->update([
            'nim_nip' => DB::raw("CONCAT('DEFAULT_', id)")
        ]);

        // Now make the column not nullable and unique
        Schema::table('users', function (Blueprint $table) {
            $table->string('nim_nip')->nullable(false)->unique()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('nim_nip');
        });
    }
};
