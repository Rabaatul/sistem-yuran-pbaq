/**
 * APP LOGIC - Laman Laporan Perkembangan Murid Pendidikan Islam
 */

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  renderProfileGrid();
  renderPbdCards('all');
  renderTermProgress('term2');
  renderTeacherReport();
  renderWorkGallery('all');
  renderFaqs();
  setupPrintableReport();
  setupEventListeners();
  setupScrollReveal();

  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

/* 1. RENDER PROFIL MURID */
function renderProfileGrid() {
  const container = document.getElementById('profile-grid-container');
  if (!container) return;

  const { profile } = studentData;

  container.innerHTML = `
    <!-- Card 1: Butiran Diri Murid -->
    <div class="info-card">
      <div class="info-card-header">
        <h3 class="info-card-title">
          <i data-lucide="user"></i> Maklumat Peribadi Murid
        </h3>
        ${profile.mykidToConfirm ? '<span class="badge badge-confirm"><i data-lucide="help-circle"></i> To confirm</span>' : ''}
      </div>
      <div class="info-list">
        <div class="info-row">
          <span class="info-label">Nama Penuh:</span>
          <span class="info-value">${profile.studentName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">No. MyKid:</span>
          <span class="info-value">${profile.mykid}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Tahun / Kelas:</span>
          <span class="info-value">${profile.className}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Kadar Kehadiran:</span>
          <span class="info-value text-green">${profile.attendanceRate} (${profile.totalDaysPresent})</span>
        </div>
      </div>
    </div>

    <!-- Card 2: Pendaftaran Sekolah & Guru -->
    <div class="info-card">
      <div class="info-card-header">
        <h3 class="info-card-title">
          <i data-lucide="building"></i> Sekolah & Pengajar
        </h3>
        <span class="badge badge-confirm"><i data-lucide="help-circle"></i> To confirm</span>
      </div>
      <div class="info-list">
        <div class="info-row">
          <span class="info-label">Nama Sekolah:</span>
          <span class="info-value">${profile.schoolName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Guru Kelas:</span>
          <span class="info-value">${profile.guruKelas}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Guru P. Islam:</span>
          <span class="info-value">${profile.guruPendidikanIslam}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Sesi Akademik:</span>
          <span class="info-value">${profile.academicSession}</span>
        </div>
      </div>
    </div>

    <!-- Card 3: Status Pentaksiran Terkini -->
    <div class="info-card">
      <div class="info-card-header">
        <h3 class="info-card-title">
          <i data-lucide="award"></i> Status Laporan PBD
        </h3>
        <span class="badge badge-primary">Terkini</span>
      </div>
      <div class="info-list">
        <div class="info-row">
          <span class="info-label">Purata TP Semasa:</span>
          <span class="info-value text-red" style="font-size:1.05rem;">${profile.averageTP}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Penggal Pentaksiran:</span>
          <span class="info-value">${profile.currentTerm}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Tarikh Dikemas Kini:</span>
          <span class="info-value">${profile.lastUpdated}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Status Verifikasi:</span>
          <span class="info-value text-green"><i data-lucide="check-circle-2" style="width:14px;"></i> Disahkan Guru</span>
        </div>
      </div>
    </div>
  `;
}

/* 2. RENDER REKOD PBD CARDS */
function renderPbdCards(filter = 'all') {
  const container = document.getElementById('pbd-cards-container');
  if (!container) return;

  const filteredData = filter === 'all' 
    ? studentData.pbdDomains 
    : studentData.pbdDomains.filter(item => item.category === filter);

  if (filteredData.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
        <i data-lucide="search-x" style="width: 48px; height: 48px; margin-bottom: 1rem;"></i>
        <p>Tiada bidang ditemui bagi kategori ini.</p>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  container.innerHTML = filteredData.map(item => `
    <div class="pbd-card" onclick="openPbdModal('${item.id}')" tabindex="0" role="button" aria-label="Lihat perincian ${item.domain}">
      <div class="pbd-card-top">
        <span class="domain-badge">${item.category}</span>
        <div class="tp-badge-large ${item.tpClass}">
          <i data-lucide="star"></i> TP ${item.tp} (${item.tpLabel})
        </div>
      </div>
      <h3 class="pbd-card-title">${item.domain}</h3>
      <p class="pbd-card-desc">${truncateText(item.descriptor, 110)}</p>
      
      <div class="pbd-card-footer">
        <span>Tekan untuk perincian rubrik</span>
        <i data-lucide="chevron-right"></i>
      </div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

/* 3. RENDER TIMELINE / TERM PROGRESS */
function renderTermProgress(termKey = 'term2') {
  const container = document.getElementById('term-detail-container');
  if (!container) return;

  const termData = studentData.termProgress[termKey];
  if (!termData) return;

  container.innerHTML = `
    <div class="term-overview-header">
      <div class="term-title-group">
        <h3>${termData.title}</h3>
        <p>${termData.summary}</p>
      </div>
      <div class="tp-badge-large tp5" style="font-size:1.1rem; padding: 0.6rem 1.2rem;">
        <i data-lucide="award"></i> ${termData.overallTP}
      </div>
    </div>

    <div class="progress-bars-grid">
      ${termData.scores.map(s => `
        <div class="progress-bar-item">
          <div class="bar-meta">
            <span>${s.domain}</span>
            <span>TP ${s.tp} (${s.percent}%)</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width: ${s.percent}%;"></div>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="milestones-box">
      <h4 class="milestones-title"><i data-lucide="award"></i> Milestone & Pencapaian Penting:</h4>
      <ul class="milestones-list">
        ${termData.milestones.map(m => `
          <li><i data-lucide="check-circle-2"></i> ${m}</li>
        `).join('')}
      </ul>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}

/* 4. RENDER TEACHER REPORT */
function renderTeacherReport() {
  const container = document.getElementById('teacher-report-container');
  if (!container) return;

  const { teacherReport } = studentData;

  container.innerHTML = `
    <div class="teacher-report-card">
      <div class="teacher-profile-header">
        <div class="teacher-avatar">AF</div>
        <div class="teacher-info">
          <h3>${teacherReport.guruName}</h3>
          <p>${teacherReport.guruTitle} &bull; ${teacherReport.isToConfirm ? '<span class="badge badge-confirm" style="font-size:0.7rem;">To confirm</span>' : ''}</p>
        </div>
      </div>

      <blockquote class="report-editorial-quote">
        "${teacherReport.quote}"
      </blockquote>

      <div class="report-two-columns">
        <div class="report-block strengths">
          <h4 class="block-header"><i data-lucide="thumbs-up"></i> Kekuatan Utama Murid</h4>
          <ul class="block-list">
            ${teacherReport.strengths.map(s => `
              <li><i data-lucide="check" class="text-green"></i> <span>${s}</span></li>
            `).join('')}
          </ul>
        </div>

        <div class="report-block improvements">
          <h4 class="block-header"><i data-lucide="trending-up"></i> Ruang Penambahbaikan</h4>
          <ul class="block-list">
            ${teacherReport.improvements.map(imp => `
              <li><i data-lucide="arrow-up-right" class="text-amber"></i> <span>${imp}</span></li>
            `).join('')}
          </ul>
        </div>
      </div>

      <div style="margin-top: 1.5rem; background-color: var(--accent-yellow-light); border: 1px solid var(--accent-yellow-border); padding: 1.25rem; border-radius: var(--radius-md);">
        <h4 style="font-size:0.95rem; font-weight:800; color:var(--text-dark); margin-bottom:0.4rem; display:flex; align-items:center; gap:0.4rem;">
          <i data-lucide="home" style="color:var(--accent-yellow-dark);"></i> Cadangan Pelan Tindakan Ibu Bapa di Rumah:
        </h4>
        <p style="font-size:0.9rem; color:var(--text-dark);">${teacherReport.homeActionPlan}</p>
      </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}

/* 5. RENDER WORK GALLERY */
function renderWorkGallery(gfilter = 'all') {
  const container = document.getElementById('gallery-grid-container');
  if (!container) return;

  const filtered = gfilter === 'all'
    ? studentData.workGallery
    : studentData.workGallery.filter(w => w.category === gfilter);

  container.innerHTML = filtered.map(item => `
    <div class="work-card" onclick="openGalleryModal('${item.id}')" tabindex="0" role="button">
      <div class="work-img-wrapper">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <div class="work-overlay">
          <i data-lucide="zoom-in"></i>
        </div>
      </div>
      <div class="work-card-body">
        <span class="badge badge-primary mb-2">${item.category}</span>
        <h4 class="work-card-title">${item.title}</h4>
        <div class="work-card-meta">
          <span><i data-lucide="calendar" style="width:12px;"></i> ${item.date}</span>
          <span class="text-red" style="font-weight:700;"><i data-lucide="eye" style="width:12px;"></i> Lihat</span>
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

/* 6. RENDER FAQS */
function renderFaqs() {
  const container = document.getElementById('faq-accordion-container');
  if (!container) return;

  container.innerHTML = studentData.faqs.map((faq, idx) => `
    <div class="faq-item ${idx === 0 ? 'active' : ''}">
      <button class="faq-question" onclick="toggleFaq(this)">
        <span>${faq.question}</span>
        <i data-lucide="chevron-down"></i>
      </button>
      <div class="faq-answer">
        <p>${faq.answer}</p>
      </div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

function toggleFaq(btn) {
  const parent = btn.parentElement;
  parent.classList.toggle('active');
}

/* 7. SETUP PRINTABLE REPORT TABLE */
function setupPrintableReport() {
  const tbody = document.getElementById('print-pbd-tbody');
  const commentBox = document.getElementById('print-teacher-comment');
  if (!tbody || !commentBox) return;

  tbody.innerHTML = studentData.pbdDomains.map(item => `
    <tr>
      <td><strong>${item.domain}</strong></td>
      <td>${item.category}</td>
      <td style="font-weight:bold; text-align:center;">TP ${item.tp} (${item.tpLabel})</td>
      <td>${item.descriptor}</td>
    </tr>
  `).join('');

  commentBox.innerHTML = `
    <p style="margin-bottom: 6px;"><strong>Ulasan Guru Pendidikan Islam (${studentData.teacherReport.guruName}):</strong></p>
    <p style="font-style: italic;">"${studentData.teacherReport.quote}"</p>
    <p style="margin-top: 6px;"><strong>Pelan Tindakan Rumah:</strong> ${studentData.teacherReport.homeActionPlan}</p>
  `;
}

/* EVENT LISTENERS SETUP */
function setupEventListeners() {
  // PBD Filters
  document.querySelectorAll('.pbd-filter-bar .filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.pbd-filter-bar .filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const filter = e.target.getAttribute('data-filter');
      renderPbdCards(filter);
    });
  });

  // Term Switcher Tabs
  document.querySelectorAll('.term-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const btn = e.target.closest('.term-tab');
      document.querySelectorAll('.term-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      const termKey = btn.getAttribute('data-term');
      renderTermProgress(termKey);
    });
  });

  // Gallery Filters
  document.querySelectorAll('#gallery-filter-bar .g-filter-btn').forEach(gbtn => {
    gbtn.addEventListener('click', (e) => {
      document.querySelectorAll('#gallery-filter-bar .g-filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const gfilter = e.target.getAttribute('data-gfilter');
      renderWorkGallery(gfilter);
    });
  });
}

/* MODAL CONTROLLERS */
function openPbdModal(id) {
  const domainData = studentData.pbdDomains.find(item => item.id === id);
  if (!domainData) return;

  document.getElementById('modal-badge-tp').innerText = `TP ${domainData.tp} (${domainData.tpLabel})`;
  document.getElementById('modal-domain-title').innerText = domainData.domain;
  document.getElementById('modal-tp-desc').innerText = domainData.tpLabel;
  document.getElementById('modal-eval-date').innerText = domainData.evalDate;
  document.getElementById('modal-descriptor-text').innerText = domainData.descriptor;

  const strengthsUl = document.getElementById('modal-strengths-list');
  strengthsUl.innerHTML = domainData.strengths.map(s => `<li>${s}</li>`).join('');

  document.getElementById('modal-home-guidance').innerText = domainData.homeGuidance;

  const modal = document.getElementById('pbd-modal');
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function closePbdModal() {
  const modal = document.getElementById('pbd-modal');
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
}

function openGalleryModal(id) {
  const workItem = studentData.workGallery.find(item => item.id === id);
  if (!workItem) return;

  document.getElementById('gmodal-img').src = workItem.image;
  document.getElementById('gmodal-tag').innerText = workItem.category;
  document.getElementById('gmodal-title').innerText = workItem.title;
  document.getElementById('gmodal-date').innerText = workItem.date;
  document.getElementById('gmodal-desc').innerText = workItem.description;
  document.getElementById('gmodal-feedback').innerText = `"${workItem.teacherComment}"`;

  const modal = document.getElementById('gallery-modal');
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function closeGalleryModal() {
  const modal = document.getElementById('gallery-modal');
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
}

/* FORM SUBMISSION SIMULATION */
function handleFormSubmit(event) {
  event.preventDefault();
  const parentName = document.getElementById('parentName').value;
  
  showToast(`Terima kasih, En/Puan ${parentName}! Mesej anda telah berjaya dihantar kepada Ustaz Ahmad Fairuz.`);
  document.getElementById('contact-form').reset();
}

/* TOAST UTILITY */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i data-lucide="check-circle" class="text-green"></i> <span>${message}</span>`;
  container.appendChild(toast);

  if (window.lucide) window.lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* SCROLL REVEAL EFFECT */
function setupScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* TEXT TRUNCATE HELPER */
function truncateText(str, maxLength) {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}
