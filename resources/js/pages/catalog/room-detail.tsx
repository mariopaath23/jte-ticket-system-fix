import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, MapPin, ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface Inventory {
  id: number;
  item_id: string;
  name: string;
  description?: string;
  category: string;
  status: string;
}

interface Room {
  id: number;
  room_id: string;
  name: string;
  image_url?: string;
  status: string;
  capacity?: number;
  location?: string;
  type?: string;
  furniture_available: boolean;
  display_available: boolean;
  audio_available: boolean;
  ac_available: boolean;
  inventories?: Inventory[];
}

interface RoomDetailProps {
  room: Room;
}

export default function RoomDetail({ room }: RoomDetailProps) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Catalog',
      href: '/catalog',
    },
    {
      title: 'Rooms',
      href: '/catalog/rooms',
    },
    {
      title: room.name,
      href: `/catalog/rooms/${room.room_id}`,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'occupied':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Room: ${room.name}`} />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <Link href="/catalog/rooms" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft className="h-4 w-4" />
          Back to Rooms
        </Link>
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold">{room.name}</CardTitle>
                <CardDescription className="flex items-center gap-1 mt-1">
                  <MapPin className="h-4 w-4" />
                  {room.location || 'No location specified'}
                </CardDescription>
              </div>
              <Badge className={getStatusColor(room.status)}>{room.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-700 mb-2">Type: <span className="font-medium">{room.type || '-'}</span></p>
                <p className="text-gray-700 mb-2 flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  Capacity: <span className="font-medium">{room.capacity || '-'}</span>
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {room.furniture_available && <Badge variant="secondary">Furniture</Badge>}
                  {room.display_available && <Badge variant="secondary">Display</Badge>}
                  {room.audio_available && <Badge variant="secondary">Audio</Badge>}
                  {room.ac_available && <Badge variant="secondary">AC</Badge>}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-xl font-semibold mb-4">Inventory in this Room</h2>
          {room.inventories && room.inventories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {room.inventories.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <CardDescription className="mt-1">{item.category}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                    <Link href={`/catalog/inventory/${item.item_id}`} className="mt-4 inline-block text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Details →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No inventory items found for this room.</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
} 