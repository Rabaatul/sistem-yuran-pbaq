# SISTEM BAYARAN YURAN MURID 🎓💳

Aplikasi web pengurusan data murid dan pembayaran yuran mesra guru yang berhubung terus dengan **Google Sheets** (Sheet `MURID` dan Sheet `BAYARAN`) menggunakan **Google Apps Script (GAS)** Web App API.

---

## 🌟 Ciri-Ciri Utama

1. **Dashboard Statistik**:
   - Menampilkan 4 kad statistik utama: Jumlah Murid, Bayaran Hari Ini, Bayaran Bulan Ini, dan Jumlah Keseluruhan Bayaran.
   - Transaksi terkini beserta pautan paparan resit pantas.

2. **Data Murid (Sheet: MURID)**:
   - Paparan jadual murid: `Bil`, `Nama Murid`, `Kelas`, `Nama Penjaga`, `No. WhatsApp`.
   - Butang **+ Tambah Murid**, **Edit**, dan **Padam**.
   - Penjanaan nombor `Bil` secara automatik (auto-increment).
   - Nombor WhatsApp disimpan sebagai **TEKS** (mengekalkan digit `0` di hadapan, contoh `0134565245`).

3. **Rekod Bayaran (Sheet: BAYARAN)**:
   - Borang rekod bayaran mesra guru.
   - Dropdown carian murid **LIVE** daripada sheet `MURID`.
   - Isian automatik (Auto-fill) bagi Kelas, Nama Penjaga, dan No. WhatsApp apabila murid dipilih.
   - Pilihan Jenis Yuran (*Yuran Bulanan*, *Yuran PIBG*, *Yuran Aktiviti*, *Yuran Buku*, *Yuran Peperiksaan*, *Yuran Program*, *Lain-lain* + ruangan taip jenis yuran sendiri).
   - Dropdown Kaedah Bayaran (*Tunai*, *Online Transfer*, *QR*, *Lain-lain*).
   - Penjanaan **ID Bayaran** automatik (`BYR0001`, `BYR0002`...) & **No Resit** automatik (`RESIT-2026-0001`...).
   - Penyimpanan tepat mengikut susunan 8 kolum A..H pada sheet `BAYARAN`.

4. **Resit Digital & Integrasi WhatsApp**:
   - Paparan modal resit rasmi dengan format jumlah bayaran `RM 50.00`.
   - Butang **CETAK RESIT** (siap sedia dengan susun atur cetakan `@media print`).
   - Butang **HANTAR WHATSAPP**: Membuka WhatsApp secara automatik dengan menukar nombor penjaga ke format Malaysia (`60...`) dan menyediakan templat mesej Bahasa Melayu rasmi tanpa auto-send.

5. **Senarai Bayaran**:
   - Jadual penuh transaksi pembayaran daripada sheet `BAYARAN`.
   - Kotak carian serbaguna mengikut Nama Murid, No Resit, atau Jenis Yuran.
   - Penapis mengikut Bulan dan Jenis Yuran beserta paparan jumlah terkumpul hasil saringan.

---

## 📊 Struktur Google Spreadsheet

Satu Google Spreadsheet dengan 2 sheet:

### **SHEET 1: MURID**
| Kolum | Nama Kolum |
| :---: | :--- |
| **A** | Bil |
| **B** | Nama Murid |
| **C** | Kelas |
| **D** | Nama Penjaga |
| **E** | No. WhatsApp |

### **SHEET 2: BAYARAN**
| Kolum | Nama Kolum |
| :---: | :--- |
| **A** | ID Bayaran |
| **B** | Tarikh |
| **C** | No Resit |
| **D** | Nama Murid |
| **E** | Jenis Yuran |
| **F** | Jumlah |
| **G** | Kaedah Bayaran |
| **H** | Catatan |

---

## 🚀 Panduan Persediaan Google Apps Script (Backend API)

1. Buka Google Spreadsheet anda.
2. Klik **Extensions > Apps Script**.
3. Salin kandungan file `Code.gs` dan tampal ke dalam skrip editor Apps Script.
4. Klik **Deploy > New Deployment**.
5. Pilih **Web App**:
   - **Execute as**: *Me (Alamat emel anda)*
   - **Who has access**: *Anyone*
6. Salin **Web App URL** yang dihasilkan.
7. Buka file `index.html` dan kemaskini pembolehubah:
   ```javascript
   const API_URL = "TEPEK_URL_GOOGLE_APPS_SCRIPT_DI_SINI";
   ```
   *(Atau masukkan URL tersebut secara terus menerusi modal **Setup Google Sheets** dalam aplikasi).*

---

## 💻 Cara Menjalankan Secara Tempatan

Jalankan skrip PowerShell berikut:
```powershell
powershell -ExecutionPolicy Bypass -File server.ps1
```
Kemudian layari [http://localhost:8000/](http://localhost:8000/) di pelayar anda.
