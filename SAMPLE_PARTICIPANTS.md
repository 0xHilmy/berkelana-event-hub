# 📋 Sample Participants List

## Contoh Daftar Peserta & Link Mereka

### VIP Participants

| No | ID | Nama | Link |
|----|-------|------|------|
| 1 | vip001 | [Nama Peserta] | http://localhost:8080/?id=vip001 |
| 2 | vip002 | [Nama Peserta] | http://localhost:8080/?id=vip002 |
| 3 | vip003 | [Nama Peserta] | http://localhost:8080/?id=vip003 |
| 4 | vip004 | [Nama Peserta] | http://localhost:8080/?id=vip004 |
| 5 | vip005 | [Nama Peserta] | http://localhost:8080/?id=vip005 |

### Regular Participants

| No | ID | Nama | Link |
|----|-------|------|------|
| 1 | regular001 | [Nama Peserta] | http://localhost:8080/?id=regular001 |
| 2 | regular002 | [Nama Peserta] | http://localhost:8080/?id=regular002 |
| 3 | regular003 | [Nama Peserta] | http://localhost:8080/?id=regular003 |
| 4 | regular004 | [Nama Peserta] | http://localhost:8080/?id=regular004 |
| 5 | regular005 | [Nama Peserta] | http://localhost:8080/?id=regular005 |

---

## 📱 Template Pesan WhatsApp

### Untuk VIP:
```
Halo [Nama],

Terima kasih telah mendaftar di event Berkelana!

Berikut link presensi Anda:
http://localhost:8080/?id=vip001

Cara presensi:
1. Buka link di atas
2. Klik tombol "Attend Event"
3. Tunjukkan QR code ke admin saat datang

Sampai jumpa di event! 🎉
```

### Untuk Regular:
```
Halo [Nama],

Terima kasih telah mendaftar di event Berkelana!

Berikut link presensi Anda:
http://localhost:8080/?id=regular001

Cara presensi:
1. Buka link di atas
2. Klik tombol "Attend Event"
3. Tunjukkan QR code ke admin saat datang

Sampai jumpa di event! 🎉
```

---

## 📧 Template Email

**Subject:** Link Presensi Event Berkelana - [Nama Peserta]

**Body:**
```
Halo [Nama],

Terima kasih telah mendaftar di event Berkelana - Kompetisi Terbesar Tahun Ini!

📍 Detail Event:
- Tanggal: [Tanggal Event]
- Lokasi: Jakarta Selatan
- Waktu: [Jam Event]

🎫 Link Presensi Anda:
http://localhost:8080/?id=[USER_ID]

📱 Cara Melakukan Presensi:
1. Buka link di atas menggunakan smartphone Anda
2. Klik tombol "Attend Event"
3. QR code unik Anda akan muncul
4. Tunjukkan QR code tersebut ke admin saat tiba di lokasi
5. Admin akan scan QR code Anda
6. Kehadiran Anda tercatat! ✅

💡 Tips:
- Simpan link ini atau screenshot untuk akses mudah
- Pastikan brightness layar maksimal saat scan
- Datang lebih awal untuk menghindari antrian

Sampai jumpa di event!

Salam,
Tim Berkelana
```

---

## 🔢 Format ID Recommendations

### Berdasarkan Kategori:
- **VIP**: `vip001`, `vip002`, `vip003`, ...
- **Regular**: `regular001`, `regular002`, ...
- **Speaker**: `speaker001`, `speaker002`, ...
- **Sponsor**: `sponsor001`, `sponsor002`, ...
- **Media**: `media001`, `media002`, ...
- **Staff**: `staff001`, `staff002`, ...

### Berdasarkan Batch:
- **Batch 1**: `batch1-001`, `batch1-002`, ...
- **Batch 2**: `batch2-001`, `batch2-002`, ...

### Berdasarkan Kota:
- **Jakarta**: `jkt001`, `jkt002`, ...
- **Bandung**: `bdg001`, `bdg002`, ...
- **Surabaya**: `sby001`, `sby002`, ...

---

## 📊 Cara Generate Link Massal

### Menggunakan Excel/Google Sheets:

1. **Buat kolom:**
   - Kolom A: ID (vip001, vip002, ...)
   - Kolom B: Nama Peserta
   - Kolom C: Formula link

2. **Formula di Kolom C:**
   ```
   ="http://localhost:8080/?id=" & A2
   ```

3. **Copy formula ke bawah** untuk semua peserta

4. **Export atau copy** link untuk dibagikan

### Contoh di Google Sheets:

| A (ID) | B (Nama) | C (Link) |
|--------|----------|----------|
| vip001 | John Doe | =CONCATENATE("http://localhost:8080/?id=", A2) |
| vip002 | Jane Smith | =CONCATENATE("http://localhost:8080/?id=", A3) |

---

## 🎯 Best Practices

1. **ID Unik**: Pastikan setiap peserta punya ID berbeda
2. **Format Konsisten**: Gunakan format yang sama (lowercase, no space)
3. **Mudah Diingat**: Gunakan pattern yang mudah dipahami
4. **Dokumentasi**: Simpan mapping ID → Nama di spreadsheet
5. **Backup**: Simpan daftar peserta di beberapa tempat

---

## 🔐 Keamanan ID

- ❌ Jangan gunakan data sensitif sebagai ID (NIK, email, phone)
- ✅ Gunakan ID random atau sequential
- ✅ ID hanya untuk identifikasi, bukan autentikasi
- ✅ Simpan mapping ID → Data Peserta di database terpisah

---

## 📝 Catatan

- Ganti `localhost:8080` dengan domain production saat deploy
- Sesuaikan template pesan dengan branding event Anda
- Test beberapa link sebelum kirim massal
- Siapkan customer service untuk handle pertanyaan peserta
