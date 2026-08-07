/**
 * ==============================================================================
 * SISTEM PEMBAYARAN YURAN & RESIT DIGITAL - FATHUL QURANIC CENTRE (FQC)
 * Clean Modular Application Logic (app.js)
 * ==============================================================================
 */

// Master List 28 Murid FQC Default Terbaharu
const MASTER_STUDENTS_DEFAULT = [
  { id: 1, nama: "Syed Mohd Alwi Bin Syed Mohamed", phone: "0145366009" },
  { id: 2, nama: "Faid Fareed Bin Mohd Shah Fitri", phone: "01481810192" },
  { id: 3, nama: "Mohd Fadzli Bin Ab Wahab", phone: "01133323707" },
  { id: 4, nama: "Nur Aliyah Binti Muhammad A'fifi", phone: "0133447681" },
  { id: 5, nama: "Nur Inas Tihani Binti Muhammed Nasri", phone: "0179378264" },
  { id: 6, nama: "Fidatul Fitriah Binti Fazli", phone: "0176826787" },
  { id: 7, nama: "Nur Damia Arissa Bt Faizol Azimi", phone: "0132955402" },
  { id: 8, nama: "Alya Sofia Binti Aris", phone: "0173235786" },
  { id: 9, nama: "Tengku Aqill Hafy Bin Tengku Shahrizal", phone: "0133440896" },
  { id: 10, nama: "Muhammad Aathif Adhwa Bin Mohd Fazli", phone: "0123209953" },
  { id: 11, nama: "Nur Aimy Safiy Binti Shaiful Azmi", phone: "0108901030" },
  { id: 12, nama: "Muhammad Harith Bin Muhamad Hosni", phone: "0173409430" },
  { id: 13, nama: "Nur Ayesha Zahira Binti Abdullah Zawawie", phone: "0132410737" },
  { id: 14, nama: "Wan Nadzrin Afeef Bin Wan Ibrahim Jefri", phone: "01110081660" },
  { id: 15, nama: "Hilal Sufi Bin Hasrull Nizam", phone: "0193593693" },
  { id: 16, nama: "Maira Yusreena Binti Muhamad Yazid", phone: "0129878510" },
  { id: 17, nama: "Izz Zara Sofia Binti Mohd Safarudin", phone: "0162710027" },
  { id: 18, nama: "Ammar Luqman Bin Shamsudin", phone: "0172382980" },
  { id: 19, nama: "Ainan Salsabila Binti Hafiz Anuar", phone: "0139311818" },
  { id: 20, nama: "Arissa Medina Bt Ahmad Fauzi", phone: "0129425926" },
  { id: 21, nama: "Ammar Ramadhan Bin Ahmad Fauzi", phone: "0129425926" },
  { id: 22, nama: "Muhammad Rizal Arshad Bin Mohd Rosmizam", phone: "0129343676" },
  { id: 23, nama: "Nur Raisha Adawiyah Binti Mohd Rosmizam", phone: "0129343676" },
  { id: 24, nama: "Aisyah Humaira Bt Lukman", phone: "0196550670" },
  { id: 25, nama: "Izarra Khaiyrra Bt Mohd Aris", phone: "0199872971" },
  { id: 26, nama: "Ahmad Aariz Dayyan B. Mohd Kamalludin", phone: "0132315660" },
  { id: 27, nama: "Nur Aisya' Qaseh Bt Aziman", phone: "0179890260" },
  { id: 28, nama: "NAJIHAH", phone: "0134565245" }
];

// Helper Safe Storage
function safeGetStorage(key, defaultVal = "") {
  try {
    if (typeof localStorage !== "undefined") return localStorage.getItem(key) || defaultVal;
  } catch (e) {}
  return defaultVal;
}

function safeSetStorage(key, val) {
  try {
    if (typeof localStorage !== "undefined") localStorage.setItem(key, val);
  } catch (e) {}
}

// Master 26 Fee Items Array
const FEE_CHECKBOX_ITEMS = [
  { id: "mengaji_pendaftaran", group: "1. KELAS MENGAJI", label: "Pendaftaran Mengaji", stdPrice: 100, field: "pendaftaran", icon: "fa-book-quran" },
  { id: "mengaji_bulanan", group: "1. KELAS MENGAJI", label: "Yuran Bulanan Mengaji", stdPrice: 100, field: "pengajianAlquran", icon: "fa-book-quran" },
  { id: "mengaji_buku", group: "1. KELAS MENGAJI", label: "Buku Mengaji", stdPrice: 20, field: "bukuRekodModul", icon: "fa-book-open" },
  { id: "online_pendaftaran", group: "2. KELAS MENGAJI ONLINE", label: "Pendaftaran Online", stdPrice: 50, field: "pendaftaran", icon: "fa-laptop" },
  { id: "online_bulanan", group: "2. KELAS MENGAJI ONLINE", label: "Yuran Bulanan Online", stdPrice: 150, field: "pengajianAlquran", icon: "fa-laptop" },
  { id: "akademik_pendaftaran", group: "3. TUISYEN AKADEMIK", label: "Pendaftaran Akademik", stdPrice: 50, field: "pendaftaran", icon: "fa-graduation-cap" },
  { id: "akademik_1", group: "3. TUISYEN AKADEMIK", label: "Tuisyen Akademik 1 Subjek", stdPrice: 35, field: "kelasAkademik", icon: "fa-book" },
  { id: "akademik_4", group: "3. TUISYEN AKADEMIK", label: "Tuisyen Akademik 4 Subjek", stdPrice: 110, field: "kelasAkademik", icon: "fa-layer-group" },
  { id: "kafa_pendaftaran", group: "4. TUISYEN KAFA (THN 2-6)", label: "Pendaftaran KAFA", stdPrice: 100, field: "pendaftaran", icon: "fa-mosque" },
  { id: "kafa_bulanan", group: "4. TUISYEN KAFA (THN 2-6)", label: "Yuran Bulanan KAFA", stdPrice: 100, field: "kelasKafa", icon: "fa-mosque" },
  { id: "kafa_buku", group: "4. TUISYEN KAFA (THN 2-6)", label: "Buku KAFA", stdPrice: 60, field: "bukuRekodModul", icon: "fa-book-open" },
  { id: "jawi_pendaftaran", group: "5. KELAS KHAS JAWI", label: "Pendaftaran Jawi", stdPrice: 100, field: "pendaftaran", icon: "fa-pen-nib" },
  { id: "jawi_bulanan", group: "5. KELAS KHAS JAWI", label: "Yuran Bulanan Jawi", stdPrice: 100, field: "kelasKhasJawi", icon: "fa-pen-nib" },
  { id: "jawi_buku", group: "5. KELAS KHAS JAWI", label: "Buku Jawi", stdPrice: 60, field: "bukuRekodModul", icon: "fa-book-open" },
  { id: "upkk_pendaftaran", group: "6. KELAS UPKK", label: "Pendaftaran UPKK", stdPrice: 100, field: "pendaftaran", icon: "fa-award" },
  { id: "upkk_bulanan", group: "6. KELAS UPKK", label: "Yuran Bulanan UPKK", stdPrice: 100, field: "kelasUpkk", icon: "fa-award" },
  { id: "upkk_buku", group: "6. KELAS UPKK", label: "Buku UPKK", stdPrice: 64, field: "bukuRekodModul", icon: "fa-book-open" },
  { id: "psra_pendaftaran", group: "7. KELAS PSRA", label: "Pendaftaran PSRA", stdPrice: 100, field: "pendaftaran", icon: "fa-certificate" },
  { id: "psra_bulanan", group: "7. KELAS PSRA", label: "Yuran Bulanan PSRA", stdPrice: 100, field: "kelasPsra", icon: "fa-certificate" },
  { id: "psra_buku", group: "7. KELAS PSRA", label: "Buku PSRA", stdPrice: 60, field: "bukuRekodModul", icon: "fa-book-open" },
  { id: "transit_pendaftaran", group: "8. TRANSIT FQC", label: "Pendaftaran Transit", stdPrice: 150, field: "pendaftaran", icon: "fa-bus" },
  { id: "transit_biasa", group: "8. TRANSIT FQC", label: "Transit Biasa", stdPrice: 260, field: "transit", icon: "fa-bus" },
  { id: "transit_petang", group: "8. TRANSIT FQC", label: "Transit Sampai Petang", stdPrice: 310, field: "transit", icon: "fa-clock" },
  { id: "transit_diskaun", group: "8. TRANSIT FQC", label: "Transit Diskaun", stdPrice: 200, field: "transit", icon: "fa-tags" },
  { id: "transit_mengaji", group: "8. TRANSIT FQC", label: "Tambahan Mengaji", stdPrice: 50, field: "transit", icon: "fa-plus-circle" },
  { id: "transit_ot", group: "8. TRANSIT FQC", label: "Tambahan OT Sebulan", stdPrice: 40, field: "transit", icon: "fa-user-clock" },
  { id: "sumbangan", group: "9. SUMBANGAN & LAIN-LAIN", label: "Sumbangan / Modul / Lain-lain", stdPrice: 50, field: "sumbangan", icon: "fa-hand-holding-heart" }
];

// App State
let appState = {
  students: [...MASTER_STUDENTS_DEFAULT],
  payments: [],
  selectedStudent: null,
  currentReceiptNo: "FQC-1100",
  appsScriptUrl: safeGetStorage("fqc_apps_script_url", "https://script.google.com/macros/s/AKfycbwQIF-Z9UYikdll4Ohl81mPCq9hWYDk39TcHPHRmLg/exec"),
  config: {
    logoUrl: safeGetStorage("fqc_logo_url", "assets/logo.png"),
    signatureUrl: safeGetStorage("fqc_signature_url", "assets/signature.png"),
    backgroundUrl: safeGetStorage("fqc_background_url", "assets/pbaq-bg.png")
  }
};

const DEFAULT_PLACEHOLDERS = {
  logo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%231b4d2e'/><text x='50' y='55' font-size='30' font-family='sans-serif' font-weight='bold' fill='%23d4af37' text-anchor='middle'>FQC</text></svg>",
  signature: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='150' height='60' viewBox='0 0 150 60'><path d='M10 40 Q 40 10, 70 40 T 130 20' stroke='%231b4d2e' stroke-width='3' fill='none'/><text x='75' y='55' font-size='10' font-family='sans-serif' fill='%2364748b' text-anchor='middle'>Pentadbir FQC</text></svg>",
  background: ""
};

// Application Initialization
document.addEventListener("DOMContentLoaded", () => {
  initDateAndMonth();
  initStudentSearch();
  initFeeCalculations();
  loadLocalStoragePayments();
  loadAssetUrls();
  calculateNextReceiptNo();
  fetchStudentsFromBackend();
  fetchPaymentHistoryFromBackend();
  renderDashboard();
  renderHistoryTable();
  renderReceiptPreview();
});

// Toast & Loading Helpers
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  const msgEl = document.getElementById("toast-msg");
  if (!toast || !msgEl) return;
  
  msgEl.innerText = message;
  toast.className = `toast ${type} show`;
  setTimeout(() => {
    toast.className = `toast ${type}`;
  }, 3500);
}

function showLoading(show, text = "Memproses data...") {
  const loading = document.getElementById("loading");
  const textEl = document.getElementById("loading-text");
  if (!loading) return;
  
  if (textEl) textEl.innerText = text;
  if (show) loading.classList.add("show");
  else loading.classList.remove("show");
}

// Navigation Switcher
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

function initStudentSearch() {
  const searchInput = document.getElementById("student-search-input");
  const dropdown = document.getElementById("student-dropdown-options");
  const phoneDisplay = document.getElementById("parent-phone-display");

  if (!searchInput || !dropdown) return;

  function renderOptions(filterText = "") {
    dropdown.innerHTML = "";
    const filtered = appState.students.filter(s => 
      s.nama.toLowerCase().includes(filterText.toLowerCase()) ||
      (s.phone && s.phone.includes(filterText))
    );

    if (filtered.length === 0) {
      dropdown.innerHTML = `<div class="option-item" style="color:var(--text-muted);">Tiada murid ditemui</div>`;
      return;
    }

    filtered.forEach(student => {
      const item = document.createElement("div");
      item.className = "option-item";
      item.innerHTML = `<span style="font-weight:600;">${student.nama}</span>`;
      item.onclick = () => {
        appState.selectedStudent = student;
        searchInput.value = student.nama;
        if (phoneDisplay) phoneDisplay.value = student.phone || '';
        dropdown.classList.remove("show");
        renderReceiptPreview();
      };
      dropdown.appendChild(item);
    });
  }

  searchInput.addEventListener("focus", () => { renderOptions(searchInput.value); dropdown.classList.add("show"); });
  searchInput.addEventListener("input", (e) => { renderOptions(e.target.value); dropdown.classList.add("show"); });
  document.addEventListener("click", (e) => { if (!e.target.closest(".searchable-select")) dropdown.classList.remove("show"); });
}

// Fee Checkbox Render & Events
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
    html += `<div class="fee-group-block"><div class="fee-group-header"><i class="fa-solid ${groupIcon}"></i> ${groupName}</div><div class="fee-checkbox-grid">`;
    items.forEach(item => {
      html += `
        <div class="fee-checkbox-card" id="card-${item.id}" onclick="toggleFeeCard('${item.id}', event)">
          <div class="fee-card-left">
            <input type="checkbox" id="chk-${item.id}" class="fee-card-checkbox" onchange="onFeeCheckChange('${item.id}', this.checked, event)">
            <span class="fee-card-label">${item.label}</span>
          </div>
          <div class="fee-card-price-group" onclick="event.stopPropagation()">
            <span class="fee-card-price-prefix">RM</span>
            <input type="number" id="price-${item.id}" class="fee-card-price-input" min="0" value="${item.stdPrice}" oninput="onFeePriceInput('${item.id}')" onclick="event.stopPropagation()">
          </div>
        </div>
      `;
    });
    html += `</div></div>`;
  });

  container.innerHTML = html;
}

function toggleFeeCard(itemId, event) {
  if (event && event.target && (event.target.tagName === 'INPUT' || event.target.classList.contains('fee-card-checkbox'))) {
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
    const priceEl = document.getElementById(`price-${item.id}`);
    if (chk && chk.checked && priceEl) {
      totalSum += (parseFloat(priceEl.value) || 0);
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
  const el = document.getElementById("receipt-no-display");
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
    const priceEl = document.getElementById(`price-${item.id}`);
    if (chk && chk.checked && priceEl) {
      const priceVal = parseFloat(priceEl.value) || 0;
      hasItems = true; totalAmount += priceVal;
      html += `<tr class="active-item"><td>${item.label}</td><td style="text-align:center;">-</td><td style="text-align:center;">${bulan}</td><td class="amount-cell">${priceVal.toFixed(0)}</td></tr>`;
    }
  });

  if (!hasItems) html = `<tr><td colspan="4" style="text-align:center; color:var(--text-muted); font-style:italic; padding:12px;">Sila tick kotak bayaran yuran di sebelah kiri</td></tr>`;
  
  const customTotalVal = document.getElementById("fee-total-custom")?.value;
  if (isTotalCustomEdited && customTotalVal !== "") {
    totalAmount = parseFloat(customTotalVal) || 0;
  }

  tableBody.innerHTML = html;
  if (document.getElementById("rc-total-amount")) document.getElementById("rc-total-amount").innerText = `RM${totalAmount.toFixed(0)}`;
}

function validateForm() {
  const studentName = appState.selectedStudent ? appState.selectedStudent.nama : (document.getElementById("student-search-input")?.value || "").trim();
  if (!studentName) { showToast("Sila pilih atau masukkan nama murid.", "warning"); return false; }
  if (!document.getElementById("pay-date")?.value) { showToast("Sila pilih tarikh.", "warning"); return false; }
  if (!document.getElementById("pay-month")?.value) { showToast("Sila pilih bulan.", "warning"); return false; }
  if (calculateTotal() <= 0) { showToast("Sila masukkan sekurang-kurangnya satu bayaran yuran > RM0.", "warning"); return false; }
  if (!document.querySelector('input[name="kaedahBayaran"]:checked')?.value) { showToast("Sila pilih kaedah bayaran.", "warning"); return false; }
  return true;
}

function actionJanaResit() {
  if (!validateForm()) return;
  renderReceiptPreview();
  showToast("Resit rasmi FQC berjaya dijana!", "success");
}

async function actionSimpanPembayaran() {
  if (!validateForm()) return false;
  const btnSimpan = document.getElementById("btn-simpan");
  const btnWhatsapp = document.getElementById("btn-whatsapp");
  try {
    if (btnSimpan) btnSimpan.disabled = true;
    if (btnWhatsapp) btnWhatsapp.disabled = true;
    showLoading(true, "Menyimpan pembayaran ke Google Sheets...");

    const phone = appState.selectedStudent ? appState.selectedStudent.phone : (document.getElementById("parent-phone-display")?.value || "");
    const studentName = appState.selectedStudent ? appState.selectedStudent.nama : document.getElementById("student-search-input")?.value;
    
    let hargaStandardTotal = 0;
    let jumlahDiskaunTotal = 0;
    const checkedItems = [];
    const categoryTotals = { pendaftaran: 0, pengajianAlquran: 0, kelasUpkk: 0, kelasPsra: 0, kelasKhasJawi: 0, bukuRekodModul: 0, sumbangan: 0, kelasKafa: 0, kelasAkademik: 0, transit: 0 };

    FEE_CHECKBOX_ITEMS.forEach(item => {
      const chk = document.getElementById(`chk-${item.id}`);
      const priceEl = document.getElementById(`price-${item.id}`);
      if (chk && chk.checked && priceEl) {
        const paidPrice = parseFloat(priceEl.value) || 0;
        hargaStandardTotal += item.stdPrice;
        if (item.stdPrice > paidPrice) jumlahDiskaunTotal += (item.stdPrice - paidPrice);
        if (categoryTotals[item.field] !== undefined) categoryTotals[item.field] += paidPrice;
        checkedItems.push({ id: item.id, label: item.label, stdPrice: item.stdPrice, paidPrice: paidPrice });
      }
    });

    const paymentObj = {
      noResit: appState.currentReceiptNo,
      tarikh: formatDateDisplay(document.getElementById("pay-date")?.value),
      bulan: document.getElementById("pay-month")?.value,
      namaMurid: studentName,
      noWhatsapp: phone,
      pendaftaran: categoryTotals.pendaftaran,
      pengajianAlquran: categoryTotals.pengajianAlquran,
      kelasUpkk: categoryTotals.kelasUpkk,
      kelasPsra: categoryTotals.kelasPsra,
      kelasKhasJawi: categoryTotals.kelasKhasJawi,
      bukuRekodModul: categoryTotals.bukuRekodModul,
      sumbangan: categoryTotals.sumbangan,
      kelasKafa: categoryTotals.kelasKafa,
      kelasAkademik: categoryTotals.kelasAkademik,
      transit: categoryTotals.transit,
      hargaStandard: hargaStandardTotal,
      jumlahDiskaun: jumlahDiskaunTotal,
      sebabDiskaun: jumlahDiskaunTotal > 0 ? "Harga Khas Murid" : "-",
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
            if (resJson && resJson.success && resJson.noResit) {
              paymentObj.noResit = resJson.noResit;
            }
            appState.payments.unshift(paymentObj);
            saveLocalStoragePayments();
            showLoading(false);
            showToast(`Pembayaran berjaya disimpan. No. Resit: ${paymentObj.noResit}`, "success");
            calculateNextReceiptNo();
            renderDashboard();
            renderHistoryTable();
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
    showToast(`Pembayaran berjaya disimpan. No. Resit: ${paymentObj.noResit}`, "success");
    calculateNextReceiptNo();
    renderDashboard();
    renderHistoryTable();
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
    showToast("Nombor WhatsApp tidak sah.", "warning");
    return;
  }

  const itemsListText = JSON.parse(saved.butiranItem || "[]").map(i => `• ${i.label}: RM${i.paidPrice}`).join("\n");
  const msg = `*RESIT PEMBAYARAN YURAN FATHUL QURANIC CENTRE (FQC)*\n\nNo. Resit: ${saved.noResit}\nNama Murid: ${saved.namaMurid}\nTarikh: ${saved.tarikh}\nBulan: ${saved.bulan}\nKaedah: ${saved.kaedahBayaran}\n\n*BUTIRAN YURAN:*\n${itemsListText}\n\n*JUMLAH KESELURUHAN: RM${saved.jumlah}*\n\nTerima kasih atas pembayaran yuran anak anda. Semoga dipertambahkan rezeki dan diberkati. Barokallahufik.`;
  window.open(`https://wa.me/${phoneFormatted}?text=${encodeURIComponent(msg)}`, '_blank');
}

function actionCetakResit() {
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

function saveLocalStoragePayments() {
  safeSetStorage("fqc_payments_db", JSON.stringify(appState.payments));
}

function loadLocalStoragePayments() {
  const localData = safeGetStorage("fqc_payments_db");
  if (localData) {
    try {
      const parsed = JSON.parse(localData);
      if (Array.isArray(parsed)) appState.payments = parsed;
    } catch (e) {}
  }
}

function renderDashboard() {
  const filterMonth = document.getElementById("dash-month-filter")?.value || document.getElementById("pay-month")?.value || "OGOS";
  
  const paidNamesSet = new Set();
  appState.payments.forEach(p => {
    if (p.bulan && p.bulan.toUpperCase() === filterMonth.toUpperCase() && p.namaMurid) {
      paidNamesSet.add(p.namaMurid.trim().toLowerCase());
    }
  });

  const unpaidStudents = appState.students.filter(s => !paidNamesSet.has(s.nama.trim().toLowerCase()));
  const paidCount = appState.students.length - unpaidStudents.length;
  const totalKutipan = appState.payments.reduce((acc, p) => acc + (parseFloat(p.jumlah) || 0), 0);

  if (document.getElementById("dash-total-kutipan")) document.getElementById("dash-total-kutipan").innerText = `RM ${totalKutipan.toFixed(0)}`;
  if (document.getElementById("dash-total-murid")) document.getElementById("dash-total-murid").innerText = appState.students.length;
  if (document.getElementById("dash-total-sudah-bayar")) document.getElementById("dash-total-sudah-bayar").innerText = paidCount;
  if (document.getElementById("dash-total-belum-bayar")) document.getElementById("dash-total-belum-bayar").innerText = unpaidStudents.length;

  const unpaidTbody = document.getElementById("unpaid-table-body");
  if (!unpaidTbody) return;

  if (unpaidStudents.length === 0) {
    unpaidTbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:1.25rem; color:#15803d; font-weight:700;"><i class="fa-solid fa-circle-check"></i> Tahniah! Semua ${appState.students.length} murid telah membuat pembayaran bagi bulan ${filterMonth}!</td></tr>`;
    return;
  }

  let html = "";
  unpaidStudents.forEach((student, idx) => {
    html += `
      <tr>
        <td>${idx + 1}</td>
        <td><strong>${student.nama}</strong></td>
        <td>${student.phone || '-'}</td>
        <td><span class="badge-unpaid"><i class="fa-solid fa-clock"></i> Belum Bayar (${filterMonth})</span></td>
        <td style="display:flex; gap:0.4rem;">
          <button class="btn btn-whatsapp" style="padding:4px 8px; font-size:0.75rem;" onclick="sendWaReminder('${student.nama.replace(/'/g, "\\'")}', '${student.phone || ''}', '${filterMonth}')">
            <i class="fa-brands fa-whatsapp"></i> Peringatan WA
          </button>
          <button class="btn btn-primary" style="padding:4px 8px; font-size:0.75rem;" onclick="payForStudent('${student.nama.replace(/'/g, "\\'")}')">
            <i class="fa-solid fa-cash-register"></i> Bayar Now
          </button>
        </td>
      </tr>
    `;
  });
  unpaidTbody.innerHTML = html;
}

function sendWaReminder(studentName, phone, month) {
  const phoneFormatted = formatWhatsAppPhone(phone);
  if (!phoneFormatted) {
    showToast("Nombor WhatsApp tidak sah untuk murid ini.", "warning");
    return;
  }
  const msg = `*PERINGATAN MESRA BAYARAN YURAN FATHUL QURANIC CENTRE (FQC)*\n\nAssalamu'alaikum / Salam Sejahtera Ibu/Bapa ${studentName},\n\nIni adalah peringatan mesra berkenaan yuran pengajian bulan *${month}* bagi murid *${studentName}* yang belum dijelaskan.\n\nMohon ibu/bapa membuat makluman atau pembayaran yuran. Terima kasih atas kerjasama dan keprihatinan ibu/bapa.\n\nBarakallahufik,\n*Fathul Quranic Centre (FQC)*`;
  window.open(`https://wa.me/${phoneFormatted}?text=${encodeURIComponent(msg)}`, '_blank');
}

function payForStudent(studentName) {
  const student = appState.students.find(s => s.nama.toLowerCase() === studentName.toLowerCase());
  if (student) {
    appState.selectedStudent = student;
    const searchInput = document.getElementById("student-search-input");
    if (searchInput) searchInput.value = student.nama;
    const phoneDisplay = document.getElementById("parent-phone-display");
    if (phoneDisplay) phoneDisplay.value = student.phone || '';
  }
  switchView('bayaran');
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
        <td>${p.namaMurid || '-'}</td>
        <td>${p.bulan || '-'}</td>
        <td><strong>RM ${parseFloat(p.jumlah || 0).toFixed(0)}</strong></td>
        <td><span class="header-badge" style="display:inline-flex;">${p.kaedahBayaran || 'TUNAI'}</span></td>
        <td>
          <button class="btn btn-outline" style="padding:4px 8px; font-size:0.75rem;" onclick="cetakResitRekod(${idx})"><i class="fa-solid fa-print"></i> Resit</button>
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
  try { items = JSON.parse(p.butiranItem || "[]"); } catch (e) {}
  
  if (tableBody) {
    let html = "";
    if (items.length > 0) {
      items.forEach(it => {
        html += `<tr class="active-item"><td>${it.label}</td><td style="text-align:center;">-</td><td style="text-align:center;">${p.bulan}</td><td class="amount-cell">${it.paidPrice}</td></tr>`;
      });
    } else {
      html = `<tr><td colspan="4" style="text-align:center;">Jumlah Yuran Dibayar: RM ${p.jumlah}</td></tr>`;
    }
    tableBody.innerHTML = html;
  }

  if (document.getElementById("rc-total-amount")) document.getElementById("rc-total-amount").innerText = `RM${p.jumlah}`;
  switchView('bayaran');
  showToast(`Melihat Resit ${p.noResit}`, "info");
}

async function fetchStudentsFromBackend(showToastMsg = false) {
  if (showToastMsg) showLoading(true, "Memuat turun data murid terkini dari Google Sheets...");

  if (typeof google !== "undefined" && google.script && google.script.run) {
    google.script.run
      .withSuccessHandler(function(studentsData) {
        if (showToastMsg) showLoading(false);
        if (Array.isArray(studentsData) && studentsData.length > 0) {
          appState.students = studentsData;
          initStudentSearch();
          renderDashboard();
          if (showToastMsg) showToast(`Berjaya! Senarai ${appState.students.length} murid terbaharu ditarik dari Google Sheets!`, "success");
        }
      })
      .withFailureHandler(function(err) {
        if (showToastMsg) { showLoading(false); showToast("Gagal memuat turun data murid: " + err, "error"); }
      })
      .getStudents();
    return;
  }

  if (!appState.appsScriptUrl) return;
  try {
    const res = await fetch(`${appState.appsScriptUrl}?action=getStudents`);
    const data = await res.json();
    if (showToastMsg) showLoading(false);
    if (data.success && Array.isArray(data.data) && data.data.length > 0) {
      appState.students = data.data;
      initStudentSearch();
      renderDashboard();
      if (showToastMsg) showToast(`Berjaya! Senarai ${appState.students.length} murid terbaharu ditarik dari Google Sheets!`, "success");
    }
  } catch (err) {
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
  try {
    const res = await fetch(`${appState.appsScriptUrl}?action=getPaymentHistory`);
    const data = await res.json();
    if (data.success && Array.isArray(data.data) && data.data.length > 0) {
      appState.payments = data.data;
      saveLocalStoragePayments();
      calculateNextReceiptNo();
      renderDashboard();
      renderHistoryTable();
    }
  } catch (err) {}
}
