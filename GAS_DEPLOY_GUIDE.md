# PANDUAN DEPLOYMENT & CONFIGURE BACKEND FATHUL QURANIC CENTRE (FQC)

Sistem Pembayaran Yuran & Resit Digital **Fathul Quranic Centre (FQC)** ini disambungkan terus dengan **Google Sheets / AppSheet Database** melalui Google Apps Script (`Code.gs`).

---

## 1. MAKLUMAT DATABASE GOOGLE SHEETS

- **Spreadsheet ID**: `1DsLcgM7PHMpgVd1MkPCtzCuKDWk0g007SgrDvBv3MTk`
- **Spreadsheet URL**: `https://docs.google.com/spreadsheets/d/1DsLcgM7PHMpgVd1MkPCtzCuKDWk0g007SgrDvBv3MTk/edit`
- **Struktur 4 Sheet AppSheet**:
  1. `MURID`: Data Profil Murid (`ID_MURID`, `NAMA_MURID`, `NAMA_PARENT`, `NO_WHATSAPP`, `STATUS`, `MENGAJI`, `TRANSIT`, `JAWI`, `UPKK`, `PSRA`, `KAFA`, `AKADEMIK`, `ONLINE`, dll)
  2. `PEMBAYARAN`: Rekod Pembayaran Transaksi (`ID_TRANSAKSI`, `NO_RESIT`, `ID_MURID`, `NAMA_MURID`, `TARIKH`, `BULAN`, `TAHUN`, `KAEDAH`, `JUMLAH`, `NO_WHATSAPP`, `TARIKH_MASA`)
  3. `BUTIRAN_PEMBAYARAN`: Pecahan Butiran Item per Resit (`ID_DETAIL`, `NO_RESIT`, `ID_MURID`, `KATEGORI`, `JENIS_YURAN`, `BULAN`, `AMAUN`)
  4. `TETAPAN_YURAN`: Senarai Kategori & Harga Yuran (`ID_YURAN`, `KATEGORI`, `NAMA_YURAN`, `HARGA_1`, `HARGA_2`, `STATUS`)

---

## 2. LANGKAH-LANGKAH MENJALANKAN BACKEND APPS SCRIPT

1. **Buka Editor Apps Script**:
   - Buka Google Sheets FQC (`https://docs.google.com/spreadsheets/d/1DsLcgM7PHMpgVd1MkPCtzCuKDWk0g007SgrDvBv3MTk/edit`).
   - Klik menu **Extensions (Pelanjutan)** ➔ **Apps Script**.

2. **Salin Kod Backend (`Code.gs`)**:
   - Padamkan kod sedia ada dalam `Code.gs`.
   - Salin dan tampal keseluruhan kandungan daripada fail [Code.gs](file:///c:/Users/rabaa/OneDrive/Desktop/RABAATUL%20PROJEK%202026/Code.gs).
   - Tekan **Save (Simpan)**.

3. **Jalankan Initial Setup (`setupDatabase`)**:
   - Pilih fungsi `setupDatabase` di dropdown atas Apps Script editor.
   - Klik **Run**.
   - Berikan kebenaran (*Authorization Required* ➔ *Review Permissions* ➔ *Advanced* ➔ *Allow*).
   - Keempat-empat Sheet (`MURID`, `PEMBAYARAN`, `BUTIRAN_PEMBAYARAN`, `TETAPAN_YURAN`) akan dibina secara automatik bersama data murid awal dan tetapan header.

4. **Muat Naik Single-File HTML (`Index_GAS.html`)**:
   - Di Apps Script editor, klik `+` (Add a file) ➔ Pilih **HTML**.
   - Namakan fail ini **`Index`** (atau `Index_GAS`).
   - Salin kandungan daripada [Index_GAS.html](file:///c:/Users/rabaa/OneDrive/Desktop/RABAATUL%20PROJEK%202026/Index_GAS.html) dan tampal.

5. **Deploy Sebagai Web App**:
   - Klik **Deploy** ➔ **New deployment**.
   - Pilih **Web app** (Ikon Gear).
   - **Execute as**: `Me (akaun anda)`
   - **Who has access**: `Anyone (Sesiapa sahaja)`
   - Klik **Deploy**.
   - Salin **Web App URL** yang dihasilkan.

---

## 3. MENJALANKAN SECARA TEMPATAN (LOCAL SERVER)

Sistem juga boleh dijalankan secara tempatan pada komputer anda:

1. Buka PowerShell di folder projek.
2. Jalankan arahan:
   ```powershell
   powershell -ExecutionPolicy Bypass -File server.ps1
   ```
3. Buka pelayar web pada alamat:
   ```
   http://localhost:8000/
   ```

Semua fungsi carian live murid, semakan tunggakan mengikut kategori, eksport Excel, penjanaan gambar PNG resit, PDF, dan Hantar WhatsApp akan berfungsi sepenuhnya!
