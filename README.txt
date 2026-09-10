Hostinger Deploy Package
=======================

1. Upload semua file di folder ini ke root domain cPanel/Hostinger.
2. Import database dari folder database/pcs.sql.
3. Ganti data di hostinger-upload/config.php sesuai database Anda.
4. Setelah itu buka domain Anda untuk login.
5. API akan aktif di /api.

Contoh konfigurasi:

$db = [
  'host' => 'localhost',
  'name' => 'u1234567_pcs',
  'user' => 'u1234567_user',
  'pass' => 'password-anda',
  'charset' => 'utf8mb4',
];

API base URL:
https://domain-anda.com/api
