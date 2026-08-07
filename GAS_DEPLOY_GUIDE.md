# PANDUAN PENUH DEPLOYMENT & PERSATUAN SISTEM (FATHUL QURANIC CENTRE)

Sistem Web Pembayaran Yuran dan Resit Digital **Fathul Quranic Centre (FQC)** ini direka bentuk secara profesional untuk memudahkan Admin menguruskan bayaran yuran murid, menjana resit rasmi digital, menyimpan rekod ke Google Sheets, dan menghantar resit ke WhatsApp ibu bapa secara automatik.

---

## 1. STRUKTUR FAIL DALAM PROJEK

1. **`Code.gs`** : Backend Google Apps Script (mengendalikan pangkalan data Google Sheets, penjanaan nombor resit unik `FQC-1100`, dan fungsi `setupDatabase()`).
2. **`index.html`** : Antara muka (Frontend) utama sistem (Dashboard, Borang Bayaran, Paparan Resit Rasmi, Rekod Bayaran, Tetapan).
3. **`styles.css`** : Reka bentuk visual moden bertema FQC (Hijau Islamik, Emas, Putih, Responsif Mobile).
4. **`js/app.js`** : Logik aplikasi (Searchable student dropdown, auto-fill WhatsApp, pengiraan yuran automatik, html2canvas export PNG, Web Share API, integrasi WhatsApp).

---

## 2. PANDUAN SETUP BACKEND GOOGLE APPS SCRIPT

### LANGKAH 1: Buka Google Sheets Anda
1. Buka Google Sheet berikut (Spreadsheet ID: `1ahZXkijsmqPD5MDHcBGSXgp4HR0R1NDi4rUx4NH-nho`):
   `https://docs.google.com/spreadsheets/d/1ahZXkijsmqPD5MDHcBGSXgp4HR0R1NDi4rUx4NH-nho/edit`
2. Klik pada menu **Extensions (Pelanjutan)** -> **Apps Script**.

### LANGKAH 2: Masukkan Kod Backend (`Code.gs`)
1. Padamkan semua kod lalai di dalam fail `Code.gs`.
2. Salin keseluruhan kandungan daripada fail **`Code.gs`** projek ini dan tampalkan ke dalam editor Apps Script.
3. Pastikan `CONFIG.spreadsheetId` disetkan kepada:
   ```javascript
   spreadsheetId: "1ahZXkijsmqPD5MDHcBGSXgp4HR0R1NDi4rUx4NH-nho"
   ```
4. Tekan **Save (Simpan)** atau `Ctrl + S`.

### LANGKAH 3: Jalankan Auto Setup Database (`setupDatabase`)
1. Di bahagian atas editor Apps Script, pilih fungsi **`setupDatabase`** daripada dropdown fungsi.
2. Klik butang **Run (Jalankan)**.
3. Jika Google meminta kebenaran (Authorization Required):
   - Klik **Review Permissions**.
   - Pilih akaun Google anda.
   - Klik **Advanced** -> **Go to Untitled project (unsafe)**.
   - Klik **Allow**.
4. Selepas fungsi selesai dijalankan, semak Google Sheet anda. Dua (2) Sheet baharu akan terbentuk secara automatik:
   - **`MURID`**: Berisi senarai lengkap 38 murid FQC beserta nombor WhatsApp parent yang telah diformatkan sebagai Text (mengekalkan angka `0` di hadapan).
   - **`PEMBAYARAN`**: Berisi header lengkap untuk semua rekod bayaran yuran.

---

## 3. DEPLOY APPS SCRIPT SEBAGAI WEB APP

1. Di bahagian atas kanan Apps Script, klik **Deploy** -> **New deployment**.
2. Klik ikon gear (Select type) -> pilih **Web app**.
3. Isi maklumat berikut:
   - **Description**: `Sistem Yuran FQC v1.0`
   - **Execute as**: `Me (akaun anda)`
   - **Who has access**: `Anyone (Sesiapa sahaja)` *(Penting supaya frontend boleh hantar data tanpa isu login)*.
4. Klik **Deploy**.
5. Salin **Web App URL** yang terhasil (Contoh: `https://script.google.com/macros/s/AKfycbx.../exec`).

---

## 4. INTEGRASI WEB APP URL DENGAN FRONTEND

1. Buka sistem web (`index.html`) di browser anda.
2. Pergi ke tab **Tetapan (Settings)** di sidebar sebelah kiri.
3. Tampalkan **Web App URL** Google Apps Script yang telah disalin tadi ke dalam ruangan **Google Apps Script Web App URL**.
4. Klik **Simpan Tetapan**.
5. Klik **Jalankan setupDatabase()** atau **Uji Sambungan** untuk memastikan frontend dan Google Sheets anda telah berhubung sepenuhnya!

---

## 5. CARA MENUKAR LOGO, TANDATANGAN & BACKGROUND WATERMARK

Anda boleh menukar gambar pada resit dengan 2 cara:

### Cara 1: Melalui Tab Tetapan di Sistem Web (Mudah)
1. Buka tab **Tetapan**.
2. Masukkan URL atau link gambar anda pada ruangan:
   - **LOGO_URL**: Link gambar logo FQC.
   - **SIGNATURE_URL**: Link gambar tandatangan admin.
   - **BACKGROUND_URL**: Link gambar watermark PBAQ/FQC.
3. Klik **Simpan Tetapan**.

### Cara 2: Simpan Fail Gambar dalam Folder `assets/`
1. Letakkan fail gambar anda di dalam folder `assets/`:
   - `assets/logo.png`
   - `assets/signature.png`
   - `assets/pbaq-bg.png`
2. Sistem akan memuat naik fail ini secara automatik.

---

## 6. PANDUAN PENGGUNAAN SISTEM (UNTUK ADMIN FQC)

### Cara Membuat Pembayaran Baru:
1. Klik tab **Pembayaran Baru**.
2. **Pilih Nama Murid**: Taip nama murid (contoh: "Farha" atau "Aqil"). Klik pada nama murid. Nombor WhatsApp parent akan diisi secara automatik.
3. **Pilih Tarikh & Bulan**: Tarikh automatik diset ke hari ini. Pilih bulan pembayaran yuran.
4. **Masukkan Bayaran**: Masukkan jumlah RM pada kategori yuran berkenaan (contoh: Buku Rekod = 60, Kelas Akademik = 110). Kategori kosong automatik RM0.
5. **Pilih Kaedah Bayaran**: Pilih TUNAI atau TRANSFER.
6. **Klik JANA RESIT**: Paparan resit rasmi digital FQC di sebelah kanan akan dikemaskini secara langsung dengan nombor resit merah (`FQC-1100`).
7. **Klik SIMPAN & WHATSAPP**:
   - Data disimpan ke Google Sheets.
   - Gambar resit PNG dijana.
   - WhatsApp parent dibuka secara automatik dengan draf mesej rasmi FQC.
   - Admin hanya perlu attach gambar resit PNG yang telah dimuat turun ke ruang bual WhatsApp.

---

## 7. TROUBLESHOOTING & PETUNJUK RALAT (HINTS)

### ⚠️ Ralat: `ReferenceError: localStorage is not defined (line 56, file "Code")`

* **Sebab Ralat Berlaku**: 
  Ralat ini berlaku apabila kod JavaScript Frontend (`app.js`) dipaste ke dalam fail `.gs` di Google Apps Script (contohnya dinamakan `Code.gs`). Di Google Apps Script, fail `.gs` dijalankan di atas **Server Google**, di mana pembolehubah `localStorage`, `window`, dan `document` tidak wujud (hanya wujud di Browser).

* **Penyelesaian**:
  1. **Fail `Code.gs`**: Hanya salin kod daripada fail **`Code.gs`** sahaja ke dalam editor Apps Script. Jangan salin kod `app.js` ke dalam `.gs`!
  2. **Fail HTML**: Buat fail HTML di Apps Script (menu **+** -> **HTML**) dan namakan sebagai **`Index`** (atau `Index.html`), kemudian salin kandungan **`Index.html`** projek ini ke dalamnya.
  3. Kami telah menambah helper `safeGetStorage()` dalam `app.js` yang menyemak `typeof localStorage !== 'undefined'` secara automatik untuk memastikan ralat ini tidak lagi berlaku walaupun kod disemak oleh Apps Script.

---

* **Masalah: Nombor WhatsApp tiada angka `0` di Google Sheets**
  * *Solusi*: Kod `setupDatabase()` dan `savePayment()` kami telah memaksa format `'017...` sebagai STRING/TEXT supaya Google Sheets tidak memadamkan angka `0` di hadapan.

* **Masalah: Nombor Resit Berulang (Duplicate)**
  * *Solusi*: Backend Apps Script menggunakan `LockService.getScriptLock()` supaya sekiranya dua pembayaran dibuat serentak, transaksi akan diproses satu persatu dan nombor resit sentiasa unik (`FQC-1100`, `FQC-1101`, dan seterusnya).

* **Masalah: Kemaskini Kod Apps Script Tidak Berubah**
  * *Solusi*: Setiap kali anda mengedit kod di `Code.gs`, anda MUST buat **New Deployment** (atau Manage Deployments -> edit -> New Version) supaya Google Apps Script menggunakan versi terbaharu kod anda.

---

## 8. MAKLU MAT PENGANJUR & MAKLUMAT RESIT

**FATHUL QURANIC CENTRE (FQC)**
Alamat:
5-2, 2ND FLOOR, JLN PPS-1,
PUSAT PERDAGANGAN SELASEH,
68100 BATU CAVES, SELANGOR

TEL (H/P): 014-5366009 / 03-67314231
