# Flow Presensi Berkelana

## 📱 Alur Lengkap Sistem Presensi

### 1️⃣ Persiapan (Admin)

**Admin Login:**
- Buka `http://localhost:8080/admin/login`
- Login dengan kredensial dari `.env`
- Masuk ke dashboard admin

**Siapkan Link untuk Peserta:**
- Setiap peserta punya link unik dengan ID mereka
- Format: `http://localhost:8080/?id=USERID`
- Contoh:
  - VIP: `http://localhost:8080/?id=vip001`
  - Regular: `http://localhost:8080/?id=regular001`

**Bagikan Link:**
- Kirim link via WhatsApp, email, atau SMS
- Setiap peserta dapat link berbeda sesuai ID mereka

---

### 2️⃣ Peserta Datang ke Event

**Peserta Buka Link:**
1. Peserta buka link yang diberikan di smartphone mereka
2. Halaman menampilkan ID mereka (contoh: "ID Anda: vip001")
3. Peserta klik tombol **"Attend Event"**
4. QR code unik muncul di layar smartphone mereka

**QR Code Peserta:**
- QR code berisi ID peserta
- Ukuran besar, mudah di-scan
- Peserta tunjukkan QR ini ke admin

---

### 3️⃣ Admin Scan QR Code

**Admin di Dashboard:**
1. Admin klik **"Mulai Scan QR Code"**
2. Kamera device terbuka (bisa mobile/laptop)
3. Arahkan kamera ke QR code peserta
4. Sistem otomatis deteksi ID peserta

**Catat Kehadiran:**
1. ID peserta muncul di layar (contoh: "vip001")
2. Admin klik **"Catat Kehadiran"**
3. Data tersimpan ke Google Sheets:
   - Kolom `id`: vip001
   - Kolom `attendance`: hadir
   - Kolom `date time`: timestamp otomatis
4. Pesan sukses muncul
5. Admin bisa langsung scan peserta berikutnya

---

## 🎯 Keuntungan Sistem Ini

### Untuk Admin:
✅ **Kontrol Penuh** - Admin yang catat kehadiran, bukan peserta
✅ **Anti-Fraud** - Peserta harus hadir fisik untuk di-scan
✅ **Cepat** - Scan QR hanya butuh 1-2 detik
✅ **Real-time** - Data langsung masuk Google Sheets
✅ **Mobile-Friendly** - Bisa pakai smartphone untuk scan

### Untuk Peserta:
✅ **Mudah** - Cukup buka link, klik button, tunjukkan QR
✅ **No Install** - Tidak perlu install aplikasi
✅ **Cepat** - Proses presensi < 5 detik
✅ **Jelas** - Lihat ID mereka di layar

---

## 🔧 Setup Google Sheets

### Struktur Kolom:
Pastikan Google Sheets punya kolom berikut (urutan bebas):

| id | attendance | date time |
|----|------------|-----------|
| vip001 | hadir | 2025-01-19 10:30:00 |
| vip002 | hadir | 2025-01-19 10:31:15 |

### Google Apps Script:
Script sudah otomatis:
- Baca parameter `id` dan `attendance` dari form
- Isi kolom `date time` dengan timestamp otomatis
- Tambah row baru di sheet "Attendance"

---

## 📱 Tips Penggunaan

### Untuk Admin:
1. **Gunakan Mobile Phone** untuk scan lebih mudah
2. **Pastikan Pencahayaan Cukup** saat scan
3. **Posisikan QR di Tengah Frame** kamera
4. **Scan Berurutan** untuk efisiensi
5. **Cek Google Sheets** berkala untuk memastikan data masuk

### Untuk Peserta:
1. **Buka Link Sebelum Datang** untuk cek ID
2. **Brightness Layar Maksimal** saat tunjukkan QR
3. **Tahan Layar Tetap Nyala** saat antri scan
4. **Screenshot QR** sebagai backup (opsional)

---

## 🚨 Troubleshooting

### QR Code Tidak Muncul (Peserta)
- Cek URL ada parameter `?id=`
- Refresh halaman
- Cek koneksi internet

### Scan Tidak Berhasil (Admin)
- Pastikan izin kamera sudah diberikan
- Cek pencahayaan ruangan
- Coba scan lebih dekat/jauh
- Gunakan device lain jika perlu

### Data Tidak Masuk Google Sheets
- Cek URL Google Apps Script sudah benar
- Pastikan script sudah di-deploy
- Cek kolom sheet sesuai (`id`, `attendance`, `date time`)
- Lihat console browser untuk error

---

## 📊 Monitoring Kehadiran

### Real-time di Google Sheets:
- Buka Google Sheets di tab lain
- Refresh untuk lihat data terbaru
- Filter/sort berdasarkan waktu atau ID
- Export ke Excel jika perlu

### Dashboard Admin:
- Pesan sukses muncul setiap scan berhasil
- ID peserta ditampilkan sebelum submit
- Bisa langsung scan peserta berikutnya

---

## 🎉 Best Practices

1. **Test Sebelum Event**
   - Test scan dengan beberapa ID dummy
   - Pastikan data masuk Google Sheets
   - Cek di berbagai device

2. **Siapkan Backup**
   - Print daftar peserta manual
   - Siapkan form backup jika sistem down

3. **Komunikasi Jelas**
   - Jelaskan flow ke peserta sebelum event
   - Pasang petunjuk di lokasi scan
   - Siapkan staff untuk bantu peserta

4. **Optimasi Antrian**
   - Siapkan beberapa device untuk scan
   - Buat jalur antrian yang jelas
   - Minta peserta siapkan QR sebelum antri
