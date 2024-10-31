<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Cart/Index', []);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $gameId = $request->input('gameId');
        $gameQuantity = $request->input('gameQuantity');

        if ($request->user()) {
            $cart = $request->user()->carts()->where('game_id', '=', $gameId)->withoutCheckout()->first();

            if ($cart) {
                $newQuantity = $cart->quantity + $gameQuantity;
                $cart->update(['quantity' => $newQuantity]);
            } else {
                Game::find($gameId)->carts()->save(
                    Cart::make(
                        ['quantity' => $gameQuantity]
                    )->userOwner()->associate($request->user())
                );
            }
        } else {
            if ($request->session()->has('carts')) {
                $cartIds = $request->session()->get('carts');

                $cart = Cart::whereIn('id', $cartIds)->where('game_id', '=', $gameId)->withoutCheckout()->first();

                if ($cart) {
                    $newQuantity = $cart->quantity + $gameQuantity;
                    $cart->update(['quantity' => $newQuantity]);
                } else {
                    $cartId = Game::find($gameId)->carts()->create(['quantity' => $gameQuantity])->id;

                    $request->session()->push('carts', $cartId);
                    $request->session()->save();
                }
            } else {
                $cartId = Game::find($gameId)->carts()->create(['quantity' => $gameQuantity])->id;

                $request->session()->push('carts', $cartId);
                $request->session()->save();
            }
        }

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cart $cart)
    {
        $gameQuantity = $request->input('gameQuantity');

        if ($gameQuantity > 0) {
            $cart->update(['quantity' => $gameQuantity]);
        } else {
            $cartIds = $request->session()->pull('carts');
            if (($key = array_search($cart->id, $cartIds)) !== false) {
                unset($cartIds[$key]);

                if (!empty($cartIds)) {
                    $request->session()->put('carts', $cartIds);
                    $request->session()->save();
                }
            }
            $cart->deleteOrFail();
        }

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        if (!Auth::user()) {
            $cartIds = session('carts');
            if (($key = array_search($cart->id, $cartIds)) !== false) {
                unset($cartIds[$key]);

                if (!empty($cartIds)) {
                    session(['carts' => $cartIds]);
                }
            }
        }

        $cart->deleteOrFail();

        return redirect()->back();
    }
}
