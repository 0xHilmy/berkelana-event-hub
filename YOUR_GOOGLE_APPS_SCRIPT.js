const sheetName = 'Attendance'
const profileSheetName = 'Profile'
const scriptProp = PropertiesService.getScriptProperties()

function initialSetup () {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

// FUNGSI BARU: doGet untuk cek status presensi
function doGet(e) {
  const lock = LockService.getScriptLock()
  lock.tryLock(10000)
  
  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    const sheet = doc.getSheetByName(sheetName)
    const profileSheet = doc.getSheetByName(profileSheetName)
    
    const userId = String(e.parameter.id || '').trim()
    
    if (!userId) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          'result': 'error', 
          'message': 'ID tidak ditemukan' 
        }))
        .setMimeType(ContentService.MimeType.JSON)
    }
    
    // Ambil data dari Profile sheet
    const profileData = profileSheet.getDataRange().getValues()
    const profileHeaders = profileData[0]
    const idIndex = profileHeaders.indexOf('id')
    const nameIndex = profileHeaders.indexOf('name')
    const seatIndex = profileHeaders.indexOf('seat')
    const statusIndex = profileHeaders.indexOf('status')
    
    // Cari data user di Profile
    let userName = ''
    let userSeat = ''
    let userStatus = ''
    let userFound = false
    
    for (let i = 1; i < profileData.length; i++) {
      if (String(profileData[i][idIndex]).trim() === userId) {
        userName = profileData[i][nameIndex] || ''
        userSeat = profileData[i][seatIndex] || ''
        userStatus = profileData[i][statusIndex] || ''
        userFound = true
        break
      }
    }
    
    if (!userFound) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          'result': 'error', 
          'message': 'ID tidak terdaftar' 
        }))
        .setMimeType(ContentService.MimeType.JSON)
    }
    
    // Cek apakah sudah presensi
    const attendanceData = sheet.getDataRange().getValues()
    const attendanceHeaders = attendanceData[0]
    const attendanceIdIndex = attendanceHeaders.indexOf('id')
    const dateTimeIndex = attendanceHeaders.indexOf('date time')
    
    let hasAttended = false
    let attendanceTime = null
    
    for (let i = 1; i < attendanceData.length; i++) {
      if (String(attendanceData[i][attendanceIdIndex]).trim() === userId) {
        hasAttended = true
        attendanceTime = attendanceData[i][dateTimeIndex]
        break
      }
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        'result': 'success',
        'id': userId,
        'name': userName,
        'seat': userSeat,
        'status': userStatus,
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

// FUNGSI EXISTING: doPost untuk submit presensi
function doPost (e) {
  const lock = LockService.getScriptLock()
  lock.tryLock(10000)
  
  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    const sheet = doc.getSheetByName(sheetName)
    const profileSheet = doc.getSheetByName(profileSheetName)
    
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    
    // Ambil data dari Profile sheet
    const profileData = profileSheet.getDataRange().getValues()
    const profileHeaders = profileData[0]
    const idIndex = profileHeaders.indexOf('id')
    const nameIndex = profileHeaders.indexOf('name')
    const seatIndex = profileHeaders.indexOf('seat')
    const statusIndex = profileHeaders.indexOf('status')
    
    // Cari data berdasarkan id yang dikirim (dengan trim untuk menghindari spasi)
    const userId = String(e.parameter['id']).trim()
    let userName = ''
    let userSeat = ''
    let userStatus = ''
    
    for (let i = 1; i < profileData.length; i++) {
      if (String(profileData[i][idIndex]).trim() === userId) {
        userName = profileData[i][nameIndex] || ''
        userSeat = profileData[i][seatIndex] || ''
        userStatus = profileData[i][statusIndex] || ''
        break
      }
    }
    
    // CEK DUPLIKASI - Periksa apakah ID sudah ada di Attendance sheet
    const attendanceData = sheet.getDataRange().getValues()
    const attendanceIdIndex = headers.indexOf('id')
    
    for (let i = 1; i < attendanceData.length; i++) {
      if (String(attendanceData[i][attendanceIdIndex]).trim() === userId) {
        // ID sudah ada, kirim response bahwa sudah presensi
        return ContentService
          .createTextOutput(JSON.stringify({ 
            'result': 'duplicate', 
            'message': 'You have already checked in. Duplicate attendance is not allowed.',
            'name': userName
          }))
          .setMimeType(ContentService.MimeType.JSON)
      }
    }
    
    // Jika tidak ada duplikasi, lanjutkan input data
    const nextRow = sheet.getLastRow() + 1
    
    // Buat row baru dengan data yang sudah dilengkapi
    const newRow = headers.map(function(header) {
      if (header === 'date time') {
        return new Date()
      } else if (header === 'name') {
        return userName
      } else if (header === 'seat') {
        return userSeat
      } else if (header === 'status') {
        return userStatus
      } else {
        return e.parameter[header] || ''
      }
    })
    
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        'result': 'success', 
        'row': nextRow,
        'name': userName,
        'seat': userSeat,
        'status': userStatus,
        'message': 'Attendance recorded successfully!'
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

// FUNGSI EXISTING: onEdit untuk auto-fill
function onEdit(e) {
  const sheet = e.source.getActiveSheet()
  
  // Hanya jalankan di sheet Attendance
  if (sheet.getName() !== sheetName) return
  
  const row = e.range.getRow()
  const col = e.range.getColumn()
  
  // Hanya jalankan jika kolom A (id) yang diedit dan bukan header
  if (col !== 1 || row === 1) return
  
  const id = sheet.getRange(row, 1).getValue()
  if (!id) return
  
  const profileSheet = e.source.getSheetByName(profileSheetName)
  const profileData = profileSheet.getDataRange().getValues()
  
  // Cari data di Profile
  for (let i = 1; i < profileData.length; i++) {
    if (String(profileData[i][0]).trim() === String(id).trim()) {
      sheet.getRange(row, 2).setValue(profileData[i][1] || '') // name
      sheet.getRange(row, 3).setValue(profileData[i][2] || '') // seat
      sheet.getRange(row, 4).setValue(profileData[i][3] || '') // status
      break
    }
  }
}
