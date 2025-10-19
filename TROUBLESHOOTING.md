# 🔧 Troubleshooting Guide

## ❌ "Gagal mengecek status presensi"

### Gejala:
- Halaman peserta menampilkan error "Gagal mengecek status presensi"
- Admin panel bisa input presensi dengan sukses
- Data masuk ke Google Sheets

### Penyebab:
Fungsi `doGet` di Google Apps Script belum di-deploy atau URL salah.

### Solusi:

#### 1. Cek URL di Index.tsx
```typescript
// File: src/pages/Index.tsx (line ~40)
const response = await fetch(`URL_ANDA?id=${id}`);
                                      ↑
                              Pastikan ada ?id=
```

**Harus ada `?id=` sebelum `${id}`!**

#### 2. Test URL Langsung di Browser

Buka URL ini di browser:
```
https://script.google.com/macros/s/[SCRIPT_ID]/exec?id=vip001
```

**Expected Response:**
```json
{
  "result": "success",
  "id": "vip001",
  "name": "John Doe",
  "seat": "A-01",
  "status": "VIP",
  "hasAttended": false,
  "attendanceTime": null
}
```

**Jika Error:**
- ❌ "Script function not found: doGet" → Script belum punya fungsi doGet
- ❌ "Authorization required" → Deploy setting salah
- ❌ 404 Not Found → URL salah

#### 3. Pastikan Script Punya Fungsi doGet

Buka Script Editor, pastikan ada fungsi ini:

```javascript
function doGet(e) {
  const lock = LockService.getScriptLock()
  lock.tryLock(10000)
  
  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    const sheet = doc.getSheetByName(sheetName)
    const profileSheet = doc.getSheetByName(profileSheetName)
    
    const userId = String(e.parameter.id || '').trim()
    
    // ... rest of the code
  }
}
```

**Jika tidak ada:**
- Copy dari file `YOUR_GOOGLE_APPS_SCRIPT.js`
- Paste ke Script Editor
- Save

#### 4. Re-deploy Script

```
1. Deploy → Manage deployments
2. Click ✏️ (Edit) pada deployment yang aktif
3. New version → Deploy
4. Copy URL baru (atau gunakan URL lama jika sama)
5. Update URL di Index.tsx jika berubah
```

#### 5. Cek Deploy Settings

Pastikan:
- ✅ Execute as: **Me** (bukan User accessing the web app)
- ✅ Who has access: **Anyone**

**Jika salah:**
- Edit deployment
- Ubah setting
- Deploy ulang

#### 6. Test Lagi

```bash
# Restart dev server
npm run dev

# Buka browser
http://localhost:8080/?id=vip001
```

---

## ❌ "ID tidak ditemukan"

### Penyebab:
ID tidak ada di sheet "Profile"

### Solusi:

1. **Cek Sheet "Profile"**
   - Pastikan ID ada di kolom pertama
   - Cek spelling (case-sensitive)
   - Pastikan tidak ada spasi

2. **Cek URL Parameter**
   ```
   ✅ Benar: /?id=vip001
   ❌ Salah: /?ID=vip001
   ❌ Salah: /?user=vip001
   ```

---

## ❌ Admin Bisa Input, Tapi Peserta Tidak Bisa Cek Status

### Penyebab:
`doPost` works (untuk admin), tapi `doGet` tidak (untuk peserta)

### Solusi:

**Ini masalah yang Anda alami sekarang!**

1. **Pastikan Script Punya doGet**
   ```javascript
   function doGet(e) { ... }  // Untuk cek status
   function doPost(e) { ... } // Untuk submit presensi
   ```

2. **Test doGet Langsung**
   ```
   URL?id=vip001
   ```
   
   Harus return JSON dengan data peserta

3. **Cek Console Browser**
   ```
   F12 → Console → Lihat error
   ```
   
   Error message akan kasih tahu masalahnya

---

## ❌ CORS Error

### Gejala:
```
Access to fetch at '...' from origin '...' has been blocked by CORS policy
```

### Solusi:

**Untuk doGet (cek status):**
- Tidak perlu `mode: 'no-cors'`
- Google Apps Script sudah handle CORS

**Untuk doPost (submit presensi):**
- Bisa pakai `redirect: 'follow'` untuk dapat response
- Atau pakai `mode: 'no-cors'` jika tidak perlu response detail

---

## ❌ Data Tidak Masuk Google Sheets

### Penyebab:
- Script error
- Kolom tidak match
- Lock timeout

### Solusi:

1. **Cek Script Logs**
   ```
   Script Editor → Executions
   Lihat error log
   ```

2. **Cek Nama Kolom**
   ```
   Profile: id, name, seat, status
   Attendance: id, name, seat, status, attendance, date time
   ```
   
   Harus exact match (case-sensitive)!

3. **Cek initialSetup**
   ```javascript
   Run function: initialSetup
   ```
   
   Pastikan sudah di-run minimal 1x

---

## ❌ "Anda sudah melakukan presensi" Padahal Belum

### Penyebab:
- Ada duplikat ID di sheet Attendance
- Data test belum dihapus

### Solusi:

1. **Cek Sheet Attendance**
   - Cari ID yang bermasalah
   - Hapus row duplikat
   - Refresh halaman peserta

2. **Clear Test Data**
   ```
   Hapus semua row di Attendance kecuali header
   Test ulang dari awal
   ```

---

## ❌ QR Scanner Tidak Jalan

### Penyebab:
- Permission kamera ditolak
- Browser tidak support
- HTTPS required

### Solusi:

1. **Allow Camera Permission**
   - Browser akan minta permission
   - Klik "Allow"

2. **Gunakan HTTPS atau Localhost**
   - ✅ https://... (production)
   - ✅ http://localhost:... (development)
   - ❌ http://192.168... (tidak work)

3. **Coba Browser Lain**
   - Chrome (recommended)
   - Firefox
   - Safari (iOS)

4. **Gunakan Mobile Phone**
   - Lebih mudah untuk scan
   - Camera lebih baik

---

## 🔍 Debug Checklist

### Untuk "Gagal mengecek status presensi":

- [ ] URL di Index.tsx ada `?id=` sebelum `${id}`
- [ ] Test URL langsung di browser
- [ ] Script punya fungsi `doGet`
- [ ] Script sudah di-deploy
- [ ] Deploy setting: Execute as "Me", Access "Anyone"
- [ ] Sheet "Profile" punya data
- [ ] ID ada di sheet "Profile"
- [ ] Console browser tidak ada error CORS
- [ ] Network tab menunjukkan request sukses (200)

### Untuk Admin Panel:

- [ ] URL di Admin.tsx benar
- [ ] Script punya fungsi `doPost`
- [ ] Sheet "Attendance" punya kolom yang benar
- [ ] Data masuk ke sheet setelah submit
- [ ] Success message muncul

---

## 📞 Cara Report Issue

Jika masih error, berikan info ini:

1. **Error Message**
   ```
   Copy exact error message dari browser
   ```

2. **Console Log**
   ```
   F12 → Console → Screenshot
   ```

3. **Network Tab**
   ```
   F12 → Network → Cari request ke Google Script → Screenshot
   ```

4. **Script Execution Log**
   ```
   Script Editor → Executions → Screenshot
   ```

5. **Sheet Structure**
   ```
   Screenshot header row dari Profile & Attendance
   ```

---

## ✅ Quick Fix untuk Masalah Anda

**Masalah:** Admin bisa input, peserta tidak bisa cek status

**Fix:**

1. **Update Script**
   ```
   Copy dari YOUR_GOOGLE_APPS_SCRIPT.js
   Paste ke Script Editor
   Save
   ```

2. **Re-deploy**
   ```
   Deploy → Manage deployments → Edit → New version → Deploy
   ```

3. **Test URL**
   ```
   https://script.google.com/.../exec?id=vip001
   ```
   
   Harus return JSON

4. **Update Index.tsx**
   ```typescript
   // Pastikan ada ?id=
   const response = await fetch(`URL?id=${id}`);
   ```

5. **Restart & Test**
   ```bash
   npm run dev
   # Buka /?id=vip001
   ```

Seharusnya sudah work! 🎉
