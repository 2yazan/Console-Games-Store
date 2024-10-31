<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function index()
    {
        return inertia('Landing', [
            'randomGames' => Game::inRandomOrder()->limit(10)->get()
        ]);
    }
}
