<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('games', function (Blueprint $table) {
            $table->id();

            $table->enum('platform', ['Xbox', 'PlayStation']);
            $table->enum('console_generation', ['Xbox Series X/S', 'Xbox One', 'PlayStation 5', 'PlayStation 4']);

            $table->string('title', 255);
            $table->string('developer', 255);
            $table->string('publisher', 255);
            $table->string('image');
            $table->string('slug', 255)->unique();


            $table->text('description');

            $table->date('release_date');

            $table->float('price', 10, 2);

            $table->unsignedInteger('stocks');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
                