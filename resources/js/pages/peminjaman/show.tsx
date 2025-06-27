"use client";

import { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Calendar, Clock, User, Building, Package, CheckCircle, XCircle, AlertTriangle, Info, FileText } from "lucide-react";
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
  approved_at?: string;
  rejected_at?: string;
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
    capacity?: number;
    category?: string;
    description?: string;
  };
  approved_by?: {
    id: number;
    name: string;
  };
}

interface Props {
  borrowing: Borrowing;
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

const statusIcons = {
  pending: AlertTriangle,
  approved: CheckCircle,
  rejected: XCircle,
  completed: CheckCircle,
  cancelled: XCircle,
};

export default function PeminjamanShow({ borrowing, userRole }: Props) {
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isAdmin = userRole === 'admin';
  const isOwner = borrowing.user.id === (window as any).auth?.user?.id;
  const canEdit = borrowing.status === 'pending' && isOwner;
  const canCancel = borrowing.status === 'pending' && isOwner;
  const canApprove = isAdmin && borrowing.status === 'pending';
  const canReject = isAdmin && borrowing.status === 'pending';
  const canComplete = isAdmin && borrowing.status === 'approved';

  const handleApprove = () => {
    if (isLoading) return;
    
    setIsLoading(true);
    router.post(`/peminjaman/${borrowing.id}/approve`, {}, {
      onSuccess: () => {
        setIsLoading(false);
      },
      onError: (errors) => {
        setIsLoading(false);
        console.error('Approve error:', errors);
      },
    });
  };

  const handleReject = () => {
    if (!adminNotes.trim() || isLoading) return;
    
    setIsLoading(true);
    router.post(`/peminjaman/${borrowing.id}/reject`, { admin_notes: adminNotes }, {
      onSuccess: () => {
        setIsLoading(false);
        setRejectDialogOpen(false);
        setAdminNotes("");
      },
      onError: (errors) => {
        setIsLoading(false);
        console.error('Reject error:', errors);
      },
    });
  };

  const handleComplete = () => {
    if (isLoading) return;
    
    setIsLoading(true);
    router.post(`/peminjaman/${borrowing.id}/complete`, {}, {
      onSuccess: () => {
        setIsLoading(false);
      },
      onError: (errors) => {
        setIsLoading(false);
        console.error('Complete error:', errors);
      },
    });
  };

  const handleCancel = () => {
    if (confirm('Apakah Anda yakin ingin membatalkan tiket ini?')) {
      router.delete(`/peminjaman/${borrowing.id}/cancel`);
    }
  };

  const getBorrowableName = () => {
    return borrowing.borrowable.name || borrowing.borrowable.item_name || 'Unknown';
  };

  const getBorrowableType = () => {
    return borrowing.borrowable.name ? 'room' : 'infrastructure';
  };

  const getBorrowableTypeLabel = () => {
    return getBorrowableType() === 'room' ? 'Ruangan' : 'Infrastruktur';
  };

  const StatusIcon = statusIcons[borrowing.status];

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Peminjaman',
      href: '/peminjaman',
    },
    {
      title: borrowing.ticket_number,
      href: `/peminjaman/${borrowing.id}`,
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Tiket ${borrowing.ticket_number}`} />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button asChild variant="outline" size="sm">
            <Link href="/peminjaman">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Link>
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{borrowing.ticket_number}</h1>
              <Badge className={statusColors[borrowing.status]}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {statusLabels[borrowing.status]}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">{borrowing.purpose}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informasi Peminjaman</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    {getBorrowableType() === 'room' ? (
                      <Building className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <Package className="w-5 h-5 text-muted-foreground" />
                    )}
                    <div>
                      <p className="font-medium">{getBorrowableName()}</p>
                      <p className="text-sm text-muted-foreground">{getBorrowableTypeLabel()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{borrowing.user.name}</p>
                      <p className="text-sm text-muted-foreground">{borrowing.user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {format(new Date(borrowing.start_time), 'dd MMMM yyyy', { locale: id })}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(borrowing.start_time), 'HH:mm', { locale: id })} - {format(new Date(borrowing.end_time), 'HH:mm', { locale: id })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {format(new Date(borrowing.created_at), 'dd MMM yyyy', { locale: id })}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Dibuat {format(new Date(borrowing.created_at), 'HH:mm', { locale: id })}
                      </p>
                    </div>
                  </div>
                </div>

                {borrowing.description && (
                  <>
                    <Separator />
                    <div>
                      <p className="font-medium mb-2">Deskripsi Tambahan</p>
                      <p className="text-sm text-muted-foreground">{borrowing.description}</p>
                    </div>
                  </>
                )}

                {borrowing.admin_notes && (
                  <>
                    <Separator />
                    <Alert>
                      <Info className="w-4 h-4" />
                      <AlertDescription>
                        <p className="font-medium mb-1">Catatan Admin:</p>
                        <p>{borrowing.admin_notes}</p>
                      </AlertDescription>
                    </Alert>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Item Details */}
            <Card>
              <CardHeader>
                <CardTitle>Detail {getBorrowableTypeLabel()}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">{getBorrowableName()}</p>
                    <p className="text-sm text-muted-foreground">{borrowing.borrowable.location}</p>
                  </div>

                  {borrowing.borrowable.capacity && (
                    <div>
                      <p className="text-sm font-medium">Kapasitas</p>
                      <p className="text-sm text-muted-foreground">{borrowing.borrowable.capacity} orang</p>
                    </div>
                  )}

                  {borrowing.borrowable.category && (
                    <div>
                      <p className="text-sm font-medium">Kategori</p>
                      <p className="text-sm text-muted-foreground">{borrowing.borrowable.category}</p>
                    </div>
                  )}

                  {borrowing.borrowable.description && (
                    <div>
                      <p className="text-sm font-medium">Deskripsi</p>
                      <p className="text-sm text-muted-foreground">{borrowing.borrowable.description}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Admin Actions */}
            {isAdmin && (
              <Card>
                <CardHeader>
                  <CardTitle>Aksi Admin</CardTitle>
                  <CardDescription>
                    Kelola status tiket peminjaman
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {canApprove && (
                      <Button 
                        onClick={handleApprove} 
                        className="bg-green-600 hover:bg-green-700"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Memproses...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Setujui
                          </>
                        )}
                      </Button>
                    )}

                    {canReject && (
                      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="destructive" disabled={isLoading}>
                            <XCircle className="w-4 h-4 mr-2" />
                            Tolak
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Tolak Tiket Peminjaman</DialogTitle>
                            <DialogDescription>
                              Berikan alasan penolakan untuk tiket {borrowing.ticket_number}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-3">
                            <Label htmlFor="admin_notes">Alasan Penolakan *</Label>
                            <Textarea
                              id="admin_notes"
                              placeholder="Jelaskan alasan penolakan..."
                              value={adminNotes}
                              onChange={(e) => setAdminNotes(e.target.value)}
                              rows={4}
                              disabled={isLoading}
                            />
                          </div>
                          <DialogFooter>
                            <Button 
                              variant="outline" 
                              onClick={() => setRejectDialogOpen(false)}
                              disabled={isLoading}
                            >
                              Batal
                            </Button>
                            <Button 
                              variant="destructive" 
                              onClick={handleReject}
                              disabled={!adminNotes.trim() || isLoading}
                            >
                              {isLoading ? (
                                <>
                                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                  Memproses...
                                </>
                              ) : (
                                'Tolak Tiket'
                              )}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}

                    {canComplete && (
                      <Button 
                        onClick={handleComplete} 
                        variant="outline"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                            Memproses...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Selesaikan
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Status Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Timeline Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium">Tiket Dibuat</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(borrowing.created_at), 'dd MMM yyyy HH:mm', { locale: id })}
                      </p>
                    </div>
                  </div>

                  {borrowing.approved_at && (
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium">Disetujui</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(borrowing.approved_at), 'dd MMM yyyy HH:mm', { locale: id })}
                        </p>
                        {borrowing.approved_by && (
                          <p className="text-xs text-muted-foreground">
                            oleh {borrowing.approved_by.name}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {borrowing.rejected_at && (
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium">Ditolak</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(borrowing.rejected_at), 'dd MMM yyyy HH:mm', { locale: id })}
                        </p>
                        {borrowing.approved_by && (
                          <p className="text-xs text-muted-foreground">
                            oleh {borrowing.approved_by.name}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* User Actions */}
            {(canEdit || canCancel) && (
              <Card>
                <CardHeader>
                  <CardTitle>Aksi Pengguna</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {canEdit && (
                      <Button asChild className="w-full">
                        <Link href={`/peminjaman/${borrowing.id}/edit`}>
                          Edit Tiket
                        </Link>
                      </Button>
                    )}
                    {canCancel && (
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={handleCancel}
                      >
                        Batalkan Tiket
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informasi Cepat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Durasi</p>
                  <p className="text-sm text-muted-foreground">
                    {Math.ceil((new Date(borrowing.end_time).getTime() - new Date(borrowing.start_time).getTime()) / (1000 * 60 * 60))} jam
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <Badge className={statusColors[borrowing.status]}>
                    {statusLabels[borrowing.status]}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 