# PANDUAN DEPLOY GOOGLE APPS SCRIPT WEB APP 🚀

Panduan langkah demi langkah untuk men-deploy **SISTEM BAYARAN YURAN MURID** menggunakan Google Sheets & Google Apps Script.

---

## 📋 PERSEDIAAN GOOGLE SPREADSHEET

1. Buka Google Spreadsheet anda.
2. Sediakan 2 Sheet dengan tajuk dan kolum tepat seperti berikut:

### **SHEET 1: MURID**
- Nama Sheet: `MURID`
- Kolum:
  - **A**: `Bil`
  - **B**: `Nama Murid`
  - **C**: `Kelas`
  - **D**: `Nama Penjaga`
  - **E**: `No. WhatsApp`

Contoh Data:
```text
1 | ALI | 3QA | UMAR | 0134565245
2 | SOFIA | 2QA | SITI | 0134565245
3 | WAWA | 2AD | AQA | 0134565245
```

### **SHEET 2: BAYARAN**
- Nama Sheet: `BAYARAN`
- Kolum:
  - **A**: `ID Bayaran`
  - **B**: `Tarikh`
  - **C**: `No Resit`
  - **D**: `Nama Murid`
  - **E**: `Jenis Yuran`
  - **F**: `Jumlah`
  - **G**: `Kaedah Bayaran`
  - **H**: `Catatan`

*(Nota: Jika sheet `BAYARAN` belum dicipta, skrip akan membina dan menetapkan header ini secara automatik apabila pembayaran pertama direkodkan).*

---

## 🛠️ LANGKAH 1: BUAT PROJEK APPS SCRIPT

1. Di dalam Google Spreadsheet anda, klik menu atas:
   **Extensions (Extensi)** ➔ **Apps Script**.
2. Berikan nama projek di bahagian atas kiri (contoh: `Sistem Bayaran Yuran Murid`).

---

## 📝 LANGKAH 2: SALIN KOD PROJEK (`Code.gs`)

1. Buka fail `Code.gs` sedia ada dalam editor Apps Script.
2. Padam semua kod asal.
3. Salin dan tampal (copy & paste) keseluruhan kod daripada fail [Code.gs](file:///c:/Users/rabaa/OneDrive/Desktop/RABAATUL%20PROJEK%202026/Code.gs).

---

## 🚀 LANGKAH 3: DEPLOY SEBAGAI WEB APP

1. Di sudut atas kanan editor Apps Script, klik **Deploy** ➔ **New deployment**.
2. Klik ikon **⚙️ Select type** ➔ Pilih **Web app**.
3. Isi tetapan berikut:
   - **Description**: `Versi 2.0 - Sistem Bayaran Yuran Murid`
   - **Execute as**: **`Me (Saya)`** *(PENTING)*
   - **Who has access**: **`Anyone (Sesiapa sahaja)`** *(PENTING)*
4. Klik **Deploy**.
5. Jika diminta kebenaran (Authorization Required):
   - Klik **Authorize access**.
   - Pilih akaun Google anda.
   - Klik **Advanced (Lanjutan)**.
   - Klik **Go to Sistem Bayaran Yuran Murid (unsafe)**.
   - Klik **Allow (Benarkan)**.

---

## 🎉 LANGKAH 4: MASUKKAN API URL DALAM LAMAN WEB

1. Salin **Web App URL** yang diberikan (contoh: `https://script.google.com/macros/s/.../exec`).
2. Buka fail `index.html` projek anda.
3. Gantikan baris berikut dengan URL anda:
   ```javascript
   const API_URL = "MASUKKAN_URL_GOOGLE_APPS_SCRIPT_DI_SINI";
   ```
   *(Atau tekan butang **Setup Google Sheets** di sidebar laman web dan tampalkan Web App URL anda di sana).*
