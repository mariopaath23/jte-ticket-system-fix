import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, ArrowLeft, DollarSign } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface Room {
  id: number;
  room_id: string;
  name: string;
  location?: string;
}

interface Inventory {
  id: number;
  item_id: string;
  name: string;
  description?: string;
  category: string;
  status: string;
  location?: string;
  room_id?: string;
  image_url?: string;
  purchase_price?: number;
  purchase_date?: string;
  supplier?: string;
  serial_number?: string;
  room?: Room;
}

interface InventoryDetailProps {
  inventory: Inventory;
}

export default function InventoryDetail({ inventory }: InventoryDetailProps) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Catalog',
      href: '/catalog',
    },
    {
      title: 'Inventory',
      href: '/catalog/inventory',
    },
    {
      title: inventory.name,
      href: `/catalog/inventory/${inventory.item_id}`,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'in use':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'retired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Inventory: ${inventory.name}`} />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <Link href="/catalog/inventory" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft className="h-4 w-4" />
          Back to Inventory
        </Link>
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold">{inventory.name}</CardTitle>
                <CardDescription className="mt-1">{inventory.category}</CardDescription>
              </div>
              <Badge className={getStatusColor(inventory.status)}>{inventory.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {inventory.description && <p className="text-gray-700 mb-2">{inventory.description}</p>}
                {inventory.location && (
                  <p className="text-gray-700 mb-2 flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {inventory.location}
                  </p>
                )}
                {inventory.room && (
                  <p className="text-gray-700 mb-2">
                    Room: <Link href={`/catalog/rooms/${inventory.room.room_id}`} className="text-blue-600 hover:text-blue-800">{inventory.room.name}</Link>
                  </p>
                )}
                {inventory.purchase_price && (
                  <p className="text-gray-700 mb-2 flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    Price: ${inventory.purchase_price}
                  </p>
                )}
                {inventory.purchase_date && (
                  <p className="text-gray-700 mb-2">Purchased: {inventory.purchase_date}</p>
                )}
                {inventory.supplier && (
                  <p className="text-gray-700 mb-2">Supplier: {inventory.supplier}</p>
                )}
                {inventory.serial_number && (
                  <p className="text-gray-700 mb-2">Serial Number: {inventory.serial_number}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
} 