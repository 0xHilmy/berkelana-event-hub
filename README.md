# 🎯 Berkelana - Sistem Presensi QR Code

Sistem presensi modern dengan QR code untuk event, conference, atau kompetisi. Peserta scan QR code mereka, admin verifikasi, dan data otomatis masuk Google Sheets.

---

## ✨ Fitur Utama

### 🎫 Untuk Peserta
- ✅ Buka link unik dengan ID masing-masing
- ✅ Lihat info lengkap: Nama, Seat, Category
- ✅ Generate QR code personal untuk presensi
- ✅ Cek status presensi real-time
- ✅ Anti duplikasi - tidak bisa presensi 2x

### 👨‍💼 Untuk Admin
- ✅ Login secure dengan environment variables
- ✅ Scan QR code peserta dengan kamera device
- ✅ Verifikasi dan catat kehadiran
- ✅ Cek duplikasi otomatis
- ✅ Feedback detail (nama, seat) setelah scan
- ✅ Data langsung masuk Google Sheets

### 📊 Data Management
- ✅ Master data peserta di Google Sheets
- ✅ Record presensi terpisah
- ✅ Timestamp otomatis
- ✅ Export-ready untuk analisis
- ✅ Real-time sync

---

## 🚀 Quick Start

### 1. Install & Run
```bash
npm install
npm run dev
```

### 2. Setup Admin
Edit `.env`:
```env
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=your_password
```

### 3. Setup Google Sheets
- Buat 2 sheets: "Participants" dan "Attendance"
- Copy script dari `GOOGLE_APPS_SCRIPT.md`
- Deploy as Web App
- Update URL di kode

### 4. Akses Aplikasi
- **Peserta**: `http://localhost:8080/?id=vip001`
- **Admin**: `http://localhost:8080/admin/login`

---

## 📖 Dokumentasi Lengkap

| File | Deskripsi |
|------|-----------|
| [QUICK_START.md](QUICK_START.md) | Setup dalam 5 menit |
| [ATTENDANCE_FLOW.md](ATTENDANCE_FLOW.md) | Alur lengkap sistem presensi |
| [GOOGLE_APPS_SCRIPT.md](GOOGLE_APPS_SCRIPT.md) | Script & setup Google Sheets |
| [ADMIN_SETUP.md](ADMIN_SETUP.md) | Konfigurasi admin & keamanan |
| [FITUR_BARU.md](FITUR_BARU.md) | Anti duplikasi & info peserta |
| [SAMPLE_PARTICIPANTS.md](SAMPLE_PARTICIPANTS.md) | Contoh data & template pesan |

---

## 🎯 Cara Kerja

### Flow Presensi:

```
1. PESERTA
   ↓
   Buka link: /?id=vip001
   ↓
   Lihat info: "Hello, John Doe! Your seat: A-01"
   ↓
   Klik "Attend Event"
   ↓
   QR Code muncul

2. ADMIN
   ↓
   Login ke dashboard
   ↓
   Klik "Mulai Scan QR Code"
   ↓
   Scan QR peserta
   ↓
   Klik "Catat Kehadiran"
   ↓
   ✓ Data masuk Google Sheets

3. SISTEM
   ↓
   Cek duplikasi
   ↓
   Validasi ID
   ↓
   Ambil data dari Participants
   ↓
   Insert ke Attendance
   ↓
   Return success + info peserta
```

---

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **UI**: Tailwind CSS + shadcn/ui
- **QR Code**: react-qr-code (generate) + html5-qrcode (scan)
- **Backend**: Google Apps Script
- **Database**: Google Sheets
- **Auth**: Session-based (sessionStorage)

---

## 📊 Struktur Data

### Sheet "Participants" (Master Data)
```
| id       | name       | seat | category |
|----------|------------|------|----------|
| vip001   | John Doe   | A-01 | VIP      |
| vip002   | Jane Smith | A-02 | VIP      |
```

### Sheet "Attendance" (Record Presensi)
```
| id     | name     | seat | attendance | date time           |
|--------|----------|------|------------|---------------------|
| vip001 | John Doe | A-01 | hadir      | 2025-01-19 10:30:00 |
```

---

## 🔐 Keamanan

### Environment Variables
- Kredensial admin di `.env` (tidak di-commit)
- Password bisa diubah tanpa edit kode
- Best practice untuk production

### Session-based Auth
- Login required untuk admin dashboard
- Session tersimpan di sessionStorage
- Auto-redirect jika belum login

### Anti Duplikasi
- Validasi di backend (Google Apps Script)
- Cek di frontend (disable button)
- Lock mechanism untuk concurrent requests

---

## 📱 Mobile-Friendly

- ✅ Responsive design untuk semua device
- ✅ QR scanner works di mobile browser
- ✅ Touch-friendly buttons
- ✅ Optimized untuk smartphone

---

## 🎨 Screenshots

### Halaman Peserta
```
┌─────────────────────────────────┐
│     Berkelana.                  │
│                                 │
│  Hello, John Doe!               │
│  Your seat: A-01                │
│  Category: VIP                  │
│                                 │
│  [  Attend Event  ]             │
└─────────────────────────────────┘
```

### QR Code Peserta
```
┌─────────────────────────────────┐
│     John Doe                    │
│     Seat: A-01                  │
│                                 │
│  ┌─────────────────┐            │
│  │  █▀▀▀▀▀█ ▄▀█   │            │
│  │  █ ███ █ ██▀   │            │
│  │  █ ▀▀▀ █ █▄    │            │
│  │  ▀▀▀▀▀▀▀ ▀ ▀   │            │
│  └─────────────────┘            │
│                                 │
│  ID: vip001                     │
│  [    Kembali    ]              │
└─────────────────────────────────┘
```

### Admin Dashboard
```
┌─────────────────────────────────┐
│  Admin Dashboard      [Logout]  │
│                                 │
│  ✓ Kehadiran berhasil dicatat!  │
│    Nama: John Doe               │
│    Seat: A-01                   │
│                                 │
│  ┌─ Scan QR Code Peserta ─┐    │
│  │                         │    │
│  │  [Mulai Scan QR Code]   │    │
│  │                         │    │
│  └─────────────────────────┘    │
└─────────────────────────────────┘
```

---

## 🧪 Testing Checklist

- [ ] Peserta buka link → Info muncul
- [ ] Peserta klik button → QR muncul
- [ ] Admin scan QR → ID terdeteksi
- [ ] Admin submit → Data masuk Sheets
- [ ] Peserta refresh → Status "sudah presensi"
- [ ] Coba presensi lagi → Error duplikasi
- [ ] Data tidak duplikat di Sheets
- [ ] Mobile responsive works
- [ ] QR scanner works di mobile

---

## 🐛 Troubleshooting

### Peserta: "ID tidak ditemukan"
- Cek ID ada di sheet "Participants"
- Cek URL parameter `?id=` benar
- Refresh halaman

### Admin: "Scan tidak berhasil"
- Pastikan izin kamera sudah diberikan
- Cek pencahayaan ruangan
- Gunakan mobile phone jika laptop tidak work

### "Data tidak masuk Google Sheets"
- Cek URL Google Apps Script sudah benar
- Cek script sudah di-deploy
- Cek permission script (Execute as: Me, Access: Anyone)

---

## 📦 Project Structure

```
berkelana/
├── src/
│   ├── pages/
│   │   ├── Index.tsx          # Halaman peserta
│   │   ├── Admin.tsx          # Dashboard admin
│   │   └── AdminLogin.tsx     # Login admin
│   ├── components/ui/         # UI components
│   └── App.tsx                # Routing
├── .env                       # Kredensial admin
├── .env.example               # Template env
├── QUICK_START.md             # Quick start guide
├── ATTENDANCE_FLOW.md         # Flow lengkap
├── GOOGLE_APPS_SCRIPT.md      # Script & setup
├── ADMIN_SETUP.md             # Setup admin
├── FITUR_BARU.md              # Fitur anti duplikasi
└── SAMPLE_PARTICIPANTS.md     # Sample data
```

---

## 🤝 Contributing

Contributions welcome! Silakan buat issue atau pull request.

---

## 📄 License

MIT License - Feel free to use for your events!

---

## 💬 Support

Butuh bantuan? Lihat dokumentasi lengkap di folder docs atau buat issue.

---

## 🎉 Credits

Built with ❤️ for Berkelana Event

**Tech Stack:**
- React + TypeScript
- Tailwind CSS + shadcn/ui
- Google Apps Script
- html5-qrcode

---

## 🚀 Next Steps

1. ✅ Setup Google Sheets (lihat GOOGLE_APPS_SCRIPT.md)
2. ✅ Update URL di kode
3. ✅ Test dengan ID dummy
4. ✅ Siapkan data peserta
5. ✅ Bagikan link ke peserta
6. ✅ Ready untuk event!

**Happy Event! 🎊**
