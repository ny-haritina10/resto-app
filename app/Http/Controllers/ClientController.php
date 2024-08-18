<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restaurant;


class ClientController extends Controller
{
    public function index() {
        return inertia('Client', [
            'restaurants' => Restaurant::all()
        ]);
    }
}