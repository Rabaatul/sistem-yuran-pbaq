# Fathul Quranic Centre (FQC) — Portal Rasmi

Website rasmi dan portal pengurusan berpusat untuk **Fathul Quranic Centre (FQC)**. Projek ini menyatukan sistem-sistem sedia ada ke dalam satu pengalaman pengguna yang moden, mesra pengguna, dan profesional.

---

## 🔒 Notis Keselamatan (Security Statement)

> **PENTING**: Hiding an external URL behind a portal page does not secure the external application. Sensitive systems must enforce authentication at the application level.
> 
> Menyembunyikan URL luaran di dalam paparan portal iframe tidak menjadikan aplikasi luaran tersebut terlindung secara automatik. Sistem yang mengandungi maklumat sensitif mesti melaksanakan sistem pengesahan (*authentication*) pada peringkat aplikasi itu sendiri.

---

## 🛠️ Tech Stack

* **Framework**: Next.js 14 (App Router)
* **Bahasa**: TypeScript
* **Styling**: Tailwind CSS
* **Ikon**: Lucide React
* **Penempatan (Deployment)**: Vercel

---

## 🚀 Panduan Pemasangan & Pembangunan Lokal

### 1. Muat Turun Dependensi

```bash
npm install
```

### 2. Jalankan Persekitaran Pembangunan (Development)

```bash
npm run dev
```

Buka pelayar anda di `http://localhost:3000`.

### 3. Semak Build Produksi

```bash
npm run build
```

---

## 🌐 Cara Deploy Ke Vercel

1. **Push Projek ke GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit — Portal Rasmi FQC"
   git branch -M main
   git remote add origin https://github.com/USERNAME/NAMA-REPO.git
   git push -u origin main
   ```

2. **Daftar & Import di Vercel**:
   - Log masuk ke [Vercel](https://vercel.com).
   - Klik **"Add New"** -> **"Project"**.
   - Pilih repository GitHub anda.
   - Framework Preset akan dikesan secara automatik sebagai **Next.js**.

3. **Environment Variables** (Jika ada pada masa hadapan):
   - Tambah sebarang *secret keys* di bahagian **Environment Variables** Vercel.
   - Jangan sekali-kali *commit* `.env.local` ke dalam GitHub repository.

4. **Klik Deploy**:
   - Vercel akan membina dan menyediakan pautan domain `.vercel.app` secara automatik.

---

## 🖼️ Cara Menukar Logo Rasmi FQC

Logo dipanggil melalui kompenen `FqcLogo.tsx`. Untuk menukar logo dengan gambar rasmi FQC:

1. Sediakan fail gambar logo anda dalam format **PNG** (disyorkan latar belakang lutsinar / transparent).
2. Namakan fail tersebut sebagai `fqc-logo.png`.
3. Gantikan fail di lokasi berikut:
   ```text
   public/images/fqc-logo.png
   ```
4. Kompenen akan mengemas kini logo secara automatik tanpa perlu mengubah sebarang kod TypeScript.

---

## 📁 Struktur Projek

```text
src/
├── app/
│   ├── layout.tsx            # Main Root Layout dengan Sidebar & Topbar
│   ├── globals.css           # Custom Tailwind CSS & Design Tokens
│   ├── page.tsx              # Homepage (Laman Utama)
│   ├── pendaftaran/          # Halaman Pendaftaran Pelajar Baru
│   ├── pasukan-kami/         # Halaman Carta Organisasi & Pasukan
│   ├── portal/
│   │   ├── page.tsx          # Halaman Pilihan Direktori Portal
│   │   ├── admin/            # Portal Admin (Pembayaran Yuran & Resit)
│   │   └── prestasi/         # Portal Guru & Ibu Bapa (Prestasi Murid)
│   └── contact/              # Halaman Hubungi Kami
├── components/
│   ├── AppSidebar.tsx        # Fixed Sidebar Desktop
│   ├── MobileNavigation.tsx  # Topbar & Drawer Nav Mobile
│   ├── PageHeader.tsx        # Header Bahagian Atas Content Area
│   ├── ExternalAppFrame.tsx  # Frame Iframe Responsive & Fallback
│   ├── FqcLogo.tsx           # Logo FQC Dinamik & Vector Fallback
│   ├── QuickAccessCard.tsx   # Kad Akses Pantas
│   ├── PortalCard.tsx        # Kad Direktori Portal
│   ├── AnnouncementCard.tsx  # Kad Pengumuman
│   └── Footer.tsx            # Footer Rasmi FQC
├── config/
│   └── apps.ts               # Konfigurasi Pusat URL Aplikasi Sedia Ada
middleware.ts                 # Seni bina perlindungan laluan portal
```

---

## 🔗 Pautan Aplikasi Sedia Ada

* **Pendaftaran Baru**: `https://pendaftaranbarupbaq.netlify.app/`
* **Pasukan Kami**: `https://pasukankamipbaq.netlify.app/`
* **Portal Admin**: `https://sistembayaranpbaq.netlify.app/`
* **Portal Guru & Ibu Bapa**: `https://pelaporandansemakan.netlify.app/`

---

© 2026 Fathul Quranic Centre (FQC). Hak Cipta Terpelihara.
