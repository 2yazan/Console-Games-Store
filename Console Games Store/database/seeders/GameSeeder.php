<?php

namespace Database\Seeders;

use App\Models\Game;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $games = [
            [
                'platform' => 'Xbox',
                'console_generation' => 'Xbox Series X/S',
                'title' => 'Halo Infinite',
                'slug' => strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', 'Halo Infinite'))),
                'description' => 'The Master Chief returns in Halo Infinite to confront a new threat.',
                'image' => 'halo_infinite.jpg',
                'developer' => '343 Industries',
                'publisher' => 'Xbox Game Studios',
                'release_date' => '2021-12-08',
                'price' => 59.99,
                'stocks' => 50
            ],
            [
                'platform' => 'PlayStation',
                'console_generation' => 'PlayStation 5',
                'title' => 'Demon\'s Souls',
                'slug' => strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', 'Demon\'s Souls'))),
                'description' => 'A remake of the classic action RPG that started it all.',
                'image' => 'demons_souls.jpg',
                'developer' => 'Bluepoint Games',
                'publisher' => 'Sony Interactive Entertainment',
                'release_date' => '2020-11-12',
                'price' => 69.99,
                'stocks' => 30
            ],
            [
                'platform' => 'Xbox',
                'console_generation' => 'Xbox One',
                'title' => 'Forza Horizon 5',
                'slug' => strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', 'Forza Horizon 5'))),
                'description' => 'Explore the vibrant world of Mexico in this thrilling racing game.',
                'image' => 'forza_horizon_5.jpg',
                'developer' => 'Playground Games',
                'publisher' => 'Xbox Game Studios',
                'release_date' => '2021-11-09',
                'price' => 59.99,
                'stocks' => 40
            ],
            [
                'platform' => 'PlayStation',
                'console_generation' => 'PlayStation 4',
                'title' => 'The Last of Us',
                'slug' => strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', 'The Last of Us'))),
                'description' => 'Experience the emotional journey of Ellie as she seeks revenge.',
                'image' => 'the_last_of_us.jpg',
                'developer' => 'Naughty Dog',
                'publisher' => 'Sony Interactive Entertainment',
                'release_date' => '2013-06-14',
                'price' => 39.99,
                'stocks' => 25
            ],
            [
                'platform' => 'Xbox',
                'console_generation' => 'Xbox Series X/S',
                'title' => 'Psychonauts 2',
                'slug' => strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', 'Psychonauts 2'))),
                'description' => 'Join Razputin as he uncovers the secrets of the mysterious organization known as the Psychonauts.',
                'image' => 'psychonauts_2.jpg',
                'developer' => 'Double Fine Productions',
                'publisher' => 'Xbox Game Studios',
                'release_date' => '2021-08-25',
                'price' => 49.99,
                'stocks' => 60
            ],
            
        ];

        foreach ($games as $value) {
            Game::create($value);
        }
    }
}
