<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Order/Index', [
            'orders' => Auth::user()->orders()->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Get user info
        $user = $request->user();

        // Get list of user's cart items
        $cart_items = $request->user()->carts()->withoutCheckout()->with('gameOwner')->get();

        // Calculate subtotal
        $subtotal = 0;
        foreach ($cart_items as $cart_item) {
            $subtotal += ($cart_item->quantity * $cart_item->gameOwner->price);
        }

        // Calculate total
        $total = $subtotal + 10;

        // Create order
        $order_id = $request->user()->orders()->create(
            array_merge(
                $request->validate(
                    [
                        'shipping_name' => 'required|max:255',
                        'shipping_phone' => 'required|max:15',
                        'shipping_address' => 'required|max:255',
                        'shipping_city' => 'required|max:255',
                        'shipping_postal_code' => 'required|numeric',
                        'shipping_state' => 'required|max:255',
                        'shipping_country' => 'required'
                    ],
                    [
                        'shipping_postal_code.required' => 'The postal code field is required',
                        'shipping_postal_code.numeric' => 'The postal code field is must be a number'
                    ]
                ),
                [
                    'shipping' => 10,
                    'subtotal' => $subtotal,
                    'total' => $total
                ]
            )
        )->id;

        // Update order no
        $order_no = date('Ym') . str_pad($order_id, 7, "0", STR_PAD_LEFT);
        Order::where('id', $order_id)->update(['order_no' => $order_no]);

        // Create order items, update cart item as checked out & update game stocks quantity
        foreach ($cart_items as $cart_item) {
            // Create order items
            Order::where('id', $order_id)->first()->orderItems()->save(
                OrderItem::make(
                    [
                        'quantity' => $cart_item->quantity,
                        'price' => $cart_item->gameOwner->price
                    ]
                )->game()->associate($cart_item->gameOwner)
            );

            // Update cart item as checked out
            $cart_item->update([
                'checkout_at' => now()
            ]);

            // Update game stocks quantity
            $cart_item->gameOwner()->update([
                'stocks' => $cart_item->gameOwner->stocks - $cart_item->quantity
            ]);
        }

        // Check if there any default address
        $default_address_exist = $request->user()->addresses()->where('default', '=', 'yes')->first();

        // Check if new address
        $address_input = $request->input('address_index');
        if ($address_input == 'New Address') {
            $request->user()->addresses()->create([
                'name' => $request->input('shipping_name'),
                'phone' => $request->input('shipping_phone'),
                'address' => $request->input('shipping_address'),
                'city' => $request->input('shipping_city'),
                'postal_code' => $request->input('shipping_postal_code'),
                'state' => $request->input('shipping_state'),
                'country' => $request->input('shipping_country'),
                'default' => $default_address_exist ? 'no' : 'yes'
            ]);
        }

        // Set bill data
        $bill_data = [

            'billName' => 'Game Order',
            'billDescription' => 'Game Order No. ' . $order_no,
            'billPriceSetting' => 1,
            'billPayorInfo' => 1,
            'billAmount' => round($total, 2) * 100,
            'billReturnUrl' => env('APP_URL') . '/payment-return',
            'billCallbackUrl' => env('APP_URL') . '/payment-callback',
            'billExternalReferenceNo' => $order_id,
            'billTo' => $user->name,
            'billEmail' => $user->email,
            'billPhone' => $user->phone,
            'billSplitPayment' => 0,
            'billSplitPaymentArgs' => '',
            'billPaymentChannel' => 0,
            'billContentEmail' => 'Thank you for purchasing our product!',
            'billChargeToCustomer' => 0,
            'billExpiryDate' => '',
            'billExpiryDays' => ''
        ];

    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        return inertia('Order/Show', [
            'order' => $order,
            'order_items' => $order->orderItems()->with('game')->get()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        // Get user info
        $user = $request->user();

        // Set bill data
        $bill_data = [

            'billName' => 'Game Order',
            'billDescription' => 'Game Order No. ' . $order->order_no,
            'billPriceSetting' => 1,
            'billPayorInfo' => 1,
            'billAmount' => round($order->total, 2) * 100,
            'billReturnUrl' => env('APP_URL') . '/payment-return',
            'billCallbackUrl' => env('APP_URL') . '/payment-callback',
            'billExternalReferenceNo' => $order->id,
            'billTo' => $user->name,
            'billEmail' => $user->email,
            'billPhone' => $user->phone,
            'billSplitPayment' => 0,
            'billSplitPaymentArgs' => '',
            'billPaymentChannel' => 0,
            'billContentEmail' => 'Thank you for purchasing our product!',
            'billChargeToCustomer' => 0,
            'billExpiryDate' => '',
            'billExpiryDays' => ''
        ];
    }
}
