/* ============================================================
   DASHBOARD UNIT BERUNIFORM — PBAQ 2026
   app.js — Data & Logic
   ============================================================

   PANDUAN PENAMBAHAN DATA:
   Untuk tambah data baru, hanya tambah objek baru dalam
   array MASTER_SUMBER di bawah. Rekabentuk website akan
   dikemaskini secara automatik.

   SUMBER DATA: Google Sheet MASTER_SUMBER
   https://docs.google.com/spreadsheets/d/1_oBra_vW2s62Qql_Xy9NsKywDcMJxx5gmCBXW_thEmA

   STRUKTUR DATA:
   {
     id: "UB-001",              // ID unik (wajib)
     modul: "BSMM",             // Nama unit: BSMM atau TKRS/KRS (wajib)
     kategori: "GERKO A",       // Kategori dari sheet (wajib)
     jenis: "Kehadiran",        // Jenis dokumen: Kehadiran / Laporan Aktiviti / Perancangan Tahunan
     nama: "Nama dokumen",      // Nama penuh sumber (wajib)
     tahun: "2026",             // Tahun (wajib)
     link: "https://...",       // URL Google Sheet/Docs (wajib)
     status: "Aktif"            // Status: Aktif / Draft (pilihan)
   }
   ============================================================ */

'use strict';

// URL deployment Google Apps Script Web App
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyFZK01OyrnGw9KvxJldsb1_emM-y2wGfm22iv7i4kdHt6PfKVGY4ReQD_zJFDeeiRB/exec';

// ============================================================
// MASTER_SUMBER — Data sebenar dari Google Sheet MASTER_SUMBER
// Dikemaskini: 11 Ogos 2026
// Sheet asal: https://docs.google.com/spreadsheets/d/1_oBra_vW2s62Qql_Xy9NsKywDcMJxx5gmCBXW_thEmA
// ============================================================
let MASTER_SUMBER = [
  {
    id: "UB-001",
    modul: "BSMM",
    kategori: "GERKO A",
    jenis: "Kehadiran",
    nama: "Kehadiran BSMM 2026",
    tahun: "2026",
    link: "https://docs.google.com/spreadsheets/d/16uy4W665gZDy5EIHEF-NWc595e9WUWHr/edit?gid=1404491950#gid=1404491950",
    status: "Aktif"
  },
  {
    id: "UB-002",
    modul: "BSMM",
    kategori: "GERKO A",
    jenis: "Laporan Aktiviti",
    nama: "Laporan Aktiviti BSMM 2026",
    tahun: "2026",
    link: "https://docs.google.com/spreadsheets/d/1WpAELkBebRDgA2JZwE8VA_DPqE5AsEPH/edit?gid=1244699388#gid=1244699388",
    status: "Aktif"
  },
  {
    id: "UB-003",
    modul: "BSMM",
    kategori: "GERKO A",
    jenis: "Perancangan Tahunan",
    nama: "Perancangan Tahunan BSMM 2026",
    tahun: "2026",
    link: "https://docs.google.com/document/d/1NlAMbI1sC8-ZTxCNaCCic7zMck1Qpi31/edit",
    status: "Aktif"
  },
  {
    id: "UB-004",
    modul: "TKRS/KRS",
    kategori: "GERKO A",
    jenis: "Kehadiran",
    nama: "Kehadiran TKRS 2026",
    tahun: "2026",
    link: "https://docs.google.com/spreadsheets/d/1uP4vH16q8gUjP1X-x50TsdTTcDWv8Ure/edit?gid=1884993696#gid=1884993696",
    status: "Aktif"
  },
  {
    id: "UB-005",
    modul: "TKRS/KRS",
    kategori: "GERKO A",
    jenis: "Laporan Aktiviti",
    nama: "Laporan Aktiviti TKRS 2026",
    tahun: "2026",
    link: "https://docs.google.com/spreadsheets/d/1wrAWDM_IoupupxbqW6O_XA97rjXVnXIW/edit?gid=539854108#gid=539854108",
    status: "Aktif"
  },
  {
    id: "UB-006",
    modul: "TKRS/KRS",
    kategori: "GERKO A",
    jenis: "Perancangan Tahunan",
    nama: "Perancangan Tahunan TKRS/KRS 2026",
    tahun: "2026",
    link: "https://docs.google.com/document/d/1XJ_ztUFa3yDR6W2B721OSdnXu3RYmwgN/edit",
    status: "Aktif"
  },
  {
    id: "UB-007",
    modul: "PRESTASI",
    kategori: "GERKO A",
    jenis: "Prestasi",
    nama: "PRESTASI 2026",
    tahun: "2026",
    link: "https://drive.google.com/drive/folders/1wpvGtyd1bojQ9Eg_Tp1ZArLQ0k7l0qFJ?usp=sharing",
    status: "Aktif"
  },
  {
    id: "UB-008",
    modul: "ANTARABANGSA",
    kategori: "GERKO A",
    jenis: "Antarabangsa",
    nama: "ANTARABANGSA",
    tahun: "2026",
    link: "https://docs.google.com/document/d/1e4kBiPYrke4TpgWc-E7oikMej6PVLo6e/edit?usp=sharing&ouid=103776709571497988596&rtpof=true&sd=true",
    status: "Aktif"
  }
];

// ============================================================
// HELPER: Get unique values
// ============================================================
function getUniqueValues(key) {
  return [...new Set(MASTER_SUMBER.map(r => r[key]).filter(Boolean))];
}

// ============================================================
// STATS
// ============================================================
function computeStats() {
  const total = MASTER_SUMBER.length;
  const units = getUniqueValues('modul').length;
  const kehadiran = MASTER_SUMBER.filter(r => r.jenis === 'Kehadiran').length;
  const laporan = MASTER_SUMBER.filter(r => r.jenis === 'Laporan Aktiviti').length;
  const perancangan = MASTER_SUMBER.filter(r => r.jenis === 'Perancangan Tahunan').length;
  return { total, units, kehadiran, laporan, perancangan };
}

function renderStats() {
  const s = computeStats();
  animateCount('stat-total', s.total);
  animateCount('stat-unit', s.units);
  animateCount('stat-kehadiran', s.kehadiran);
  animateCount('stat-laporan', s.laporan);
  animateCount('stat-perancangan', s.perancangan);

  // Update nav badges dynamically
  updateBadge('badge-semua', MASTER_SUMBER.length);
  updateBadge('badge-bsmm', MASTER_SUMBER.filter(r => r.modul === 'BSMM').length);
  updateBadge('badge-tkrs', MASTER_SUMBER.filter(r => r.modul === 'TKRS/KRS').length);
  updateBadge('badge-kehadiran', s.kehadiran);
  updateBadge('badge-laporan', s.laporan);
  updateBadge('badge-perancangan', s.perancangan);
  updateBadge('badge-prestasi', MASTER_SUMBER.filter(r => r.modul === 'PRESTASI' || r.jenis === 'Prestasi' || r.nama.includes('PRESTASI')).length);
  updateBadge('badge-antarabangsa', MASTER_SUMBER.filter(r => r.modul === 'ANTARABANGSA' || r.jenis === 'Antarabangsa' || r.nama.includes('ANTARABANGSA')).length);
}

// Update unit card badges on dashboard
function updateUnitCardBadges() {
  const bsmmCount = MASTER_SUMBER.filter(r => r.modul === 'BSMM').length;
  const tkrsCount = MASTER_SUMBER.filter(r => r.modul === 'TKRS/KRS').length;
  document.querySelectorAll('.bsmm-card .unit-card-badge').forEach(el => { el.textContent = bsmmCount + ' Dokumen'; });
  document.querySelectorAll('.tkrs-card .unit-card-badge').forEach(el => { el.textContent = tkrsCount + ' Dokumen'; });
}

function updateBadge(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function animateCount(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let current = 0;
  const step = Math.ceil(target / 20) || 1;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 40);
}

// ============================================================
// ICON / COLOUR HELPERS
// ============================================================
function getModulClass(modul) {
  if (!modul) return '';
  const m = modul.toUpperCase();
  if (m.includes('BSMM')) return 'modul-bsmm';
  if (m.includes('TKRS') || m.includes('KRS')) return 'modul-tkrs';
  if (m.includes('PRESTASI')) return 'modul-prestasi';
  if (m.includes('ANTARABANGSA')) return 'modul-antarabangsa';
  return '';
}
function getModulIcon(modul) {
  if (!modul) return 'fa-shield';
  const m = modul.toUpperCase();
  if (m.includes('BSMM')) return 'fa-heart-pulse';
  if (m.includes('TKRS') || m.includes('KRS')) return 'fa-person-military-to-person';
  if (m.includes('PRESTASI')) return 'fa-trophy';
  if (m.includes('ANTARABANGSA')) return 'fa-earth-americas';
  return 'fa-shield';
}
function getCatClass(jenis) {
  if (!jenis) return '';
  if (jenis === 'Kehadiran') return 'cat-kehadiran';
  if (jenis === 'Laporan Aktiviti') return 'cat-laporan';
  if (jenis === 'Perancangan Tahunan') return 'cat-perancangan';
  if (jenis === 'Prestasi' || jenis === 'PRESTASI') return 'cat-prestasi';
  if (jenis === 'Antarabangsa' || jenis === 'ANTARABANGSA') return 'cat-antarabangsa';
  return '';
}
function getCatIcon(jenis) {
  if (!jenis) return 'fa-file';
  if (jenis === 'Kehadiran') return 'fa-clipboard-user';
  if (jenis === 'Laporan Aktiviti') return 'fa-file-lines';
  if (jenis === 'Perancangan Tahunan') return 'fa-calendar-check';
  if (jenis === 'Prestasi' || jenis === 'PRESTASI') return 'fa-trophy';
  if (jenis === 'Antarabangsa' || jenis === 'ANTARABANGSA') return 'fa-earth-americas';
  return 'fa-file';
}
function getStatusClass(status) {
  if (!status) return 'status-default';
  const s = status.toLowerCase();
  if (s === 'aktif' || s === 'active') return 'status-aktif';
  if (s === 'draft') return 'status-draft';
  return 'status-default';
}
function getModalIconBg(modul) {
  if (!modul) return 'background:#64748b';
  const m = modul.toUpperCase();
  if (m.includes('BSMM')) return 'background:linear-gradient(135deg,#991b1b,#dc2626)';
  if (m.includes('TKRS') || m.includes('KRS')) return 'background:linear-gradient(135deg,#064e3b,#059669)';
  if (m.includes('PRESTASI')) return 'background:linear-gradient(135deg,#6d28d9,#7c3aed)';
  if (m.includes('ANTARABANGSA')) return 'background:linear-gradient(135deg,#0284c7,#0369a1)';
  return 'background:linear-gradient(135deg,#1e3a8a,#1e40af)';
}

// ============================================================
// BUILD FILTER BAR
// ============================================================
function buildFilterBar(containerId, data, onFilter) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const years = [...new Set(data.map(r => r.tahun).filter(Boolean))].sort();
  const moduls = [...new Set(data.map(r => r.modul).filter(Boolean))].sort();
  const jenisAll = [...new Set(data.map(r => r.jenis).filter(Boolean))].sort();

  container.innerHTML = `
    <div class="filter-bar">
      <div class="filter-label"><i class="fa-solid fa-filter"></i> Tapis</div>
      <div class="filter-controls">
        <select class="filter-select" id="${containerId}-year" onchange="applyFilter_${containerId}()">
          <option value="">Semua Tahun</option>
          ${years.map(y => `<option value="${y}">${y}</option>`).join('')}
        </select>
        <select class="filter-select" id="${containerId}-modul" onchange="applyFilter_${containerId}()">
          <option value="">Semua Unit</option>
          ${moduls.map(m => `<option value="${m}">${m}</option>`).join('')}
        </select>
        <select class="filter-select" id="${containerId}-jenis" onchange="applyFilter_${containerId}()">
          <option value="">Semua Jenis Dokumen</option>
          ${jenisAll.map(j => `<option value="${j}">${j}</option>`).join('')}
        </select>
        <input class="filter-input" type="text" id="${containerId}-search" placeholder="Cari nama dokumen..." oninput="applyFilter_${containerId}()">
      </div>
      <div class="filter-count" id="${containerId}-count">Jumlah: <strong>${data.length}</strong></div>
    </div>
  `;

  // Create dynamic filter function
  window[`applyFilter_${containerId}`] = function() {
    const year = document.getElementById(`${containerId}-year`)?.value || '';
    const modul = document.getElementById(`${containerId}-modul`)?.value || '';
    const jenis = document.getElementById(`${containerId}-jenis`)?.value || '';
    const search = (document.getElementById(`${containerId}-search`)?.value || '').toLowerCase();

    const filtered = data.filter(r => {
      if (year && r.tahun !== year) return false;
      if (modul && r.modul !== modul) return false;
      if (jenis && r.jenis !== jenis) return false;
      if (search && !r.nama.toLowerCase().includes(search)) return false;
      return true;
    });

    onFilter(filtered);
    const countEl = document.getElementById(`${containerId}-count`);
    if (countEl) countEl.innerHTML = `Jumlah: <strong>${filtered.length}</strong>`;
  };
}

// ============================================================
// BUILD TABLE
// ============================================================
function buildTable(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (data.length === 0) {
    container.innerHTML = `
      <div class="table-wrap">
        <div class="empty-state">
          <i class="fa-solid fa-folder-open"></i>
          <p>Tiada rekod dijumpai</p>
        </div>
      </div>`;
    return;
  }

  const rows = data.map(r => {
    const modulCls = getModulClass(r.modul);
    const modulIcon = getModulIcon(r.modul);
    const jenisCls = getCatClass(r.jenis);
    const jenisIcon = getCatIcon(r.jenis);
    const statusCls = getStatusClass(r.status || 'Aktif');
    const statusText = r.status || 'Aktif';
    const linkValid = r.link && !r.link.includes('PLACEHOLDER');

    return `
      <tr>
        <td><span class="td-id">${escHtml(r.id)}</span></td>
        <td>
          <span class="modul-tag ${modulCls}">
            <i class="fa-solid ${modulIcon}"></i> ${escHtml(r.modul)}
          </span>
        </td>
        <td>
          <span class="cat-tag ${jenisCls}">
            <i class="fa-solid ${jenisIcon}"></i> ${escHtml(r.jenis)}
          </span>
        </td>
        <td class="td-nama">${escHtml(r.nama)}</td>
        <td><span class="tahun-pill">${escHtml(r.tahun)}</span></td>
        <td>
          <span class="status-pill ${statusCls}">
            <i class="fa-solid fa-circle" style="font-size:0.45rem;"></i> ${escHtml(statusText)}
          </span>
        </td>
        <td>
          <button class="btn-info" onclick="openDocModal('${escAttr(r.id)}')">
            <i class="fa-solid fa-circle-info"></i> Info
          </button>
          ${linkValid
            ? `<a class="btn-buka" href="${escAttr(r.link)}" target="_blank" rel="noopener noreferrer">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> Buka Dokumen
               </a>`
            : `<button class="btn-buka" onclick="alert('Sila kemaskini link dokumen ini dalam MASTER_SUMBER.')">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> Buka Dokumen
               </button>`
          }
        </td>
      </tr>`;
  }).join('');

  container.innerHTML = `
    <div class="table-wrap">
      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Modul / Unit</th>
              <th>Jenis Dokumen</th>
              <th>Nama Sumber</th>
              <th>Tahun</th>
              <th>Status</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>`;
}

// ============================================================
// MODAL
// ============================================================
const docMap = {};

function rebuildDocMap() {
  Object.keys(docMap).forEach(key => delete docMap[key]);
  MASTER_SUMBER.forEach(r => { docMap[r.id] = r; });
}
rebuildDocMap();

function openDocModal(id) {
  const r = docMap[id];
  if (!r) return;

  const overlay = document.getElementById('docModalOverlay');
  const modalIcon = document.getElementById('modalIcon');
  const modalTitle = document.getElementById('modalTitle');
  const modalMeta = document.getElementById('modalMeta');
  const modalDetails = document.getElementById('modalDetails');
  const modalOpenBtn = document.getElementById('modalOpenBtn');

  modalIcon.innerHTML = `<i class="fa-solid ${getModulIcon(r.modul)}"></i>`;
  modalIcon.setAttribute('style', getModalIconBg(r.modul));
  modalTitle.textContent = r.nama;
  modalMeta.textContent = `${r.modul} • ${r.tahun}`;

  const linkValid = r.link && !r.link.includes('PLACEHOLDER');
  if (linkValid) {
    modalOpenBtn.href = r.link;
    modalOpenBtn.style.opacity = '1';
    modalOpenBtn.style.pointerEvents = 'all';
  } else {
    modalOpenBtn.href = '#';
    modalOpenBtn.style.opacity = '0.5';
    modalOpenBtn.style.pointerEvents = 'none';
    modalOpenBtn.onclick = (e) => {
      e.preventDefault();
      alert('Link dokumen belum dikemaskini. Sila isi URL dalam MASTER_SUMBER di app.js');
    };
  }

  modalDetails.innerHTML = `
    <div class="modal-detail-item">
      <div class="modal-detail-label"><i class="fa-solid fa-hashtag"></i> ID Sumber</div>
      <div class="modal-detail-value">${escHtml(r.id)}</div>
    </div>
    <div class="modal-detail-item">
      <div class="modal-detail-label"><i class="fa-solid fa-shield"></i> Unit</div>
      <div class="modal-detail-value">
        <span class="modul-tag ${getModulClass(r.modul)}">
          <i class="fa-solid ${getModulIcon(r.modul)}"></i> ${escHtml(r.modul)}
        </span>
      </div>
    </div>
    <div class="modal-detail-item">
      <div class="modal-detail-label"><i class="fa-solid fa-file-lines"></i> Jenis Dokumen</div>
      <div class="modal-detail-value">
        <span class="cat-tag ${getCatClass(r.jenis)}">
          <i class="fa-solid ${getCatIcon(r.jenis)}"></i> ${escHtml(r.jenis)}
        </span>
      </div>
    </div>
    <div class="modal-detail-item">
      <div class="modal-detail-label"><i class="fa-solid fa-tag"></i> Kategori</div>
      <div class="modal-detail-value">${escHtml(r.kategori)}</div>
    </div>
    <div class="modal-detail-item">
      <div class="modal-detail-label"><i class="fa-solid fa-calendar"></i> Tahun</div>
      <div class="modal-detail-value"><span class="tahun-pill">${escHtml(r.tahun)}</span></div>
    </div>
    <div class="modal-detail-item">
      <div class="modal-detail-label"><i class="fa-solid fa-circle-check"></i> Status</div>
      <div class="modal-detail-value">
        <span class="status-pill ${getStatusClass(r.status || 'Aktif')}">
          <i class="fa-solid fa-circle" style="font-size:0.45rem;"></i> ${escHtml(r.status || 'Aktif')}
        </span>
      </div>
    </div>
    <div class="modal-detail-item full-width">
      <div class="modal-detail-label"><i class="fa-solid fa-file"></i> Nama Penuh Sumber</div>
      <div class="modal-detail-value">${escHtml(r.nama)}</div>
    </div>
  `;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDocModal() {
  const overlay = document.getElementById('docModalOverlay');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// ============================================================
// NAVIGATION
// ============================================================
let currentView = 'dashboard';

function navigateTo(view) {
  // Hide all panels
  document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
  // Remove active from all nav items
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const panel = document.getElementById(`view-${view}`);
  const navBtn = document.getElementById(`nav-${view}`);
  if (panel) panel.classList.add('active');
  if (navBtn) navBtn.classList.add('active');

  currentView = view;
  closeSidebar();

  // Scroll to top
  const mainContent = document.getElementById('mainContent');
  if (mainContent) mainContent.scrollTop = 0;
  window.scrollTo(0, 0);
}

// ============================================================
// SIDEBAR TOGGLE
// ============================================================
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (!sidebar) return;
  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
}
function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (!sidebar) return;
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
}

// ============================================================
// ESCAPE HELPERS
// ============================================================
function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
function escAttr(str) {
  if (!str) return '';
  return String(str).replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// ============================================================
// RENDER ALL VIEWS
// ============================================================
function renderAllViews() {

  // --- DASHBOARD TABLE (all data, no filter bar) ---
  buildTable('dashboardTable', MASTER_SUMBER);

  // --- SEMUA DOKUMEN ---
  buildFilterBar('semuaFilter', MASTER_SUMBER, (filtered) => buildTable('semuaTable', filtered));
  buildTable('semuaTable', MASTER_SUMBER);

  // --- BSMM ---
  const bsmmData = MASTER_SUMBER.filter(r => r.modul === 'BSMM');
  buildFilterBar('bsmmFilter', bsmmData, (filtered) => buildTable('bsmmTable', filtered));
  buildTable('bsmmTable', bsmmData);

  // --- TKRS/KRS ---
  const tkrsData = MASTER_SUMBER.filter(r => r.modul === 'TKRS/KRS');
  buildFilterBar('tkrsFilter', tkrsData, (filtered) => buildTable('tkrsTable', filtered));
  buildTable('tkrsTable', tkrsData);

  // --- KEHADIRAN ---
  const kehadiranData = MASTER_SUMBER.filter(r => r.jenis === 'Kehadiran');
  renderAnalisisKehadiran(kehadiranData);
  buildFilterBar('kehadiranFilter', kehadiranData, (filtered) => buildTable('kehadiranTable', filtered));
  buildTable('kehadiranTable', kehadiranData);
  renderKehadiranBarChart();

  // --- LAPORAN AKTIVITI ---
  const laporanData = MASTER_SUMBER.filter(r => r.jenis === 'Laporan Aktiviti');
  buildFilterBar('laporanFilter', laporanData, (filtered) => buildTable('laporanTable', filtered));
  buildTable('laporanTable', laporanData);

  // --- PERANCANGAN TAHUNAN ---
  const perancangangData = MASTER_SUMBER.filter(r => r.jenis === 'Perancangan Tahunan');
  buildFilterBar('perancangangFilter', perancangangData, (filtered) => buildTable('perancangangTable', filtered));
  buildTable('perancangangTable', perancangangData);

  // --- PRESTASI ---
  const prestasiData = MASTER_SUMBER.filter(r => r.modul === 'PRESTASI' || r.jenis === 'Prestasi' || r.nama.includes('PRESTASI'));
  buildFilterBar('prestasiFilter', prestasiData, (filtered) => buildTable('prestasiTable', filtered));
  buildTable('prestasiTable', prestasiData);
  renderPrestasiBarChart();

  // --- ANTARABANGSA ---
  const antarabangsaData = MASTER_SUMBER.filter(r => r.modul === 'ANTARABANGSA' || r.jenis === 'Antarabangsa' || r.nama.includes('ANTARABANGSA'));
  buildFilterBar('antarabangsaFilter', antarabangsaData, (filtered) => buildTable('antarabangsaTable', filtered));
  buildTable('antarabangsaTable', antarabangsaData);
  renderAntarabangsaBarChart();
}

// ============================================================
// RENDER ANALISIS KEHADIRAN & GRAF BAR
// ============================================================
let mekehadiranChartInstance = null;

function renderKehadiranBarChart() {
  const canvas = document.getElementById('kehadiranBarChart');
  if (!canvas || typeof Chart === 'undefined') return;

  const dataBSMM = { hadir: 38, tidakHadir: 2 };
  const dataTKRS = { hadir: 36, tidakHadir: 4 };

  const totalHadir = dataBSMM.hadir + dataTKRS.hadir;
  const totalTidakHadir = dataBSMM.tidakHadir + dataTKRS.tidakHadir;
  const totalKeseluruhan = totalHadir + totalTidakHadir;
  const peratus = totalKeseluruhan > 0 ? ((totalHadir / totalKeseluruhan) * 100).toFixed(1) + '%' : '0%';

  const elHadir = document.getElementById('total-hadir-val');
  const elTidakHadir = document.getElementById('total-tidak-hadir-val');
  const elPeratus = document.getElementById('peratus-kehadiran-val');

  if (elHadir) elHadir.textContent = totalHadir;
  if (elTidakHadir) elTidakHadir.textContent = totalTidakHadir;
  if (elPeratus) elPeratus.textContent = peratus;

  if (mekehadiranChartInstance) {
    mekehadiranChartInstance.destroy();
  }

  const ctx = canvas.getContext('2d');
  mekehadiranChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['BSMM', 'TKRS / KRS'],
      datasets: [
        {
          label: 'Hadir',
          data: [dataBSMM.hadir, dataTKRS.hadir],
          backgroundColor: '#10b981',
          borderRadius: 6,
          barPercentage: 0.55,
          categoryPercentage: 0.55
        },
        {
          label: 'Tidak Hadir',
          data: [dataBSMM.tidakHadir, dataTKRS.tidakHadir],
          backgroundColor: '#ef4444',
          borderRadius: 6,
          barPercentage: 0.55,
          categoryPercentage: 0.55
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            font: { family: 'Plus Jakarta Sans', weight: '600', size: 12 },
            usePointStyle: true,
            boxWidth: 8
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return ' ' + context.dataset.label + ': ' + context.raw + ' ahli';
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { family: 'Plus Jakarta Sans', weight: '700', size: 12 } }
        },
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(226, 232, 240, 0.6)' },
          ticks: { stepSize: 5, font: { family: 'Plus Jakarta Sans', size: 11 } }
        }
      }
    }
  });
}

let meprestasiChartInstance = null;
function renderPrestasiBarChart() {
  const canvas = document.getElementById('prestasiBarChart');
  if (!canvas || typeof Chart === 'undefined') return;
  if (meprestasiChartInstance) meprestasiChartInstance.destroy();

  const ctx = canvas.getContext('2d');
  meprestasiChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['1. Ujian Teori & Balutan', '2. Lencana Kemahiran', '3. Disiplin & Sahsiah'],
      datasets: [
        {
          label: 'BSMM (%)',
          data: [96, 92, 95],
          backgroundColor: '#dc2626',
          borderRadius: 6,
          barPercentage: 0.5,
          categoryPercentage: 0.6
        },
        {
          label: 'TKRS / KRS (%)',
          data: [90, 94, 91],
          backgroundColor: '#059669',
          borderRadius: 6,
          barPercentage: 0.5,
          categoryPercentage: 0.6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, position: 'top', labels: { usePointStyle: true, boxWidth: 8 } },
        tooltip: { callbacks: { label: (ctx) => ` ${ctx.dataset.label}: ${ctx.raw}%` } }
      },
      scales: {
        x: { grid: { display: false } },
        y: { min: 0, max: 100, ticks: { stepSize: 20, callback: (v) => v + '%' } }
      }
    }
  });
}

let meantarabangsaChartInstance = null;
function renderAntarabangsaBarChart() {
  const canvas = document.getElementById('antarabangsaBarChart');
  if (!canvas || typeof Chart === 'undefined') return;
  if (meantarabangsaChartInstance) meantarabangsaChartInstance.destroy();

  const ctx = canvas.getContext('2d');
  meantarabangsaChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Pendaftaran Murid', 'Persediaan Science Fair', 'Modul CyberKids', 'Dokumen MYSO'],
      datasets: [
        {
          label: 'Kadar Kesediaan (%)',
          data: [100, 100, 100, 100],
          backgroundColor: '#0284c7',
          borderRadius: 6,
          barPercentage: 0.5
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, position: 'top', labels: { usePointStyle: true, boxWidth: 8 } },
        tooltip: { callbacks: { label: (ctx) => ` ${ctx.dataset.label}: ${ctx.raw}%` } }
      },
      scales: {
        x: { grid: { display: false } },
        y: { min: 0, max: 100, ticks: { stepSize: 25, callback: (v) => v + '%' } }
      }
    }
  });
}

function renderAnalisisKehadiran(kehData) {
  const bsmmItem = kehData.find(r => r.modul === 'BSMM');
  const tkrsItem = kehData.find(r => (r.modul || '').includes('TKRS') || (r.modul || '').includes('KRS'));

  const bsmmStatus = document.getElementById('bsmm-keh-status');
  const tkrsStatus = document.getElementById('tkrs-keh-status');
  const btnBsmm = document.getElementById('btn-sheet-bsmm');
  const btnTkrs = document.getElementById('btn-sheet-tkrs');

  if (bsmmStatus) bsmmStatus.textContent = bsmmItem ? `Status: ${bsmmItem.status || 'Aktif'} (${bsmmItem.tahun})` : 'Tiada Rekod';
  if (tkrsStatus) tkrsStatus.textContent = tkrsItem ? `Status: ${tkrsItem.status || 'Aktif'} (${tkrsItem.tahun})` : 'Tiada Rekod';

  if (btnBsmm && bsmmItem && bsmmItem.link) btnBsmm.href = bsmmItem.link;
  if (btnTkrs && tkrsItem && tkrsItem.link) btnTkrs.href = tkrsItem.link;

  renderKehadiranBarChart();
}

// ============================================================
// FOOTER DATE
// ============================================================
function renderFooterDate() {
  const el = document.getElementById('footerDate');
  if (!el) return;
  const now = new Date();
  const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  el.textContent = now.toLocaleDateString('ms-MY', opts);
}

function renderCurrentYear() {
  const el = document.getElementById('currentYear');
  if (el) el.textContent = new Date().getFullYear();
}

// ============================================================
// KEYBOARD NAV (Escape to close modal)
// ============================================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const overlay = document.getElementById('docModalOverlay');
    if (overlay && overlay.classList.contains('open')) closeDocModal();
  }
});

// ============================================================
// LIVE DATA FETCH FROM APPS SCRIPT
// ============================================================
async function fetchLiveData() {
  if (!SCRIPT_URL) return;

  const statusTextEl = document.querySelector('.footer-status-text');
  const statusDotEl = document.querySelector('.status-dot');

  try {
    const res = await fetch(`${SCRIPT_URL}?action=getData`);
    const json = await res.json();

    if (json && json.success && Array.isArray(json.data) && json.data.length > 0) {
      MASTER_SUMBER = json.data;
      rebuildDocMap();
      renderStats();
      updateUnitCardBadges();
      renderAllViews();

      if (statusTextEl) statusTextEl.textContent = 'Data Terhubung (Live)';
      if (statusDotEl) statusDotEl.style.background = '#22c55e';
    }
  } catch (err) {
    console.warn('Gagal mengambil data live dari Apps Script, menggunakan data tempatan:', err);
    if (statusTextEl) statusTextEl.textContent = 'Data Tempatan (Offline)';
  }
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  renderFooterDate();
  renderCurrentYear();
  renderStats();
  updateUnitCardBadges();
  renderAllViews();
  fetchLiveData();
});
