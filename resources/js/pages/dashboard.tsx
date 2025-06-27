import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, Building, Package, Users, ClipboardList } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { auth, role, totalUsers, totalRooms, totalInfrastructures, totalBorrowings, recentBorrowings, myBorrowings, myBorrowingsCount } = usePage().props as any;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <h1 className="text-2xl font-bold mb-2">Selamat datang, {auth.user.name}</h1>
                {role === 'admin' ? (
                    <>
                        <div className="grid gap-4 md:grid-cols-4 mb-6">
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-3">
                                    <Users className="w-6 h-6 text-blue-600" />
                                    <div>
                                        <CardTitle className="text-lg">Total Pengguna</CardTitle>
                                        <CardDescription className="text-2xl font-bold">{totalUsers}</CardDescription>
                                    </div>
                                </CardHeader>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-3">
                                    <Building className="w-6 h-6 text-green-600" />
                                    <div>
                                        <CardTitle className="text-lg">Total Ruangan</CardTitle>
                                        <CardDescription className="text-2xl font-bold">{totalRooms}</CardDescription>
                                    </div>
                                </CardHeader>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-3">
                                    <Package className="w-6 h-6 text-yellow-600" />
                                    <div>
                                        <CardTitle className="text-lg">Total Infrastruktur</CardTitle>
                                        <CardDescription className="text-2xl font-bold">{totalInfrastructures}</CardDescription>
                                    </div>
                                </CardHeader>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-3">
                                    <ClipboardList className="w-6 h-6 text-purple-600" />
                                    <div>
                                        <CardTitle className="text-lg">Total Peminjaman</CardTitle>
                                        <CardDescription className="text-2xl font-bold">{totalBorrowings}</CardDescription>
                                    </div>
                                </CardHeader>
                            </Card>
                        </div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Riwayat Peminjaman Terbaru</CardTitle>
                                <CardDescription>5 peminjaman terakhir</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-2 text-left">No Tiket</th>
                                                <th className="px-4 py-2 text-left">Nama</th>
                                                <th className="px-4 py-2 text-left">Item</th>
                                                <th className="px-4 py-2 text-left">Tujuan</th>
                                                <th className="px-4 py-2 text-left">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentBorrowings && recentBorrowings.length > 0 ? recentBorrowings.map((b: any) => (
                                                <tr key={b.id}>
                                                    <td className="px-4 py-2">{b.ticket_number}</td>
                                                    <td className="px-4 py-2">{b.user?.name}</td>
                                                    <td className="px-4 py-2">{b.borrowable?.name || b.borrowable?.item_name}</td>
                                                    <td className="px-4 py-2">{b.purpose}</td>
                                                    <td className="px-4 py-2">{b.status}</td>
                                                </tr>
                                            )) : (
                                                <tr><td colSpan={5} className="text-center px-4 py-2">Tidak ada data</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </>
                ) : (
                    <>
                        <div className="grid gap-4 md:grid-cols-2 mb-6">
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-3">
                                    <ClipboardList className="w-6 h-6 text-purple-600" />
                                    <div>
                                        <CardTitle className="text-lg">Total Tiket Saya</CardTitle>
                                        <CardDescription className="text-2xl font-bold">{myBorrowingsCount}</CardDescription>
                                    </div>
                                </CardHeader>
                            </Card>
                        </div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Riwayat Peminjaman Saya</CardTitle>
                                <CardDescription>5 peminjaman terakhir</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-2 text-left">No Tiket</th>
                                                <th className="px-4 py-2 text-left">Item</th>
                                                <th className="px-4 py-2 text-left">Tujuan</th>
                                                <th className="px-4 py-2 text-left">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {myBorrowings && myBorrowings.length > 0 ? myBorrowings.map((b: any) => (
                                                <tr key={b.id}>
                                                    <td className="px-4 py-2">{b.ticket_number}</td>
                                                    <td className="px-4 py-2">{b.borrowable?.name || b.borrowable?.item_name}</td>
                                                    <td className="px-4 py-2">{b.purpose}</td>
                                                    <td className="px-4 py-2">{b.status}</td>
                                                </tr>
                                            )) : (
                                                <tr><td colSpan={4} className="text-center px-4 py-2">Tidak ada data</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>
        </AppLayout>
    );
}
