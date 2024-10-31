<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Game>
 */
class GameFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'platform' => fake()->randomElement(['Xbox', 'PlayStation']),
            'console_generation' => fake()->randomElement(['Xbox Series X/S', 'Xbox One', 'PlayStation 5', 'PlayStation 4']),
            'title' => fake()->sentence(3),
            'developer' => fake()->company(),
            'publisher' => fake()->company(),
            'image' => fake()->imageUrl(261, 400, 'game', true),
            'slug' => fake()->slug(),
            'description' => fake()->paragraph(),
            'release_date' => fake()->date(),
            'price' => fake()->randomFloat(2, 10, 200),
            'stocks' => fake()->numberBetween(1, 100)
        ];
    }
}
