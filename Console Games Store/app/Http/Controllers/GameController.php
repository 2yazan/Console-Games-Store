<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Genre;
use Illuminate\Http\Request;

class GameController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = $request->only([
            'search', 'page', 'platform', 'genre', 'console_generation', 'publisher', 'price', 'sort'
        ]);

        return inertia('Game/Index', [
            'filters' => $filters,
            'genres' => Genre::orderBy('name', 'asc')->get(),
            'console_generation' => Game::select('console_generation')
                ->groupBy('console_generation')
                ->orderBy('console_generation', 'asc')
                ->get(),
            'publishers' => Game::select('publisher')
                ->groupBy('publisher')
                ->orderBy('publisher', 'asc')
                ->get(),
            'games' => Game::filter($filters)
                ->paginate(12)
                ->withQueryString()
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Game $game)
    {
        return inertia('Game/Show', [
            'game' => $game,
            'relatedGames' => Game::whereNot('id', '=', $game->id)
                ->where('platform', '=', $game->platform)
                ->inRandomOrder()
                ->limit(10)
                ->get()
        ]);
    }
}
