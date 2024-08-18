<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\DishController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/map', [RestaurantController::class, 'index'])->name('restaurants.index');
    Route::post('/restaurants', [RestaurantController::class, 'store'])->name('restaurants.store');

    Route::get('/resto', [RestaurantController::class, 'restoIndex'])->name('resto.index');

    Route::get('restaurants/{restaurant}/dishes', [DishController::class, 'index'])->name('dishes.index');
    Route::post('restaurants/{restaurant}/dishes', [DishController::class, 'store'])->name('dishes.store');
    Route::get('dishes/{dish}', [DishController::class, 'show'])->name('dishes.show');
    Route::put('dishes/{dish}', [DishController::class, 'update'])->name('dishes.update');
    Route::delete('dishes/{dish}', [DishController::class, 'destroy'])->name('dishes.destroy');
});

Route::get('/client', [ClientController::class,'index'])->name('client.index');

require __DIR__.'/auth.php';
