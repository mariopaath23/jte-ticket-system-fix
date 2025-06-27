import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, DollarSign, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
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

interface InventoryProps {
  inventories: {
    data: Inventory[];
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
  {
    title: 'Inventory',
    href: '/catalog/inventory',
  },
];

export default function Inventory({ inventories, categories, filters }: InventoryProps) {
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
    
    router.get('/catalog/inventory', params, {
      preserveState: true,
      replace: true,
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedStatus('');
    router.get('/catalog/inventory', {}, {
      preserveState: true,
      replace: true,
    });
  };

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
      <Head title="Inventory Catalog" />
      
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className="mb-8">
          <Link 
            href="/catalog" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Catalog
          </Link>
          <h1 className="text-3xl font-bold mb-2">Inventory Catalog</h1>
          <p className="text-gray-600">Browse and search through all inventory items</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search inventory by name, description, or category..."
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
                <SelectItem value="In Use">In Use</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Retired">Retired</SelectItem>
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
            Showing {inventories.data.length} of {inventories.total} items
          </p>
        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      ${item.purchase_price}
                    </p>
                  )}
                  {item.serial_number && (
                    <p className="text-sm text-gray-600">
                      S/N: {item.serial_number}
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

        {/* Pagination */}
        {inventories.last_page > 1 && (
          <div className="flex justify-center items-center gap-2">
            {inventories.current_page > 1 && (
              <Link
                href={`/catalog/inventory?page=${inventories.current_page - 1}`}
                className="inline-flex items-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Link>
            )}
            
            <span className="px-3 py-2 text-sm text-gray-600">
              Page {inventories.current_page} of {inventories.last_page}
            </span>
            
            {inventories.current_page < inventories.last_page && (
              <Link
                href={`/catalog/inventory?page=${inventories.current_page + 1}`}
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