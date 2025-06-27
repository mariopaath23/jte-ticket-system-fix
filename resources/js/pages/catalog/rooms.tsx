import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Users, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
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

interface RoomsProps {
  rooms: {
    data: Room[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
      url?: string;
      label: string;
      active: boolean;
    }>;
  };
  types: string[];
  filters: {
    query?: string;
    status?: string;
    type?: string;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Catalog',
    href: '/catalog',
  },
  {
    title: 'Rooms',
    href: '/catalog/rooms',
  },
];

export default function Rooms({ rooms, types, filters }: RoomsProps) {
  const [searchQuery, setSearchQuery] = useState(filters.query || '');
  const [selectedStatus, setSelectedStatus] = useState(filters.status || '');
  const [selectedType, setSelectedType] = useState(filters.type || '');

  const handleSearch = () => {
    const params: any = {};
    
    if (searchQuery.trim()) {
      params.query = searchQuery.trim();
    }
    
    if (selectedType) {
      params.type = selectedType;
    }
    
    if (selectedStatus) {
      params.status = selectedStatus;
    }
    
    router.get('/catalog/rooms', params, {
      preserveState: true,
      replace: true,
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('');
    setSelectedStatus('');
    router.get('/catalog/rooms', {}, {
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
      <Head title="Rooms Catalog" />
      
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className="mb-8">
          <Link 
            href="/catalog" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Catalog
          </Link>
          <h1 className="text-3xl font-bold mb-2">Rooms Catalog</h1>
          <p className="text-gray-600">Browse and search through all available rooms</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search rooms by name, location, or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
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

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {rooms.data.length} of {rooms.total} rooms
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

        {/* Pagination */}
        {rooms.last_page > 1 && (
          <div className="flex justify-center items-center gap-2">
            {rooms.current_page > 1 && (
              <Link
                href={`/catalog/rooms?page=${rooms.current_page - 1}`}
                className="inline-flex items-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Link>
            )}
            
            <span className="px-3 py-2 text-sm text-gray-600">
              Page {rooms.current_page} of {rooms.last_page}
            </span>
            
            {rooms.current_page < rooms.last_page && (
              <Link
                href={`/catalog/rooms?page=${rooms.current_page + 1}`}
                className="inline-flex items-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
} 