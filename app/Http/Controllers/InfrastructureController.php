<?php

namespace App\Http\Controllers;

use App\Models\Infrastructure;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InfrastructureController extends Controller
{
    public function index()
    {
        $infrastructures = Infrastructure::all();
        
        return response()->json($infrastructures);
    }

    public function getForStatus()
    {
        $infrastructures = Infrastructure::all()->map(function ($infrastructure) {
            return [
                'id' => $infrastructure->id,
                'itemName' => $infrastructure->item_name,
                'category' => $infrastructure->category,
                'location' => $infrastructure->location,
                'isAvailable' => $infrastructure->is_available,
                'timeFrame' => $infrastructure->time_frame,
                'description' => $infrastructure->description,
            ];
        });

        return response()->json($infrastructures);
    }
}
