/**
 * ==============================================================================
 * SISTEM PEMBAYARAN YURAN & RESIT DIGITAL FATHUL QURANIC CENTRE (FQC)
 * ==============================================================================
 * Backend Google Apps Script (Code.gs)
 * Spreadsheet ID: 1ahZXkijsmqPD5MDHcBGSXgp4HR0R1NDi4rUx4NH-nho
 */

const CONFIG = {
  spreadsheetId: "1ahZXkijsmqPD5MDHcBGSXgp4HR0R1NDi4rUx4NH-nho",
  studentSheet: "MURID",
  paymentSheet: "PEMBAYARAN",
  specialRatesSheet: "HARGA_KHAS",
  centreName: "Fathul Quranic Centre (FQC) (NS0326067-A)",
  receiptPrefix: "FQC-",
  startReceiptNo: 1100
};

// Master Data 28 Murid FQC Terbaharu
const MASTER_STUDENTS = [
  { id: 1, nama: "Syed Mohd Alwi Bin Syed Mohamed", phone: "0145366009", status: "AKTIF" },
  { id: 2, nama: "Faid Fareed Bin Mohd Shah Fitri", phone: "01481810192", status: "AKTIF" },
  { id: 3, nama: "Mohd Fadzli Bin Ab Wahab", phone: "01133323707", status: "AKTIF" },
  { id: 4, nama: "Nur Aliyah Binti Muhammad A'fifi", phone: "0133447681", status: "AKTIF" },
  { id: 5, nama: "Nur Inas Tihani Binti Muhammed Nasri", phone: "0179378264", status: "AKTIF" },
  { id: 6, nama: "Fidatul Fitriah Binti Fazli", phone: "0176826787", status: "AKTIF" },
  { id: 7, nama: "Nur Damia Arissa Bt Faizol Azimi", phone: "0132955402", status: "AKTIF" },
  { id: 8, nama: "Alya Sofia Binti Aris", phone: "0173235786", status: "AKTIF" },
  { id: 9, nama: "Tengku Aqill Hafy Bin Tengku Shahrizal", phone: "0133440896", status: "AKTIF" },
  { id: 10, nama: "Muhammad Aathif Adhwa Bin Mohd Fazli", phone: "0123209953", status: "AKTIF" },
  { id: 11, nama: "Nur Aimy Safiy Binti Shaiful Azmi", phone: "0108901030", status: "AKTIF" },
  { id: 12, nama: "Muhammad Harith Bin Muhamad Hosni", phone: "0173409430", status: "AKTIF" },
  { id: 13, nama: "Nur Ayesha Zahira Binti Abdullah Zawawie", phone: "0132410737", status: "AKTIF" },
  { id: 14, nama: "Wan Nadzrin Afeef Bin Wan Ibrahim Jefri", phone: "01110081660", status: "AKTIF" },
  { id: 15, nama: "Hilal Sufi Bin Hasrull Nizam", phone: "0193593693", status: "AKTIF" },
  { id: 16, nama: "Maira Yusreena Binti Muhamad Yazid", phone: "0129878510", status: "AKTIF" },
  { id: 17, nama: "Izz Zara Sofia Binti Mohd Safarudin", phone: "0162710027", status: "AKTIF" },
  { id: 18, nama: "Ammar Luqman Bin Shamsudin", phone: "0172382980", status: "AKTIF" },
  { id: 19, nama: "Ainan Salsabila Binti Hafiz Anuar", phone: "0139311818", status: "AKTIF" },
  { id: 20, nama: "Arissa Medina Bt Ahmad Fauzi", phone: "0129425926", status: "AKTIF" },
  { id: 21, nama: "Ammar Ramadhan Bin Ahmad Fauzi", phone: "0129425926", status: "AKTIF" },
  { id: 22, nama: "Muhammad Rizal Arshad Bin Mohd Rosmizam", phone: "0129343676", status: "AKTIF" },
  { id: 23, nama: "Nur Raisha Adawiyah Binti Mohd Rosmizam", phone: "0129343676", status: "AKTIF" },
  { id: 24, nama: "Aisyah Humaira Bt Lukman", phone: "0196550670", status: "AKTIF" },
  { id: 25, nama: "Izarra Khaiyrra Bt Mohd Aris", phone: "0199872971", status: "AKTIF" },
  { id: 26, nama: "Ahmad Aariz Dayyan B. Mohd Kamalludin", phone: "0132315660", status: "AKTIF" },
  { id: 27, nama: "Nur Aisya' Qaseh Bt Aziman", phone: "0179890260", status: "AKTIF" },
  { id: 28, nama: "NAJIHAH", phone: "0134565245", status: "AKTIF" }
];

/**
 * Helper untuk dapatkan Spreadsheet
 */
function getSpreadsheet() {
  if (CONFIG.spreadsheetId) {
    try {
      var ss = SpreadsheetApp.openById(CONFIG.spreadsheetId);
      if (ss) return ss;
    } catch (e) {
      Logger.log("Error opening by ID: " + e.toString());
    }
  }
  try {
    return SpreadsheetApp.getActiveSpreadsheet();
  } catch (e) {
    Logger.log("Error getActiveSpreadsheet: " + e.toString());
    return null;
  }
}

/**
 * Handle HTTP GET Requests
 */
function doGet(e) {
  var action = (e && e.parameter) ? e.parameter.action : null;
  
  if (action === "getStudents") {
    return createJsonResponse({ success: true, data: getStudents() });
  } else if (action === "getPayments" || action === "getPaymentHistory") {
    return createJsonResponse({ success: true, data: getPaymentHistory() });
  } else if (action === "getSpecialRates") {
    return createJsonResponse({ success: true, data: getSpecialRates() });
  } else if (action === "getNextReceiptNumber") {
    return createJsonResponse({ success: true, data: getNextReceiptNumber() });
  } else if (action === "getDashboardData") {
    return createJsonResponse({ success: true, data: getDashboardData() });
  } else if (action === "setup") {
    return createJsonResponse(setupDatabase());
  }

  // Paparan Web App Google Apps Script
  try {
    return HtmlService.createTemplateFromFile("Index")
      .evaluate()
      .setTitle("SISTEM PEMBAYARAN YURAN - FATHUL QURANIC CENTRE (FQC)")
      .addMetaTag("viewport", "width=device-width, initial-scale=1.0")
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } catch (err) {
    try {
      return HtmlService.createTemplateFromFile("index")
        .evaluate()
        .setTitle("SISTEM PEMBAYARAN YURAN - FATHUL QURANIC CENTRE (FQC)")
        .addMetaTag("viewport", "width=device-width, initial-scale=1.0")
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    } catch (err2) {
      return HtmlService.createHtmlOutput(
        "<h2>SISTEM PEMBAYARAN YURAN FQC - API AKTIF</h2>" +
        "<p>Web App API sedia menerima permintaan daripada aplikasi Web Pembayaran Yuran.</p>"
      );
    }
  }
}

/**
 * Handle HTTP POST Requests (CORS API)
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
    } else if (action === "savePayment") {
      result = savePayment(payload);
    } else if (action === "getNextReceiptNumber") {
      result = { success: true, data: getNextReceiptNumber() };
    } else if (action === "getPaymentHistory") {
      result = { success: true, data: getPaymentHistory() };
    } else if (action === "getDashboardData") {
      result = { success: true, data: getDashboardData() };
    } else if (action === "setupDatabase") {
      result = setupDatabase();
    }

    return createJsonResponse(result);
  } catch (error) {
    return createJsonResponse({ success: false, message: "Ralat Server: " + error.toString() });
  }
}

/**
 * Helper JSON Response
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 1. setupDatabase()
 * Menyiapkan sheet MURID dan PEMBAYARAN beserta data awal murid FQC
 */
function setupDatabase() {
  try {
    var ss = getSpreadsheet();
    if (!ss) return { success: false, message: "Spreadsheet tidak ditemui." };

    // --- SETUP SHEET MURID ---
    var sheetMurid = ss.getSheetByName(CONFIG.studentSheet);
    if (!sheetMurid) {
      sheetMurid = ss.insertSheet(CONFIG.studentSheet);
    }
    
    // Format semula Sheet MURID dengan susunan kolom rasmi: ID | NAMA MURID | NO WHATSAPP PARENT | STATUS
    sheetMurid.clearContents();
    
    var headersMurid = ["ID", "NAMA MURID", "NO WHATSAPP PARENT", "STATUS"];
    sheetMurid.appendRow(headersMurid);
    
    var headerRangeMurid = sheetMurid.getRange(1, 1, 1, 4);
    headerRangeMurid.setBackground("#1b5e20")
                      .setFontColor("#ffffff")
                      .setFontWeight("bold")
                      .setHorizontalAlignment("center");
    sheetMurid.setFrozenRows(1);

    // Format Kolom C (No WhatsApp) sebagai Text '@' untuk simpan 0 di hadapan
    sheetMurid.getRange("C:C").setNumberFormat("@");

    // Masukkan data 38 murid master lengkap
    for (var i = 0; i < MASTER_STUDENTS.length; i++) {
      var s = MASTER_STUDENTS[i];
      sheetMurid.appendRow([s.id, s.nama, "'" + s.phone, s.status]);
    }

    // Auto Column Width Murid
    sheetMurid.setColumnWidth(1, 60);
    sheetMurid.setColumnWidth(2, 380);
    sheetMurid.setColumnWidth(3, 180);
    sheetMurid.setColumnWidth(4, 100);

    // --- SETUP SHEET HARGA_KHAS ---
    var sheetHargaKhas = ss.getSheetByName(CONFIG.specialRatesSheet);
    if (!sheetHargaKhas) {
      sheetHargaKhas = ss.insertSheet(CONFIG.specialRatesSheet);
    }
    if (sheetHargaKhas.getLastRow() === 0) {
      var headersHargaKhas = [
        "NAMA MURID", "JENIS YURAN", "HARGA STANDARD", "HARGA KHAS", "DISKAUN", "SEBAB", "TARIKH MULA", "TARIKH TAMAT", "STATUS"
      ];
      sheetHargaKhas.appendRow(headersHargaKhas);
      var headerRangeHK = sheetHargaKhas.getRange(1, 1, 1, headersHargaKhas.length);
      headerRangeHK.setBackground("#d97706")
                   .setFontColor("#ffffff")
                   .setFontWeight("bold")
                   .setHorizontalAlignment("center");
      sheetHargaKhas.setFrozenRows(1);

      // Contoh rekod awal
      sheetHargaKhas.appendRow(["Nur A", "Kelas Mengaji", 130, 100, 30, "Harga Khas Murid", "01/08/2026", "", "AKTIF"]);
      sheetHargaKhas.appendRow(["Nur B", "Transit FQC", 260, 200, 60, "Diskaun Pengurusan", "01/08/2026", "", "AKTIF"]);
    }

    return {
      success: true,
      message: "Database FQC & Sheet HARGA_KHAS berjaya dikemaskini!"
    };
  } catch (err) {
    return { success: false, message: "Ralat Setup: " + err.toString() };
  }
}

/**
 * Dapatkan senarai harga khas murid dari Sheet HARGA_KHAS
 */
function getSpecialRates() {
  try {
    var ss = getSpreadsheet();
    var sheet = ss.getSheetByName(CONFIG.specialRatesSheet);
    if (!sheet || sheet.getLastRow() <= 1) return [];

    var values = sheet.getRange(2, 1, sheet.getLastRow() - 1, 9).getValues();
    var list = [];
    for (var i = 0; i < values.length; i++) {
      var row = values[i];
      if (row[0] && (row[8] ? row[8].toString().toUpperCase() : "AKTIF") !== "TIDAK AKTIF") {
        list.push({
          namaMurid: row[0].toString().trim(),
          jenisYuran: row[1].toString().trim(),
          hargaStandard: parseFloat(row[2]) || 0,
          hargaKhas: parseFloat(row[3]) || 0,
          diskaun: parseFloat(row[4]) || 0,
          sebab: row[5] ? row[5].toString().trim() : "",
          tarikhMula: row[6] ? row[6].toString().trim() : "",
          tarikhTamat: row[7] ? row[7].toString().trim() : "",
          status: row[8] ? row[8].toString().trim() : "AKTIF"
        });
      }
    }
    return list;
  } catch (e) {
    return [];
  }
}

/**
 * 2. getStudents()
 * Mengambil senarai murid dari Sheet MURID mengikut susunan asal Google Sheets
 */
function getStudents() {
  try {
    var ss = getSpreadsheet();
    var sheet = ss.getSheetByName(CONFIG.studentSheet);
    
    if (!sheet || sheet.getLastRow() <= 1) {
      return MASTER_STUDENTS;
    }

    var lastRow = sheet.getLastRow();
    var values = sheet.getRange(2, 1, lastRow - 1, 4).getValues();
    var students = [];

    for (var i = 0; i < values.length; i++) {
      var row = values[i];
      var colA = row[0] ? row[0].toString().trim() : "";
      var colB = row[1] ? row[1].toString().trim() : "";
      var colC = row[2] ? row[2].toString().trim() : "";
      var colD = row[3] ? row[3].toString().trim() : "";

      var nama = "";
      var phone = "";
      var status = "AKTIF";

      // Tentukan Kolom Nama & Phone secara dinamik
      if (colB && isNaN(colB)) {
        nama = colB;
        phone = colC;
        status = colD || "AKTIF";
      } else if (colA && isNaN(colA)) {
        nama = colA;
        phone = colB;
        status = colC || "AKTIF";
      }

      if (nama && nama.toUpperCase() !== "NAMA MURID" && nama.toUpperCase() !== "NAMA" && status.toUpperCase() !== "TIDAK AKTIF") {
        students.push({
          id: i + 1,
          nama: nama,
          phone: phone,
          status: status
        });
      }
    }

    if (students.length > 0) {
      return students;
    }
    return MASTER_STUDENTS;
  } catch (err) {
    Logger.log("Error getStudents: " + err.toString());
    return MASTER_STUDENTS;
  }
}

/**
 * 3. getNextReceiptNumber()
 * Menjana Nombor Resit Unik Seterusnya (cth: FQC-1100, FQC-1101...)
 */
function getNextReceiptNumber() {
  try {
    var ss = getSpreadsheet();
    var sheet = ss.getSheetByName(CONFIG.paymentSheet);
    
    if (!sheet || sheet.getLastRow() <= 1) {
      return CONFIG.receiptPrefix + CONFIG.startReceiptNo;
    }

    var lastRow = sheet.getLastRow();
    var lastVal = sheet.getRange(lastRow, 2).getValue().toString().trim();
    var numOnly = lastVal.replace(/[^0-9]/g, '');
    
    if (numOnly) {
      var nextNo = parseInt(numOnly, 10) + 1;
      if (nextNo >= CONFIG.startReceiptNo) {
        return CONFIG.receiptPrefix + nextNo;
      }
    }

    return CONFIG.receiptPrefix + (CONFIG.startReceiptNo + lastRow - 1);
  } catch (e) {
    return CONFIG.receiptPrefix + CONFIG.startReceiptNo;
  }
}

/**
 * 4. checkDuplicateReceipt(noResit)
 */
function checkDuplicateReceipt(noResit) {
  return false;
}

/**
 * 5. savePayment(data)
 * Menyimpan rekod pembayaran secara kilat (pantas < 1 saat)
 */
function savePayment(data) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);

    var ss = getSpreadsheet();
    var sheet = ss.getSheetByName(CONFIG.paymentSheet);

    if (!sheet) {
      setupDatabase();
      sheet = ss.getSheetByName(CONFIG.paymentSheet);
    }

    var noResit = data.noResit;
    if (!noResit) {
      noResit = getNextReceiptNumber();
    }

    var timestamp = new Date();
    var tarikh = data.tarikh || Utilities.formatDate(timestamp, Session.getScriptTimeZone() || "GMT+8", "dd/MM/yyyy");
    var bulan = data.bulan || "";
    var namaMurid = data.namaMurid || "";
    var noWhatsapp = data.noWhatsapp || "";

    var pendaftaran = parseFloat(data.pendaftaran) || 0;
    var pengajianAlquran = parseFloat(data.pengajianAlquran) || 0;
    var kelasUpkk = parseFloat(data.kelasUpkk) || 0;
    var kelasPsra = parseFloat(data.kelasPsra) || 0;
    var kelasKhasJawi = parseFloat(data.kelasKhasJawi) || 0;
    var bukuRekodModul = parseFloat(data.bukuRekodModul) || 0;
    var sumbangan = parseFloat(data.sumbangan) || 0;
    var kelasKafa = parseFloat(data.kelasKafa) || 0;
    var kelasAkademik = parseFloat(data.kelasAkademik) || 0;
    var transit = parseFloat(data.transit) || 0;

    var jumlah = parseFloat(data.jumlah) || (
      pendaftaran + pengajianAlquran + kelasUpkk + kelasPsra + kelasKhasJawi +
      bukuRekodModul + sumbangan + kelasKafa + kelasAkademik + transit
    );

    var kaedahBayaran = data.kaedahBayaran || "TUNAI";
    var catatan = data.catatan || "";
    var status = "BERJAYA";
    var linkResit = data.linkResit || "";

    var newRow = [
      timestamp,
      noResit,
      tarikh,
      bulan,
      namaMurid,
      "'" + noWhatsapp,
      pendaftaran,
      pengajianAlquran,
      kelasUpkk,
      kelasPsra,
      kelasKhasJawi,
      bukuRekodModul,
      sumbangan,
      kelasKafa,
      kelasAkademik,
      transit,
      jumlah,
      kaedahBayaran,
      catatan,
      status,
      linkResit
    ];

    sheet.appendRow(newRow);

    return {
      success: true,
      message: "Pembayaran berjaya disimpan ke Google Sheets!",
      noResit: noResit,
      jumlah: jumlah,
      data: {
        timestamp: timestamp,
        noResit: noResit,
        tarikh: tarikh,
        bulan: bulan,
        namaMurid: namaMurid,
        noWhatsapp: noWhatsapp,
        jumlah: jumlah,
        kaedahBayaran: kaedahBayaran,
        catatan: catatan
      }
    };
  } catch (err) {
    Logger.log("Error savePayment: " + err.toString());
    return {
      success: false,
      message: "Gagal menyimpan pembayaran: " + err.toString()
    };
  } finally {
    lock.releaseLock();
  }
}

/**
 * 6. getPaymentHistory()
 * Mengambil senarai rekod pembayaran dari Sheet PEMBAYARAN
 */
function getPaymentHistory() {
  try {
    var ss = getSpreadsheet();
    var sheet = ss.getSheetByName(CONFIG.paymentSheet);
    if (!sheet || sheet.getLastRow() <= 1) return [];

    var values = sheet.getRange(2, 1, sheet.getLastRow() - 1, 21).getValues();
    var history = [];

    for (var i = values.length - 1; i >= 0; i--) { // Susun terkini di atas
      var row = values[i];
      if (row[1]) { // Jika ada No Resit
        var dateFormatted = row[2];
        if (row[0] instanceof Date && !row[2]) {
          dateFormatted = Utilities.formatDate(row[0], Session.getScriptTimeZone() || "GMT+8", "dd/MM/yyyy");
        }

        history.push({
          timestamp: row[0],
          noResit: row[1] ? row[1].toString().trim() : "",
          tarikh: dateFormatted ? dateFormatted.toString() : "",
          bulan: row[3] ? row[3].toString() : "",
          namaMurid: row[4] ? row[4].toString() : "",
          noWhatsapp: row[5] ? row[5].toString().replace(/^'/, '') : "",
          pendaftaran: parseFloat(row[6]) || 0,
          pengajianAlquran: parseFloat(row[7]) || 0,
          kelasUpkk: parseFloat(row[8]) || 0,
          kelasPsra: parseFloat(row[9]) || 0,
          kelasKhasJawi: parseFloat(row[10]) || 0,
          bukuRekodModul: parseFloat(row[11]) || 0,
          sumbangan: parseFloat(row[12]) || 0,
          kelasKafa: parseFloat(row[13]) || 0,
          kelasAkademik: parseFloat(row[14]) || 0,
          transit: parseFloat(row[15]) || 0,
          jumlah: parseFloat(row[16]) || 0,
          kaedahBayaran: row[17] ? row[17].toString() : "TUNAI",
          catatan: row[18] ? row[18].toString() : "",
          status: row[19] ? row[19].toString() : "BERJAYA",
          linkResit: row[20] ? row[20].toString() : ""
        });
      }
    }

    return history;
  } catch (err) {
    Logger.log("Error getPaymentHistory: " + err.toString());
    return [];
  }
}

/**
 * 7. getPaymentByReceipt(noResit)
 */
function getPaymentByReceipt(noResit) {
  var history = getPaymentHistory();
  for (var i = 0; i < history.length; i++) {
    if (history[i].noResit.toUpperCase() === noResit.toUpperCase()) {
      return history[i];
    }
  }
  return null;
}

/**
 * 8. getDashboardData()
 * Mengira statistik untuk Dashboard Utama
 */
function getDashboardData() {
  try {
    var history = getPaymentHistory();
    var students = getStudents();

    var todayStr = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || "GMT+8", "dd/MM/yyyy");
    var currentMonthIdx = new Date().getMonth();
    var monthsMalay = ["JANUARI", "FEBRUARI", "MAC", "APRIL", "MEI", "JUN", "JULAI", "OGOS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DISEMBER"];
    var currentMonthMalay = monthsMalay[currentMonthIdx];

    var totalToday = 0;
    var totalMonth = 0;
    var totalTransactions = history.length;
    var totalStudents = students.length;

    for (var i = 0; i < history.length; i++) {
      var item = history[i];
      
      // Kira Hari Ini
      if (item.tarikh === todayStr) {
        totalToday += item.jumlah;
      }

      // Kira Bulan Ini
      if (item.bulan && item.bulan.toUpperCase() === currentMonthMalay) {
        totalMonth += item.jumlah;
      }
    }

    return {
      totalToday: totalToday,
      totalMonth: totalMonth,
      totalTransactions: totalTransactions,
      totalStudents: totalStudents,
      recentPayments: history.slice(0, 5)
    };
  } catch (err) {
    return {
      totalToday: 0,
      totalMonth: 0,
      totalTransactions: 0,
      totalStudents: 38,
      recentPayments: []
    };
  }
}
