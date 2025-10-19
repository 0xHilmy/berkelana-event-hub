# Admin Setup Guide

## Konfigurasi Login Admin

### 1. Setup Environment Variables

Copy file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```

### 2. Edit Kredensial Admin

Buka file `.env` dan ubah username/password sesuai kebutuhan:
```env
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=berkelana2025
```

**PENTING:** 
- Jangan commit file `.env` ke repository
- Gunakan password yang kuat untuk production
- File `.env` sudah ditambahkan ke `.gitignore`

### 3. Akses Admin Dashboard

1. Buka browser dan akses: `http://localhost:8080/admin/login`
2. Login dengan kredensial dari file `.env`
3. Setelah login, Anda akan diarahkan ke dashboard admin

## Fitur Admin Dashboard

### QR Code Scanner
- Admin dapat scan QR code peserta menggunakan kamera device (mobile/laptop)
- Sistem otomatis mendeteksi ID peserta dari QR code
- Data kehadiran langsung tersimpan ke Google Sheets

### Cara Kerja Presensi (UPDATED)

**Flow Baru:**

1. **Peserta** membuka link dengan ID mereka
   - Contoh: `http://localhost:8080/?id=vip001`
   - Link ini bisa dibagikan via WhatsApp, email, dll

2. **Peserta** klik tombol "Attend Event"
   - QR code unik mereka akan muncul di layar
   - QR code berisi ID peserta (contoh: "vip001")

3. **Admin** di dashboard klik "Mulai Scan QR Code"
   - Gunakan kamera untuk scan QR code peserta
   - Bisa pakai mobile phone atau laptop dengan webcam

4. **Admin** klik "Catat Kehadiran"
   - Data otomatis tersimpan ke Google Sheets:
     - ID peserta (contoh: "vip001")
     - Status: "hadir"
     - Timestamp otomatis

**Keuntungan sistem ini:**
- ✅ Peserta tidak perlu install aplikasi
- ✅ Admin kontrol penuh atas presensi
- ✅ Mencegah fake attendance (harus scan langsung)
- ✅ Bisa pakai mobile phone untuk scan
- ✅ Real-time recording ke Google Sheets

## Keamanan

### Mengapa Pakai Environment Variables?

✅ **Keuntungan:**
- Kredensial tidak hardcode di kode
- Mudah diubah tanpa edit kode
- Lebih aman untuk production
- Tidak ter-commit ke Git

❌ **Alternatif yang TIDAK disarankan:**
- Hardcode username/password di kode
- Simpan di file JavaScript biasa
- Commit kredensial ke repository

### Tips Keamanan Production

1. **Gunakan password yang kuat**
   - Minimal 12 karakter
   - Kombinasi huruf, angka, simbol

2. **Ganti kredensial secara berkala**

3. **Untuk production yang lebih aman:**
   - Gunakan backend authentication (JWT, OAuth)
   - Implementasi rate limiting
   - Gunakan HTTPS
   - Tambahkan 2FA (Two-Factor Authentication)

## Troubleshooting

### Login tidak berhasil
- Pastikan file `.env` ada di root project
- Restart development server setelah edit `.env`
- Cek console browser untuk error

### QR Code tidak muncul
- Pastikan package `react-qr-code` sudah terinstall
- Jalankan: `npm install react-qr-code`

### Redirect ke login terus
- Clear sessionStorage browser
- Cek kredensial di `.env` sudah benar
