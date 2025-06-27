import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Users, Calendar } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

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
  inventories_count?: number;
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
  room?: Room;
}

interface CatalogIndexProps {
  rooms: {
    data: Room[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  inventories: {
    data: Inventory[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  categories: string[];
  filters: {
    query?: string;
    category?: string;
    status?: string;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Catalog',
    href: '/catalog',
  },
];

export default function CatalogIndex({ rooms, inventories, categories, filters }: CatalogIndexProps) {
  const [searchQuery, setSearchQuery] = useState(filters.query || '');
  const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
  const [selectedStatus, setSelectedStatus] = useState(filters.status || '');

  const handleSearch = () => {
    const params: any = {};
    
    if (searchQuery.trim()) {
      params.query = searchQuery.trim();
    }
    
    if (selectedCategory) {
      params.category = selectedCategory;
    }
    
    if (selectedStatus) {
      params.status = selectedStatus;
    }
    
    router.get('/catalog', params, {
      preserveState: true,
      replace: true,
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedStatus('');
    router.get('/catalog', {}, {
      preserveState: true,
      replace: true,
    });
  };

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
      <Head title="Catalog" />
      
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Catalog</h1>
          <p className="text-gray-600">Browse rooms and inventory items</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search rooms and inventory..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Occupied">Occupied</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSearch} className="w-full sm:w-auto">
              Search
            </Button>
            <Button 
              onClick={clearFilters} 
              variant="outline" 
              className="w-full sm:w-auto"
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Rooms Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Rooms ({rooms.total})</h2>
            <Link href="/catalog/rooms" className="text-blue-600 hover:text-blue-800">
              View All Rooms →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.data.map((room) => (
              <Card key={room.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{room.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="h-4 w-4" />
                        {room.location || 'No location specified'}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(room.status)}>
                      {room.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {room.type && (
                      <p className="text-sm text-gray-600">Type: {room.type}</p>
                    )}
                    {room.capacity && (
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        Capacity: {room.capacity}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {room.furniture_available && (
                        <Badge variant="secondary" className="text-xs">Furniture</Badge>
                      )}
                      {room.display_available && (
                        <Badge variant="secondary" className="text-xs">Display</Badge>
                      )}
                      {room.audio_available && (
                        <Badge variant="secondary" className="text-xs">Audio</Badge>
                      )}
                      {room.ac_available && (
                        <Badge variant="secondary" className="text-xs">AC</Badge>
                      )}
                    </div>
                  </div>
                  <Link
                    href={`/catalog/rooms/${room.room_id}`}
                    className="mt-4 inline-block text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Inventory Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Inventory ({inventories.total})</h2>
            <Link href="/catalog/inventory" className="text-blue-600 hover:text-blue-800">
              View All Inventory →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inventories.data.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {item.category}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {item.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    {item.location && (
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {item.location}
                      </p>
                    )}
                    {item.room && (
                      <p className="text-sm text-gray-600">
                        Room: {item.room.name}
                      </p>
                    )}
                    {item.purchase_price && (
                      <p className="text-sm text-gray-600">
                        Price: ${item.purchase_price}
                      </p>
                    )}
                  </div>
                  <Link
                    href={`/catalog/inventory/${item.item_id}`}
                    className="mt-4 inline-block text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 