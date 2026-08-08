/**
 * ==============================================================================
 * SISTEM PEMBAYARAN YURAN & RESIT DIGITAL - FATHUL QURANIC CENTRE (FQC)
 * Full Application Logic (app.js)
 * ==============================================================================
 */

// Master List 28 Murid FQC Default
const MASTER_STUDENTS_DEFAULT = [
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

// Fee Items Specification (Tick-boxes & Discount Dropdowns)
const FEE_CHECKBOX_ITEMS = [
  { id: "mengaji_pendaftaran", group: "Kelas Mengaji Al-Quran", label: "Pendaftaran Mengaji", stdPrice: 100, options: null, categoryKey: "mengaji", icon: "fa-book-quran" },
  { id: "mengaji_bulanan", group: "Kelas Mengaji Al-Quran", label: "Yuran Bulanan Mengaji", stdPrice: 130, options: [100, 130], categoryKey: "mengaji", icon: "fa-book-quran" },
  { id: "mengaji_buku", group: "Kelas Mengaji Al-Quran", label: "Buku Mengaji", stdPrice: 20, options: null, categoryKey: "mengaji", icon: "fa-book-open" },

  { id: "online_pendaftaran", group: "Mengaji Online", label: "Pendaftaran Online", stdPrice: 50, options: null, categoryKey: "online", icon: "fa-laptop" },
  { id: "online_bulanan", group: "Mengaji Online", label: "Yuran Bulanan Online", stdPrice: 150, options: null, categoryKey: "online", icon: "fa-laptop" },

  { id: "akademik_pendaftaran", group: "Tuisyen Akademik", label: "Pendaftaran Akademik", stdPrice: 50, options: null, categoryKey: "akademik", icon: "fa-graduation-cap" },
  { id: "akademik_1", group: "Tuisyen Akademik", label: "1 Subjek Akademik", stdPrice: 40, options: [35, 40], categoryKey: "akademik", icon: "fa-book" },
  { id: "akademik_4", group: "Tuisyen Akademik", label: "4 Subjek Akademik", stdPrice: 110, options: null, categoryKey: "akademik", icon: "fa-layer-group" },

  { id: "kafa_pendaftaran", group: "KAFA", label: "Pendaftaran KAFA", stdPrice: 100, options: null, categoryKey: "kafa", icon: "fa-mosque" },
  { id: "kafa_bulanan", group: "KAFA", label: "Yuran Bulanan KAFA", stdPrice: 100, options: null, categoryKey: "kafa", icon: "fa-mosque" },
  { id: "kafa_buku", group: "KAFA", label: "Buku KAFA", stdPrice: 60, options: null, categoryKey: "kafa", icon: "fa-book-open" },

  { id: "jawi_pendaftaran", group: "Kelas Khas Jawi 2/3/4", label: "Pendaftaran Jawi", stdPrice: 100, options: null, categoryKey: "jawi", icon: "fa-pen-nib" },
  { id: "jawi_bulanan", group: "Kelas Khas Jawi 2/3/4", label: "Yuran Bulanan Jawi", stdPrice: 100, options: null, categoryKey: "jawi", icon: "fa-pen-nib" },
  { id: "jawi_buku", group: "Kelas Khas Jawi 2/3/4", label: "Buku Jawi", stdPrice: 60, options: null, categoryKey: "jawi", icon: "fa-book-open" },

  { id: "upkk_pendaftaran", group: "UPKK", label: "Pendaftaran UPKK", stdPrice: 100, options: null, categoryKey: "upkk", icon: "fa-award" },
  { id: "upkk_bulanan", group: "UPKK", label: "Yuran Bulanan UPKK", stdPrice: 100, options: null, categoryKey: "upkk", icon: "fa-award" },
  { id: "upkk_buku", group: "UPKK", label: "Buku UPKK", stdPrice: 64, options: null, categoryKey: "upkk", icon: "fa-book-open" },

  { id: "psra_pendaftaran", group: "PSRA", label: "Pendaftaran PSRA", stdPrice: 100, options: null, categoryKey: "psra", icon: "fa-certificate" },
  { id: "psra_bulanan", group: "PSRA", label: "Yuran Bulanan PSRA", stdPrice: 100, options: null, categoryKey: "psra", icon: "fa-certificate" },
  { id: "psra_buku", group: "PSRA", label: "Buku PSRA", stdPrice: 60, options: null, categoryKey: "psra", icon: "fa-book-open" },

  { id: "transit_pendaftaran", group: "Transit 2026", label: "Pendaftaran Transit", stdPrice: 150, options: null, categoryKey: "transit", icon: "fa-bus" },
  { id: "transit_bulanan", group: "Transit 2026", label: "Yuran Bulanan Transit", stdPrice: 260, options: [200, 260], categoryKey: "transit", icon: "fa-bus" },
  { id: "transit_petang", group: "Transit 2026", label: "Duduk Sampai Petang", stdPrice: 310, options: null, categoryKey: "transit", icon: "fa-clock" },
  { id: "transit_mengaji", group: "Transit 2026", label: "Tambahan Mengaji Transit", stdPrice: 50, options: null, categoryKey: "transit", icon: "fa-plus-circle" },
  { id: "transit_ot", group: "Transit 2026", label: "Tambahan OT 1 Bulan", stdPrice: 40, options: null, categoryKey: "transit", icon: "fa-user-clock" }
];

// Global State
let appState = {
  students: [...MASTER_STUDENTS_DEFAULT],
  payments: [],
  selectedStudent: null,
  currentReceiptNo: "FQC-1100",
  lastUpdated: new Date().toLocaleString("ms-MY"),
  // URL Database terkini - sentiasa guna URL ini, override localStorage jika berbeza
  appsScriptUrl: (function() {
    const CURRENT_URL = "https://script.google.com/macros/s/AKfycbzWfvXHS9oGeONbIe2B2P3UA3MCtnA1r7ENR-YAMEIYNbppLYtbE5VdD9nM55rjmZdySw/exec";
    try { if (typeof localStorage !== "undefined") { localStorage.setItem("fqc_apps_script_url", CURRENT_URL); } } catch(e) {}
    return CURRENT_URL;
  }())
};

function safeGetStorage(key, defaultVal = "") {
  try { if (typeof localStorage !== "undefined") return localStorage.getItem(key) || defaultVal; } catch (e) {}
  return defaultVal;
}

function safeSetStorage(key, val) {
  try { if (typeof localStorage !== "undefined") localStorage.setItem(key, val); } catch (e) {}
}

document.addEventListener("DOMContentLoaded", async () => {
  // Pastikan loading overlay TIDAK aktif saat pertama kali dibuka
  const loadingEl = document.getElementById("loading");
  if (loadingEl) loadingEl.classList.remove("show");

  initDateAndMonth();
  initStudentLiveSearch();
  initFeeCalculations();
  initDatabaseSettings();
  loadLocalStoragePayments();
  loadLocalStorageStudents();
  calculateNextReceiptNo();
  renderDashboard();
  renderHistoryTable();
  renderStudentTable();
  renderReceiptPreview();

  // Auto-connect ke database pada startup
  if (appState.appsScriptUrl) {
    try {
      const stampEl = document.getElementById("dash-last-updated");
      if (stampEl) stampEl.innerText = "Menyambung ke database...";
      await fetchStudentsFromBackend(false);
      await fetchPaymentHistoryFromBackend(false);
      appState.lastUpdated = new Date().toLocaleString("ms-MY");
      if (stampEl) stampEl.innerText = `Dikemaskini: ${appState.lastUpdated}`;
      renderDashboard();
      renderHistoryTable();
      renderStudentTable();
    } catch(e) {
      const stampEl = document.getElementById("dash-last-updated");
      if (stampEl) stampEl.innerText = "Gagal sambung database";
    }
  }
});

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  const msgEl = document.getElementById("toast-msg");
  if (!toast || !msgEl) return;
  
  msgEl.innerText = message;
  toast.className = `toast ${type} show`;
  setTimeout(() => { toast.className = `toast ${type}`; }, 3500);
}

let loadingSafetyTimeout = null;

function showLoading(show, text = "Memproses data...") {
  const loading = document.getElementById("loading");
  const textEl = document.getElementById("loading-text");
  if (!loading) return;

  if (loadingSafetyTimeout) {
    clearTimeout(loadingSafetyTimeout);
    loadingSafetyTimeout = null;
  }
  
  if (textEl) textEl.innerText = text;

  // Klik di mana-mana pada loading overlay untuk tutup secara manual
  loading.onclick = () => {
    loading.classList.remove("show");
  };

  if (show) {
    loading.classList.add("show");
    // Penutup keselamatan automatik selepas 5 saat jika sebarang request gagal/hang
    loadingSafetyTimeout = setTimeout(() => {
      loading.classList.remove("show");
    }, 5000);
  } else {
    loading.classList.remove("show");
  }
}

function switchView(viewId) {
  try {
    document.querySelectorAll(".tab-view").forEach(el => el.classList.remove("active"));
    document.querySelectorAll(".nav-link").forEach(el => el.classList.remove("active"));
    
    const targetView = document.getElementById(`view-${viewId}`);
    const targetNav = document.getElementById(`nav-${viewId}`);

    if (targetView) targetView.classList.add("active");
    if (targetNav) targetNav.classList.add("active");

    document.querySelector(".sidebar")?.classList.remove("mobile-open");
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (viewId === "dashboard") renderDashboard();
    if (viewId === "rekod") renderHistoryTable();
    if (viewId === "murid") renderStudentTable();
    if (viewId === "belum-bayar") renderUnpaidSection();
    if (viewId === "bayaran") {
      renderCheckboxFeeGroups();
      updateTotalAmount();
      renderReceiptPreview();
    }
  } catch (e) {
    console.error("Ralat switchView:", e);
  }
}

function toggleMobileSidebar() {
  document.querySelector(".sidebar")?.classList.toggle("mobile-open");
}

function initDateAndMonth() {
  const dateInput = document.getElementById("pay-date");
  if (dateInput) dateInput.value = new Date().toISOString().split("T")[0];
  
  const monthSelect = document.getElementById("pay-month");
  if (monthSelect) {
    const monthsMalay = ["JANUARI", "FEBRUARI", "MAC", "APRIL", "MEI", "JUN", "JULAI", "OGOS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DISEMBER"];
    monthSelect.value = monthsMalay[new Date().getMonth()];
  }
}

// Live Student Search (No Long Dropdown!)
function initStudentLiveSearch() {
  const searchInput = document.getElementById("student-search-input");
  const dropdown = document.getElementById("student-dropdown-options");
  const phoneDisplay = document.getElementById("parent-phone-display");

  if (!searchInput || !dropdown) return;

  function filterOptions(text = "") {
    dropdown.innerHTML = "";
    const cleanText = text.trim().toLowerCase();

    const filtered = appState.students.filter(s => 
      s.status !== "TIDAK AKTIF" && (
        s.nama.toLowerCase().includes(cleanText) ||
        (s.phone && s.phone.includes(cleanText)) ||
        (s.parent && s.parent.toLowerCase().includes(cleanText))
      )
    );

    if (filtered.length === 0) {
      dropdown.innerHTML = `<div class="option-item" style="color:var(--text-muted);">Tiada murid dijumpai bagi "${text}"</div>`;
      return;
    }

    filtered.forEach(student => {
      const item = document.createElement("div");
      item.className = "option-item";
      
      const categoryBadges = getCategoryBadgesHtml(student);
      item.innerHTML = `
        <div style="font-weight:700; color:var(--primary-dark);">${student.nama}</div>
        <div style="font-size:0.78rem; color:var(--text-muted);">Parent: ${student.parent || '-'} | Tel: ${student.phone || '-'}</div>
        <div style="margin-top:2px;">${categoryBadges}</div>
      `;

      item.onclick = () => {
        selectStudent(student);
        dropdown.classList.remove("show");
      };
      dropdown.appendChild(item);
    });
  }

  searchInput.addEventListener("focus", () => { filterOptions(searchInput.value); dropdown.classList.add("show"); });
  searchInput.addEventListener("input", (e) => { filterOptions(e.target.value); dropdown.classList.add("show"); });
  document.addEventListener("click", (e) => { if (!e.target.closest(".searchable-select")) dropdown.classList.remove("show"); });
}

function getCategoryBadgesHtml(student) {
  let html = "";
  if (student.mengaji === "YA") html += `<span class="cat-tag cat-mengaji">Mengaji</span>`;
  if (student.transit === "YA") html += `<span class="cat-tag cat-transit">Transit</span>`;
  if (student.jawi === "YA") html += `<span class="cat-tag cat-jawi">Jawi</span>`;
  if (student.upkk === "YA") html += `<span class="cat-tag cat-upkk">UPKK</span>`;
  if (student.psra === "YA") html += `<span class="cat-tag cat-psra">PSRA</span>`;
  if (student.kafa === "YA") html += `<span class="cat-tag cat-kafa">KAFA</span>`;
  if (student.akademik === "YA") html += `<span class="cat-tag cat-akademik">Akademik</span>`;
  if (student.online === "YA") html += `<span class="cat-tag cat-online">Online</span>`;
  return html || `<span class="cat-tag" style="background:#e2e8f0; color:#64748b;">Umum</span>`;
}

function selectStudent(student) {
  appState.selectedStudent = student;
  const searchInput = document.getElementById("student-search-input");
  const phoneDisplay = document.getElementById("parent-phone-display");

  if (searchInput) searchInput.value = student.nama;
  if (phoneDisplay) phoneDisplay.value = student.phone || "";

  // Auto tick fee categories that match student profile
  FEE_CHECKBOX_ITEMS.forEach(item => {
    const chk = document.getElementById(`chk-${item.id}`);
    const card = document.getElementById(`card-${item.id}`);
    if (chk) {
      const isEnrolled = student[item.categoryKey] === "YA";
      // Auto check monthly fee item if student enrolled
      if (isEnrolled && (item.id.includes("bulanan") || item.id === "akademik_1")) {
        chk.checked = true;
        if (card) card.classList.add("checked");
      }
    }
  });

  updateTotalAmount();
  renderReceiptPreview();
}

// Fee Checkbox & Price Selection Rendering
function renderCheckboxFeeGroups() {
  const container = document.getElementById("fee-checkbox-groups-container");
  if (!container) return;

  const groupsMap = {};
  FEE_CHECKBOX_ITEMS.forEach(item => {
    if (!groupsMap[item.group]) groupsMap[item.group] = [];
    groupsMap[item.group].push(item);
  });

  let html = "";
  Object.keys(groupsMap).forEach(groupName => {
    const items = groupsMap[groupName];
    const groupIcon = items[0]?.icon || "fa-list";
    html += `
      <div class="fee-group-block">
        <div class="fee-group-header"><i class="fa-solid ${groupIcon}"></i> ${groupName}</div>
        <div class="fee-checkbox-grid">
    `;

    items.forEach(item => {
      let priceControlHtml = "";
      if (item.options && Array.isArray(item.options)) {
        priceControlHtml = `<select id="price-opt-${item.id}" class="fee-card-price-select" onchange="onFeePriceSelectChange('${item.id}', this.value)" onclick="event.stopPropagation()">`;
        item.options.forEach(opt => {
          const selectedAttr = opt === item.stdPrice ? "selected" : "";
          const optLabel = (item.id === "transit_bulanan" && opt === 200) ? `RM${opt} (Diskaun)` : `RM${opt}`;
          priceControlHtml += `<option value="${opt}" ${selectedAttr}>${optLabel}</option>`;
        });
        priceControlHtml += `</select>`;
      } else {
        priceControlHtml = `
          <span class="fee-card-price-prefix">RM</span>
          <input type="number" id="price-${item.id}" class="fee-card-price-input" min="0" value="${item.stdPrice}" oninput="onFeePriceInput('${item.id}')" onclick="event.stopPropagation()">
        `;
      }

      html += `
        <div class="fee-checkbox-card" id="card-${item.id}" onclick="toggleFeeCard('${item.id}', event)">
          <div class="fee-card-left">
            <input type="checkbox" id="chk-${item.id}" class="fee-card-checkbox" onchange="onFeeCheckChange('${item.id}', this.checked, event)">
            <span class="fee-card-label">${item.label}</span>
          </div>
          <div class="fee-card-price-group" onclick="event.stopPropagation()">
            ${priceControlHtml}
          </div>
        </div>
      `;
    });

    html += `</div></div>`;
  });

  container.innerHTML = html;
}

function toggleFeeCard(itemId, event) {
  if (event && event.target && (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT' || event.target.classList.contains('fee-card-checkbox'))) {
    return;
  }
  const chk = document.getElementById(`chk-${itemId}`);
  if (!chk) return;
  chk.checked = !chk.checked;
  onFeeCheckChange(itemId, chk.checked, event);
}

function onFeeCheckChange(itemId, isChecked, event) {
  if (event && event.stopPropagation) event.stopPropagation();
  const card = document.getElementById(`card-${itemId}`);
  if (card) {
    if (isChecked) card.classList.add("checked");
    else card.classList.remove("checked");
  }
  updateTotalAmount();
}

function onFeePriceInput(itemId) {
  const chk = document.getElementById(`chk-${itemId}`);
  const card = document.getElementById(`card-${itemId}`);
  if (chk && !chk.checked) {
    chk.checked = true;
    if (card) card.classList.add("checked");
  }
  updateTotalAmount();
}

function onFeePriceSelectChange(itemId, selectedVal) {
  const chk = document.getElementById(`chk-${itemId}`);
  const card = document.getElementById(`card-${itemId}`);
  if (chk && !chk.checked) {
    chk.checked = true;
    if (card) card.classList.add("checked");
  }
  updateTotalAmount();
}

function getItemPrice(item) {
  if (item.options && Array.isArray(item.options)) {
    const selEl = document.getElementById(`price-opt-${item.id}`);
    if (selEl) return parseFloat(selEl.value) || item.stdPrice;
  }
  const priceEl = document.getElementById(`price-${item.id}`);
  if (priceEl) return parseFloat(priceEl.value) || item.stdPrice;
  return item.stdPrice;
}

function initFeeCalculations() {
  renderCheckboxFeeGroups();
  document.getElementById("pay-date")?.addEventListener("change", renderReceiptPreview);
  document.getElementById("pay-month")?.addEventListener("change", renderReceiptPreview);
  document.querySelectorAll('input[name="kaedahBayaran"]').forEach(radio => {
    radio.addEventListener("change", (e) => {
      document.querySelectorAll('.method-radio-label').forEach(lbl => lbl.classList.remove('selected'));
      e.target.closest('.method-radio-label')?.classList.add('selected');
      renderReceiptPreview();
    });
  });
}

let isTotalCustomEdited = false;

function calculateTotal() {
  const customTotalEl = document.getElementById("fee-total-custom");
  if (isTotalCustomEdited && customTotalEl && customTotalEl.value !== "") {
    return parseFloat(customTotalEl.value) || 0;
  }
  let totalSum = 0;
  FEE_CHECKBOX_ITEMS.forEach(item => {
    const chk = document.getElementById(`chk-${item.id}`);
    if (chk && chk.checked) {
      totalSum += getItemPrice(item);
    }
  });
  return totalSum;
}

function updateTotalAmount() {
  const customTotalEl = document.getElementById("fee-total-custom");
  const calculatedSum = calculateTotal();
  if (!isTotalCustomEdited && customTotalEl) {
    customTotalEl.value = calculatedSum > 0 ? calculatedSum : "";
  }
  renderReceiptPreview();
}

function onCustomTotalInput() {
  const customTotalEl = document.getElementById("fee-total-custom");
  isTotalCustomEdited = !!(customTotalEl && customTotalEl.value.trim() !== "");
  renderReceiptPreview();
}

function calculateNextReceiptNo() {
  if (appState.payments.length === 0) { appState.currentReceiptNo = "FQC-1100"; return; }
  let maxNo = 1099;
  appState.payments.forEach(p => {
    if (p.noResit) {
      const numOnly = parseInt(p.noResit.replace(/[^0-9]/g, ""), 10);
      if (!isNaN(numOnly) && numOnly > maxNo) maxNo = numOnly;
    }
  });
  appState.currentReceiptNo = `FQC-${maxNo + 1}`;
  const el = document.getElementById("rc-no");
  if (el) el.innerText = appState.currentReceiptNo;
}

function formatWhatsAppPhone(phoneStr) {
  if (!phoneStr) return "";
  let clean = phoneStr.replace(/[^0-9]/g, "");
  return clean.startsWith("0") ? "6" + clean : clean;
}

function formatDateDisplay(dateStr) {
  if (!dateStr) return "";
  if (dateStr.includes("/")) return dateStr;
  const parts = dateStr.split("-");
  return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : dateStr;
}

function renderReceiptPreview() {
  const studentName = appState.selectedStudent ? appState.selectedStudent.nama : (document.getElementById("student-search-input")?.value || "NAMA MURID");
  const rawDate = document.getElementById("pay-date")?.value || new Date().toISOString().split("T")[0];
  const dateFormatted = formatDateDisplay(rawDate);
  const bulan = document.getElementById("pay-month")?.value || "OGOS";
  const noResit = appState.currentReceiptNo || "FQC-1100";
  const kaedah = document.querySelector('input[name="kaedahBayaran"]:checked')?.value || "TUNAI";

  if (document.getElementById("rc-date")) document.getElementById("rc-date").innerText = dateFormatted;
  if (document.getElementById("rc-month")) document.getElementById("rc-month").innerText = bulan;
  if (document.getElementById("rc-no")) document.getElementById("rc-no").innerText = noResit;
  if (document.getElementById("rc-student-name")) document.getElementById("rc-student-name").innerText = studentName;
  if (document.getElementById("rc-payment-method")) document.getElementById("rc-payment-method").innerText = kaedah;

  const tableBody = document.getElementById("rc-table-body");
  if (!tableBody) return;

  let html = ""; let totalAmount = 0; let hasItems = false;

  FEE_CHECKBOX_ITEMS.forEach(item => {
    const chk = document.getElementById(`chk-${item.id}`);
    if (chk && chk.checked) {
      const itemPrice = getItemPrice(item);
      hasItems = true;
      totalAmount += itemPrice;
      html += `
        <tr class="active-item">
          <td>${item.label}</td>
          <td style="text-align:center;">${item.group}</td>
          <td style="text-align:center;">${bulan}</td>
          <td class="amount-cell">${itemPrice.toFixed(0)}</td>
        </tr>
      `;
    }
  });

  if (!hasItems) html = `<tr><td colspan="4" style="text-align:center; color:var(--text-muted); font-style:italic; padding:16px;">Sila tick kotak bayaran yuran di sebelah kanan</td></tr>`;

  const customTotalVal = document.getElementById("fee-total-custom")?.value;
  if (isTotalCustomEdited && customTotalVal !== "") {
    totalAmount = parseFloat(customTotalVal) || 0;
  }

  tableBody.innerHTML = html;
  if (document.getElementById("rc-total-amount")) document.getElementById("rc-total-amount").innerText = `RM${totalAmount.toFixed(0)}`;
}

function validateForm() {
  const studentName = appState.selectedStudent ? appState.selectedStudent.nama : (document.getElementById("student-search-input")?.value || "").trim();
  if (!studentName) { showToast("Sila pilih atau taip nama murid.", "warning"); return false; }
  if (!document.getElementById("pay-date")?.value) { showToast("Sila pilih tarikh.", "warning"); return false; }
  if (!document.getElementById("pay-month")?.value) { showToast("Sila pilih bulan.", "warning"); return false; }
  if (calculateTotal() <= 0) { showToast("Sila tick sekurang-kurangnya satu bayaran yuran.", "warning"); return false; }
  if (!document.querySelector('input[name="kaedahBayaran"]:checked')?.value) { showToast("Sila pilih kaedah bayaran.", "warning"); return false; }
  return true;
}

async function actionSimpanPembayaran() {
  if (!validateForm()) return false;
  const btnSimpan = document.getElementById("btn-simpan");
  const btnWhatsapp = document.getElementById("btn-whatsapp");
  try {
    if (btnSimpan) btnSimpan.disabled = true;
    if (btnWhatsapp) btnWhatsapp.disabled = true;
    showLoading(true, "Menyimpan resit pembayaran ke database Google Sheets / AppSheet...");

    const phone = appState.selectedStudent ? appState.selectedStudent.phone : (document.getElementById("parent-phone-display")?.value || "");
    const studentName = appState.selectedStudent ? appState.selectedStudent.nama : document.getElementById("student-search-input")?.value;
    const idMurid = appState.selectedStudent ? appState.selectedStudent.id : "";

    const checkedItems = [];
    FEE_CHECKBOX_ITEMS.forEach(item => {
      const chk = document.getElementById(`chk-${item.id}`);
      if (chk && chk.checked) {
        checkedItems.push({
          id: item.id,
          group: item.group,
          label: item.label,
          stdPrice: item.stdPrice,
          paidPrice: getItemPrice(item)
        });
      }
    });

    const paymentObj = {
      noResit: appState.currentReceiptNo,
      idMurid: idMurid,
      tarikh: formatDateDisplay(document.getElementById("pay-date")?.value),
      bulan: (document.getElementById("pay-month")?.value || "OGOS").toUpperCase(),
      namaMurid: studentName,
      noWhatsapp: phone,
      butiranItem: JSON.stringify(checkedItems),
      jumlah: calculateTotal(),
      kaedahBayaran: document.querySelector('input[name="kaedahBayaran"]:checked')?.value,
      catatan: document.getElementById("pay-catatan")?.value || "",
      timestamp: new Date().toISOString()
    };

    if (typeof google !== "undefined" && google.script && google.script.run) {
      return new Promise((resolve) => {
        google.script.run
          .withSuccessHandler(function(resJson) {
            if (resJson && resJson.success && resJson.noResit) paymentObj.noResit = resJson.noResit;
            appState.payments.unshift(paymentObj);
            saveLocalStoragePayments();
            showLoading(false);
            showToast(`Resit ${paymentObj.noResit} berjaya disimpan!`, "success");
            calculateNextReceiptNo();
            renderDashboard();
            renderHistoryTable();
            renderUnpaidSection();
            resolve(paymentObj);
          })
          .withFailureHandler(function(err) {
            showLoading(false);
            showToast("Gagal menyimpan ke Sheet: " + err, "error");
            resolve(false);
          })
          .savePayment(paymentObj);
      });
    }

    if (appState.appsScriptUrl) {
      try {
        const response = await fetch(appState.appsScriptUrl, {
          method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({ action: "savePayment", payload: paymentObj })
        });
        const resJson = await response.json();
        if (resJson.success && resJson.noResit) paymentObj.noResit = resJson.noResit;
      } catch (err) {}
    }

    appState.payments.unshift(paymentObj);
    saveLocalStoragePayments();
    showLoading(false);
    showToast(`Resit ${paymentObj.noResit} berjaya disimpan!`, "success");
    calculateNextReceiptNo();
    renderDashboard();
    renderHistoryTable();
    renderUnpaidSection();
    return paymentObj;
  } catch (e) {
    showLoading(false);
    showToast("Gagal menyimpan: " + e.message, "error");
    return false;
  } finally {
    if (btnSimpan) btnSimpan.disabled = false;
    if (btnWhatsapp) btnWhatsapp.disabled = false;
  }
}

async function actionHantarWhatsapp() {
  if (!validateForm()) return;
  const saved = await actionSimpanPembayaran();
  if (!saved) return;

  const phoneFormatted = formatWhatsAppPhone(saved.noWhatsapp);
  if (!phoneFormatted) {
    showToast("Nombor WhatsApp tidak sah untuk murid ini.", "warning");
    return;
  }

  const itemsListText = JSON.parse(saved.butiranItem || "[]").map(i => `• ${i.label}: RM${i.paidPrice}`).join("\n");
  const msg = `Assalamualaikum. Terima kasih. Berikut adalah resit pembayaran yuran bagi ${saved.namaMurid} untuk bulan ${saved.bulan} 2026.\n\nNo. Resit: ${saved.noResit}\nTarikh: ${saved.tarikh}\nKaedah: ${saved.kaedahBayaran}\n\n*BUTIRAN YURAN:*\n${itemsListText}\n\n*JUMLAH PEMBAYARAN: RM${saved.jumlah}*\n\nTerima kasih.`;
  window.open(`https://wa.me/${phoneFormatted}?text=${encodeURIComponent(msg)}`, '_blank');
}

function actionJanaGambarResit() {
  const receiptEl = document.getElementById("receipt-paper");
  if (!receiptEl) return;

  if (typeof html2canvas !== "undefined") {
    showLoading(true, "Menjana gambar resit PNG...");
    html2canvas(receiptEl, { scale: 2 }).then(canvas => {
      showLoading(false);
      const imageUri = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `Resit_FQC_${appState.currentReceiptNo}.png`;
      link.href = imageUri;
      link.click();
      showToast("Gambar resit berjaya dijana dan dimuat turun!", "success");
    }).catch(err => {
      showLoading(false);
      showToast("Gagal menjana gambar resit: " + err, "error");
    });
  } else {
    showToast("Fungsi jana gambar sedia ada. Sila cetak resit.", "info");
    window.print();
  }
}

function actionPDFResit() {
  window.print();
}

function actionResetBorang() {
  appState.selectedStudent = null;
  const searchInput = document.getElementById("student-search-input");
  if (searchInput) searchInput.value = "";
  const phoneDisplay = document.getElementById("parent-phone-display");
  if (phoneDisplay) phoneDisplay.value = "";
  
  FEE_CHECKBOX_ITEMS.forEach(item => {
    const chk = document.getElementById(`chk-${item.id}`);
    const priceEl = document.getElementById(`price-${item.id}`);
    const card = document.getElementById(`card-${item.id}`);
    if (chk) chk.checked = false;
    if (priceEl) priceEl.value = item.stdPrice;
    if (card) card.classList.remove("checked");
  });

  isTotalCustomEdited = false;
  const customTotalEl = document.getElementById("fee-total-custom");
  if (customTotalEl) customTotalEl.value = "";
  const catatanEl = document.getElementById("pay-catatan");
  if (catatanEl) catatanEl.value = "";

  initDateAndMonth();
  updateTotalAmount();
  renderReceiptPreview();
  showToast("Borang telah dibersihkan.", "info");
}

function saveLocalStoragePayments() { safeSetStorage("fqc_payments_db", JSON.stringify(appState.payments)); }
function loadLocalStoragePayments() {
  const data = safeGetStorage("fqc_payments_db");
  if (data) { try { appState.payments = JSON.parse(data); } catch (e) {} }
}
function saveLocalStorageStudents() { safeSetStorage("fqc_students_db", JSON.stringify(appState.students)); }
function loadLocalStorageStudents() {
  const data = safeGetStorage("fqc_students_db");
  if (data) { try { const parsed = JSON.parse(data); if (Array.isArray(parsed) && parsed.length > 0) appState.students = parsed; } catch (e) {} }
}

// Kemaskini Data Action (Button in Dashboard)
async function actionRefreshAllData() {
  showLoading(true, "Mengambil data terbaru daripada database Google Sheets / AppSheet...");
  appState.lastUpdated = new Date().toLocaleString("ms-MY");
  const stampEl = document.getElementById("dash-last-updated");
  if (stampEl) stampEl.innerText = `Dikemaskini terakhir: ${appState.lastUpdated}`;

  try {
    await fetchStudentsFromBackend(false);
    await fetchPaymentHistoryFromBackend(false);
  } catch (err) {
    console.error("Ralat kemaskini data:", err);
  } finally {
    showLoading(false);
  }

  renderDashboard();
  renderHistoryTable();
  renderUnpaidSection();
  showToast("Data murid, rekod bayaran, dan status tunggakan berjaya dikemaskini!", "success");
}

// Unpaid Calculation Logic based on Enrolled Student Categories
function getUnpaidStudentsForMonth(monthName) {
  const filterMonth = monthName.toUpperCase();
  const activeStudents = appState.students.filter(s => s.status !== "TIDAK AKTIF");
  const unpaidList = [];

  activeStudents.forEach(student => {
    const studentPayments = appState.payments.filter(p => p.bulan && p.bulan.toUpperCase() === filterMonth && p.namaMurid.trim().toLowerCase() === student.nama.trim().toLowerCase());
    
    // Check categories enrolled for this student
    const enrolledCategories = [];
    if (student.mengaji === "YA") enrolledCategories.push({ name: "Mengaji", stdPrice: student.hargaMengaji || 100 });
    if (student.transit === "YA") enrolledCategories.push({ name: "Transit", stdPrice: student.hargaTransit || 260 });
    if (student.jawi === "YA") enrolledCategories.push({ name: "Jawi", stdPrice: 100 });
    if (student.upkk === "YA") enrolledCategories.push({ name: "UPKK", stdPrice: 100 });
    if (student.psra === "YA") enrolledCategories.push({ name: "PSRA", stdPrice: 100 });
    if (student.kafa === "YA") enrolledCategories.push({ name: "KAFA", stdPrice: 100 });
    if (student.akademik === "YA") enrolledCategories.push({ name: "Akademik", stdPrice: student.hargaAkademik || 40 });
    if (student.online === "YA") enrolledCategories.push({ name: "Mengaji Online", stdPrice: 150 });

    if (enrolledCategories.length === 0) {
      enrolledCategories.push({ name: "Mengaji", stdPrice: 100 });
    }

    // Check which categories have been paid in studentPayments
    const paidCategoriesSet = new Set();
    studentPayments.forEach(p => {
      let items = [];
      try { items = typeof p.butiranItem === 'string' ? JSON.parse(p.butiranItem) : p.butiranItem; } catch(e) {}
      if (Array.isArray(items) && items.length > 0) {
        items.forEach(it => {
          const groupName = (it.group || it.label || "").toLowerCase();
          if (groupName.includes("mengaji online")) paidCategoriesSet.add("Mengaji Online");
          else if (groupName.includes("mengaji")) paidCategoriesSet.add("Mengaji");
          if (groupName.includes("transit")) paidCategoriesSet.add("Transit");
          if (groupName.includes("jawi")) paidCategoriesSet.add("Jawi");
          if (groupName.includes("upkk")) paidCategoriesSet.add("UPKK");
          if (groupName.includes("psra")) paidCategoriesSet.add("PSRA");
          if (groupName.includes("kafa")) paidCategoriesSet.add("KAFA");
          if (groupName.includes("akademik")) paidCategoriesSet.add("Akademik");
        });
      } else if (p.jumlah > 0) {
        // Fallback: assume paid main enrolled category if total paid >= price
        enrolledCategories.forEach(cat => paidCategoriesSet.add(cat.name));
      }
    });

    const unpaidCategories = enrolledCategories.filter(cat => !paidCategoriesSet.has(cat.name));

    if (unpaidCategories.length > 0) {
      const categoryText = unpaidCategories.map(c => c.name).join(", ");
      const totalAmountUnpaid = unpaidCategories.reduce((sum, c) => sum + c.stdPrice, 0);
      unpaidList.push({
        student: student,
        unpaidCategories: unpaidCategories,
        categoryText: categoryText,
        totalAmount: totalAmountUnpaid
      });
    }
  });

  return unpaidList;
}

function renderDashboard() {
  const filterMonth = document.getElementById("dash-month-filter")?.value || "OGOS";
  
  const unpaidItems = getUnpaidStudentsForMonth(filterMonth);
  const activeStudents = appState.students.filter(s => s.status !== "TIDAK AKTIF");
  const paidCount = activeStudents.length - unpaidItems.length;

  // Calculate Cumulative overall collections Jan to current month
  const monthsMalay = ["JANUARI", "FEBRUARI", "MAC", "APRIL", "MEI", "JUN", "JULAI", "OGOS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DISEMBER"];
  const currentMonthIdx = new Date().getMonth();
  
  let totalOverallJanToNow = 0;
  appState.payments.forEach(p => {
    const itemMonth = p.bulan ? p.bulan.toUpperCase() : "";
    const monthIdx = monthsMalay.indexOf(itemMonth);
    if (monthIdx !== -1 && monthIdx <= currentMonthIdx) {
      totalOverallJanToNow += (parseFloat(p.jumlah) || 0);
    }
  });

  if (document.getElementById("dash-total-kutipan")) document.getElementById("dash-total-kutipan").innerText = `RM ${totalOverallJanToNow.toFixed(0)}`;
  if (document.getElementById("dash-total-murid")) document.getElementById("dash-total-murid").innerText = activeStudents.length;
  if (document.getElementById("dash-total-sudah-bayar")) document.getElementById("dash-total-sudah-bayar").innerText = paidCount;
  if (document.getElementById("dash-total-belum-bayar")) document.getElementById("dash-total-belum-bayar").innerText = unpaidItems.length;
  if (document.getElementById("dash-total-transaksi")) document.getElementById("dash-total-transaksi").innerText = appState.payments.length;

  renderUnpaidTable(unpaidItems, filterMonth);
  renderMonthlySummaryGrid();
}

function renderUnpaidSection() {
  const filterMonth = document.getElementById("unpaid-month-filter")?.value || document.getElementById("dash-month-filter")?.value || "OGOS";
  const unpaidItems = getUnpaidStudentsForMonth(filterMonth);
  renderUnpaidTable(unpaidItems, filterMonth);
}

function renderUnpaidTable(unpaidItems, filterMonth) {
  const unpaidTbody = document.getElementById("unpaid-table-body");
  if (!unpaidTbody) return;

  if (unpaidItems.length === 0) {
    unpaidTbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:1.25rem; color:#15803d; font-weight:700;"><i class="fa-solid fa-circle-check"></i> Tahniah! Semua murid telah membuat pembayaran penuh bagi bulan ${filterMonth}!</td></tr>`;
    return;
  }

  let html = "";
  unpaidItems.forEach((item, idx) => {
    const s = item.student;
    html += `
      <tr>
        <td>${idx + 1}</td>
        <td><strong>${s.nama}</strong></td>
        <td>${s.phone || '-'}</td>
        <td><span class="badge-unpaid"><i class="fa-solid fa-triangle-exclamation"></i> ${item.categoryText}</span></td>
        <td><strong>RM ${item.totalAmount}</strong></td>
        <td><span class="badge-unpaid">Belum Bayar</span></td>
        <td style="display:flex; gap:0.4rem;">
          <button class="btn btn-whatsapp" style="padding:4px 8px; font-size:0.75rem;" onclick="sendWaReminder('${s.nama.replace(/'/g, "\\'")}', '${s.phone || ''}', '${filterMonth}', '${item.categoryText}')">
            <i class="fa-brands fa-whatsapp"></i> WhatsApp
          </button>
          <button class="btn btn-primary" style="padding:4px 8px; font-size:0.75rem;" onclick="payForStudent('${s.nama.replace(/'/g, "\\'")}')">
            <i class="fa-solid fa-cash-register"></i> Bayar
          </button>
        </td>
      </tr>
    `;
  });
  unpaidTbody.innerHTML = html;
}

function sendWaReminder(studentName, phone, month, categoryText) {
  const phoneFormatted = formatWhatsAppPhone(phone);
  if (!phoneFormatted) { showToast("Nombor WhatsApp tidak sah.", "warning"); return; }
  const msg = `Assalamualaikum. Makluman, bayaran yuran bagi ${studentName} untuk bulan ${month} (${categoryText}) masih belum direkodkan. Mohon semak pembayaran. Terima kasih.`;
  window.open(`https://wa.me/${phoneFormatted}?text=${encodeURIComponent(msg)}`, '_blank');
}

function payForStudent(studentName) {
  const student = appState.students.find(s => s.nama.toLowerCase() === studentName.toLowerCase());
  if (student) {
    selectStudent(student);
  }
  switchView('bayaran');
}

// Export Unpaid Students to Excel (.xlsx)
function exportUnpaidToExcel() {
  const monthSelect = document.getElementById("dash-month-filter")?.value || document.getElementById("unpaid-month-filter")?.value || "OGOS";
  const unpaidItems = getUnpaidStudentsForMonth(monthSelect);
  
  if (unpaidItems.length === 0) {
    showToast(`Tiada senarai tunggakan bagi bulan ${monthSelect} untuk dieksport.`, "info");
    return;
  }

  const exportData = unpaidItems.map((item, idx) => ({
    "Bil": idx + 1,
    "Nama Murid": item.student.nama,
    "No. WhatsApp": item.student.phone || "-",
    "Kategori": item.categoryText,
    "Jenis Yuran": "Yuran Bulanan",
    "Jumlah (RM)": item.totalAmount,
    "Bulan": monthSelect,
    "Status": "Belum Bayar"
  }));

  if (typeof XLSX !== "undefined") {
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Belum Bayar");
    const fileName = `Senarai_Belum_Bayar_FQC_${monthSelect}_2026.xlsx`;
    XLSX.writeFile(wb, fileName);
    showToast(`Fail Excel ${fileName} berjaya dijana dan dimuat turun!`, "success");
  } else {
    // Fallback to CSV
    let csvContent = "data:text/csv;charset=utf-8,Bil,Nama Murid,No WhatsApp,Kategori,Jenis Yuran,Jumlah,Bulan,Status\n";
    exportData.forEach(row => {
      csvContent += `${row["Bil"]},"${row["Nama Murid"]}","${row["No. WhatsApp"]}","${row["Kategori"]}",Yuran Bulanan,${row["Jumlah (RM)"]},${row["Bulan"]},Belum Bayar\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Senarai_Belum_Bayar_FQC_${monthSelect}_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Senarai tunggakan berjaya dieksport ke CSV!", "success");
  }
}

function renderMonthlySummaryGrid() {
  const gridContainer = document.getElementById("monthly-summary-container");
  if (!gridContainer) return;

  const monthsMalay = ["JANUARI", "FEBRUARI", "MAC", "APRIL", "MEI", "JUN", "JULAI", "OGOS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DISEMBER"];
  const monthlySumMap = {};
  monthsMalay.forEach(m => monthlySumMap[m] = 0);

  appState.payments.forEach(p => {
    const m = p.bulan ? p.bulan.toUpperCase() : "";
    if (monthlySumMap[m] !== undefined) monthlySumMap[m] += (parseFloat(p.jumlah) || 0);
  });

  let html = "";
  monthsMalay.forEach(m => {
    html += `
      <div style="background:var(--surface-card); border:1px solid var(--border-color); padding:0.75rem; border-radius:var(--radius-sm); text-align:center;">
        <div style="font-size:0.75rem; font-weight:700; color:var(--text-muted);">${m}</div>
        <div style="font-size:1.1rem; font-weight:800; color:var(--primary-dark); margin-top:2px;">RM ${monthlySumMap[m].toFixed(0)}</div>
      </div>
    `;
  });
  gridContainer.innerHTML = html;
}

function renderHistoryTable() {
  const tbody = document.getElementById("history-table-body");
  if (!tbody) return;

  if (appState.payments.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:1.5rem; color:var(--text-muted);">Tiada rekod pembayaran dijumpai</td></tr>`;
    return;
  }

  let html = "";
  appState.payments.forEach((p, idx) => {
    html += `
      <tr>
        <td><strong>${p.noResit || '-'}</strong></td>
        <td>${p.tarikh || '-'}</td>
        <td><strong>${p.namaMurid || '-'}</strong></td>
        <td>${p.bulan || '-'}</td>
        <td><strong>RM ${parseFloat(p.jumlah || 0).toFixed(0)}</strong></td>
        <td><span class="header-badge" style="display:inline-flex;">${p.kaedahBayaran || 'TUNAI'}</span></td>
        <td>
          <button class="btn btn-outline" style="padding:4px 8px; font-size:0.75rem;" onclick="cetakResitRekod(${idx})"><i class="fa-solid fa-eye"></i> Lihat Resit</button>
        </td>
      </tr>
    `;
  });
  tbody.innerHTML = html;
}

function cetakResitRekod(idx) {
  const p = appState.payments[idx];
  if (!p) return;
  appState.currentReceiptNo = p.noResit;
  if (document.getElementById("rc-no")) document.getElementById("rc-no").innerText = p.noResit;
  if (document.getElementById("rc-date")) document.getElementById("rc-date").innerText = p.tarikh;
  if (document.getElementById("rc-month")) document.getElementById("rc-month").innerText = p.bulan;
  if (document.getElementById("rc-student-name")) document.getElementById("rc-student-name").innerText = p.namaMurid;
  if (document.getElementById("rc-payment-method")) document.getElementById("rc-payment-method").innerText = p.kaedahBayaran;

  const tableBody = document.getElementById("rc-table-body");
  let items = [];
  try { items = typeof p.butiranItem === 'string' ? JSON.parse(p.butiranItem) : p.butiranItem; } catch (e) {}
  
  if (tableBody) {
    let html = "";
    if (Array.isArray(items) && items.length > 0) {
      items.forEach(it => {
        html += `<tr class="active-item"><td>${it.label}</td><td style="text-align:center;">${it.group || '-'}</td><td style="text-align:center;">${p.bulan}</td><td class="amount-cell">${it.paidPrice}</td></tr>`;
      });
    } else {
      html = `<tr class="active-item"><td>Yuran Pengajian ${p.bulan}</td><td style="text-align:center;">Umum</td><td style="text-align:center;">${p.bulan}</td><td class="amount-cell">${p.jumlah}</td></tr>`;
    }
    tableBody.innerHTML = html;
  }

  if (document.getElementById("rc-total-amount")) document.getElementById("rc-total-amount").innerText = `RM${p.jumlah}`;
  switchView('bayaran');
  showToast(`Melihat Resit ${p.noResit}`, "info");
}

// Student Table & CRUD View
function renderStudentTable() {
  const tbody = document.getElementById("student-table-body");
  if (!tbody) return;

  let html = "";
  appState.students.forEach((s, idx) => {
    const categoryBadges = getCategoryBadgesHtml(s);
    html += `
      <tr>
        <td>${s.id || (idx + 1)}</td>
        <td><strong>${s.nama}</strong></td>
        <td>${s.parent || '-'}</td>
        <td>${s.phone || '-'}</td>
        <td>${categoryBadges}</td>
        <td><span class="${s.status === 'AKTIF' ? 'badge-paid' : 'badge-unpaid'}">${s.status}</span></td>
        <td>
          <button class="btn btn-outline" style="padding:4px 8px; font-size:0.75rem;" onclick="openEditStudentModal(${idx})"><i class="fa-solid fa-pen"></i> Edit</button>
        </td>
      </tr>
    `;
  });
  tbody.innerHTML = html;
}

function openAddStudentModal() {
  document.getElementById("modal-student-title").innerText = "Tambah Murid Baharu";
  document.getElementById("modal-student-id").value = "";
  document.getElementById("modal-student-nama").value = "";
  document.getElementById("modal-student-parent").value = "";
  document.getElementById("modal-student-phone").value = "";
  document.getElementById("modal-student-status").value = "AKTIF";

  document.getElementById("modal-chk-mengaji").checked = true;
  document.getElementById("modal-chk-transit").checked = false;
  document.getElementById("modal-chk-jawi").checked = false;
  document.getElementById("modal-chk-kafa").checked = false;
  document.getElementById("modal-chk-upkk").checked = false;
  document.getElementById("modal-chk-psra").checked = false;
  document.getElementById("modal-chk-akademik").checked = false;
  document.getElementById("modal-chk-online").checked = false;

  document.getElementById("student-modal-backdrop")?.classList.add("show");
}

function openEditStudentModal(idx) {
  const s = appState.students[idx];
  if (!s) return;

  document.getElementById("modal-student-title").innerText = "Kemaskini Profil Murid";
  document.getElementById("modal-student-id").value = s.id || (idx + 1);
  document.getElementById("modal-student-nama").value = s.nama;
  document.getElementById("modal-student-parent").value = s.parent || "";
  document.getElementById("modal-student-phone").value = s.phone || "";
  document.getElementById("modal-student-status").value = s.status || "AKTIF";

  document.getElementById("modal-chk-mengaji").checked = s.mengaji === "YA";
  document.getElementById("modal-chk-transit").checked = s.transit === "YA";
  document.getElementById("modal-chk-jawi").checked = s.jawi === "YA";
  document.getElementById("modal-chk-kafa").checked = s.kafa === "YA";
  document.getElementById("modal-chk-upkk").checked = s.upkk === "YA";
  document.getElementById("modal-chk-psra").checked = s.psra === "YA";
  document.getElementById("modal-chk-akademik").checked = s.akademik === "YA";
  document.getElementById("modal-chk-online").checked = s.online === "YA";

  document.getElementById("student-modal-backdrop")?.classList.add("show");
}

function closeStudentModal() {
  document.getElementById("student-modal-backdrop")?.classList.remove("show");
}

async function saveStudentFromModal() {
  const nama = document.getElementById("modal-student-nama").value.trim();
  if (!nama) { showToast("Sila masukkan nama murid.", "warning"); return; }

  const id = document.getElementById("modal-student-id").value;
  const parent = document.getElementById("modal-student-parent").value.trim();
  const phone = document.getElementById("modal-student-phone").value.trim();
  const status = document.getElementById("modal-student-status").value;

  const studentObj = {
    id: id || (appState.students.length + 1),
    nama: nama,
    parent: parent,
    phone: phone,
    status: status,
    mengaji: document.getElementById("modal-chk-mengaji").checked ? "YA" : "TIDAK",
    transit: document.getElementById("modal-chk-transit").checked ? "YA" : "TIDAK",
    jawi: document.getElementById("modal-chk-jawi").checked ? "YA" : "TIDAK",
    kafa: document.getElementById("modal-chk-kafa").checked ? "YA" : "TIDAK",
    upkk: document.getElementById("modal-chk-upkk").checked ? "YA" : "TIDAK",
    psra: document.getElementById("modal-chk-psra").checked ? "YA" : "TIDAK",
    akademik: document.getElementById("modal-chk-akademik").checked ? "YA" : "TIDAK",
    online: document.getElementById("modal-chk-online").checked ? "YA" : "TIDAK",
    hargaMengaji: 100, hargaAkademik: 40, hargaTransit: 260, catatan: ""
  };

  const existingIdx = appState.students.findIndex(s => s.id == studentObj.id || s.nama.toLowerCase() === nama.toLowerCase());
  if (existingIdx !== -1) appState.students[existingIdx] = studentObj;
  else appState.students.push(studentObj);

  saveLocalStorageStudents();
  closeStudentModal();
  renderStudentTable();
  renderDashboard();

  if (typeof google !== "undefined" && google.script && google.script.run) {
    google.script.run.saveStudent(studentObj);
  } else if (appState.appsScriptUrl) {
    try {
      fetch(appState.appsScriptUrl, {
        method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: "saveStudent", payload: studentObj })
      });
    } catch(e) {}
  }

  showToast("Profil murid berjaya disimpan!", "success");
}

async function fetchStudentsFromBackend(showToastMsg = false) {
  if (showToastMsg) showLoading(true, "Memuat turun data murid terkini dari Google Sheets...");

  if (typeof google !== "undefined" && google.script && google.script.run) {
    google.script.run
      .withSuccessHandler(function(studentsData) {
        if (showToastMsg) showLoading(false);
        if (Array.isArray(studentsData) && studentsData.length > 0) {
          appState.students = studentsData;
          saveLocalStorageStudents();
          renderDashboard();
          renderStudentTable();
          if (showToastMsg) showToast(`Berjaya! Senarai ${appState.students.length} murid terbaharu ditarik!`, "success");
        }
      })
      .withFailureHandler(function(err) {
        if (showToastMsg) { showLoading(false); showToast("Gagal memuat turun data murid: " + err, "error"); }
      })
      .getStudents();
    return;
  }

  if (!appState.appsScriptUrl) return;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-saat timeout
  try {
    const res = await fetch(`${appState.appsScriptUrl}?action=getStudents`, { signal: controller.signal });
    clearTimeout(timeoutId);
    const data = await res.json();
    if (showToastMsg) showLoading(false);
    if (data.success && Array.isArray(data.data) && data.data.length > 0) {
      appState.students = data.data;
      saveLocalStorageStudents();
      renderDashboard();
      renderStudentTable();
      if (showToastMsg) showToast(`Berjaya! Senarai ${appState.students.length} murid terbaharu ditarik!`, "success");
    }
  } catch (err) {
    clearTimeout(timeoutId);
    if (showToastMsg) { showLoading(false); showToast("Gagal memuat turun data murid.", "error"); }
  }
}

async function fetchPaymentHistoryFromBackend() {
  if (typeof google !== "undefined" && google.script && google.script.run) {
    google.script.run
      .withSuccessHandler(function(historyData) {
        if (Array.isArray(historyData) && historyData.length > 0) {
          appState.payments = historyData;
          saveLocalStoragePayments();
          calculateNextReceiptNo();
          renderDashboard();
          renderHistoryTable();
        }
      })
      .getPaymentHistory();
    return;
  }

  if (!appState.appsScriptUrl) return;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-saat timeout
  try {
    const res = await fetch(`${appState.appsScriptUrl}?action=getPaymentHistory`, { signal: controller.signal });
    clearTimeout(timeoutId);
    const data = await res.json();
    if (data.success && Array.isArray(data.data) && data.data.length > 0) {
      appState.payments = data.data;
      saveLocalStoragePayments();
      calculateNextReceiptNo();
      renderDashboard();
      renderHistoryTable();
    }
  } catch (err) { clearTimeout(timeoutId); }
}

function initDatabaseSettings() {
  const urlInput = document.getElementById("setting-apps-script-url");
  if (urlInput) urlInput.value = appState.appsScriptUrl || "";
}

async function saveAndTestDatabaseConnection() {
  const urlInput = document.getElementById("setting-apps-script-url");
  if (!urlInput) return;
  let newUrl = urlInput.value.trim();
  if (!newUrl) {
    showToast("Sila masukkan Web App URL Google Apps Script.", "warning");
    return;
  }

  appState.appsScriptUrl = newUrl;
  safeSetStorage("fqc_apps_script_url", newUrl);
  showLoading(true, "Menguji sambungan ke Google Sheets Database...");

  try {
    const res = await fetch(`${newUrl}?action=getStudents`);
    const data = await res.json();
    showLoading(false);
    if (data && data.success && Array.isArray(data.data)) {
      showToast(`⚡ Sambungan Berjaya! Data ${data.data.length} murid ditarik dari Google Sheets!`, "success");
      appState.students = data.data;
      saveLocalStorageStudents();
      renderDashboard();
      renderStudentTable();
      fetchPaymentHistoryFromBackend();
    } else {
      showToast("Sambungan gagal: Respons tidak sah daripada Web App.", "error");
    }
  } catch (err) {
    showLoading(false);
    showToast("Gagal menyambung! Pastikan Web App di-deploy dengan 'Who has access: Anyone'.", "error");
  }
}
