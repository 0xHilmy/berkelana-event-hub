# Changelog - Sistem Presensi Berkelana

## [2.0.0] - 2025-01-19

### ✨ Fitur Baru

#### Anti Duplikasi Presensi
- ✅ Sistem cek otomatis jika ID sudah presensi
- ✅ Button disabled jika sudah presensi
- ✅ Error message jelas untuk admin jika coba duplikasi
- ✅ Validasi di backend (Google Apps Script)
- ✅ Validasi di frontend (React)

#### Info Peserta Real-time
- ✅ Tampilkan nama peserta saat buka link
- ✅ Tampilkan nomor seat
- ✅ Tampilkan category (VIP/Regular)
- ✅ Tampilkan status presensi
- ✅ Tampilkan waktu presensi jika sudah hadir

#### QR Code dengan Info
- ✅ Nama peserta di atas QR code
- ✅ Nomor seat di atas QR code
- ✅ UI lebih informatif

#### Feedback Admin Detail
- ✅ Success message dengan nama & seat
- ✅ Error message untuk duplikasi
- ✅ Auto-clear message setelah 3-4 detik
- ✅ Multi-line message support

### 🔄 Perubahan

#### Google Apps Script
- ✅ Tambah fungsi `doGet` untuk cek status
- ✅ Update fungsi `doPost` dengan cek duplikasi
- ✅ Ambil data dari sheet "Participants"
- ✅ Auto-fill nama & seat di "Attendance"

#### Frontend
- ✅ `Index.tsx`: Tambah cek status & tampil info
- ✅ `Admin.tsx`: Handle response & error duplikasi
- ✅ Better loading states
- ✅ Better error handling

#### Data Structure
- ✅ Tambah sheet "Participants" untuk master data
- ✅ Sheet "Attendance" untuk record presensi
- ✅ Kolom tambahan: name, seat, category

### 📚 Dokumentasi

#### File Baru
- ✅ `GOOGLE_APPS_SCRIPT.md` - Script lengkap & setup
- ✅ `FITUR_BARU.md` - Dokumentasi fitur anti duplikasi
- ✅ `README.md` - Overview lengkap project
- ✅ `CHANGELOG.md` - File ini

#### File Update
- ✅ `QUICK_START.md` - Update checklist & cara pakai
- ✅ `ATTENDANCE_FLOW.md` - Update flow dengan fitur baru
- ✅ `ADMIN_SETUP.md` - Update cara kerja presensi

---

## [1.0.0] - 2025-01-19

### ✨ Fitur Awal

#### Sistem Presensi QR Code
- ✅ Peserta buka link dengan ID
- ✅ Peserta klik button → QR code muncul
- ✅ Admin scan QR code
- ✅ Admin submit → data masuk Google Sheets

#### Admin Dashboard
- ✅ Login dengan environment variables
- ✅ QR code scanner dengan html5-qrcode
- ✅ Submit presensi ke Google Sheets
- ✅ Logout functionality

#### Halaman Peserta
- ✅ Generate QR code personal
- ✅ Tampilkan ID peserta
- ✅ Button "Attend Event"
- ✅ Responsive design

#### Google Sheets Integration
- ✅ Google Apps Script untuk backend
- ✅ Auto timestamp
- ✅ Sheet "Attendance" untuk record

#### Dokumentasi
- ✅ `QUICK_START.md` - Setup guide
- ✅ `ATTENDANCE_FLOW.md` - Flow lengkap
- ✅ `ADMIN_SETUP.md` - Setup admin
- ✅ `SAMPLE_PARTICIPANTS.md` - Sample data

---

## Roadmap

### Future Features (Optional)

#### v2.1.0 - Enhanced Admin
- [ ] Dashboard statistics (total hadir, belum hadir)
- [ ] Search peserta by name/ID
- [ ] Export attendance to Excel
- [ ] Print attendance report

#### v2.2.0 - Enhanced Peserta
- [ ] Download QR code as image
- [ ] Share QR via WhatsApp
- [ ] Add to calendar reminder
- [ ] Event countdown timer

#### v2.3.0 - Advanced Features
- [ ] Multiple events support
- [ ] Check-out functionality
- [ ] Late arrival tracking
- [ ] Email notification after attendance

#### v3.0.0 - Backend Upgrade
- [ ] Real backend (Node.js/Python)
- [ ] Database (PostgreSQL/MongoDB)
- [ ] JWT authentication
- [ ] REST API
- [ ] WebSocket for real-time updates

---

## Breaking Changes

### v2.0.0
- **Google Sheets Structure**: Perlu tambah sheet "Participants"
- **Google Apps Script**: Perlu update script dengan fungsi baru
- **URL Update**: Perlu update URL di 2 tempat (Index.tsx & Admin.tsx)

### v1.0.0
- Initial release

---

## Migration Guide

### Upgrade dari v1.0.0 ke v2.0.0

#### 1. Update Google Sheets
```
1. Buat sheet baru "Participants"
2. Tambah kolom: id, name, seat, category
3. Isi data peserta
4. Update sheet "Attendance" tambah kolom: name, seat
```

#### 2. Update Google Apps Script
```
1. Backup script lama
2. Copy script baru dari GOOGLE_APPS_SCRIPT.md
3. Run initialSetup
4. Re-deploy as Web App
5. Copy URL baru
```

#### 3. Update Kode
```
1. Pull latest code
2. npm install (jika ada package baru)
3. Update URL di Index.tsx
4. Update URL di Admin.tsx
5. npm run dev
```

#### 4. Test
```
1. Test cek status peserta
2. Test presensi baru
3. Test duplikasi (harus error)
4. Test di mobile
```

---

## Known Issues

### v2.0.0
- None reported yet

### v1.0.0
- ✅ Fixed: Tidak ada cek duplikasi
- ✅ Fixed: Tidak ada info peserta
- ✅ Fixed: Admin tidak tahu nama peserta saat scan

---

## Contributors

- Developer: [Your Name]
- Tester: [Tester Name]
- Designer: [Designer Name]

---

## Support

Butuh bantuan upgrade? Lihat:
- `GOOGLE_APPS_SCRIPT.md` untuk setup script
- `FITUR_BARU.md` untuk penjelasan fitur
- `README.md` untuk overview

Atau buat issue di repository.

---

**Last Updated**: 19 Januari 2025
