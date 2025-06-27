# Sistem Peminjaman JTE Ticket System

## Overview

Sistem peminjaman adalah fitur utama dari JTE Ticket System yang memungkinkan mahasiswa dan staff untuk mengajukan permintaan peminjaman ruangan dan infrastruktur di Jurusan Teknik Elektro, Universitas Sam Ratulangi.

## Fitur Utama

### 1. Manajemen Tiket Peminjaman
- **Buat Tiket Baru**: Pengguna dapat membuat tiket peminjaman untuk ruangan atau infrastruktur
- **Edit Tiket**: Pengguna dapat mengedit tiket yang masih dalam status pending
- **Batalkan Tiket**: Pengguna dapat membatalkan tiket yang masih pending
- **Lihat Detail**: Melihat informasi lengkap tiket peminjaman

### 2. Workflow Status Tiket
- **Pending**: Tiket baru dibuat, menunggu persetujuan admin
- **Approved**: Tiket disetujui oleh admin
- **Rejected**: Tiket ditolak oleh admin dengan alasan
- **Completed**: Peminjaman selesai
- **Cancelled**: Tiket dibatalkan oleh pengguna

### 3. Role-based Access Control
- **Student**: Dapat membuat, edit, dan batalkan tiket sendiri
- **Admin**: Dapat menyetujui, menolak, dan menyelesaikan semua tiket

### 4. Pencarian dan Filter
- Pencarian berdasarkan nomor tiket atau tujuan
- Filter berdasarkan status (pending, approved, rejected, dll)
- Filter berdasarkan tipe (ruangan atau infrastruktur)

## Struktur Database

### Tabel `borrowings`
```sql
CREATE TABLE borrowings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    ticket_number VARCHAR(255) UNIQUE,
    user_id BIGINT,
    borrowable_type VARCHAR(255), -- 'App\Models\Room' atau 'App\Models\Infrastructure'
    borrowable_id BIGINT,
    purpose VARCHAR(255),
    description TEXT,
    start_time DATETIME,
    end_time DATETIME,
    status ENUM('pending', 'approved', 'rejected', 'completed', 'cancelled'),
    admin_notes TEXT,
    approved_at DATETIME,
    rejected_at DATETIME,
    approved_by BIGINT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    INDEX(borrowable_type, borrowable_id)
);
```

### Relasi Model

#### Model `Borrowing`
- `user()`: Relasi ke User yang membuat tiket
- `approvedBy()`: Relasi ke User admin yang menyetujui/menolak
- `borrowable()`: Polymorphic relation ke Room atau Infrastructure

#### Model `Room` & `Infrastructure`
- `borrowings()`: MorphMany relation ke Borrowing
- `isAvailableForPeriod()`: Method untuk cek ketersediaan
- `updateAvailability()`: Method untuk update status ketersediaan

## API Endpoints

### Routes Peminjaman
```php
// Halaman utama peminjaman
GET /peminjaman

// Buat tiket baru
GET /peminjaman/create
POST /peminjaman

// Detail tiket
GET /peminjaman/{borrowing}

// Edit tiket
GET /peminjaman/{borrowing}/edit
PUT /peminjaman/{borrowing}

// Aksi admin
POST /peminjaman/{borrowing}/approve
POST /peminjaman/{borrowing}/reject
POST /peminjaman/{borrowing}/complete

// Batalkan tiket
DELETE /peminjaman/{borrowing}/cancel
```

## Halaman Frontend

### 1. Index Page (`/peminjaman`)
- Daftar semua tiket peminjaman
- Filter dan pencarian
- Pagination
- Quick actions (detail, edit, batalkan)

### 2. Create Page (`/peminjaman/create`)
- Form pembuatan tiket baru
- Pilihan ruangan/infrastruktur
- Validasi waktu dan ketersediaan
- Preview detail item

### 3. Show Page (`/peminjaman/{id}`)
- Detail lengkap tiket
- Timeline status
- Aksi admin (approve/reject/complete)
- Informasi item yang dipinjam

### 4. Edit Page (`/peminjaman/{id}/edit`)
- Form edit tiket
- Validasi perubahan
- Preview item yang dipilih

## Business Logic

### 1. Validasi Ketersediaan
```php
// Cek apakah item tersedia untuk periode tertentu
public function isAvailableForPeriod($startTime, $endTime): bool
{
    // Cek status item
    if (!$this->is_available) {
        return false;
    }

    // Cek konflik dengan peminjaman lain
    $conflictingBorrowings = $this->borrowings()
        ->where('status', 'approved')
        ->where(function ($query) use ($startTime, $endTime) {
            $query->whereBetween('start_time', [$startTime, $endTime])
                  ->orWhereBetween('end_time', [$startTime, $endTime])
                  ->orWhere(function ($q) use ($startTime, $endTime) {
                      $q->where('start_time', '<=', $startTime)
                        ->where('end_time', '>=', $endTime);
                  });
        })
        ->exists();

    return !$conflictingBorrowings;
}
```

### 2. Generate Ticket Number
```php
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
```

### 3. Update Availability
```php
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
```

## Keamanan dan Validasi

### 1. Authorization
- Hanya pemilik tiket yang dapat edit/batalkan
- Hanya admin yang dapat approve/reject/complete
- Validasi role user untuk akses halaman

### 2. Validation Rules
```php
$request->validate([
    'borrowable_type' => 'required|in:room,infrastructure',
    'borrowable_id' => 'required|integer',
    'purpose' => 'required|string|max:255',
    'description' => 'nullable|string',
    'start_time' => 'required|date|after:now',
    'end_time' => 'required|date|after:start_time',
]);
```

### 3. Business Rules
- Tiket hanya dapat diedit jika status pending
- Admin notes wajib diisi saat reject
- Cek ketersediaan sebelum approve
- Update availability otomatis saat approve/complete

## Penggunaan

### Untuk Mahasiswa/Staff:
1. Login ke sistem
2. Klik "Peminjaman" di sidebar
3. Klik "Buat Tiket Baru"
4. Pilih tipe (ruangan/infrastruktur)
5. Pilih item yang ingin dipinjam
6. Isi tujuan dan deskripsi
7. Pilih waktu mulai dan selesai
8. Submit tiket
9. Tunggu persetujuan admin

### Untuk Admin:
1. Login sebagai admin
2. Akses halaman peminjaman
3. Lihat daftar tiket pending
4. Klik "Detail" pada tiket
5. Pilih aksi:
   - **Setujui**: Langsung approve tiket
   - **Tolak**: Berikan alasan penolakan
   - **Selesaikan**: Mark tiket sebagai completed

## Data Sample

Sistem dilengkapi dengan data sample yang mencakup:
- 2 user (admin dan student)
- 11 ruangan dengan berbagai kapasitas dan fasilitas
- 10 item infrastruktur dengan berbagai kategori
- 6 tiket peminjaman dengan berbagai status

## Teknologi yang Digunakan

- **Backend**: Laravel 11, PHP 8.2+
- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Database**: MySQL
- **UI Components**: Radix UI, Lucide Icons
- **State Management**: Inertia.js
- **Date Handling**: date-fns

## Deployment

1. Jalankan migration:
```bash
php artisan migrate
```

2. Jalankan seeder:
```bash
php artisan db:seed
```

3. Start development server:
```bash
php artisan serve
npm run dev
```

4. Akses aplikasi di `http://localhost:8000`

## Login Credentials

- **Admin**: admin@unsrat.ac.id / password
- **Student**: student@unsrat.ac.id / password

## Kesimpulan

Sistem peminjaman JTE Ticket System telah berhasil diimplementasikan dengan fitur lengkap yang mencakup:

✅ Manajemen tiket peminjaman ruangan dan infrastruktur  
✅ Workflow approval yang jelas  
✅ Role-based access control  
✅ Validasi ketersediaan real-time  
✅ Interface yang user-friendly  
✅ Responsive design  
✅ Data sample untuk testing  

Sistem ini siap digunakan untuk mengelola peminjaman ruangan dan infrastruktur di Jurusan Teknik Elektro dengan efisien dan transparan. 