/**
 * ==============================================================================
 * DASHBOARD PENGURUSAN UNIT BERUNIFORM - PBAQ 2026
 * ==============================================================================
 * Google Apps Script Backend (Code_UnitBeruniform.gs)
 *
 * CARA DEPLOY:
 * 1. Buka Google Apps Script: script.google.com
 * 2. Buat projek baru → tampal kod ini dalam Code.gs
 * 3. Tampal kandungan Index_UnitBeruniform.html dalam fail Index.html
 * 4. Deploy → New Deployment → Web App
 *    - Execute as: Me
 *    - Who has access: Anyone (atau Anyone within organisation)
 * 5. Salin URL deployment dan gunakan sebagai link dashboard
 *
 * SPREADSHEET:
 * MASTER_SUMBER: https://docs.google.com/spreadsheets/d/1_oBra_vW2s62Qql_Xy9NsKywDcMJxx5gmCBXW_thEmA
 * Sheet mestilah ada lajur: ID | MODUL | KATEGORI | NAMA SUMBER | TAHUN | LINK | STATUS
 * ==============================================================================
 */

// ============================================================
// KONFIGURASI
// ============================================================
const UB_CONFIG = {
  spreadsheetId: "1_oBra_vW2s62Qql_Xy9NsKywDcMJxx5gmCBXW_thEmA",
  sheetName: "Sheet1",        // Nama sheet dalam spreadsheet
  appTitle: "Dashboard Unit Beruniform - PBAQ 2026",
  version: "1.0.0"
};

// ============================================================
// COLUMN MAP — sesuaikan jika nama lajur dalam sheet berbeza
// ============================================================
const UB_COL = {
  ID: "ID",
  MODUL: "MODUL",
  KATEGORI: "KATEGORI",
  NAMA: "NAMA SUMBER",
  TAHUN: "TAHUN",
  LINK: "LINK",
  STATUS: "STATUS"
};

// ============================================================
// PETA JENIS DOKUMEN — kenalpasti jenis berdasarkan nama sumber
// ============================================================
function detectJenis(namaSumber) {
  if (!namaSumber) return "Lain-lain";
  var n = namaSumber.toUpperCase();
  if (n.indexOf("KEHADIRAN") !== -1) return "Kehadiran";
  if (n.indexOf("PRESTASI") !== -1)  return "Prestasi";
  if (n.indexOf("LAPORAN") !== -1)   return "Laporan Aktiviti";
  if (n.indexOf("PERANCANGAN") !== -1) return "Perancangan Tahunan";
  return "Lain-lain";
}

// ============================================================
// PETA UNIT — kenalpasti unit berdasarkan MODUL atau NAMA
// ============================================================
function detectModul(modul, namaSumber) {
  var m = (modul || "").toUpperCase();
  var n = (namaSumber || "").toUpperCase();
  if (m.indexOf("BSMM") !== -1 || n.indexOf("BSMM") !== -1) return "BSMM";
  if (m.indexOf("TKRS") !== -1 || n.indexOf("TKRS") !== -1 ||
      m.indexOf("KRS")  !== -1 || n.indexOf("KRS")  !== -1) return "TKRS/KRS";
  return modul || "Lain-lain";
}

// ============================================================
// BUKA SPREADSHEET
// ============================================================
function getUbSpreadsheet() {
  try {
    return SpreadsheetApp.openById(UB_CONFIG.spreadsheetId);
  } catch (e) {
    Logger.log("Ralat buka spreadsheet: " + e.toString());
    try {
      return SpreadsheetApp.getActiveSpreadsheet();
    } catch (e2) {
      return null;
    }
  }
}

// ============================================================
// BACA DATA DARI MASTER_SUMBER SHEET
// ============================================================
function getMasterSumber() {
  try {
    var ss = getUbSpreadsheet();
    if (!ss) return [];

    var sheet = ss.getSheetByName(UB_CONFIG.sheetName);
    if (!sheet) {
      // Cuba sheet pertama jika nama tidak sepadan
      sheet = ss.getSheets()[0];
    }
    if (!sheet) return [];

    var data = sheet.getDataRange().getValues();
    if (data.length < 2) return [];

    // Baris pertama = header
    var headers = data[0].map(function(h) { return String(h).trim().toUpperCase(); });

    // Cari indeks lajur
    function colIdx(name) {
      var idx = headers.indexOf(name.toUpperCase());
      return idx;
    }

    var idxId   = colIdx(UB_COL.ID);
    var idxMod  = colIdx(UB_COL.MODUL);
    var idxKat  = colIdx(UB_COL.KATEGORI);
    var idxNama = colIdx(UB_COL.NAMA);
    var idxThn  = colIdx(UB_COL.TAHUN);
    var idxLnk  = colIdx(UB_COL.LINK);
    var idxSts  = colIdx(UB_COL.STATUS);

    var result = [];
    for (var i = 1; i < data.length; i++) {
      var row = data[i];

      // Langkau baris kosong
      var rowStr = row.join("").trim();
      if (!rowStr) continue;

      var namaVal = idxNama >= 0 ? String(row[idxNama] || "").trim() : "";
      var modulVal = idxMod >= 0 ? String(row[idxMod] || "").trim() : "";

      var record = {
        id:       idxId   >= 0 ? String(row[idxId]  || "").trim() : String(i),
        modul:    detectModul(modulVal, namaVal),
        kategori: idxKat  >= 0 ? String(row[idxKat] || "").trim() : "GERKO A",
        jenis:    detectJenis(namaVal),
        nama:     namaVal,
        tahun:    idxThn  >= 0 ? String(row[idxThn] || "").trim() : "",
        link:     idxLnk  >= 0 ? String(row[idxLnk] || "").trim() : "",
        status:   idxSts  >= 0 ? String(row[idxSts] || "").trim() : "AKTIF"
      };

      if (record.nama) result.push(record);
    }

    return result;

  } catch (e) {
    Logger.log("Ralat getMasterSumber: " + e.toString());
    return [];
  }
}

// ============================================================
// KIRA STATISTIK DASHBOARD
// ============================================================
function getDashboardStats(data) {
  var units = {};
  var kehadiran = 0, laporan = 0, perancangan = 0;

  data.forEach(function(r) {
    units[r.modul] = true;
    if (r.jenis === "Kehadiran") kehadiran++;
    else if (r.jenis === "Laporan Aktiviti") laporan++;
    else if (r.jenis === "Perancangan Tahunan") perancangan++;
  });

  return {
    totalSumber:   data.length,
    totalUnit:     Object.keys(units).length,
    kehadiran:     kehadiran,
    laporan:       laporan,
    perancangan:   perancangan
  };
}

// ============================================================
// doGet — Serve Web App atau JSON API
// ============================================================
function doGet(e) {
  var action = (e && e.parameter) ? e.parameter.action : null;

  // ---- JSON API endpoints ----
  if (action === "getData") {
    var data = getMasterSumber();
    var stats = getDashboardStats(data);
    return createUbJsonResponse({
      success: true,
      data: data,
      stats: stats,
      timestamp: new Date().toISOString(),
      version: UB_CONFIG.version
    });
  }

  if (action === "getStats") {
    var data2 = getMasterSumber();
    return createUbJsonResponse({
      success: true,
      stats: getDashboardStats(data2),
      timestamp: new Date().toISOString()
    });
  }

  if (action === "ping") {
    return createUbJsonResponse({
      success: true,
      message: "Dashboard Unit Beruniform API aktif.",
      version: UB_CONFIG.version,
      timestamp: new Date().toISOString()
    });
  }

  // ---- Serve HTML Web App ----
  try {
    var tmpl = HtmlService.createTemplateFromFile("Index_UnitBeruniform");
    tmpl.appData = JSON.stringify(getMasterSumber());
    tmpl.stats   = JSON.stringify(getDashboardStats(getMasterSumber()));

    return tmpl.evaluate()
      .setTitle(UB_CONFIG.appTitle)
      .addMetaTag("viewport", "width=device-width, initial-scale=1.0")
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

  } catch (err) {
    Logger.log("Ralat serve HTML: " + err.toString());
    return HtmlService.createHtmlOutput(
      "<h2>Dashboard Unit Beruniform — API Aktif</h2>" +
      "<p>Sila buat fail <b>Index_UnitBeruniform.html</b> dalam projek Apps Script ini.</p>" +
      "<p>Ralat: " + err.toString() + "</p>" +
      "<p><a href='?action=getData'>Cuba API: getData</a></p>" +
      "<p><a href='?action=ping'>Ping API</a></p>"
    );
  }
}

// ============================================================
// Helper JSON Response dengan CORS headers
// ============================================================
function createUbJsonResponse(data) {
  var output = ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
  return output;
}

// ============================================================
// FUNGSI UTIL — untuk dipanggil dari console / trigger
// ============================================================

/**
 * Test: Baca data dan log ke console Apps Script
 */
function testReadData() {
  var data = getMasterSumber();
  Logger.log("Jumlah rekod: " + data.length);
  data.forEach(function(r, i) {
    Logger.log((i+1) + ". [" + r.modul + "] [" + r.jenis + "] " + r.nama + " — " + r.link);
  });
  var stats = getDashboardStats(data);
  Logger.log("Statistik: " + JSON.stringify(stats));
}

/**
 * Test: Semak sambungan ke spreadsheet
 */
function testConnection() {
  try {
    var ss = getUbSpreadsheet();
    if (!ss) {
      Logger.log("GAGAL: Tidak dapat buka spreadsheet.");
      return;
    }
    Logger.log("BERJAYA: Spreadsheet dibuka — " + ss.getName());
    var sheets = ss.getSheets();
    Logger.log("Senarai sheet: " + sheets.map(function(s){ return s.getName(); }).join(", "));
  } catch(e) {
    Logger.log("RALAT: " + e.toString());
  }
}
