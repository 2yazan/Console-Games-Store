<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Game extends Model
{
    use HasFactory;

    protected $fillable = ['platform', 'console_generation', 'title', 'developer', 'publisher', 'image', 'slug', 'description', 'release_date', 'price', 'stocks'];

    protected $sortable = ['price,asc', 'price,desc', 'title,asc', 'title,desc'];

    public function genres(): BelongsToMany
    {
        return $this->belongsToMany(Genre::class, 'genre_games');
    }

    public function carts(): HasMany
    {
        return $this->hasMany(Cart::class, 'game_id');
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class, 'game_id');
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function scopeFilter(Builder $query, array $filters): Builder
    {
        return $query->when(
            $filters['search'] ?? false,
            fn ($query, $value) => $query->where(function ($query) use ($value) {
                $query->where('title', 'LIKE', '%' . $value . '%')
                      ->orWhere('publisher', 'LIKE', '%' . $value . '%');
            })
        )->when(
            $filters['platform'] ?? false,
            fn ($query, $value) => $query->whereIn('platform', explode(',', $value))
        )->when(
            $filters['console_generation'] ?? false,
            fn ($query, $value) => $query->where('console_generation', $value)
        )->when(
            $filters['genre'] ?? false,
            fn ($query, $value) => $query->whereHas('genres', function ($query) use ($value) {
                $query->whereIn('name', explode(',', $value));
            })
        )->when(
            $filters['publisher'] ?? false,
            fn ($query, $value) => $query->whereIn('publisher', explode(',', $value))
        )->when(
            $filters['price'] ?? false,
            fn ($query, $value) => $query->where(function ($query) use ($value) {
                $ranges = explode(',', $value);
                foreach ($ranges as $range) {
                    $rangeArray = explode('-', $range);
                    $query->orWhere(function ($query) use ($rangeArray) {
                        $query->where('price', '>=', $rangeArray[0])
                              ->where('price', '<', $rangeArray[1]);
                    });
                }
            })
        )->when(
            !array_key_exists('sort', $filters) ?? false,
            fn ($query) => $query->orderBy('created_at', 'desc')
        )->when(
            $filters['sort'] ?? false,
            function ($query, $value) {
                $sortArr = explode(',', $value);
                if (in_array($value, $this->sortable)) {
                    $query->orderBy($sortArr[0], $sortArr[1]);
                }
            }
        );
    }
}
