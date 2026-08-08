/**
 * ==============================================================================
 * SISTEM PEMBAYARAN YURAN & RESIT DIGITAL FATHUL QURANIC CENTRE (FQC)
 * ==============================================================================
 * Backend Google Apps Script (Code.gs)
 * Spreadsheet ID: 1DsLcgM7PHMpgVd1MkPCtzCuKDWk0g007SgrDvBv3MTk
 * AppSheet Database Compatible Architecture
 */

const CONFIG = {
  spreadsheetId: "1DsLcgM7PHMpgVd1MkPCtzCuKDWk0g007SgrDvBv3MTk",
  studentSheet: "MURID",
  paymentSheet: "PEMBAYARAN",
  paymentDetailSheet: "BUTIRAN_PEMBAYARAN",
  feeSettingsSheet: "TETAPAN_YURAN",
  specialRatesSheet: "HARGA_KHAS",
  centreName: "Fathul Quranic Centre (FQC) (NS0326067-A)",
  receiptPrefix: "FQC-",
  startReceiptNo: 1100
};

// Master Data 28 Murid FQC Terbaharu
const MASTER_STUDENTS = [
  { id: 1, nama: "Syed Mohd Alwi Bin Syed Mohamed", parent: "Syed Mohamed", phone: "0145366009", status: "AKTIF", mengaji: "YA", transit: "TIDAK", jawi: "TIDAK", kafa: "TIDAK", upkk: "TIDAK", psra: "TIDAK", akademik: "TIDAK", online: "TIDAK", hargaMengaji: 100, hargaAkademik: 0, hargaTransit: 0, catatan: "" },
  { id: 2, nama: "Faid Fareed Bin Mohd Shah Fitri", parent: "Mohd Shah Fitri", phone: "01481810192", status: "AKTIF", mengaji: "YA", transit: "YA", jawi: "TIDAK", kafa: "TIDAK", upkk: "TIDAK", psra: "TIDAK", akademik: "TIDAK", online: "TIDAK", hargaMengaji: 100, hargaAkademik: 0, hargaTransit: 260, catatan: "" },
  { id: 3, nama: "Mohd Fadzli Bin Ab Wahab", parent: "Ab Wahab", phone: "01133323707", status: "AKTIF", mengaji: "YA", transit: "TIDAK", jawi: "TIDAK", kafa: "TIDAK", upkk: "TIDAK", psra: "TIDAK", akademik: "TIDAK", online: "TIDAK", hargaMengaji: 100, hargaAkademik: 0, hargaTransit: 0, catatan: "" },
  { id: 4, nama: "Nur Aliyah Binti Muhammad A'fifi", parent: "Muhammad A'fifi", phone: "0133447681", status: "AKTIF", mengaji: "YA", transit: "TIDAK", jawi: "TIDAK", kafa: "TIDAK", upkk: "TIDAK", psra: "TIDAK", akademik: "TIDAK", online: "TIDAK", hargaMengaji: 100, hargaAkademik: 0, hargaTransit: 0, catatan: "" },
  { id: 5, nama: "Nur Inas Tihani Binti Muhammed Nasri", parent: "Muhammed Nasri", phone: "0179378264", status: "AKTIF", mengaji: "YA", transit: "TIDAK", jawi: "TIDAK", kafa: "TIDAK", upkk: "TIDAK", psra: "TIDAK", akademik: "TIDAK", online: "TIDAK", hargaMengaji: 100, hargaAkademik: 0, hargaTransit: 0, catatan: "" },
  { id: 6, nama: "Fidatul Fitriah Binti Fazli", parent: "Fazli", phone: "0176826787", status: "AKTIF", mengaji: "YA", transit: "TIDAK", jawi: "TIDAK", kafa: "TIDAK", upkk: "TIDAK", psra: "TIDAK", akademik: "TIDAK", online: "TIDAK", hargaMengaji: 100, hargaAkademik: 0, hargaTransit: 0, catatan: "" },
  { id: 7, nama: "Nur Damia Arissa Bt Faizol Azimi", parent: "Faizol Azimi", phone: "0132955402", status: "AKTIF", mengaji: "YA", transit: "TIDAK", jawi: "TIDAK", kafa: "TIDAK", upkk: "TIDAK", psra: "TIDAK", akademik: "TIDAK", online: "TIDAK", hargaMengaji: 100, hargaAkademik: 0, hargaTransit: 0, catatan: "" },
  { id: 8, nama: "Alya Sofia Binti Aris", parent: "Aris", phone: "0173235786", status: "AKTIF", mengaji: "YA", transit: "TIDAK", jawi: "TIDAK", kafa: "TIDAK", upkk: "TIDAK", psra: "TIDAK", akademik: "TIDAK", online: "TIDAK", hargaMengaji: 100, hargaAkademik: 0, hargaTransit: 0, catatan: "" },
  { id: 9, nama: "Tengku Aqill Hafy Bin Tengku Shahrizal", parent: "Tengku Shahrizal", phone: "0133440896", status: "AKTIF", mengaji: "YA", transit: "TIDAK", jawi: "TIDAK", kafa: "TIDAK", upkk: "TIDAK", psra: "TIDAK", akademik: "TIDAK", online: "TIDAK", hargaMengaji: 100, hargaAkademik: 0, hargaTransit: 0, catatan: "" },
  { id: 10, nama: "Muhammad Aathif Adhwa Bin Mohd Fazli", parent: "Mohd Fazli", phone: "0123209953", status: "AKTIF", mengaji: "YA", transit: "TIDAK", jawi: "TIDAK", kafa: "TIDAK", upkk: "TIDAK", psra: "TIDAK", akademik: "TIDAK", online: "TIDAK", hargaMengaji: 100, hargaAkademik: 0, hargaTransit: 0, catatan: "" },
  { id: 11, nama: "Nur Aimy Safiy Binti Shaiful Azmi", parent: "Shaiful Azmi", phone: "0108901030", status: "AKTIF", mengaji: "YA", transit: "TIDAK", jawi: "TIDAK", kafa: "TIDAK", upkk: "TIDAK", psra: "TIDAK", akademik: "TIDAK", online: "TIDAK", hargaMengaji: 100, hargaAkademik: 0, hargaTransit: 0, catatan: "" },
  { id: 12, nama: "Muhammad Harith Bin Muhamad Hosni", parent: "Muhamad Hosni", phone: "0173409430", status: "AKTIF", mengaji: "YA", transit: "TIDAK", jawi: "TIDAK", kafa: "TIDAK", upkk: "TIDAK", psra: "TIDAK", akademik: "TIDAK", online: "TIDAK", hargaMengaji: 100, hargaAkademik: 0, hargaTransit: 0, catatan: "" },
  { id: 13, nama: "Nur Ayesha Zahira Binti Abdullah Zawawie", parent: "Abdullah Zawawie", phone: "0132410737", status: "AKTIF", mengaji: "YA", transit: "TIDAK", jawi: "TIDAK", kafa: "TIDAK", upkk: "TIDAK", psra: "TIDAK", akademik: "TIDAK", online: "TIDAK", hargaMengaji: 100, hargaAkademik: 0, hargaTransit: 0, catatan: "" },
  { id: 14, nama: "Wan Nadzrin Afeef Bin Wan Ibrahim Jefri", parent: "Wan Ibrahim Jefri", phone: "01110081660", status: "AKTIF", mengaji: "YA", transit: "TIDAK", jawi: "TIDAK", kafa: "TIDAK", upkk: "TIDAK", psra: "TIDAK", akademik: "TIDAK", online: "TIDAK", hargaMengaji: 100, hargaAkademik: 0, hargaTransit: 0, catatan: "" },
  { id: 15, nama: "Hilal Sufi Bin Hasrull Nizam", parent: "Hasrull Nizam", phone: "0193593693", status: "AKTIF", mengaji: "YA", transit: "TIDAK", jawi: "TIDAK", kafa: "TIDAK", upkk: "TIDAK", psra: "TIDAK", akademik: "TIDAK", online: "TIDAK", hargaMengaji: 100, hargaAkademik: 0, hargaTransit: 0, catatan: "" },
  { id: 16, nama: "Maira Yusreena Binti Muhamad Yazid", parent: "Muhamad Yazid", phone: "0129878510", status: "AKTIF", mengaji: "YA", transit: "TIDAK", jawi: "TIDAK", kafa: "TIDAK", upkk: "TIDAK", psra: "TIDAK", akademik: "TIDAK", online: "TIDAK", hargaMengaji: 100, hargaAkademik: 0, hargaTransit: 0, catatan: "" },
  { id: 17, nama: "Izz Zara Sofia Binti Mohd Safarudin", parent: "Mohd Safarudin", phone: "0162710027", status: "AKTIF", mengaji: "YA", transit: "TIDAK", jawi: "TIDAK", kafa: "TIDAK", upkk: "TIDAK", psra: "TIDAK", akademik: "TIDAK", online: "TIDAK", hargaMengaji: 100, hargaAkademik: 0, hargaTransit: 0, catatan: "" },
  { id: 18, nama: "Ammar Luqman Bin Shamsudin", parent: "Shamsudin", phone: "0172382980", status: "AKTIF", mengaji: "YA", transit: "TIDAK", jawi: "TIDAK", kafa: "TIDAK", upkk: "TIDAK", psra: "TIDAK", akademik: "TIDAK", online: "TIDAK", hargaMengaji: 100, hargaAkademik: 0, hargaTransit: 0, catatan: "" },
  { id: 19, nama: "Ainan Salsabila Binti Hafiz Anuar", parent: "Hafiz Anuar", phone: "0139311818", status: "AKTIF", mengaji: "YA", transit: "TIDAK", jawi: "TIDAK", kafa: "TIDAK", upkk: "TIDAK", psra: "TIDAK", akademik: "TIDAK", online: "TIDAK", hargaMengaji: 100, hargaAkademik: 0, hargaTransit: 0, catatan: "" },
  { id: 20, nama: "Arissa Medina Bt Ahmad Fauzi", parent: "Ahmad Fauzi", phone: "0129425926", status: "AKTIF", mengaji: "YA", transit: "TIDAK", jawi: "TIDAK", kafa: "TIDAK", upkk: "TIDAK", psra: "TIDAK", akademik: "TIDAK", online: "TIDAK", hargaMengaji: 100, hargaAkademik: 0, hargaTransit: 0, catatan: "" },
  { id: 21, nama: "Ammar Ramadhan Bin Ahmad Fauzi", parent: "Ahmad Fauzi", phone: "0129425926", status: "AKTIF", mengaji: "YA", transit: "TIDAK", jawi: "TIDAK", kafa: "TIDAK", upkk: "TIDAK", psra: "TIDAK", akademik: "TIDAK", online: "TIDAK", hargaMengaji: 100, hargaAkademik: 0, hargaTransit: 0, catatan: "" },
  { id: 22, nama: "Muhammad Rizal Arshad Bin Mohd Rosmizam", parent: "Mohd Rosmizam", phone: "0129343676", status: "AKTIF", mengaji: "YA", transit: "TIDAK", jawi: "TIDAK", kafa: "TIDAK", upkk: "TIDAK", psra: "TIDAK", akademik: "TIDAK", online: "TIDAK", hargaMengaji: 100, hargaAkademik: 0, hargaTransit: 0, catatan: "" },
  { id: 23, nama: "Nur Raisha Adawiyah Binti Mohd Rosmizam", parent: "Mohd Rosmizam", phone: "0129343676", status: "AKTIF", mengaji: "YA", transit: "TIDAK", jawi: "TIDAK", kafa: "TIDAK", upkk: "TIDAK", psra: "TIDAK", akademik: "TIDAK", online: "TIDAK", hargaMengaji: 100, hargaAkademik: 0, hargaTransit: 0, catatan: "" },
  { id: 24, nama: "Aisyah Humaira Bt Lukman", parent: "Lukman", phone: "0196550670", status: "AKTIF", mengaji: "YA", transit: "TIDAK", jawi: "TIDAK", kafa: "TIDAK", upkk: "TIDAK", psra: "TIDAK", akademik: "TIDAK", online: "TIDAK", hargaMengaji: 100, hargaAkademik: 0, hargaTransit: 0, catatan: "" },
  { id: 25, nama: "Izarra Khaiyrra Bt Mohd Aris", parent: "Mohd Aris", phone: "0199872971", status: "AKTIF", mengaji: "YA", transit: "TIDAK", jawi: "TIDAK", kafa: "TIDAK", upkk: "TIDAK", psra: "TIDAK", akademik: "TIDAK", online: "TIDAK", hargaMengaji: 100, hargaAkademik: 0, hargaTransit: 0, catatan: "" },
  { id: 26, nama: "Ahmad Aariz Dayyan B. Mohd Kamalludin", parent: "Mohd Kamalludin", phone: "0132315660", status: "AKTIF", mengaji: "YA", transit: "TIDAK", jawi: "TIDAK", kafa: "TIDAK", upkk: "TIDAK", psra: "TIDAK", akademik: "TIDAK", online: "TIDAK", hargaMengaji: 100, hargaAkademik: 0, hargaTransit: 0, catatan: "" },
  { id: 27, nama: "Nur Aisya' Qaseh Bt Aziman", parent: "Aziman", phone: "0179890260", status: "AKTIF", mengaji: "YA", transit: "TIDAK", jawi: "TIDAK", kafa: "TIDAK", upkk: "TIDAK", psra: "TIDAK", akademik: "TIDAK", online: "TIDAK", hargaMengaji: 100, hargaAkademik: 0, hargaTransit: 0, catatan: "" },
  { id: 28, nama: "NAJIHAH", parent: "Ibu / Bapa Najihah", phone: "0134565245", status: "AKTIF", mengaji: "YA", transit: "TIDAK", jawi: "TIDAK", kafa: "TIDAK", upkk: "TIDAK", psra: "TIDAK", akademik: "TIDAK", online: "TIDAK", hargaMengaji: 100, hargaAkademik: 0, hargaTransit: 0, catatan: "" }
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
  } else if (action === "getFeeSettings") {
    return createJsonResponse({ success: true, data: getFeeSettings() });
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
    } else if (action === "saveStudent") {
      result = saveStudent(payload);
    } else if (action === "savePayment") {
      result = savePayment(payload);
    } else if (action === "getNextReceiptNumber") {
      result = { success: true, data: getNextReceiptNumber() };
    } else if (action === "getPaymentHistory") {
      result = { success: true, data: getPaymentHistory() };
    } else if (action === "getFeeSettings") {
      result = { success: true, data: getFeeSettings() };
    } else if (action === "saveFeeSettings") {
      result = saveFeeSettings(payload);
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
 * Menyiapkan 4 Sheet Rasmi (MURID, PEMBAYARAN, BUTIRAN_PEMBAYARAN, TETAPAN_YURAN)
 */
function setupDatabase() {
  try {
    var ss = getSpreadsheet();
    if (!ss) return { success: false, message: "Spreadsheet tidak ditemui." };

    // --- SHEET 1: MURID ---
    var sheetMurid = ss.getSheetByName(CONFIG.studentSheet);
    if (!sheetMurid) sheetMurid = ss.insertSheet(CONFIG.studentSheet);
    
    var headersMurid = [
      "ID_MURID", "NAMA_MURID", "NAMA_PARENT", "NO_WHATSAPP", "STATUS",
      "MENGAJI", "MENGAJI_ONLINE", "AKADEMIK", "KAFA", "JAWI", "UPKK", "PSRA", "TRANSIT",
      "HARGA_MENGAJI", "HARGA_AKADEMIK", "HARGA_TRANSIT", "CATATAN"
    ];

    if (sheetMurid.getLastRow() === 0) {
      sheetMurid.appendRow(headersMurid);
      sheetMurid.getRange(1, 1, 1, headersMurid.length)
                .setBackground("#1b5e20")
                .setFontColor("#ffffff")
                .setFontWeight("bold")
                .setHorizontalAlignment("center");
      sheetMurid.setFrozenRows(1);
      sheetMurid.getRange("D:D").setNumberFormat("@");

      MASTER_STUDENTS.forEach(function(s) {
        sheetMurid.appendRow([
          s.id, s.nama, s.parent, "'" + s.phone, s.status,
          s.mengaji, s.online, s.akademik, s.kafa, s.jawi, s.upkk, s.psra, s.transit,
          s.hargaMengaji, s.hargaAkademik, s.hargaTransit, s.catatan
        ]);
      });
    }

    // --- SHEET 2: PEMBAYARAN ---
    var sheetBayar = ss.getSheetByName(CONFIG.paymentSheet);
    if (!sheetBayar) sheetBayar = ss.insertSheet(CONFIG.paymentSheet);

    var headersBayar = [
      "ID_TRANSAKSI", "NO_RESIT", "ID_MURID", "NAMA_MURID", "TARIKH", "BULAN", "TAHUN",
      "KAEDAH", "JUMLAH", "NO_WHATSAPP", "TARIKH_MASA"
    ];

    if (sheetBayar.getLastRow() === 0) {
      sheetBayar.appendRow(headersBayar);
      sheetBayar.getRange(1, 1, 1, headersBayar.length)
                .setBackground("#2e7d32")
                .setFontColor("#ffffff")
                .setFontWeight("bold")
                .setHorizontalAlignment("center");
      sheetBayar.setFrozenRows(1);
      sheetBayar.getRange("J:J").setNumberFormat("@");
    }

    // --- SHEET 3: BUTIRAN_PEMBAYARAN ---
    var sheetDetail = ss.getSheetByName(CONFIG.paymentDetailSheet);
    if (!sheetDetail) sheetDetail = ss.insertSheet(CONFIG.paymentDetailSheet);

    var headersDetail = [
      "ID_DETAIL", "NO_RESIT", "ID_MURID", "KATEGORI", "JENIS_YURAN", "BULAN", "AMAUN"
    ];

    if (sheetDetail.getLastRow() === 0) {
      sheetDetail.appendRow(headersDetail);
      sheetDetail.getRange(1, 1, 1, headersDetail.length)
                 .setBackground("#15803d")
                 .setFontColor("#ffffff")
                 .setFontWeight("bold")
                 .setHorizontalAlignment("center");
      sheetDetail.setFrozenRows(1);
    }

    // --- SHEET 4: TETAPAN_YURAN ---
    var sheetYuran = ss.getSheetByName(CONFIG.feeSettingsSheet);
    if (!sheetYuran) sheetYuran = ss.insertSheet(CONFIG.feeSettingsSheet);

    var headersYuran = ["ID_YURAN", "KATEGORI", "NAMA_YURAN", "HARGA_1", "HARGA_2", "STATUS"];
    if (sheetYuran.getLastRow() === 0) {
      sheetYuran.appendRow(headersYuran);
      sheetYuran.getRange(1, 1, 1, headersYuran.length)
                .setBackground("#047857")
                .setFontColor("#ffffff")
                .setFontWeight("bold")
                .setHorizontalAlignment("center");
      sheetYuran.setFrozenRows(1);

      var defaultFees = [
        ["Y001", "Mengaji", "Pendaftaran", 100, 0, "Aktif"],
        ["Y002", "Mengaji", "Yuran Bulanan", 100, 130, "Aktif"],
        ["Y003", "Mengaji", "Buku", 20, 0, "Aktif"],
        ["Y004", "Mengaji Online", "Pendaftaran", 50, 0, "Aktif"],
        ["Y005", "Mengaji Online", "Yuran Bulanan", 150, 0, "Aktif"],
        ["Y006", "Akademik", "Pendaftaran", 50, 0, "Aktif"],
        ["Y007", "Akademik", "1 Subjek", 35, 40, "Aktif"],
        ["Y008", "Akademik", "4 Subjek", 110, 0, "Aktif"],
        ["Y009", "KAFA", "Pendaftaran", 100, 0, "Aktif"],
        ["Y010", "KAFA", "Yuran Bulanan", 100, 0, "Aktif"],
        ["Y011", "KAFA", "Buku", 60, 0, "Aktif"],
        ["Y012", "Jawi", "Pendaftaran", 100, 0, "Aktif"],
        ["Y013", "Jawi", "Yuran Bulanan", 100, 0, "Aktif"],
        ["Y014", "Jawi", "Buku", 60, 0, "Aktif"],
        ["Y015", "UPKK", "Pendaftaran", 100, 0, "Aktif"],
        ["Y016", "UPKK", "Yuran Bulanan", 100, 0, "Aktif"],
        ["Y017", "UPKK", "Buku", 64, 0, "Aktif"],
        ["Y018", "PSRA", "Pendaftaran", 100, 0, "Aktif"],
        ["Y019", "PSRA", "Yuran Bulanan", 100, 0, "Aktif"],
        ["Y020", "PSRA", "Buku", 60, 0, "Aktif"],
        ["Y021", "Transit", "Pendaftaran", 150, 0, "Aktif"],
        ["Y022", "Transit", "Yuran Bulanan", 200, 260, "Aktif"],
        ["Y023", "Transit", "Duduk Sampai Petang", 310, 0, "Aktif"],
        ["Y024", "Transit", "Tambahan Mengaji", 50, 0, "Aktif"],
        ["Y025", "Transit", "Tambahan OT 1 Bulan", 40, 0, "Aktif"]
      ];

      defaultFees.forEach(function(f) { sheetYuran.appendRow(f); });
    }

    return {
      success: true,
      message: "Database 4-Sheet AppSheet FQC berjaya disiapkan sepenuhnya!"
    };
  } catch (err) {
    return { success: false, message: "Ralat Setup Database: " + err.toString() };
  }
}

/**
 * 2. getStudents()
 * Membaca senarai profil murid dari Sheet MURID
 */
function getStudents() {
  try {
    var ss = getSpreadsheet();
    var sheet = ss.getSheetByName(CONFIG.studentSheet);
    
    if (!sheet || sheet.getLastRow() <= 1) {
      return MASTER_STUDENTS;
    }

    var values = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
    var students = [];

    for (var i = 0; i < values.length; i++) {
      var row = values[i];
      var id = row[0] || (i + 1);
      var nama = row[1] ? row[1].toString().trim() : "";
      var parent = row[2] ? row[2].toString().trim() : "";
      var phone = row[3] ? row[3].toString().replace(/^'/, '').trim() : "";
      var status = row[4] ? row[4].toString().trim() : "AKTIF";

      // Kategori flags
      var mengaji = row[5] ? row[5].toString().toUpperCase() : "YA";
      var online = row[6] ? row[6].toString().toUpperCase() : "TIDAK";
      var akademik = row[7] ? row[7].toString().toUpperCase() : "TIDAK";
      var kafa = row[8] ? row[8].toString().toUpperCase() : "TIDAK";
      var jawi = row[9] ? row[9].toString().toUpperCase() : "TIDAK";
      var upkk = row[10] ? row[10].toString().toUpperCase() : "TIDAK";
      var psra = row[11] ? row[11].toString().toUpperCase() : "TIDAK";
      var transit = row[12] ? row[12].toString().toUpperCase() : "TIDAK";

      var hargaMengaji = parseFloat(row[13]) || 100;
      var hargaAkademik = parseFloat(row[14]) || 0;
      var hargaTransit = parseFloat(row[15]) || 0;
      var catatan = row[16] ? row[16].toString() : "";

      if (nama && nama.toUpperCase() !== "NAMA MURID" && status.toUpperCase() !== "TIDAK AKTIF") {
        students.push({
          id: id,
          nama: nama,
          parent: parent,
          phone: phone,
          status: status,
          mengaji: mengaji,
          online: online,
          akademik: akademik,
          kafa: kafa,
          jawi: jawi,
          upkk: upkk,
          psra: psra,
          transit: transit,
          hargaMengaji: hargaMengaji,
          hargaAkademik: hargaAkademik,
          hargaTransit: hargaTransit,
          catatan: catatan
        });
      }
    }

    return students.length > 0 ? students : MASTER_STUDENTS;
  } catch (err) {
    Logger.log("Error getStudents: " + err.toString());
    return MASTER_STUDENTS;
  }
}

/**
 * 3. saveStudent(data)
 * Tambah atau Kemaskini Murid di Sheet MURID
 */
function saveStudent(data) {
  try {
    var ss = getSpreadsheet();
    var sheet = ss.getSheetByName(CONFIG.studentSheet);
    if (!sheet) {
      setupDatabase();
      sheet = ss.getSheetByName(CONFIG.studentSheet);
    }

    var id = data.id || (sheet.getLastRow());
    var nama = data.nama || "";
    var parent = data.parent || "";
    var phone = data.phone || "";
    var status = data.status || "AKTIF";
    var mengaji = data.mengaji || "TIDAK";
    var online = data.online || "TIDAK";
    var akademik = data.akademik || "TIDAK";
    var kafa = data.kafa || "TIDAK";
    var jawi = data.jawi || "TIDAK";
    var upkk = data.upkk || "TIDAK";
    var psra = data.psra || "TIDAK";
    var transit = data.transit || "TIDAK";
    var hargaMengaji = parseFloat(data.hargaMengaji) || 100;
    var hargaAkademik = parseFloat(data.hargaAkademik) || 0;
    var hargaTransit = parseFloat(data.hargaTransit) || 0;
    var catatan = data.catatan || "";

    var values = sheet.getDataRange().getValues();
    var rowIndex = -1;

    for (var i = 1; i < values.length; i++) {
      if (values[i][0] == id || (values[i][1] && values[i][1].toString().toLowerCase() === nama.toLowerCase())) {
        rowIndex = i + 1;
        break;
      }
    }

    var rowData = [
      id, nama, parent, "'" + phone, status,
      mengaji, online, akademik, kafa, jawi, upkk, psra, transit,
      hargaMengaji, hargaAkademik, hargaTransit, catatan
    ];

    if (rowIndex > 0) {
      sheet.getRange(rowIndex, 1, 1, rowData.length).setValues([rowData]);
    } else {
      sheet.appendRow(rowData);
    }

    return { success: true, message: "Profil murid berjaya disimpan!" };
  } catch (e) {
    return { success: false, message: "Ralat saveStudent: " + e.toString() };
  }
}

/**
 * 4. getNextReceiptNumber()
 * Jana Nombor Resit Unik FQC-1101, FQC-1102 ...
 */
function getNextReceiptNumber() {
  try {
    var ss = getSpreadsheet();
    var sheet = ss.getSheetByName(CONFIG.paymentSheet);
    
    if (!sheet || sheet.getLastRow() <= 1) {
      return CONFIG.receiptPrefix + CONFIG.startReceiptNo;
    }

    var values = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues();
    var maxNo = CONFIG.startReceiptNo - 1;

    for (var i = 0; i < values.length; i++) {
      var val = values[i][0] ? values[i][0].toString().trim() : "";
      var num = parseInt(val.replace(/[^0-9]/g, ''), 10);
      if (!isNaN(num) && num > maxNo) {
        maxNo = num;
      }
    }

    return CONFIG.receiptPrefix + (maxNo + 1);
  } catch (e) {
    return CONFIG.receiptPrefix + CONFIG.startReceiptNo;
  }
}

/**
 * 5. savePayment(data)
 * Menyimpan rekod ke PEMBAYARAN & BUTIRAN_PEMBAYARAN
 */
function savePayment(data) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);

    var ss = getSpreadsheet();
    var sheetPay = ss.getSheetByName(CONFIG.paymentSheet);
    var sheetDetail = ss.getSheetByName(CONFIG.paymentDetailSheet);

    if (!sheetPay || !sheetDetail) {
      setupDatabase();
      sheetPay = ss.getSheetByName(CONFIG.paymentSheet);
      sheetDetail = ss.getSheetByName(CONFIG.paymentDetailSheet);
    }

    var noResit = data.noResit || getNextReceiptNumber();
    var timestamp = new Date();
    var tarikh = data.tarikh || Utilities.formatDate(timestamp, Session.getScriptTimeZone() || "GMT+8", "dd/MM/yyyy");
    var bulan = (data.bulan || "").toUpperCase();
    var tahun = new Date().getFullYear();
    var namaMurid = data.namaMurid || "";
    var idMurid = data.idMurid || "";
    var noWhatsapp = data.noWhatsapp || "";
    var kaedah = data.kaedahBayaran || "TUNAI";
    var jumlah = parseFloat(data.jumlah) || 0;

    var txId = "TX-" + timestamp.getTime();

    // 1. Simpan ke PEMBAYARAN
    sheetPay.appendRow([
      txId,
      noResit,
      idMurid,
      namaMurid,
      tarikh,
      bulan,
      tahun,
      kaedah,
      jumlah,
      "'" + noWhatsapp,
      timestamp
    ]);

    // 2. Simpan item butiran ke BUTIRAN_PEMBAYARAN
    var items = [];
    if (data.butiranItem) {
      try { items = typeof data.butiranItem === 'string' ? JSON.parse(data.butiranItem) : data.butiranItem; } catch(e) {}
    }

    if (Array.isArray(items) && items.length > 0) {
      items.forEach(function(it, idx) {
        sheetDetail.appendRow([
          "DT-" + timestamp.getTime() + "-" + (idx + 1),
          noResit,
          idMurid,
          it.group || it.kategori || "UMUM",
          it.label || it.jenisYuran || "Yuran",
          bulan,
          parseFloat(it.paidPrice || it.amaun) || 0
        ]);
      });
    }

    return {
      success: true,
      message: "Pembayaran " + noResit + " berjaya disimpan!",
      noResit: noResit,
      jumlah: jumlah
    };
  } catch (err) {
    Logger.log("Error savePayment: " + err.toString());
    return { success: false, message: "Gagal menyimpan: " + err.toString() };
  } finally {
    lock.releaseLock();
  }
}

/**
 * 6. getPaymentHistory()
 * Membaca rekod dari Sheet PEMBAYARAN
 */
function getPaymentHistory() {
  try {
    var ss = getSpreadsheet();
    var sheet = ss.getSheetByName(CONFIG.paymentSheet);
    if (!sheet || sheet.getLastRow() <= 1) return [];

    var values = sheet.getRange(2, 1, sheet.getLastRow() - 1, 11).getValues();
    var history = [];

    for (var i = values.length - 1; i >= 0; i--) {
      var row = values[i];
      if (row[1]) {
        var dateFormatted = row[4];
        if (row[10] instanceof Date && !row[4]) {
          dateFormatted = Utilities.formatDate(row[10], Session.getScriptTimeZone() || "GMT+8", "dd/MM/yyyy");
        }

        history.push({
          idTransaksi: row[0] ? row[0].toString() : "",
          noResit: row[1] ? row[1].toString().trim() : "",
          idMurid: row[2] ? row[2].toString() : "",
          namaMurid: row[3] ? row[3].toString() : "",
          tarikh: dateFormatted ? dateFormatted.toString() : "",
          bulan: row[5] ? row[5].toString() : "",
          tahun: row[6] ? row[6].toString() : "",
          kaedahBayaran: row[7] ? row[7].toString() : "TUNAI",
          jumlah: parseFloat(row[8]) || 0,
          noWhatsapp: row[9] ? row[9].toString().replace(/^'/, '') : "",
          timestamp: row[10]
        });
      }
    }

    return history;
  } catch (err) {
    return [];
  }
}

/**
 * 7. getFeeSettings()
 * Membaca jadual tetapan yuran dari Sheet TETAPAN_YURAN
 */
function getFeeSettings() {
  try {
    var ss = getSpreadsheet();
    var sheet = ss.getSheetByName(CONFIG.feeSettingsSheet);
    if (!sheet || sheet.getLastRow() <= 1) return [];

    var values = sheet.getRange(2, 1, sheet.getLastRow() - 1, 6).getValues();
    var fees = [];

    for (var i = 0; i < values.length; i++) {
      var row = values[i];
      if (row[0]) {
        fees.push({
          idYuran: row[0].toString(),
          kategori: row[1] ? row[1].toString() : "",
          namaYuran: row[2] ? row[2].toString() : "",
          harga1: parseFloat(row[3]) || 0,
          harga2: parseFloat(row[4]) || 0,
          status: row[5] ? row[5].toString() : "Aktif"
        });
      }
    }
    return fees;
  } catch (e) {
    return [];
  }
}

/**
 * 8. saveFeeSettings(data)
 */
function saveFeeSettings(feeList) {
  try {
    var ss = getSpreadsheet();
    var sheet = ss.getSheetByName(CONFIG.feeSettingsSheet);
    if (!sheet) { setupDatabase(); sheet = ss.getSheetByName(CONFIG.feeSettingsSheet); }

    sheet.clearContents();
    sheet.appendRow(["ID_YURAN", "KATEGORI", "NAMA_YURAN", "HARGA_1", "HARGA_2", "STATUS"]);
    
    feeList.forEach(function(f) {
      sheet.appendRow([f.idYuran, f.kategori, f.namaYuran, f.harga1, f.harga2, f.status]);
    });

    return { success: true, message: "Tetapan yuran berjaya dikemaskini!" };
  } catch (e) {
    return { success: false, message: "Ralat saveFeeSettings: " + e.toString() };
  }
}

/**
 * 9. getDashboardData()
 * Mengira statistik untuk Dashboard Utama (Cumulative Jan - Current Month)
 */
function getDashboardData() {
  try {
    var history = getPaymentHistory();
    var students = getStudents();

    var monthsMalay = ["JANUARI", "FEBRUARI", "MAC", "APRIL", "MEI", "JUN", "JULAI", "OGOS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DISEMBER"];
    var currentMonthIdx = new Date().getMonth();

    var totalOverallJanToNow = 0;
    var monthlyKutipan = {};
    monthsMalay.forEach(function(m) { monthlyKutipan[m] = 0; });

    var categoryKutipan = {
      "Mengaji": 0,
      "Mengaji Online": 0,
      "Transit": 0,
      "Jawi": 0,
      "UPKK": 0,
      "PSRA": 0,
      "KAFA": 0,
      "Akademik": 0,
      "Lain-lain": 0
    };

    history.forEach(function(item) {
      var itemMonth = item.bulan ? item.bulan.toUpperCase() : "";
      var monthIdx = monthsMalay.indexOf(itemMonth);

      // Kutipan kumulatif Jan sehingga bulan semasa
      if (monthIdx !== -1 && monthIdx <= currentMonthIdx) {
        totalOverallJanToNow += item.jumlah;
      }

      if (monthlyKutipan[itemMonth] !== undefined) {
        monthlyKutipan[itemMonth] += item.jumlah;
      }
    });

    return {
      totalOverallCollection: totalOverallJanToNow,
      totalStudents: students.length,
      totalTransactions: history.length,
      monthlyKutipan: monthlyKutipan,
      recentPayments: history.slice(0, 5)
    };
  } catch (err) {
    return {
      totalOverallCollection: 0,
      totalStudents: 38,
      totalTransactions: 0,
      monthlyKutipan: {},
      recentPayments: []
    };
  }
}
