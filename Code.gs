/**
 * ==============================================================================
 * SISTEM BAYARAN YURAN MURID - GOOGLE APPS SCRIPT BACKEND
 * ==============================================================================
 * Web App Google Apps Script + Google Sheets Database
 * 
 * Sheet 1: MURID (Bil, Nama Murid, Kelas, Nama Penjaga, No. WhatsApp)
 * Sheet 2: BAYARAN (ID Bayaran, Tarikh, No Resit, Nama Murid, Jenis Yuran, Jumlah, Kaedah Bayaran, Catatan)
 */

var SHEET_MURID = "MURID";
var SHEET_BAYARAN = "BAYARAN";

/**
 * Handle HTTP GET Requests (CORS Web App API & Web Page Fallback)
 */
function doGet(e) {
  var action = (e && e.parameter) ? e.parameter.action : null;
  
  if (action === "getStudents") {
    return createJsonResponse({ success: true, data: getStudents() });
  } else if (action === "getPayments") {
    return createJsonResponse({ success: true, data: getPayments() });
  } else if (action === "getDashboardData") {
    return createJsonResponse({ success: true, data: getDashboardData() });
  }

  // Jika dibuka terus di dalam Google Apps Script Web App
  try {
    return HtmlService.createTemplateFromFile("index")
      .evaluate()
      .setTitle("SISTEM BAYARAN YURAN MURID")
      .addMetaTag("viewport", "width=device-width, initial-scale=1.0")
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } catch (err) {
    return HtmlService.createHtmlOutput(
      "<h2>SISTEM BAYARAN YURAN MURID API ACTIVE</h2>" +
      "<p>Google Apps Script Web App API kini aktif dan sedia menerima sambungan daripada Laman Web Pembayaran Yuran Murid.</p>" +
      "<p><strong>Status API:</strong> OK</p>"
    );
  }
}

/**
 * Handle HTTP POST Requests (CORS Web App API for fetch requests)
 */
function doPost(e) {
  try {
    var contents = {};
    if (e && e.postData && e.postData.contents) {
      contents = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      contents = e.parameter;
    }

    var action = contents.action;
    var payload = contents.payload || contents;

    var result = { success: false, message: "Tindakan tidak sah." };

    if (action === "getStudents") {
      result = { success: true, data: getStudents() };
    } else if (action === "addStudent") {
      result = addStudent(payload);
    } else if (action === "updateStudent") {
      result = updateStudent(payload);
    } else if (action === "deleteStudent") {
      result = deleteStudent(payload.bil || payload);
    } else if (action === "getPayments") {
      result = { success: true, data: getPayments() };
    } else if (action === "addPayment") {
      result = addPayment(payload);
    } else if (action === "getDashboardData") {
      result = { success: true, data: getDashboardData() };
    }

    return createJsonResponse(result);
  } catch (error) {
    return createJsonResponse({ success: false, message: "Ralat Server: " + error.toString() });
  }
}

/**
 * Helper untuk pulangkan jawapan JSON
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Menyediakan Sheet MURID jika belum wujud
 */
function setupMuridSheet(ss) {
  if (!ss) ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_MURID);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_MURID);
    var headers = ["Bil", "Nama Murid", "Kelas", "Nama Penjaga", "No. WhatsApp"];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#e2e8f0");
    sheet.setFrozenRows(1);
    sheet.getRange("E:E").setNumberFormat("@");
  }
  return sheet;
}

/**
 * Menyediakan Sheet BAYARAN jika belum wujud (8 Kolum Tepat: A..H)
 */
function setupBayaranSheet(ss) {
  if (!ss) ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_BAYARAN);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_BAYARAN);
    var headers = [
      "ID Bayaran",
      "Tarikh",
      "No Resit",
      "Nama Murid",
      "Jenis Yuran",
      "Jumlah",
      "Kaedah Bayaran",
      "Catatan"
    ];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#e2e8f0");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/**
 * 1. GET STUDENTS (Sheet MURID)
 */
function getStudents() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = setupMuridSheet(ss);
  
  var data = sheet.getDataRange().getDisplayValues();
  if (data.length <= 1) return [];
  
  var students = [];
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var nama = String(row[1] || "").trim();
    if (!nama) continue;
    
    var bilNum = parseInt(row[0], 10);
    if (isNaN(bilNum)) bilNum = i;

    var wa = String(row[4] || "").trim();
    if (wa.indexOf("'") === 0) wa = wa.substring(1);
    
    students.push({
      bil: bilNum,
      nama: nama,
      kelas: String(row[2] || "").trim(),
      penjaga: String(row[3] || "").trim(),
      whatsapp: wa
    });
  }
  
  return students;
}

/**
 * 2. ADD STUDENT (Auto-generate Bil & Format WhatsApp sebagai TEKS)
 */
function addStudent(payload) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = setupMuridSheet(ss);
    
    if (!payload || !payload.nama) {
      return { success: false, message: "Nama murid adalah wajib." };
    }
    
    var students = getStudents();
    var maxBil = 0;
    for (var i = 0; i < students.length; i++) {
      if (students[i].bil > maxBil) maxBil = students[i].bil;
    }
    var nextBil = maxBil + 1;
    
    var rawWa = String(payload.whatsapp || "").trim();
    if (rawWa.indexOf("'") === 0) rawWa = rawWa.substring(1);
    var formattedWaText = "'" + rawWa;
    
    var rowData = [
      nextBil,
      String(payload.nama).trim(),
      String(payload.kelas || "").trim(),
      String(payload.penjaga || "").trim(),
      formattedWaText
    ];
    
    sheet.appendRow(rowData);
    
    var newStudent = {
      bil: nextBil,
      nama: String(payload.nama).trim(),
      kelas: String(payload.kelas || "").trim(),
      penjaga: String(payload.penjaga || "").trim(),
      whatsapp: rawWa
    };
    
    return {
      success: true,
      message: "Murid berjaya ditambah.",
      student: newStudent
    };
  } catch (err) {
    return { success: false, message: "Ralat tambah murid: " + err.toString() };
  } finally {
    lock.releaseLock();
  }
}

/**
 * 3. UPDATE STUDENT
 */
function updateStudent(payload) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = setupMuridSheet(ss);
    var data = sheet.getDataRange().getDisplayValues();
    
    var targetBil = parseInt(payload.bil, 10);
    var rowIndex = -1;
    
    for (var i = 1; i < data.length; i++) {
      if (parseInt(data[i][0], 10) === targetBil) {
        rowIndex = i + 1;
        break;
      }
    }
    
    if (rowIndex === -1) {
      return { success: false, message: "Rekod murid tidak dijumpai." };
    }
    
    var rawWa = String(payload.whatsapp || "").trim();
    if (rawWa.indexOf("'") === 0) rawWa = rawWa.substring(1);
    
    sheet.getRange(rowIndex, 2).setValue(String(payload.nama).trim());
    sheet.getRange(rowIndex, 3).setValue(String(payload.kelas || "").trim());
    sheet.getRange(rowIndex, 4).setValue(String(payload.penjaga || "").trim());
    sheet.getRange(rowIndex, 5).setValue("'" + rawWa);
    
    return {
      success: true,
      message: "Rekod murid berjaya dikemaskini."
    };
  } catch (err) {
    return { success: false, message: "Ralat kemaskini murid: " + err.toString() };
  } finally {
    lock.releaseLock();
  }
}

/**
 * 4. DELETE STUDENT
 */
function deleteStudent(bil) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = setupMuridSheet(ss);
    var data = sheet.getDataRange().getDisplayValues();
    
    var targetBil = parseInt(bil, 10);
    var rowIndex = -1;
    
    for (var i = 1; i < data.length; i++) {
      if (parseInt(data[i][0], 10) === targetBil) {
        rowIndex = i + 1;
        break;
      }
    }
    
    if (rowIndex === -1) {
      return { success: false, message: "Rekod murid tidak dijumpai." };
    }
    
    sheet.deleteRow(rowIndex);
    
    return {
      success: true,
      message: "Murid berjaya dipadam."
    };
  } catch (err) {
    return { success: false, message: "Ralat padam murid: " + err.toString() };
  } finally {
    lock.releaseLock();
  }
}

/**
 * 5. GET PAYMENTS (Sheet BAYARAN - 8 Kolum)
 */
function getPayments() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = setupBayaranSheet(ss);
  
  var data = sheet.getDataRange().getDisplayValues();
  if (data.length <= 1) return [];
  
  var payments = [];
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (!row[0] && !row[2]) continue;
    
    payments.push({
      idBayaran: String(row[0] || ""),
      tarikh: String(row[1] || ""),
      noResit: String(row[2] || ""),
      namaMurid: String(row[3] || ""),
      jenisYuran: String(row[4] || ""),
      jumlah: parseFloat(row[5]) || 0,
      kaedahBayaran: String(row[6] || ""),
      catatan: String(row[7] || "")
    });
  }
  
  return payments.reverse();
}

/**
 * Auto Generator: ID Bayaran (BYR0001, BYR0002...)
 */
function generateNextPaymentId(sheet) {
  var data = sheet.getDataRange().getDisplayValues();
  var maxSeq = 0;
  
  if (data.length > 1) {
    for (var i = 1; i < data.length; i++) {
      var idStr = String(data[i][0] || "").trim();
      if (idStr.indexOf("BYR") === 0) {
        var seq = parseInt(idStr.replace("BYR", ""), 10);
        if (!isNaN(seq) && seq > maxSeq) {
          maxSeq = seq;
        }
      }
    }
  }
  
  var nextSeq = maxSeq + 1;
  var seqPadded = ("0000" + nextSeq).slice(-4);
  return "BYR" + seqPadded;
}

/**
 * Auto Generator: No Resit (RESIT-YYYY-0001, RESIT-YYYY-0002...)
 */
function generateNextReceiptNo(sheet, year) {
  var data = sheet.getDataRange().getDisplayValues();
  var prefix = "RESIT-" + year + "-";
  var maxSeq = 0;
  
  if (data.length > 1) {
    for (var i = 1; i < data.length; i++) {
      var rcptStr = String(data[i][2] || "").trim();
      if (rcptStr.indexOf(prefix) === 0) {
        var parts = rcptStr.split("-");
        if (parts.length === 3) {
          var seq = parseInt(parts[2], 10);
          if (!isNaN(seq) && seq > maxSeq) {
            maxSeq = seq;
          }
        }
      }
    }
  }
  
  var nextSeq = maxSeq + 1;
  var seqPadded = ("0000" + nextSeq).slice(-4);
  return prefix + seqPadded;
}

/**
 * 6. ADD PAYMENT (Simpan ke 8 kolum A..H sheet BAYARAN)
 */
function addPayment(payload) {
  var lock = LockService.getScriptLock();
  try {
    var success = lock.waitLock(30000);
    if (!success) {
      return { success: false, message: "Sistem sibuk. Sila cuba sebentar lagi." };
    }
    
    if (!payload || !payload.namaMurid || !payload.jenisYuran || !payload.jumlah || !payload.kaedahBayaran) {
      return { success: false, message: "Sila lengkapkan maklumat wajib." };
    }
    
    var jumlahNum = parseFloat(payload.jumlah);
    if (isNaN(jumlahNum) || jumlahNum <= 0) {
      return { success: false, message: "Sila masukkan jumlah bayaran yang sah." };
    }
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = setupBayaranSheet(ss);
    
    // Format Tarikh
    var formattedDate = payload.tarikh || "";
    var year = new Date().getFullYear();
    if (formattedDate.indexOf("-") !== -1) {
      var parts = formattedDate.split("-");
      if (parts.length === 3) {
        year = parts[0];
        formattedDate = parts[2] + "/" + parts[1] + "/" + parts[0];
      }
    } else if (!formattedDate) {
      formattedDate = Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), "dd/MM/yyyy");
    }
    
    var idBayaran = generateNextPaymentId(sheet);
    var noResit = generateNextReceiptNo(sheet, year);
    
    // 8 Kolum Tepat: A=ID, B=Tarikh, C=No Resit, D=Nama Murid, E=Jenis Yuran, F=Jumlah, G=Kaedah Bayaran, H=Catatan
    var rowData = [
      idBayaran,
      formattedDate,
      noResit,
      String(payload.namaMurid).trim(),
      String(payload.jenisYuran).trim(),
      jumlahNum,
      String(payload.kaedahBayaran).trim(),
      String(payload.catatan || "").trim()
    ];
    
    sheet.appendRow(rowData);
    
    // Dapatkan data murid daripada sheet MURID untuk respons resit
    var students = getStudents();
    var studentInfo = { kelas: payload.kelas || "-", penjaga: payload.penjaga || "-", whatsapp: payload.whatsapp || "-" };
    for (var k = 0; k < students.length; k++) {
      if (students[k].nama.toLowerCase() === String(payload.namaMurid).trim().toLowerCase()) {
        studentInfo = students[k];
        break;
      }
    }
    
    var savedPayment = {
      idBayaran: idBayaran,
      tarikh: formattedDate,
      noResit: noResit,
      namaMurid: String(payload.namaMurid).trim(),
      kelas: studentInfo.kelas || "-",
      namaPenjaga: studentInfo.penjaga || "-",
      noWhatsapp: studentInfo.whatsapp || "-",
      jenisYuran: String(payload.jenisYuran).trim(),
      jumlah: jumlahNum,
      kaedahBayaran: String(payload.kaedahBayaran).trim(),
      catatan: String(payload.catatan || "").trim()
    };
    
    return {
      success: true,
      message: "Bayaran berjaya direkodkan.",
      payment: savedPayment
    };
    
  } catch (error) {
    return { success: false, message: "Ralat semasa menyimpan: " + error.toString() };
  } finally {
    lock.releaseLock();
  }
}

/**
 * 7. GET DASHBOARD DATA
 */
function getDashboardData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  setupBayaranSheet(ss);
  setupMuridSheet(ss);
  
  var students = getStudents();
  var payments = getPayments();
  
  var today = new Date();
  var todayStr = Utilities.formatDate(today, ss.getSpreadsheetTimeZone(), "dd/MM/yyyy");
  var currentMonth = Utilities.formatDate(today, ss.getSpreadsheetTimeZone(), "MM/yyyy");
  
  var jumlahKeseluruhan = 0;
  var jumlahHariIni = 0;
  var jumlahBulanIni = 0;
  
  for (var i = 0; i < payments.length; i++) {
    var p = payments[i];
    var amt = parseFloat(p.jumlah) || 0;
    jumlahKeseluruhan += amt;
    
    if (p.tarikh === todayStr) {
      jumlahHariIni += amt;
    }
    
    if (p.tarikh && p.tarikh.length === 10) {
      var monthPart = p.tarikh.substring(3);
      if (monthPart === currentMonth) {
        jumlahBulanIni += amt;
      }
    }
  }
  
  return {
    jumlahMurid: students.length,
    jumlahHariIni: jumlahHariIni,
    jumlahBulanIni: jumlahBulanIni,
    jumlahKeseluruhan: jumlahKeseluruhan,
    bilanganTransaksi: payments.length,
    transaksiTerkini: payments.slice(0, 5)
  };
}

/**
 * ==============================================================================
 * FUNGSI UJIAN (Boleh dijalankan terus dalam Google Apps Script Editor)
 * ==============================================================================
 */

/**
 * Ujian 1: Sedia Header Sheet MURID dan BAYARAN
 */
function testSetupSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  setupMuridSheet(ss);
  setupBayaranSheet(ss);
  Logger.log("Penyediaan Sheet MURID dan BAYARAN selesai.");
}

/**
 * Ujian 2: Uji Tambah Murid
 */
function testAddStudent() {
  var res = addStudent({
    nama: "ALI",
    kelas: "3QA",
    penjaga: "UMAR",
    whatsapp: "0134565245"
  });
  Logger.log("Hasil tambah murid: " + JSON.stringify(res));
}

/**
 * Ujian 3: Uji Tambah Bayaran
 */
function testAddPayment() {
  var res = addPayment({
    namaMurid: "ALI",
    jenisYuran: "Yuran Bulanan",
    jumlah: 50.00,
    kaedahBayaran: "Online Transfer",
    catatan: "Ujian Bayaran"
  });
  Logger.log("Hasil tambah bayaran: " + JSON.stringify(res));
}
