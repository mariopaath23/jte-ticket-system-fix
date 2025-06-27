"use client";

import { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Info } from "lucide-react";
import { type BreadcrumbItem } from "@/types";

interface Item {
  id: number;
  name?: string;
  item_name?: string;
  location: string;
  capacity?: number;
  category?: string;
  description?: string;
}

interface Props {
  type: 'room' | 'infrastructure' | 'inventory';
  items: Item[];
  selectedItem?: Item;
  errors?: Record<string, string>;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Peminjaman',
    href: '/peminjaman',
  },
  {
    title: 'Buat Tiket',
    href: '/peminjaman/create',
  },
];

export default function PeminjamanCreate({ type, items, selectedItem, errors }: Props) {
  const [formData, setFormData] = useState({
    borrowable_type: type,
    borrowable_id: selectedItem?.id || '',
    purpose: '',
    description: '',
    start_time: '',
    end_time: '',
  });

  const [selectedItemDetails, setSelectedItemDetails] = useState<Item | null>(selectedItem || null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (itemId: string) => {
    const item = items.find(i => i.id.toString() === itemId);
    setSelectedItemDetails(item || null);
    setFormData(prev => ({ ...prev, borrowable_id: itemId }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.post('/peminjaman', formData);
  };

  const getItemName = (item: Item) => {
    return item.name || item.item_name || 'Unknown';
  };

  const getItemType = () => {
    if (type === 'room') return 'Ruangan';
    if (type === 'infrastructure') return 'Infrastruktur';
    return 'Inventaris';
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Buat Tiket Peminjaman" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button asChild variant="outline" size="sm">
            <Link href="/peminjaman">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Buat Tiket Peminjaman</h1>
            <p className="text-muted-foreground">
              Ajukan permintaan peminjaman {getItemType().toLowerCase()}
            </p>
          </div>
        </div>

        {/* Type Selector */}
        <div className="mb-4 max-w-xs">
          <Label htmlFor="type">Tipe yang Dipinjam</Label>
          <Select value={type} onValueChange={val => router.get('/peminjaman/create', { type: val })}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih tipe..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="room">Ruangan</SelectItem>
              <SelectItem value="infrastructure">Infrastruktur</SelectItem>
              <SelectItem value="inventory">Inventaris</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Form Peminjaman</CardTitle>
                <CardDescription>
                  Isi detail peminjaman {getItemType().toLowerCase()} yang Anda butuhkan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Item Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="borrowable_id">Pilih {getItemType()}</Label>
                    <Select 
                      value={formData.borrowable_id.toString()} 
                      onValueChange={handleItemChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={`Pilih ${getItemType().toLowerCase()}...`} />
                      </SelectTrigger>
                      <SelectContent>
                        {items.map((item) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            <div className="flex flex-col">
                              <span className="font-medium">{getItemName(item)}</span>
                              <span className="text-xs text-muted-foreground">{item.location}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors?.borrowable_id && (
                      <p className="text-sm text-red-600">{errors.borrowable_id}</p>
                    )}
                  </div>

                  {/* Purpose */}
                  <div className="space-y-2">
                    <Label htmlFor="purpose">Tujuan Peminjaman *</Label>
                    <Input
                      id="purpose"
                      placeholder="Contoh: Rapat organisasi, Presentasi tugas, Workshop..."
                      value={formData.purpose}
                      onChange={(e) => handleInputChange('purpose', e.target.value)}
                      required
                    />
                    {errors?.purpose && (
                      <p className="text-sm text-red-600">{errors.purpose}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Deskripsi Tambahan</Label>
                    <Textarea
                      id="description"
                      placeholder="Jelaskan detail kegiatan atau kebutuhan khusus (opsional)"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                    />
                    {errors?.description && (
                      <p className="text-sm text-red-600">{errors.description}</p>
                    )}
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start_time">Waktu Mulai *</Label>
                      <Input
                        id="start_time"
                        type="datetime-local"
                        value={formData.start_time}
                        onChange={(e) => handleInputChange('start_time', e.target.value)}
                        required
                      />
                      {errors?.start_time && (
                        <p className="text-sm text-red-600">{errors.start_time}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="end_time">Waktu Selesai *</Label>
                      <Input
                        id="end_time"
                        type="datetime-local"
                        value={formData.end_time}
                        onChange={(e) => handleInputChange('end_time', e.target.value)}
                        required
                      />
                      {errors?.end_time && (
                        <p className="text-sm text-red-600">{errors.end_time}</p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-4">
                    <Button type="submit" className="flex-1">
                      Buat Tiket Peminjaman
                    </Button>
                    <Button type="button" variant="outline" asChild>
                      <Link href="/peminjaman">
                        Batal
                      </Link>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Item Details */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Detail {getItemType()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedItemDetails ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{getItemName(selectedItemDetails)}</h3>
                      <p className="text-sm text-muted-foreground">{selectedItemDetails.location}</p>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      {selectedItemDetails.capacity && (
                        <div className="flex items-center gap-2">
                          <Info className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Kapasitas</p>
                            <p className="text-sm text-muted-foreground">{selectedItemDetails.capacity} orang</p>
                          </div>
                        </div>
                      )}

                      {selectedItemDetails.category && (
                        <div className="flex items-center gap-2">
                          <Info className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Kategori</p>
                            <p className="text-sm text-muted-foreground">{selectedItemDetails.category}</p>
                          </div>
                        </div>
                      )}

                      {selectedItemDetails.description && (
                        <div className="flex items-start gap-2">
                          <Info className="w-4 h-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Deskripsi</p>
                            <p className="text-sm text-muted-foreground">{selectedItemDetails.description}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <Alert>
                      <Info className="w-4 h-4" />
                      <AlertDescription>
                        Pastikan waktu peminjaman tidak bentrok dengan jadwal lain. 
                        Tiket akan ditinjau oleh admin sebelum disetujui.
                      </AlertDescription>
                    </Alert>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Info className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Pilih {getItemType().toLowerCase()} untuk melihat detail
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Panduan Peminjaman</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm">Ajukan peminjaman minimal 1 hari sebelum waktu penggunaan</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm">Pastikan informasi yang diisi lengkap dan akurat</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm">Tiket akan diproses dalam 1-2 hari kerja</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm">Simpan nomor tiket untuk referensi</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 