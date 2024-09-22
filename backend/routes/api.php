<?php

use App\Http\Controllers\PlayerController;
use Illuminate\Support\Facades\Route;

// Define API routes
Route::get('/players', [PlayerController::class, 'index']); // List all players
Route::get('/players/{id}', [PlayerController::class, 'show']); // Show a specific player by ID
Route::post('/players', [PlayerController::class, 'store']); // Create a new player
Route::put('/players/{id}', [PlayerController::class, 'update']); // Update an existing player
Route::delete('/players/{id}', [PlayerController::class, 'destroy']); // Delete a player