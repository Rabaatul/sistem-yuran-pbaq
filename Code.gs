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
  centreName: "FATHUL QURANIC CENTRE (FQC)",
  receiptPrefix: "FQC-",
  startReceiptNo: 1100
};

// Master Data 38 Murid FQC
const MASTER_STUDENTS = [
  { id: 1, nama: "Nur Farha Binti Mohd Fairoze Mazly", phone: "0179890260", status: "AKTIF" },
  { id: 2, nama: "Nur Aisya’ Qaseh Binti Aziman", phone: "0133440896", status: "AKTIF" },
  { id: 3, nama: "Nur Raisha Az-Zahra Binti Jiekie", phone: "0193866867", status: "AKTIF" },
  { id: 4, nama: "Muhammad Irfan Shafie Bin Kamarul", phone: "0196959040", status: "AKTIF" },
  { id: 5, nama: "Muhammad Harith Bin Muhamad Hosni", phone: "0193332054", status: "AKTIF" },
  { id: 6, nama: "Nik Mus’ab Az-Zhafran Bin Ahmad Faidhul Irfan", phone: "0133484008", status: "AKTIF" },
  { id: 7, nama: "Muhammad Zayyan Nawfal Bin Shahrul Azmi", phone: "0192826203", status: "AKTIF" },
  { id: 8, nama: "Fadhil Lutfi Bin Ali Imran", phone: "0123647289", status: "AKTIF" },
  { id: 9, nama: "Syahira Aneesa Binti Ahmad Radzi", phone: "0192885947", status: "AKTIF" },
  { id: 10, nama: "Abdul Aziz Bin Mohd Razali", phone: "0173184593", status: "AKTIF" },
  { id: 11, nama: "Tengku Aqill Hafy Bin Tengku Shahrizal", phone: "0179042049", status: "AKTIF" },
  { id: 12, nama: "Aisyahtul Aufa Raihanah Binti Mohd Riduan", phone: "0126224611", status: "AKTIF" },
  { id: 13, nama: "Muhammad Ainul Mubarok Asy’ari Bin Kosim", phone: "0133943310", status: "AKTIF" },
  { id: 14, nama: "Nur Qisya Damia Binti Mohamad Khairi", phone: "0162912079", status: "AKTIF" },
  { id: 15, nama: "Muhammad Al Fateh Bin Mohd Firdaus", phone: "0126063578", status: "AKTIF" },
  { id: 16, nama: "Muhammad Syauqi Bin Norsyam", phone: "0176840534", status: "AKTIF" },
  { id: 17, nama: "Nur Sarah Ardhilya Binti Mohd Sufian", phone: "0123606852", status: "AKTIF" },
  { id: 18, nama: "Alya Sofia Binti Aris", phone: "0173235786", status: "AKTIF" },
  { id: 19, nama: "Muhammad Adam Rizq Bin Muhammad Jazuli", phone: "01110340606", status: "AKTIF" },
  { id: 20, nama: "Muhammad Saeed Bin Muhammad Ridhwan", phone: "0129220073", status: "AKTIF" },
  { id: 21, nama: "Maryam Sumayyah Binti Muhammad Javed Butt", phone: "0109294407", status: "AKTIF" },
  { id: 22, nama: "Wan Anaqi Ziqri Bin Wan Sulaiman", phone: "0197751085", status: "AKTIF" },
  { id: 23, nama: "Muhammad Darwisy Haikal Bin Muhammad Ellias", phone: "0126362359", status: "AKTIF" },
  { id: 24, nama: "Muhammad Nur Firash Bin Muhammad Nur Fitri", phone: "0122528736", status: "AKTIF" },
  { id: 25, nama: "Shafy Baaqir Bin Shahrul Nizam", phone: "0166247850", status: "AKTIF" },
  { id: 26, nama: "Nur Amni Syuhada Binti Mohd Nor Safuan", phone: "0163819439", status: "AKTIF" },
  { id: 27, nama: "Hani Sofia Binti Mohd Afwaz", phone: "0126765247", status: "AKTIF" },
  { id: 28, nama: "Arissa Medina Binti Ahmad Fauzi", phone: "0129425926", status: "AKTIF" },
  { id: 29, nama: "Muhammad Rizal Arshad Bin Mohd Rosmizam", phone: "0129343676", status: "AKTIF" },
  { id: 30, nama: "Ainan Salsabila Binti Hafiz Anuar", phone: "0139311818", status: "AKTIF" },
  { id: 31, nama: "Ammar Rifqi Bin Apandi", phone: "0129324167", status: "AKTIF" },
  { id: 32, nama: "Rayyan Kalif Bin Rafizi", phone: "0134471546", status: "AKTIF" },
  { id: 33, nama: "Muhammad Eizzuddin", phone: "0196804101 / 0196493646", status: "AKTIF" },
  { id: 34, nama: "Muhammad Aqil Raziq Bin Zul Azlan", phone: "0123038634", status: "AKTIF" },
  { id: 35, nama: "Che Aqil Rayqal Bin Hafizul Ariffin", phone: "0126648853", status: "AKTIF" },
  { id: 36, nama: "Muhammad Aryan Ziqri Bin Md Zahid", phone: "0193853222", status: "AKTIF" },
  { id: 37, nama: "Muhammad Al Hafiz Bin Mohd Zin", phone: "0192248326", status: "AKTIF" },
  { id: 38, nama: "NAJIHAH", phone: "0134565245", status: "AKTIF" },
  { id: 39, nama: "FUDLAA", phone: "0139436009", status: "AKTIF" }
];

/**
 * Helper untuk dapatkan Spreadsheet
 */
function getSpreadsheet() {
  if (CONFIG.spreadsheetId) {
    try {
      return SpreadsheetApp.openById(CONFIG.spreadsheetId);
    } catch (e) {
      Logger.log("Error opening by ID: " + e.toString());
    }
  }
  return SpreadsheetApp.getActiveSpreadsheet();
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

    // --- SETUP SHEET PEMBAYARAN ---
    var sheetPayment = ss.getSheetByName(CONFIG.paymentSheet);
    if (!sheetPayment) {
      sheetPayment = ss.insertSheet(CONFIG.paymentSheet);
    }

    if (sheetPayment.getLastRow() === 0) {
      var headersPayment = [
        "TIMESTAMP", "NO RESIT", "TARIKH", "BULAN", "NAMA MURID", "NO WHATSAPP",
        "PENDAFTARAN", "PENGAJIAN ALQURAN", "KELAS UPKK", "KELAS PSRA", "KELAS KHAS JAWI",
        "BUKU REKOD / MODUL", "SUMBANGAN", "KELAS KAFA", "KELAS AKADEMIK", "TRANSIT",
        "JUMLAH", "KAEDAH BAYARAN", "CATATAN", "STATUS", "LINK / ID RESIT"
      ];
      sheetPayment.appendRow(headersPayment);

      var headerRangePayment = sheetPayment.getRange(1, 1, 1, headersPayment.length);
      headerRangePayment.setBackground("#2e7d32")
                          .setFontColor("#ffffff")
                          .setFontWeight("bold")
                          .setHorizontalAlignment("center");
      sheetPayment.setFrozenRows(1);

      sheetPayment.getRange("F:F").setNumberFormat("@");
      sheetPayment.getRange("B:B").setNumberFormat("@");
    }

    return {
      success: true,
      message: "Database FQC berjaya dikemaskini & 38 data murid lengkap dimasukkan!"
    };
  } catch (err) {
    return { success: false, message: "Ralat Setup: " + err.toString() };
  }
}

/**
 * 2. getStudents()
 * Mengambil senarai murid aktif dari Sheet MURID
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

      var studentId = i + 1;
      var studentNama = "";
      var studentPhone = "";
      var studentStatus = "AKTIF";

      // Detect layout pintar:
      var cleanB = colB.replace(/[^0-9]/g, '');
      if (cleanB.length >= 8 && (cleanB.indexOf("01") === 0 || cleanB.indexOf("601") === 0)) {
        // Kes A: colA = Nama, colB = Phone
        studentNama = colA;
        studentPhone = colB;
        studentStatus = colC || "AKTIF";
      } else if (colB && isNaN(colB)) {
        // Kes B: colA = ID, colB = Nama, colC = Phone
        studentId = colA || (i + 1);
        studentNama = colB;
        studentPhone = colC;
        studentStatus = colD || "AKTIF";
      } else if (colA && isNaN(colA)) {
        // Kes C: colA = Nama
        studentNama = colA;
        studentPhone = colB;
        studentStatus = colC || "AKTIF";
      }

      if (studentNama && studentStatus.toUpperCase() !== "TIDAK AKTIF") {
        students.push({
          id: studentId,
          nama: studentNama,
          phone: studentPhone,
          status: studentStatus
        });
      }
    }

    // Sort mengikut nama
    students.sort(function(a, b) {
      return a.nama.localeCompare(b.nama);
    });

    return students;
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
    lock.waitLock(2000);

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
