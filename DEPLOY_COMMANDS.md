# 🚀 Quick Deploy Commands

## Fix 404 di Vercel - Quick Commands

### Step 1: Commit vercel.json

```bash
git add vercel.json
git commit -m "Add vercel.json for SPA routing fix"
```

### Step 2: Push to Repository

```bash
git push origin main
```

### Step 3: Wait for Auto-Deploy

Vercel akan otomatis detect dan deploy (1-2 menit)

### Step 4: Test

```bash
# Test dengan curl
curl -I https://berkelana-event-hub.vercel.app/admin

# Atau buka di browser
https://berkelana-event-hub.vercel.app/admin
```

---

## Alternative: Manual Redeploy

Jika tidak bisa push, redeploy manual:

### Via Vercel Dashboard:

1. Buka https://vercel.com/dashboard
2. Pilih project "berkelana-event-hub"
3. Klik tab "Deployments"
4. Klik "..." pada deployment terakhir
5. Klik "Redeploy"
6. Wait 1-2 menit
7. Test URL

### Via Vercel CLI:

```bash
# Install Vercel CLI (jika belum)
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## All-in-One Command

```bash
# Commit, push, dan tunggu
git add vercel.json && \
git commit -m "Add vercel.json for SPA routing" && \
git push origin main && \
echo "✅ Pushed! Waiting for Vercel auto-deploy..." && \
sleep 60 && \
echo "Testing..." && \
curl -I https://berkelana-event-hub.vercel.app/admin
```

---

## Verification Commands

```bash
# Check if vercel.json exists
ls -la vercel.json

# Check content
cat vercel.json

# Check git status
git status

# Check if committed
git log --oneline | grep vercel

# Test deployment
curl -I https://berkelana-event-hub.vercel.app/
curl -I https://berkelana-event-hub.vercel.app/admin
curl -I https://berkelana-event-hub.vercel.app/admin/login
```

---

## Expected Results

### Before Fix:
```bash
$ curl -I https://berkelana-event-hub.vercel.app/admin
HTTP/2 404 ❌
```

### After Fix:
```bash
$ curl -I https://berkelana-event-hub.vercel.app/admin
HTTP/2 200 ✅
```

---

## Troubleshooting Commands

### If still 404 after deploy:

```bash
# Clear browser cache
# Ctrl+Shift+R (Windows/Linux)
# Cmd+Shift+R (Mac)

# Or test with curl (bypass cache)
curl -I https://berkelana-event-hub.vercel.app/admin

# Check Vercel deployment status
vercel ls

# Check latest deployment
vercel inspect [deployment-url]
```

### If vercel.json not detected:

```bash
# Make sure it's in root directory
pwd
ls -la vercel.json

# Make sure it's committed
git ls-files | grep vercel.json

# If not, add and commit again
git add vercel.json
git commit -m "Add vercel.json"
git push
```

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `git add vercel.json` | Stage file |
| `git commit -m "message"` | Commit |
| `git push origin main` | Push to repo |
| `vercel --prod` | Deploy via CLI |
| `curl -I [url]` | Test endpoint |
| `git status` | Check git status |
| `ls -la vercel.json` | Check file exists |

---

## Next Steps After Deploy

1. ✅ Test all routes
2. ✅ Update Google Apps Script URL (if changed)
3. ✅ Test presensi flow end-to-end
4. ✅ Share production URL with users
5. ✅ Monitor Vercel Analytics

Done! 🎉
