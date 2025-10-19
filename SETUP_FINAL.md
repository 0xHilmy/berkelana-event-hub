# 🎯 Setup Final - Sistem Presensi Berkelana

## ✅ Struktur Google Sheets Anda

### Sheet 1: "Profile" (Master Data Peserta)

| id | name | seat | status |
|----|------|------|--------|
| vip001 | John Doe | A-01 | VIP |
| vip002 | Jane Smith | A-02 | VIP |
| regular001 | Bob Wilson | B-01 | Regular |
| regular002 | Alice Brown | B-02 | Regular |

**Kolom:**
- `id`: ID unik peserta (contoh: vip001, regular001)
- `name`: Nama lengkap peserta
- `seat`: Nomor kursi peserta (contoh: A-01, B-15)
- `status`: Status peserta (VIP, Regular, Speaker, dll)

### Sheet 2: "Attendance" (Record Presensi)

| id | name | seat | status | attendance | date time |
|----|------|------|--------|------------|-----------|
| vip001 | John Doe | A-01 | VIP | hadir | 2025-01-19 10:30:00 |

**Kolom:**
- `id`: ID peserta (dari Profile)
- `name`: Nama (auto-fill dari Profile)
- `seat`: Nomor kursi (auto-fill dari Profile)
- `status`: Status (auto-fill dari Profile)
- `attendance`: Status kehadiran (hadir)
- `date time`: Timestamp otomatis

---

## 📝 Google Apps Script (Sudah Lengkap)

Script Anda sudah sempurna! Saya sudah tambahkan fungsi `doGet` untuk cek status presensi.

### File: YOUR_GOOGLE_APPS_SCRIPT.js

Copy script dari file `YOUR_GOOGLE_APPS_SCRIPT.js` yang sudah saya buat.

**Fitur Script:**
- ✅ `doGet`: Cek status presensi peserta
- ✅ `doPost`: Submit presensi dengan cek duplikasi
- ✅ `onEdit`: Auto-fill name & status saat edit ID
- ✅ Anti duplikasi built-in
- ✅ Lock mechanism untuk concurrent requests

---

## 🚀 Langkah Setup

### 1. Update Google Apps Script

```javascript
1. Buka Google Sheets Anda
2. Tools → Script Editor
3. BACKUP script lama Anda
4. Copy script dari YOUR_GOOGLE_APPS_SCRIPT.js
5. Paste ke Script Editor (replace semua)
6. Save (Ctrl+S)
```

### 2. Run Initial Setup

```javascript
1. Pilih function "initialSetup" di dropdown
2. Klik Run (▶️)
3. Authorize aplikasi jika diminta
4. Tunggu sampai selesai
```

### 3. Deploy as Web App

```javascript
1. Deploy → New deployment
2. Type: Web app
3. Description: "Attendance System v2"
4. Execute as: Me
5. Who has access: Anyone
6. Deploy
7. Copy Web app URL
```

**URL Format:**
```
https://script.google.com/macros/s/[SCRIPT_ID]/exec
```

### 4. Update URL di Kode

#### File: `src/pages/Index.tsx` (Line ~30)
```typescript
const response = await fetch(`YOUR_GOOGLE_SCRIPT_URL_HERE?id=${id}`);
```

#### File: `src/pages/Admin.tsx` (Line ~95)
```typescript
const response = await fetch('YOUR_GOOGLE_SCRIPT_URL_HERE', {
```

**Ganti `YOUR_GOOGLE_SCRIPT_URL_HERE` dengan URL yang Anda copy!**

### 5. Restart Dev Server

```bash
# Stop server (Ctrl+C)
npm run dev
```

---

## 🧪 Testing

### Test 1: Cek Status Peserta

1. Buka browser: `http://localhost:8080/?id=vip001`
2. **Expected Result:**
   ```
   Hello, John Doe!
   Your seat: A-01
   Status: VIP
   ```

### Test 2: Generate QR Code

1. Klik button "Attend Event"
2. **Expected Result:**
   - QR code muncul
   - Nama di atas QR: "John Doe"
   - Seat di atas QR: "A-01"
   - Status di atas QR: "VIP"

### Test 3: Admin Scan & Submit

1. Login admin: `http://localhost:8080/admin/login`
2. Klik "Mulai Scan QR Code"
3. Scan QR peserta (atau ketik ID manual untuk test)
4. Klik "Catat Kehadiran"
5. **Expected Result:**
   ```
   ✓ Kehadiran berhasil dicatat!
   Nama: John Doe
   Seat: A-01
   Status: VIP
   ```

### Test 4: Cek Duplikasi

1. Refresh halaman peserta: `http://localhost:8080/?id=vip001`
2. **Expected Result:**
   ```
   Hello, John Doe!
   Your seat: A-01
   Status: VIP
   ✓ Anda sudah melakukan presensi
   Waktu: [timestamp]
   ```
3. Button "Attend Event" disabled

### Test 5: Admin Coba Duplikasi

1. Scan QR yang sama lagi
2. Klik "Catat Kehadiran"
3. **Expected Result:**
   ```
   ⚠️ ID vip001 sudah melakukan presensi sebelumnya!
   ```

### Test 6: Cek Google Sheets

1. Buka sheet "Attendance"
2. **Expected Result:**
   - Ada 1 row baru
   - Kolom `id`: vip001
   - Kolom `name`: John Doe (auto-fill)
   - Kolom `seat`: A-01 (auto-fill)
   - Kolom `status`: VIP (auto-fill)
   - Kolom `attendance`: hadir
   - Kolom `date time`: timestamp otomatis

---

## 📊 Sample Data untuk Testing

### Isi Sheet "Profile" dengan data ini:

| id | name | seat | status |
|----|------|------|--------|
| vip001 | John Doe | A-01 | VIP |
| vip002 | Jane Smith | A-02 | VIP |
| vip003 | Bob Wilson | A-03 | VIP |
| regular001 | Alice Brown | B-01 | Regular |
| regular002 | Charlie Davis | B-02 | Regular |
| regular003 | Diana Evans | B-03 | Regular |
| speaker001 | Prof. Smith | S-01 | Speaker |
| sponsor001 | ABC Company | SP-01 | Sponsor |

### Test dengan berbagai ID:

- VIP: `http://localhost:8080/?id=vip001`
- Regular: `http://localhost:8080/?id=regular001`
- Speaker: `http://localhost:8080/?id=speaker001`
- Sponsor: `http://localhost:8080/?id=sponsor001`

---

## 🎯 Checklist Lengkap

### Setup Google Sheets
- [ ] Sheet "Profile" ada dengan kolom: id, name, seat, status
- [ ] Sheet "Attendance" ada dengan kolom: id, name, seat, status, attendance, date time
- [ ] Data peserta sudah diisi di "Profile"
- [ ] Sheet "Attendance" kosong (hanya header)

### Setup Google Apps Script
- [ ] Script sudah di-update dengan fungsi doGet
- [ ] Function initialSetup sudah di-run
- [ ] Script sudah di-deploy as Web App
- [ ] URL sudah di-copy

### Update Kode
- [ ] URL di Index.tsx sudah diganti
- [ ] URL di Admin.tsx sudah diganti
- [ ] Dev server sudah di-restart

### Testing
- [ ] Test cek status peserta (info muncul)
- [ ] Test generate QR code
- [ ] Test admin scan & submit
- [ ] Test duplikasi (harus error)
- [ ] Test di mobile device
- [ ] Data masuk Google Sheets dengan benar

---

## 🔧 Troubleshooting

### "ID tidak ditemukan"
**Penyebab:** ID tidak ada di sheet "Profile"
**Solusi:**
- Cek spelling ID (case-sensitive)
- Pastikan ID ada di kolom pertama sheet "Profile"
- Refresh halaman

### "Gagal mengecek status presensi"
**Penyebab:** URL Google Apps Script salah atau script belum di-deploy
**Solusi:**
- Cek URL di Index.tsx sudah benar
- Pastikan script sudah di-deploy
- Test URL langsung di browser: `URL?id=vip001`
- Cek console browser untuk error detail

### Admin: "Terjadi kesalahan"
**Penyebab:** URL salah atau permission issue
**Solusi:**
- Cek URL di Admin.tsx sudah benar
- Pastikan deploy setting: Execute as "Me", Access "Anyone"
- Re-deploy script jika perlu
- Cek console browser untuk error

### Data tidak masuk Google Sheets
**Penyebab:** Script error atau kolom tidak match
**Solusi:**
- Cek nama kolom di Attendance: id, name, status, attendance, date time
- Cek script tidak ada error (View → Logs)
- Test POST manual dengan Postman
- Pastikan lock mechanism tidak blocking

### QR Scanner tidak jalan
**Penyebab:** Permission kamera atau browser tidak support
**Solusi:**
- Allow camera permission di browser
- Gunakan HTTPS (atau localhost)
- Coba browser lain (Chrome recommended)
- Gunakan mobile phone jika laptop tidak work

---

## 📱 Tips Production

### Untuk Event Besar:

1. **Siapkan Multiple Admin**
   - Buat beberapa device untuk scan
   - Bagi peserta per kategori (VIP, Regular)
   - Siapkan jalur antrian terpisah

2. **Backup Plan**
   - Print daftar peserta manual
   - Siapkan form backup (Google Forms)
   - Siapkan staff IT standby

3. **Monitoring Real-time**
   - Buka Google Sheets di tab terpisah
   - Refresh berkala untuk cek data masuk
   - Siapkan dashboard untuk statistik

4. **Komunikasi Peserta**
   - Kirim link H-1 event
   - Reminder untuk buka link sebelum datang
   - Pasang petunjuk di lokasi scan

---

## 🎉 Ready to Go!

Setelah semua checklist ✅, sistem siap digunakan untuk event!

**Flow Lengkap:**
```
PESERTA                    ADMIN                    SYSTEM
  |                          |                         |
  | Buka link               |                         |
  |------------------------>|                         |
  |                          |                         |
  | Lihat info              |                         |
  | (nama, status)          |                         |
  |                          |                         |
  | Klik "Attend Event"     |                         |
  |                          |                         |
  | QR muncul               |                         |
  |                          |                         |
  |                          | Scan QR                |
  |                          |----------------------->|
  |                          |                         |
  |                          | Submit                 |
  |                          |----------------------->|
  |                          |                         |
  |                          |                         | Cek duplikasi
  |                          |                         | Ambil data Profile
  |                          |                         | Insert Attendance
  |                          |                         |
  |                          | Success + info         |
  |                          |<-----------------------|
  |                          |                         |
  | Refresh halaman         |                         |
  |------------------------>|                         |
  |                          |                         |
  | Status: Sudah presensi  |                         |
  | Button disabled         |                         |
```

**Selamat menggunakan sistem presensi! 🚀**
