<?php
// File konfigurasi khusus untuk Hostinger / cPanel
// Gunakan ini sebagai file utama saat deploy ke hosting.
// Cukup ganti nilai berikut sesuai akun database Anda.

return [
    'db' => [
        'host' => 'localhost',
        'name' => 'NAMA_DATABASE',
        'user' => 'NAMA_USER_DATABASE',
        'pass' => 'PASSWORD_DATABASE',
        'charset' => 'utf8mb4',
    ],
    'api' => [
        'base_url' => 'https://domain-anda.com/api',
    ],
];
