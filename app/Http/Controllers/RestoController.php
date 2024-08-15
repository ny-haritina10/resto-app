<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use Illuminate\Http\Request;

class RestoController extends Controller
{
    public function index()
    {
        return Restaurant::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'x' => 'required|numeric',
            'y' => 'required|numeric',
        ]);

        return Restaurant::create($request->all());
    }

    public function show($id)
    {
        return Restaurant::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
            'x' => 'required|numeric',
            'y' => 'required|numeric',
        ]);

        $resto = Restaurant::findOrFail($id);
        $resto->update($request->all());

        return $resto;
    }

    public function destroy($id)
    {
        $resto = Restaurant::findOrFail($id);
        $resto->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}