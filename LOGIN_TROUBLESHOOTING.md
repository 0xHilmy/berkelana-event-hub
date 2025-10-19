# 🔐 Login Troubleshooting Guide

## ❌ "Username atau password salah"

### Kemungkinan Penyebab:

1. **Environment variables belum di-set (Production)**
2. **Dev server belum di-restart (Development)**
3. **Typo di username/password**
4. **Whitespace di .env file**

---

## 🔍 Diagnosis

### Check 1: Environment Variables

#### Development (localhost):

```bash
# 1. Cek file .env
cat .env

# Expected output:
# VITE_ADMIN_USERNAME=admin
# VITE_ADMIN_PASSWORD=berkelana2025

# 2. Restart dev server
# Stop: Ctrl+C
npm run dev

# 3. Test login
# Username: admin
# Password: berkelana2025
```

#### Production (Vercel):

```bash
# Check Vercel Dashboard
1. Buka https://vercel.com/dashboard
2. Pilih project "berkelana-event-hub"
3. Settings → Environment Variables
4. Pastikan ada:
   - VITE_ADMIN_USERNAME = admin
   - VITE_ADMIN_PASSWORD = berkelana2025
```

### Check 2: Browser Console

```javascript
// Buka Console (F12)
// Coba login
// Lihat log:

Environment check: {
  hasUsername: true,  // ← Harus true
  hasPassword: true,  // ← Harus true
  inputUsername: "admin",
  envUsername: "admin"
}
```

**Jika `hasUsername` atau `hasPassword` = false:**
- Environment variables tidak ter-load
- Perlu restart dev server atau redeploy

---

## ✅ Solusi

### Solusi 1: Development (localhost)

#### Step 1: Cek .env File

```bash
# File: .env (di root project)
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=berkelana2025
```

**Pastikan:**
- ✅ File bernama `.env` (bukan `.env.txt`)
- ✅ Di root project (sejajar dengan `package.json`)
- ✅ Tidak ada spasi sebelum/sesudah `=`
- ✅ Tidak ada quotes (`"` atau `'`)

#### Step 2: Restart Dev Server

```bash
# Stop server
Ctrl+C

# Start lagi
npm run dev
```

**PENTING:** Environment variables hanya di-load saat server start!

#### Step 3: Clear Browser Cache

```bash
# Hard refresh
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)

# Atau buka Incognito mode
```

#### Step 4: Test Login

```
URL: http://localhost:8080/admin/login
Username: admin
Password: berkelana2025
```

---

### Solusi 2: Production (Vercel)

#### Step 1: Set Environment Variables

1. **Buka Vercel Dashboard**
   ```
   https://vercel.com/dashboard
   ```

2. **Pilih Project**
   ```
   berkelana-event-hub
   ```

3. **Settings → Environment Variables**

4. **Add Variables:**
   ```
   Name: VITE_ADMIN_USERNAME
   Value: admin
   Environment: Production, Preview, Development
   
   Name: VITE_ADMIN_PASSWORD
   Value: berkelana2025
   Environment: Production, Preview, Development
   ```

5. **Save**

#### Step 2: Redeploy

```
Deployments → Latest → Redeploy
```

**PENTING:** Environment variables changes require redeploy!

#### Step 3: Wait & Test

```bash
# Wait 1-2 menit
# Test login:
https://berkelana-event-hub.vercel.app/admin/login

Username: admin
Password: berkelana2025
```

---

## 🧪 Testing

### Test 1: Check Environment Variables Loaded

```javascript
// Buka Console (F12) di halaman login
console.log('Username set:', !!import.meta.env.VITE_ADMIN_USERNAME);
console.log('Password set:', !!import.meta.env.VITE_ADMIN_PASSWORD);

// Expected:
// Username set: true
// Password set: true
```

### Test 2: Try Default Credentials

```
Username: admin
Password: berkelana2025
```

### Test 3: Check Error Message

**Jika error: "Konfigurasi admin belum diatur"**
- Environment variables tidak ter-load
- Restart dev server atau redeploy

**Jika error: "Username atau password salah"**
- Credentials salah
- Cek typo
- Cek case-sensitive

---

## 🔧 Common Issues

### Issue 1: .env File Tidak Ter-load

**Symptom:**
```javascript
console.log(import.meta.env.VITE_ADMIN_USERNAME); // undefined
```

**Causes:**
- File tidak bernama `.env`
- File tidak di root project
- Dev server belum di-restart

**Solution:**
```bash
# Check file location
ls -la .env

# Should be in root, next to package.json
# If not, move it:
mv path/to/.env .

# Restart server
npm run dev
```

### Issue 2: Whitespace di .env

**Symptom:**
```
Username: "admin"
Password: "berkelana2025"
Login: Failed ❌
```

**Cause:**
```bash
# Wrong (dengan quotes):
VITE_ADMIN_USERNAME="admin"

# Wrong (dengan spasi):
VITE_ADMIN_USERNAME = admin
```

**Solution:**
```bash
# Correct:
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=berkelana2025
```

### Issue 3: Vercel Environment Variables Tidak Apply

**Symptom:**
- Development work ✅
- Production failed ❌

**Cause:**
- Environment variables belum di-set di Vercel
- Atau belum redeploy setelah set

**Solution:**
```
1. Set environment variables di Vercel Dashboard
2. Redeploy
3. Wait 1-2 menit
4. Test
```

### Issue 4: Case Sensitive

**Symptom:**
```
Username: Admin (capital A)
Password: berkelana2025
Login: Failed ❌
```

**Cause:**
JavaScript string comparison is case-sensitive

**Solution:**
```
Username: admin (lowercase)
Password: berkelana2025
```

---

## 🎯 Quick Fix Checklist

### Development:
- [ ] File `.env` ada di root project
- [ ] Isi `.env` benar (no quotes, no spaces)
- [ ] Dev server sudah di-restart
- [ ] Browser cache di-clear
- [ ] Console tidak ada error
- [ ] Test dengan credentials default

### Production:
- [ ] Environment variables di-set di Vercel
- [ ] Sudah redeploy setelah set variables
- [ ] Wait 1-2 menit setelah deploy
- [ ] Test dengan credentials default
- [ ] Check console untuk error

---

## 📝 Default Credentials

```
Username: admin
Password: berkelana2025
```

**Untuk production, ganti password di:**
- Development: `.env` file
- Production: Vercel Dashboard → Environment Variables

---

## 🔐 Security Notes

### Development:
- `.env` file di-ignore oleh Git (sudah ada di `.gitignore`)
- Tidak akan ter-commit ke repository

### Production:
- Environment variables di Vercel Dashboard
- Tidak ter-expose di client-side code
- Hanya admin yang bisa akses

### Best Practices:
1. **Ganti password default** untuk production
2. **Gunakan password yang kuat** (min 12 karakter)
3. **Jangan share credentials** via chat/email
4. **Rotate password** secara berkala

---

## 🆘 Still Not Working?

### Debug Steps:

1. **Check Console**
   ```javascript
   F12 → Console
   // Look for errors
   ```

2. **Check Network**
   ```javascript
   F12 → Network → Try login
   // Look for failed requests
   ```

3. **Check Environment**
   ```javascript
   console.log('ENV:', import.meta.env);
   // Should show VITE_ADMIN_USERNAME and VITE_ADMIN_PASSWORD
   ```

4. **Try Incognito Mode**
   ```
   Bypass cache and extensions
   ```

5. **Check Browser Compatibility**
   ```
   Try Chrome (recommended)
   ```

---

## 📞 Contact Support

Jika masih tidak bisa login setelah semua langkah di atas:

1. Screenshot error message
2. Screenshot console log
3. Screenshot environment variables (blur password)
4. Describe steps yang sudah dilakukan

---

## ✅ Success Indicators

**Login berhasil jika:**
- ✅ Redirect ke `/admin` dashboard
- ✅ Tidak ada error message
- ✅ Session tersimpan (tidak logout saat refresh)
- ✅ Bisa akses fitur admin

**Login gagal jika:**
- ❌ Error: "Username atau password salah"
- ❌ Error: "Konfigurasi admin belum diatur"
- ❌ Tetap di halaman login
- ❌ Redirect ke login lagi

---

Semoga membantu! 🎉
