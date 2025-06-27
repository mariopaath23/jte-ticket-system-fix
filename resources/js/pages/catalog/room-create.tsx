import React, { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const statusOptions = ['Available', 'In Use', 'Maintenance', 'Occupied'];
const typeOptions = ['low', 'medium', 'high'];

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Catalog', href: '/catalog' },
  { title: 'Rooms', href: '/catalog/rooms' },
  { title: 'Tambah Ruangan Baru', href: '/catalog/rooms/create' },
];

export default function RoomCreate() {
  const [form, setForm] = useState({
    name: '',
    image_url: '',
    status: 'Available',
    capacity: '',
    location: '',
    type: 'low',
    furniture_available: false,
    display_available: false,
    audio_available: false,
    ac_available: false,
  });
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSelect = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (typeof value === 'boolean') {
        formData.append(key, value ? '1' : '0');
      } else {
        if (key !== 'room_id') formData.append(key, value);
      }
    });
    if (imageFile) formData.append('image', imageFile);
    router.post('/catalog/rooms', formData, {
      forceFormData: true,
      onError: (err) => setErrors(err),
      onSuccess: () => setSuccess(true),
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tambah Ruangan" />
      <div className="flex flex-col gap-4 rounded-xl p-4 overflow-x-auto max-w-xl mx-auto">
        <div className="mb-8">
          <Link href="/catalog/rooms" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4">
            {/* You can use an icon here if desired */}
            Kembali ke Daftar Ruangan
          </Link>
          <h1 className="text-3xl font-bold mb-2">Tambah Ruangan Baru</h1>
          <p className="text-gray-600">Isi data ruangan baru di bawah ini untuk menambahkannya ke katalog.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Tambah Ruangan Baru</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nama Ruangan</Label>
                  <Input name="name" value={form.name} onChange={handleChange} required placeholder="Misal: Auditorium Dekanat" />
                  {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                </div>
                <div>
                  <Label htmlFor="image">Gambar Ruangan</Label>
                  <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="mt-2 rounded shadow max-h-32" />
                  )}
                  {errors.image && <div className="text-red-500 text-sm">{errors.image}</div>}
                </div>
              </div>
              <hr className="my-4" />
              <div className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={form.status} onValueChange={(v) => handleSelect('status', v)}>
                    <SelectTrigger><SelectValue placeholder="Pilih status" /></SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.status && <div className="text-red-500 text-sm">{errors.status}</div>}
                </div>
                <div>
                  <Label htmlFor="capacity">Kapasitas</Label>
                  <Input name="capacity" type="number" value={form.capacity} onChange={handleChange} required placeholder="Misal: 30" />
                  {errors.capacity && <div className="text-red-500 text-sm">{errors.capacity}</div>}
                </div>
                <div>
                  <Label htmlFor="location">Lokasi</Label>
                  <Input name="location" value={form.location} onChange={handleChange} required placeholder="Misal: Gedung Dekanat, Lantai 5" />
                  {errors.location && <div className="text-red-500 text-sm">{errors.location}</div>}
                </div>
                <div>
                  <Label htmlFor="type">Tipe</Label>
                  <Select value={form.type} onValueChange={(v) => handleSelect('type', v)}>
                    <SelectTrigger><SelectValue placeholder="Pilih tipe" /></SelectTrigger>
                    <SelectContent>
                      {typeOptions.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.type && <div className="text-red-500 text-sm">{errors.type}</div>}
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex gap-4 flex-wrap">
                <label className="flex items-center gap-2">
                  <Checkbox name="furniture_available" checked={form.furniture_available} onCheckedChange={(v) => setForm((prev) => ({ ...prev, furniture_available: !!v }))} />
                  Furniture
                </label>
                <label className="flex items-center gap-2">
                  <Checkbox name="display_available" checked={form.display_available} onCheckedChange={(v) => setForm((prev) => ({ ...prev, display_available: !!v }))} />
                  Display
                </label>
                <label className="flex items-center gap-2">
                  <Checkbox name="audio_available" checked={form.audio_available} onCheckedChange={(v) => setForm((prev) => ({ ...prev, audio_available: !!v }))} />
                  Audio
                </label>
                <label className="flex items-center gap-2">
                  <Checkbox name="ac_available" checked={form.ac_available} onCheckedChange={(v) => setForm((prev) => ({ ...prev, ac_available: !!v }))} />
                  AC
                </label>
              </div>
              <div className="flex gap-2 mt-4">
                <Button type="submit">Simpan</Button>
                <Button asChild variant="outline"><Link href="/catalog/rooms">Batal</Link></Button>
              </div>
              {success && (
                <div className="mt-4 text-green-600 font-semibold">Ruangan berhasil ditambahkan!</div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
} 