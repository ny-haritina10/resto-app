<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use App\Models\Resto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

use Inertia\Inertia;

class RestaurantController extends Controller
{

    public function index()
    {
        $restaurants = Restaurant::all();
        return inertia('Map', ['restaurants' => $restaurants]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'x' => 'required|numeric',
            'y' => 'required|numeric',
        ]);

        Restaurant::create($validated);
        return Redirect::route('restaurants.index')->with('success', 'Restaurant added successfully.');
    }

    public function restoIndex()
    {
        return Inertia::render('Resto');            /* point to resources/js/Pages */
    }
}