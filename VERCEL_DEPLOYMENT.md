# 🚀 Vercel Deployment Guide

## ❌ Masalah: 404 di /admin pada Vercel

### Error:
```
404: NOT_FOUND
Code: NOT_FOUND
ID: sin1::tlfmd-1760859458127-006be8688268
```

**URL:** https://berkelana-event-hub.vercel.app/admin

---

## 🔍 Penyebab

Vercel tidak tahu bahwa ini adalah SPA (Single Page Application) yang perlu redirect semua routes ke `index.html`.

**Default behavior Vercel:**
```
Request: /admin
         ↓
Vercel: "Cari file admin.html"
         ↓
File tidak ada → 404 ❌
```

**Yang dibutuhkan:**
```
Request: /admin
         ↓
Vercel: "Redirect ke index.html"
         ↓
React Router: "Handle /admin"
         ↓
Render Admin page ✅
```

---

## ✅ Solusi

### 1. Buat File vercel.json

**File:** `vercel.json` (di root project)

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Sudah dibuat!** ✅

### 2. Commit & Push ke Git

```bash
# Add file
git add vercel.json

# Commit
git commit -m "Add vercel.json for SPA routing"

# Push
git push origin main
```

### 3. Vercel Auto-Deploy

Vercel akan otomatis detect push dan deploy ulang.

**Atau manual trigger:**
1. Buka Vercel Dashboard
2. Pilih project "berkelana-event-hub"
3. Klik "Redeploy"

### 4. Test

```
https://berkelana-event-hub.vercel.app/admin
```

**Expected:** Admin page loads ✅

---

## 📋 Deployment Checklist

### Pre-Deployment:

- [x] `vercel.json` dibuat
- [ ] `vercel.json` di-commit ke Git
- [ ] Push ke repository
- [ ] Vercel auto-deploy triggered

### Post-Deployment:

- [ ] Test root: https://berkelana-event-hub.vercel.app/
- [ ] Test admin: https://berkelana-event-hub.vercel.app/admin
- [ ] Test login: https://berkelana-event-hub.vercel.app/admin/login
- [ ] Test dengan ID: https://berkelana-event-hub.vercel.app/?id=vip001
- [ ] Test refresh di setiap route

---

## 🔧 Alternative: Vercel Dashboard

Jika tidak bisa push ke Git, bisa setup via Vercel Dashboard:

### Method 1: Redeploy

1. Buka Vercel Dashboard
2. Pilih project
3. Settings → General
4. Scroll ke "Build & Development Settings"
5. Pastikan Framework Preset: **Vite**
6. Redeploy

### Method 2: Manual Config

1. Settings → Rewrites
2. Add Rewrite:
   - Source: `/(.*)`
   - Destination: `/index.html`
3. Save
4. Redeploy

---

## 🧪 Testing

### Test 1: Root Path
```
https://berkelana-event-hub.vercel.app/
```
**Expected:** Landing page ✅

### Test 2: Admin Path
```
https://berkelana-event-hub.vercel.app/admin
```
**Expected:** Admin dashboard (atau redirect ke login) ✅

### Test 3: Login Path
```
https://berkelana-event-hub.vercel.app/admin/login
```
**Expected:** Login page ✅

### Test 4: With Query Params
```
https://berkelana-event-hub.vercel.app/?id=vip001
```
**Expected:** Landing page dengan info peserta ✅

### Test 5: Refresh
```
1. Navigate to /admin
2. Press F5 (refresh)
```
**Expected:** Stay on /admin ✅

---

## 📊 Vercel Build Settings

### Recommended Settings:

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### Environment Variables:

Jika ada environment variables (seperti API keys), tambahkan di:

```
Settings → Environment Variables
```

**Untuk project ini:**
```
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=your_password
```

**Note:** Environment variables dengan prefix `VITE_` akan di-bundle ke client-side code.

---

## 🔍 Debugging

### Check Deployment Logs

1. Vercel Dashboard → Deployments
2. Klik deployment terakhir
3. Lihat "Build Logs"

**Look for:**
- ✅ Build successful
- ✅ Output directory: dist
- ✅ vercel.json detected

### Check File Structure

Pastikan setelah build, struktur file seperti ini:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── ...
```

### Check vercel.json

```bash
# Pastikan file ada
ls -la vercel.json

# Pastikan isi benar
cat vercel.json
```

### Check Git Status

```bash
# Pastikan vercel.json tracked
git status

# Pastikan sudah di-commit
git log --oneline | head -5
```

---

## 🚨 Common Issues

### Issue 1: vercel.json Tidak Ter-commit

**Symptom:** 404 masih terjadi setelah deploy

**Solution:**
```bash
git add vercel.json
git commit -m "Add vercel.json"
git push
```

### Issue 2: Cache Issue

**Symptom:** Masih 404 setelah deploy

**Solution:**
1. Clear browser cache (Ctrl+Shift+R)
2. Try incognito mode
3. Wait 1-2 menit untuk CDN propagation

### Issue 3: Wrong Build Output

**Symptom:** Build success tapi 404

**Solution:**
1. Check Output Directory: `dist`
2. Check Build Command: `npm run build`
3. Redeploy

### Issue 4: Environment Variables

**Symptom:** App loads tapi fitur tidak work

**Solution:**
1. Add environment variables di Vercel Dashboard
2. Redeploy (environment changes require redeploy)

---

## 📝 Step-by-Step Deployment

### First Time Deploy:

1. **Push to Git**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Login ke Vercel
   - Import Git Repository
   - Select "berkelana-event-hub"

3. **Configure Project**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Add Environment Variables** (optional)
   ```
   VITE_ADMIN_USERNAME=admin
   VITE_ADMIN_PASSWORD=your_password
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

6. **Test**
   - Visit your URL
   - Test all routes

### Update Deployment:

1. **Make Changes**
   ```bash
   # Edit files
   git add .
   git commit -m "Update feature"
   git push
   ```

2. **Auto Deploy**
   - Vercel auto-detect push
   - Auto build & deploy

3. **Manual Deploy** (if needed)
   - Vercel Dashboard → Redeploy

---

## 🎯 Quick Fix untuk Masalah Anda

**Masalah:** 404 di `/admin` pada Vercel

**Fix:**

```bash
# 1. Pastikan vercel.json ada
cat vercel.json

# 2. Commit & push
git add vercel.json
git commit -m "Add vercel.json for SPA routing"
git push origin main

# 3. Wait for auto-deploy (1-2 menit)

# 4. Test
curl -I https://berkelana-event-hub.vercel.app/admin
# Should return 200, not 404
```

**Atau via Vercel Dashboard:**

```
1. Settings → Rewrites
2. Add: /(.*) → /index.html
3. Save
4. Redeploy
5. Test
```

---

## ✅ Verification

Setelah deploy, test semua routes:

- [ ] https://berkelana-event-hub.vercel.app/ → ✅
- [ ] https://berkelana-event-hub.vercel.app/admin → ✅
- [ ] https://berkelana-event-hub.vercel.app/admin/login → ✅
- [ ] https://berkelana-event-hub.vercel.app/?id=vip001 → ✅
- [ ] Refresh di /admin → ✅
- [ ] Direct link share → ✅

Semua harus work tanpa 404! 🎉

---

## 📚 Resources

- [Vercel SPA Configuration](https://vercel.com/docs/configuration#routes/rewrites)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Router with Vercel](https://vercel.com/guides/deploying-react-with-vercel)

---

## 💡 Pro Tips

1. **Always test locally first**
   ```bash
   npm run build
   npm run preview
   # Test all routes
   ```

2. **Use Vercel CLI for faster deployment**
   ```bash
   npm i -g vercel
   vercel --prod
   ```

3. **Enable Preview Deployments**
   - Every push to branch → preview URL
   - Test before merge to main

4. **Monitor Deployment**
   - Vercel Dashboard → Analytics
   - Check errors & performance

Selamat deploy! 🚀
