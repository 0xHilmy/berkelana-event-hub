# 🚀 Quick Start - Sistem Presensi Berkelana

## Setup (5 menit)

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
# File .env sudah ada, edit jika perlu
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=berkelana2025
```

### 3. Jalankan Development Server
```bash
npm run dev
```

### 4. Akses Aplikasi
- **Halaman Utama**: http://localhost:8080/
- **Admin Login**: http://localhost:8080/admin/login
- **Admin Dashboard**: http://localhost:8080/admin (setelah login)

---

## 🎯 Cara Pakai (Simple)

### Untuk Admin:

1. **Login Admin**
   - Buka: http://localhost:8080/admin/login
   - Username: `admin`
   - Password: `berkelana2025`

2. **Scan QR Peserta**
   - Klik "Mulai Scan QR Code"
   - Arahkan kamera ke QR peserta
   - Klik "Catat Kehadiran"
   - Sistem otomatis cek duplikasi
   - Done! ✅

### Untuk Peserta:

1. **Buka Link dengan ID**
   - Contoh: http://localhost:8080/?id=vip001
   - Lihat info: Nama, Seat, Status presensi

2. **Klik "Attend Event"**
   - QR code muncul dengan info peserta
   - Jika sudah presensi, button disabled

3. **Tunjukkan ke Admin**
   - Admin scan QR
   - Kehadiran tercatat! ✅

---

## 📋 Checklist Setup Google Sheets

- [ ] Buat Google Sheet baru
- [ ] Buat sheet "Attendance" dengan kolom: `id`, `name`, `seat`, `attendance`, `date time`
- [ ] Buat sheet "Participants" dengan kolom: `id`, `name`, `seat`, `category`
- [ ] Isi data peserta di sheet "Participants"
- [ ] Buka Tools → Script Editor
- [ ] Copy-paste Google Apps Script (lihat GOOGLE_APPS_SCRIPT.md)
- [ ] Run function `initialSetup`
- [ ] Deploy as Web App (Execute as: Me, Access: Anyone)
- [ ] Copy URL dan update di:
  - [ ] `src/pages/Admin.tsx` (line ~88)
  - [ ] `src/pages/Index.tsx` (line ~30)

---

## 🔗 Link Penting

- **Dokumentasi Lengkap**: ATTENDANCE_FLOW.md
- **Setup Admin**: ADMIN_SETUP.md
- **Google Sheets Script**: Lihat di ADMIN_SETUP.md

---

## ⚡ Tips Cepat

- Gunakan **mobile phone** untuk scan QR (lebih mudah)
- **Brightness maksimal** di layar peserta saat scan
- **Pencahayaan cukup** untuk scan lancar
- Test dulu dengan ID dummy sebelum event

---

## 🆘 Butuh Bantuan?

Lihat troubleshooting di ATTENDANCE_FLOW.md atau hubungi developer.
