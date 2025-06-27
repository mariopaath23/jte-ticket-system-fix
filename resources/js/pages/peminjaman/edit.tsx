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

interface Borrowing {
  id: number;
  ticket_number: string;
  purpose: string;
  description?: string;
  start_time: string;
  end_time: string;
  status: string;
  borrowable: {
    id: number;
    name?: string;
    item_name?: string;
    location: string;
    capacity?: number;
    category?: string;
    description?: string;
  };
}

interface Props {
  borrowing: Borrowing;
  type: 'room' | 'infrastructure';
  items: Item[];
  errors?: Record<string, string>;
}

export default function PeminjamanEdit({ borrowing, type, items, errors }: Props) {
  const [formData, setFormData] = useState({
    borrowable_type: type,
    borrowable_id: borrowing.borrowable.id.toString(),
    purpose: borrowing.purpose,
    description: borrowing.description || '',
    start_time: borrowing.start_time.slice(0, 16), // Format for datetime-local
    end_time: borrowing.end_time.slice(0, 16),
  });

  const [selectedItemDetails, setSelectedItemDetails] = useState<Item | null>(
    items.find(i => i.id === borrowing.borrowable.id) || null
  );

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
    router.put(`/peminjaman/${borrowing.id}`, formData);
  };

  const getItemName = (item: Item) => {
    return item.name || item.item_name || 'Unknown';
  };

  const getItemType = () => {
    return type === 'room' ? 'Ruangan' : 'Infrastruktur';
  };

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Peminjaman',
      href: '/peminjaman',
    },
    {
      title: borrowing.ticket_number,
      href: `/peminjaman/${borrowing.id}`,
    },
    {
      title: 'Edit',
      href: `/peminjaman/${borrowing.id}/edit`,
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit Tiket ${borrowing.ticket_number}`} />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button asChild variant="outline" size="sm">
            <Link href={`/peminjaman/${borrowing.id}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Edit Tiket Peminjaman</h1>
            <p className="text-muted-foreground">
              Edit detail peminjaman {getItemType().toLowerCase()} - {borrowing.ticket_number}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Form Edit Peminjaman</CardTitle>
                <CardDescription>
                  Perbarui detail peminjaman {getItemType().toLowerCase()} yang Anda butuhkan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Item Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="borrowable_id">Pilih {getItemType()}</Label>
                    <Select 
                      value={formData.borrowable_id} 
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
                      Perbarui Tiket Peminjaman
                    </Button>
                    <Button type="button" variant="outline" asChild>
                      <Link href={`/peminjaman/${borrowing.id}`}>
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
                        Perubahan pada tiket akan memerlukan persetujuan ulang dari admin.
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

            {/* Current Ticket Info */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Info Tiket Saat Ini</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Nomor Tiket</p>
                  <p className="text-sm text-muted-foreground">{borrowing.ticket_number}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <p className="text-sm text-muted-foreground capitalize">{borrowing.status}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Item Saat Ini</p>
                  <p className="text-sm text-muted-foreground">{getItemName(borrowing.borrowable)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 