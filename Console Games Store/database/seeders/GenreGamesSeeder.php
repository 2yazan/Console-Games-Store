<?php

namespace Database\Seeders;

use App\Models\Game;
use App\Models\Genre;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class GenreGamesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $games = Game::paginate(5);
        // $genres = Genre::paginate(12);
        $games = Game::all();
        $genres = Genre::all();

        foreach ($games as $game) {
            DB::table('genre_games')->insert([
                'genre_id' => rand(1, 12),
                'game_id' => $game->id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }

        foreach ($genres as $genre) {
            DB::table('genre_games')->insert([
                'genre_id' => $genre->id,
                'game_id' => rand(1, 5),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
