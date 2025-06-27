import React, { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

type Room = { room_id: string; name: string };

type PageProps = {
  rooms: Room[];
};

const statusOptions = ['Available', 'In Use', 'Maintenance', 'Retired'];

export default function InventoryCreate(props: PageProps) {
  const { rooms } = props;
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    status: 'Available',
    location: '',
    room_id: '',
    image_url: '',
    purchase_price: '',
    purchase_date: '',
    supplier: '',
    serial_number: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (name: string, value: string) => {
    if (name === 'room_id' && value === 'none') {
      setForm((prev) => ({ ...prev, [name]: '' }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
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
        if (key !== 'item_id') formData.append(key, value);
      }
    });
    if (imageFile) formData.append('image', imageFile);
    router.post('/catalog/inventory', formData, {
      forceFormData: true,
      onError: (err) => setErrors(err),
      onSuccess: () => setSuccess(true),
    });
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Catalog', href: '/catalog' },
    { title: 'Inventory', href: '/catalog/inventory' },
    { title: 'Tambah Inventaris Baru', href: '/catalog/inventory/create' },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tambah Inventaris" />
      <div className="flex flex-col gap-4 rounded-xl p-4 overflow-x-auto max-w-xl mx-auto">
        <div className="mb-8">
          <Link href="/catalog/inventory" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4">
            Kembali ke Inventaris
          </Link>
          <h1 className="text-3xl font-bold mb-2">Tambah Inventaris Baru</h1>
          <p className="text-gray-600">Isi data inventaris baru di bawah ini untuk menambahkannya ke katalog.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Tambah Inventaris Baru</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nama Inventaris</Label>
                  <Input name="name" value={form.name} onChange={handleChange} required placeholder="Misal: Proyektor Epson" />
                  {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                </div>
                <div>
                  <Label htmlFor="description">Deskripsi</Label>
                  <textarea name="description" value={form.description} onChange={handleChange} className="block w-full border rounded px-3 py-2 text-sm" placeholder="Deskripsi singkat..." />
                  {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                </div>
                <div>
                  <Label htmlFor="category">Kategori</Label>
                  <Input name="category" value={form.category} onChange={handleChange} required placeholder="Misal: Elektronik" />
                  {errors.category && <div className="text-red-500 text-sm">{errors.category}</div>}
                </div>
                <div>
                  <Label htmlFor="image">Gambar Inventaris</Label>
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
                  <Label htmlFor="location">Lokasi</Label>
                  <Input name="location" value={form.location} onChange={handleChange} placeholder="Misal: Storage Room A" />
                  {errors.location && <div className="text-red-500 text-sm">{errors.location}</div>}
                </div>
                <div>
                  <Label htmlFor="room_id">Ruangan</Label>
                  <Select value={form.room_id || 'none'} onValueChange={(v) => handleSelect('room_id', v)}>
                    <SelectTrigger><SelectValue placeholder="Pilih ruangan (opsional)" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">- Tidak ada -</SelectItem>
                      {rooms.map((room) => (
                        <SelectItem key={room.room_id} value={room.room_id}>{room.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.room_id && <div className="text-red-500 text-sm">{errors.room_id}</div>}
                </div>
              </div>
              <hr className="my-4" />
              <div className="space-y-4">
                <div>
                  <Label htmlFor="purchase_price">Harga Beli</Label>
                  <Input name="purchase_price" type="number" value={form.purchase_price} onChange={handleChange} placeholder="Misal: 5000000" />
                  {errors.purchase_price && <div className="text-red-500 text-sm">{errors.purchase_price}</div>}
                </div>
                <div>
                  <Label htmlFor="purchase_date">Tanggal Beli</Label>
                  <Input name="purchase_date" type="date" value={form.purchase_date} onChange={handleChange} />
                  {errors.purchase_date && <div className="text-red-500 text-sm">{errors.purchase_date}</div>}
                </div>
                <div>
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input name="supplier" value={form.supplier} onChange={handleChange} placeholder="Misal: PT. Elektronik Jaya" />
                  {errors.supplier && <div className="text-red-500 text-sm">{errors.supplier}</div>}
                </div>
                <div>
                  <Label htmlFor="serial_number">Serial Number</Label>
                  <Input name="serial_number" value={form.serial_number} onChange={handleChange} placeholder="SN-123456" />
                  {errors.serial_number && <div className="text-red-500 text-sm">{errors.serial_number}</div>}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button type="submit">Simpan</Button>
                <Button asChild variant="outline"><Link href="/catalog/inventory">Batal</Link></Button>
              </div>
              {success && (
                <div className="mt-4 text-green-600 font-semibold">Inventaris berhasil ditambahkan!</div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
} 