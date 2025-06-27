<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Inventory;

class InventorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $inventories = [
            [
                'item_id' => 'INV001',
                'name' => 'Projector Epson EX3260',
                'description' => 'High-quality projector for presentations and training sessions',
                'category' => 'Electronics',
                'status' => 'Available',
                'location' => 'Storage Room A',
                'room_id' => 'R001',
                'purchase_price' => 599.99,
                'purchase_date' => '2024-01-15',
                'supplier' => 'Tech Supplies Inc.',
                'serial_number' => 'EP-EX3260-2024-001',
            ],
            [
                'item_id' => 'INV002',
                'name' => 'Conference Table',
                'description' => 'Large oval conference table with seating for 20 people',
                'category' => 'Furniture',
                'status' => 'In Use',
                'location' => 'Conference Room A',
                'room_id' => 'R001',
                'purchase_price' => 2500.00,
                'purchase_date' => '2023-11-20',
                'supplier' => 'Office Furniture Co.',
                'serial_number' => 'CF-TBL-001',
            ],
            [
                'item_id' => 'INV003',
                'name' => 'Whiteboard 4x6',
                'description' => 'Magnetic whiteboard for presentations and brainstorming',
                'category' => 'Office Supplies',
                'status' => 'Available',
                'location' => 'Storage Room B',
                'room_id' => null,
                'purchase_price' => 299.99,
                'purchase_date' => '2024-02-10',
                'supplier' => 'Office Depot',
                'serial_number' => 'WB-4x6-2024-003',
            ],
            [
                'item_id' => 'INV004',
                'name' => 'Audio System Bose',
                'description' => 'Professional audio system for presentations and events',
                'category' => 'Electronics',
                'status' => 'In Use',
                'location' => 'Training Room C',
                'room_id' => 'R003',
                'purchase_price' => 899.99,
                'purchase_date' => '2023-12-05',
                'supplier' => 'Audio Solutions',
                'serial_number' => 'BOSE-AUD-2023-004',
            ],
            [
                'item_id' => 'INV005',
                'name' => 'Office Chairs (Set of 8)',
                'description' => 'Ergonomic office chairs for meeting rooms',
                'category' => 'Furniture',
                'status' => 'Available',
                'location' => 'Storage Room A',
                'room_id' => null,
                'purchase_price' => 2400.00,
                'purchase_date' => '2024-01-30',
                'supplier' => 'Office Furniture Co.',
                'serial_number' => 'CHR-SET-8-2024-005',
            ],
            [
                'item_id' => 'INV006',
                'name' => 'Laptop Dell Latitude',
                'description' => 'Business laptop for presentations and mobile work',
                'category' => 'Electronics',
                'status' => 'Maintenance',
                'location' => 'IT Department',
                'room_id' => null,
                'purchase_price' => 1299.99,
                'purchase_date' => '2023-10-15',
                'supplier' => 'Dell Technologies',
                'serial_number' => 'DELL-LAT-2023-006',
            ],
            [
                'item_id' => 'INV007',
                'name' => 'Coffee Machine',
                'description' => 'Commercial coffee machine for break rooms',
                'category' => 'Appliances',
                'status' => 'Available',
                'location' => 'Break Room',
                'room_id' => null,
                'purchase_price' => 799.99,
                'purchase_date' => '2024-03-01',
                'supplier' => 'Kitchen Equipment Co.',
                'serial_number' => 'COF-MCH-2024-007',
            ],
            [
                'item_id' => 'INV008',
                'name' => 'Display Monitor Samsung 55"',
                'description' => 'Large display monitor for presentations and digital signage',
                'category' => 'Electronics',
                'status' => 'In Use',
                'location' => 'Board Room F',
                'room_id' => 'R006',
                'purchase_price' => 899.99,
                'purchase_date' => '2023-09-20',
                'supplier' => 'Electronics Store',
                'serial_number' => 'SAMS-55-2023-008',
            ],
            [
                'item_id' => 'INV009',
                'name' => 'Filing Cabinet',
                'description' => '4-drawer filing cabinet for document storage',
                'category' => 'Furniture',
                'status' => 'Available',
                'location' => 'Storage Room B',
                'room_id' => null,
                'purchase_price' => 450.00,
                'purchase_date' => '2024-02-15',
                'supplier' => 'Office Furniture Co.',
                'serial_number' => 'FIL-CAB-2024-009',
            ],
            [
                'item_id' => 'INV010',
                'name' => 'Air Conditioner Unit',
                'description' => 'Portable air conditioning unit for temporary cooling',
                'category' => 'Appliances',
                'status' => 'Retired',
                'location' => 'Maintenance Storage',
                'room_id' => null,
                'purchase_price' => 599.99,
                'purchase_date' => '2022-06-10',
                'supplier' => 'HVAC Supplies',
                'serial_number' => 'AC-UNIT-2022-010',
            ],
        ];

        foreach ($inventories as $inventory) {
            Inventory::create($inventory);
        }
    }
}
