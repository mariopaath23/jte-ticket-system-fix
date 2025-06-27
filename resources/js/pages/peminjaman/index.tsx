"use client";

import { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Search, Filter, Calendar, Clock, User, Building, Package } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { type BreadcrumbItem } from "@/types";

interface Borrowing {
  id: number;
  ticket_number: string;
  purpose: string;
  description?: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  admin_notes?: string;
  created_at: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  borrowable: {
    id: number;
    name?: string;
    item_name?: string;
    location: string;
  };
  approved_by?: {
    id: number;
    name: string;
  };
}

interface Props {
  borrowings: {
    data: Borrowing[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  filters: {
    query?: string;
    status?: string;
    type?: string;
  };
  userRole: string;
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  approved: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
  completed: "bg-blue-100 text-blue-800 border-blue-200",
  cancelled: "bg-gray-100 text-gray-800 border-gray-200",
};

const statusLabels = {
  pending: "Menunggu",
  approved: "Disetujui",
  rejected: "Ditolak",
  completed: "Selesai",
  cancelled: "Dibatalkan",
};

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Peminjaman',
    href: '/peminjaman',
  },
];

export default function PeminjamanIndex({ borrowings, filters, userRole }: Props) {
  const [searchQuery, setSearchQuery] = useState(filters.query || "");
  const [statusFilter, setStatusFilter] = useState(filters.status || "all");
  const [typeFilter, setTypeFilter] = useState(filters.type || "all");

  const handleSearch = () => {
    router.get('/peminjaman', {
      query: searchQuery,
      status: statusFilter === "all" ? "" : statusFilter,
      type: typeFilter === "all" ? "" : typeFilter,
    }, {
      preserveState: true,
      replace: true,
    });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setTypeFilter("all");
    router.get('/peminjaman', {}, {
      preserveState: true,
      replace: true,
    });
  };

  const getBorrowableName = (borrowable: Borrowing['borrowable']) => {
    return borrowable.name || borrowable.item_name || 'Unknown';
  };

  const getBorrowableType = (borrowable: Borrowing['borrowable']) => {
    return borrowable.name ? 'room' : 'infrastructure';
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Peminjaman" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Peminjaman</h1>
            <p className="text-muted-foreground">
              Kelola tiket peminjaman ruangan dan infrastruktur
            </p>
          </div>
          <Button asChild>
            <Link href="/peminjaman/create">
              <Plus className="w-4 h-4 mr-2" />
              Buat Tiket Baru
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter & Pencarian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Pencarian</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Cari tiket atau tujuan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Button onClick={handleSearch} size="icon">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Semua status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua status</SelectItem>
                    <SelectItem value="pending">Menunggu</SelectItem>
                    <SelectItem value="approved">Disetujui</SelectItem>
                    <SelectItem value="rejected">Ditolak</SelectItem>
                    <SelectItem value="completed">Selesai</SelectItem>
                    <SelectItem value="cancelled">Dibatalkan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tipe</label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Semua tipe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua tipe</SelectItem>
                    <SelectItem value="room">Ruangan</SelectItem>
                    <SelectItem value="infrastructure">Infrastruktur</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">&nbsp;</label>
                <Button onClick={clearFilters} variant="outline" className="w-full">
                  Bersihkan Filter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Borrowings List */}
        <div className="space-y-4">
          {borrowings.data.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Tidak ada tiket peminjaman</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Belum ada tiket peminjaman yang dibuat atau tidak ada yang sesuai dengan filter.
                </p>
                <Button asChild>
                  <Link href="/peminjaman/create">
                    <Plus className="w-4 h-4 mr-2" />
                    Buat Tiket Pertama
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {borrowings.data.map((borrowing) => (
                <Card key={borrowing.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{borrowing.ticket_number}</CardTitle>
                          <Badge className={statusColors[borrowing.status]}>
                            {statusLabels[borrowing.status]}
                          </Badge>
                        </div>
                        <CardDescription className="text-base font-medium">
                          {borrowing.purpose}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/peminjaman/${borrowing.id}`}>
                            Detail
                          </Link>
                        </Button>
                        {borrowing.status === 'pending' && borrowing.user.id === (window as any).auth?.user?.id && (
                          <Button asChild variant="outline" size="sm">
                            <Link href={`/peminjaman/${borrowing.id}/edit`}>
                              Edit
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">
                            {getBorrowableName(borrowing.borrowable)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {getBorrowableType(borrowing.borrowable) === 'room' ? 'Ruangan' : 'Infrastruktur'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{borrowing.user.name}</p>
                          <p className="text-xs text-muted-foreground">{borrowing.user.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">
                            {format(new Date(borrowing.start_time), 'dd MMM yyyy', { locale: id })}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(borrowing.start_time), 'HH:mm', { locale: id })} - {format(new Date(borrowing.end_time), 'HH:mm', { locale: id })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">
                            {format(new Date(borrowing.created_at), 'dd MMM yyyy', { locale: id })}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Dibuat {format(new Date(borrowing.created_at), 'HH:mm', { locale: id })}
                          </p>
                        </div>
                      </div>
                    </div>

                    {borrowing.description && (
                      <>
                        <Separator className="my-4" />
                        <p className="text-sm text-muted-foreground">{borrowing.description}</p>
                      </>
                    )}

                    {borrowing.admin_notes && (
                      <>
                        <Separator className="my-4" />
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <p className="text-sm font-medium text-yellow-800 mb-1">Catatan Admin:</p>
                          <p className="text-sm text-yellow-700">{borrowing.admin_notes}</p>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}

              {/* Pagination */}
              {borrowings.last_page > 1 && (
                <div className="flex justify-center mt-6">
                  <div className="flex gap-2">
                    {Array.from({ length: borrowings.last_page }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={page === borrowings.current_page ? "default" : "outline"}
                        size="sm"
                        onClick={() => router.get('/peminjaman', {
                          page,
                          query: searchQuery,
                          status: statusFilter === "all" ? "" : statusFilter,
                          type: typeFilter === "all" ? "" : typeFilter,
                        }, {
                          preserveState: true,
                        })}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
} 