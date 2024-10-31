<?php

namespace Database\Seeders;

use App\Models\Genre;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $genres = [
            ['name' => 'Action'],
            ['name' => 'Adventure'],
            ['name' => 'Role-Playing Game (RPG)'],
            ['name' => 'Simulation'],
            ['name' => 'Strategy'],
            ['name' => 'Sports'],
            ['name' => 'Racing'],
            ['name' => 'Horror'],
            ['name' => 'Puzzle'],
            ['name' => 'Fantasy'],
            ['name' => 'Science Fiction'],
            ['name' => 'Stealth'],
            ['name' => 'Platformer'],
            ['name' => 'Multiplayer Online Battle Arena (MOBA)'],
            ['name' => 'Battle Royale'],
            ['name' => 'Survival'],
        ];

        foreach ($genres as $value) {
            Genre::create($value);
        }
    }
}
