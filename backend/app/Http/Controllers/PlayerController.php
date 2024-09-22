<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\Request;

class PlayerController extends Controller
{
    // Fetch players with search, sorting, and pagination
    public function index(Request $request)
    {
        $query = Player::query();

        // Search by name, club, or nationality
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('name', 'LIKE', "%$search%")
                  ->orWhere('club', 'LIKE', "%$search%")
                  ->orWhere('nationality', 'LIKE', "%$search%");
        }

        // Sorting
        if ($request->has('sort_by')) {
            $sortBy = $request->input('sort_by');
            $sortOrder = $request->input('sort_order', 'asc'); // default is ascending
            $query->orderBy($sortBy, $sortOrder);
        }

        // Pagination
        $players = $query->paginate(10); // 10 players per page

        return response()->json($players);
    }

    // Get details of a specific player
    public function show($id)
    {
        return Player::findOrFail($id);
    }

    // Store a new player
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'birth_year' => 'required|integer|min:1900|max:' . date('Y'),
            'club' => 'required|string|max:255',
            'nationality' => 'required|string|max:255',
            'market_value' => 'required|numeric|min:0',
            'image_link' => 'nullable|url', // Image link validation
        ]);

        // Create player with image link
        $player = Player::create([
            'name' => $request->input('name'),
            'birth_year' => $request->input('birth_year'),
            'club' => $request->input('club'),
            'nationality' => $request->input('nationality'),
            'market_value' => $request->input('market_value'),
            'image_link' => $request->input('image_link'), // Store the image link
        ]);

        return response()->json($player, 201);
    }

    // Update an existing player
    public function update(Request $request, $id)
    {
    
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'birth_year' => 'sometimes|required|integer|min:1900|max:' . date('Y'),
            'club' => 'sometimes|required|string|max:255',
            'nationality' => 'sometimes|required|string|max:255',
            'market_value' => 'sometimes|required|numeric|min:0',
            'image_link' => 'nullable|url', // Image link is optional
        ]);
    
        $player = Player::findOrFail($id);
    
        // Update the player's details
        $player->update($request->only([
            'name',
            'birth_year',
            'club',
            'nationality',
            'market_value',
            'image_link'
        ]));
    
        return response()->json($player);
    }

    // Delete a player
    public function destroy($id)
{
    $player = Player::find($id);
    if (!$player) {
        return response()->json(['message' => 'Player not found'], 404);
    }
    
    $player->delete();
    
    return response()->json(['message' => 'Player deleted successfully'], 200);
}
}