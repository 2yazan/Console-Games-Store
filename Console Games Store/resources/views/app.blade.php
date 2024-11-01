<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">


        <!-- Favicon -->
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <!-- Open Graph / Facebook -->
        <meta property="og:platform" content="website">
        <meta property="og:url" content="{{ env('APP_URL') }}">
        <meta property="og:title" content="Game Store — Online Game E-commerce">
        <meta property="og:description" content="Buy games online from the No. 1 Online Gamestore in Malaysia! Enjoy fast & free shipping with min. spend, game deals & exclusive discounts.">
        <meta property="og:image" content="{{ env('APP_URL') }}/social-preview.png">

        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="{{ env('APP_URL') }}">
        <meta property="twitter:title" content="Game Store — Online Game E-commerce">
        <meta property="twitter:description" content="Buy games online from the No. 1 Online Gamestore in Malaysia! Enjoy fast & free shipping with min. spend, game deals & exclusive discounts.">
        <meta property="twitter:image" content="{{ env('APP_URL') }}/social-preview.png">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
