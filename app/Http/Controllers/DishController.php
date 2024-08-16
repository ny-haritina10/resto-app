<?php

namespace App\Http\Controllers;

use App\Models\Dish;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class DishController extends Controller
{
    public function index($restaurantId)
    {
        $restaurant = Restaurant::findOrFail($restaurantId);
        $dishes = $restaurant->dishes; 

        return inertia('Dish', [
            'restaurant' => $restaurant,
            'initialDishes' => $dishes
        ]);
    }


    public function store(Request $request, $restaurantId)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
        ]);

        $restaurant = Restaurant::findOrFail($restaurantId);
        return $restaurant->dishes()->create($request->all());
    }

    public function show($id)
    {
        return Dish::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
        ]);

        $dish = Dish::findOrFail($id);
        $dish->update($request->all());

        return $dish;
    }

    public function destroy($id)
    {
        $dish = Dish::findOrFail($id);
        $dish->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}