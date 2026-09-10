# Panduan Deploy Final ke Hostinger

## 1. Struktur file yang harus diupload
Upload folder berikut ke hosting Anda:
- [api](api)
- [PCS.html](PCS.html)
- [PSIKoTES.html](PSIKoTES.html)
- [database/pcs.sql](database/pcs.sql)
- [google-apps-script.gs](google-apps-script.gs) (opsional, backup Google Sheets)
- [hostinger-upload/setup-hostinger.php](hostinger-upload/setup-hostinger.php) (cek cepat)
- [hostinger-upload/config.env.example](hostinger-upload/config.env.example) (template konfigurasi)

## 2. Buat database MySQL di cPanel
1. Masuk ke cPanel Hostinger
2. Buat database baru
3. Buat user MySQL baru
4. Berikan hak penuh ke database tersebut
5. Import [database/pcs.sql](database/pcs.sql)

## 3. Konfigurasi database
Edit [api/config.php](api/config.php) dengan data Hostinger Anda.

Contoh target akhir:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'u1234567_pcs');
define('DB_USER', 'u1234567_user');
define('DB_PASS', 'password-anda');
define('DB_CHARSET', 'utf8mb4');
```

## 4. Set base URL API di frontend
Tambahkan ini sebelum script utama di [PCS.html](PCS.html) dan [PSIKoTES.html](PSIKoTES.html):

```html
<script>
  window.PCS_API_BASE = 'https://domain-anda.com/api';
</script>
```

## 5. Jalankan setup checker
Buka [hostinger-upload/setup-hostinger.php](hostinger-upload/setup-hostinger.php) di domain hosting Anda. File ini akan menampilkan:
- domain aktif
- URL API otomatis
- contoh script frontend siap copy-paste

## 6. Uji URL berikut
Setelah upload, URL berikut harus aktif:
- https://domain-anda.com/api/health.php
- https://domain-anda.com/api/auth.php
- https://domain-anda.com/api/users.php
- https://domain-anda.com/api/save.php
- https://domain-anda.com/api/load.php

## 7. Checklist produksi
- Login admin / verifier / konselor berhasil
- User dari database SQL bisa dipakai
- Semua data utama tersimpan ke server
- Hasil wawancara konselor tersimpan dengan benar
- Logout bersih tanpa error
- Data tidak bergantung pada browser localStorage sebagai sumber utama

## 8. Catatan penting
- Gunakan HTTPS
- `window.PCS_API_BASE` harus sesuai domain hosting Anda
- MySQL credential adalah satu-satunya nilai yang harus disesuaikan per akun hosting
- Google Sheets hanya untuk backup, bukan sumber utama

## 9. Copy-paste konfigurasi cepat
Contoh siap copy-paste untuk cPanel:

```php
<?php

define('DB_HOST', 'localhost');
define('DB_NAME', 'NAMA_DATABASE');
define('DB_USER', 'NAMA_USER_DATABASE');
define('DB_PASS', 'PASSWORD_DATABASE');
define('DB_CHARSET', 'utf8mb4');
```
