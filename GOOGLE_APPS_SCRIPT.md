# Google Apps Script untuk Presensi

## Setup Google Sheets

### 1. Struktur Sheet "Attendance"

Buat sheet dengan nama **"Attendance"** dan kolom berikut:

| id | name | seat | attendance | date time |
|----|------|------|------------|-----------|
| vip001 | John Doe | A-01 | hadir | 2025-01-19 10:30:00 |
| vip002 | Jane Smith | A-02 | hadir | 2025-01-19 10:31:15 |

### 2. Struktur Sheet "Participants" (Master Data)

Buat sheet dengan nama **"Participants"** untuk data peserta:

| id | name | seat | category |
|----|------|------|----------|
| vip001 | John Doe | A-01 | VIP |
| vip002 | Jane Smith | A-02 | VIP |
| regular001 | Bob Wilson | B-01 | Regular |

---

## Google Apps Script Code

### Script 1: doPost (untuk submit presensi dari Admin)

```javascript
const sheetName = 'Attendance'
const participantsSheet = 'Participants'
const scriptProp = PropertiesService.getScriptProperties()

function initialSetup () {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doPost (e) {
  const lock = LockService.getScriptLock()
  lock.tryLock(10000)
  
  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    const sheet = doc.getSheetByName(sheetName)
    const participantSheet = doc.getSheetByName(participantsSheet)
    
    const userId = e.parameter.id
    
    // Check if already attended
    const attendanceData = sheet.getDataRange().getValues()
    for (let i = 1; i < attendanceData.length; i++) {
      if (attendanceData[i][0] === userId) {
        return ContentService
          .createTextOutput(JSON.stringify({ 
            'result': 'duplicate', 
            'message': 'ID ini sudah melakukan presensi'
          }))
          .setMimeType(ContentService.MimeType.JSON)
      }
    }
    
    // Get participant data
    const participantData = participantSheet.getDataRange().getValues()
    let participantInfo = null
    for (let i = 1; i < participantData.length; i++) {
      if (participantData[i][0] === userId) {
        participantInfo = {
          name: participantData[i][1],
          seat: participantData[i][2]
        }
        break
      }
    }
    
    // Add attendance record
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    const nextRow = sheet.getLastRow() + 1
    const newRow = headers.map(function(header) {
      if (header === 'date time') return new Date()
      if (header === 'name' && participantInfo) return participantInfo.name
      if (header === 'seat' && participantInfo) return participantInfo.seat
      return e.parameter[header]
    })
    
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        'result': 'success', 
        'row': nextRow,
        'name': participantInfo ? participantInfo.name : '',
        'seat': participantInfo ? participantInfo.seat : ''
      }))
      .setMimeType(ContentService.MimeType.JSON)
      
  } catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        'result': 'error', 
        'error': e.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON)
      
  } finally {
    lock.releaseLock()
  }
}
```

### Script 2: doGet (untuk cek status presensi)

Tambahkan fungsi ini di script yang sama:

```javascript
function doGet(e) {
  const lock = LockService.getScriptLock()
  lock.tryLock(10000)
  
  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    const sheet = doc.getSheetByName(sheetName)
    const participantSheet = doc.getSheetByName(participantsSheet)
    
    const userId = e.parameter.id
    
    if (!userId) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          'result': 'error', 
          'message': 'ID tidak ditemukan' 
        }))
        .setMimeType(ContentService.MimeType.JSON)
    }
    
    // Get participant data
    const participantData = participantSheet.getDataRange().getValues()
    let participantInfo = null
    for (let i = 1; i < participantData.length; i++) {
      if (participantData[i][0] === userId) {
        participantInfo = {
          name: participantData[i][1],
          seat: participantData[i][2],
          category: participantData[i][3]
        }
        break
      }
    }
    
    if (!participantInfo) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          'result': 'error', 
          'message': 'ID tidak terdaftar' 
        }))
        .setMimeType(ContentService.MimeType.JSON)
    }
    
    // Check if already attended
    const attendanceData = sheet.getDataRange().getValues()
    let hasAttended = false
    let attendanceTime = null
    
    for (let i = 1; i < attendanceData.length; i++) {
      if (attendanceData[i][0] === userId) {
        hasAttended = true
        attendanceTime = attendanceData[i][4] // date time column
        break
      }
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        'result': 'success',
        'id': userId,
        'name': participantInfo.name,
        'seat': participantInfo.seat,
        'category': participantInfo.category,
        'hasAttended': hasAttended,
        'attendanceTime': attendanceTime
      }))
      .setMimeType(ContentService.MimeType.JSON)
      
  } catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        'result': 'error', 
        'error': e.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON)
      
  } finally {
    lock.releaseLock()
  }
}
```

---

## Cara Deploy

### 1. Buka Google Sheets
- Buat sheet "Attendance" dengan kolom: id, name, seat, attendance, date time
- Buat sheet "Participants" dengan kolom: id, name, seat, category
- Isi data peserta di sheet "Participants"

### 2. Buka Script Editor
- Tools → Script Editor
- Hapus semua code default
- Copy-paste script di atas

### 3. Run Initial Setup
- Pilih function `initialSetup` di dropdown
- Klik Run
- Authorize aplikasi

### 4. Deploy as Web App
- Deploy → New deployment
- Type: Web app
- Execute as: Me
- Who has access: **Anyone**
- Deploy

### 5. Copy URL
- Copy Web app URL
- Format: `https://script.google.com/macros/s/[ID]/exec`
- Paste URL ini ke kode (lihat di bawah)

---

## Update URL di Kode

### File: `src/pages/Admin.tsx`
Ganti URL di line ~88:
```typescript
const response = await fetch('YOUR_GOOGLE_SCRIPT_URL_HERE', {
```

### File: `src/pages/Index.tsx`
Ganti URL di useEffect untuk cek status:
```typescript
const response = await fetch('YOUR_GOOGLE_SCRIPT_URL_HERE?id=' + userId);
```

---

## Testing

### Test doGet (cek status):
```
https://script.google.com/macros/s/[ID]/exec?id=vip001
```

Response jika belum presensi:
```json
{
  "result": "success",
  "id": "vip001",
  "name": "John Doe",
  "seat": "A-01",
  "category": "VIP",
  "hasAttended": false,
  "attendanceTime": null
}
```

Response jika sudah presensi:
```json
{
  "result": "success",
  "id": "vip001",
  "name": "John Doe",
  "seat": "A-01",
  "category": "VIP",
  "hasAttended": true,
  "attendanceTime": "2025-01-19 10:30:00"
}
```

### Test doPost (submit presensi):
Gunakan Postman atau form HTML untuk POST dengan parameter:
- id: vip001
- attendance: hadir

---

## Sample Data Participants

Copy data ini ke sheet "Participants":

| id | name | seat | category |
|----|------|------|----------|
| vip001 | John Doe | A-01 | VIP |
| vip002 | Jane Smith | A-02 | VIP |
| vip003 | Bob Wilson | A-03 | VIP |
| regular001 | Alice Brown | B-01 | Regular |
| regular002 | Charlie Davis | B-02 | Regular |
| regular003 | Diana Evans | B-03 | Regular |
