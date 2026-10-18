# SOL Agency - Financial & Billing Operating System

Sistem manajemen keuangan real-time, pembukuan laba rugi (*Profit & Loss*), pelacakan arus kas harian, penerbitan *Quotation* & *Invoice* otomatis, kontrol anggaran, dan *Role-Based Access Control* (RBAC) untuk **SOL Agency (PT. Solusi Optima Laju)**.

---

## 🏢 Profil Perusahaan
- **Nama Perusahaan:** PT ABV
- **Badan Hukum:** PT. ABC
- **Email Resmi:** [invoice@solagency.id](mailto:invoice@solagency.id)
- **Email Kontak:** [connect.solagency@gmail.com](mailto:connect.solagency@gmail.com)
- **Website:** [www.solagency.id](https://www.solagency.id)
- **WhatsApp / Telp:** +62 852-1282-8253
- **Rekening Resmi:** Bank Mandiri `137 000 234 2353` a.n Andi Rahman

---

## ✨ Fitur Utama

1. **Dashboard Eksekutif & Arus Kas Real-Time**
   - Saldo Kas Bank Mandiri real-time dengan status pulse indicator.
   - Grafik batang interaktif arus kas bulanan (Pemasukan vs Beban Operasional).
   - Indikator Laba Bersih (*Net Profit*) dan Margin Operasional.
   - Peringatan banner otomatis jika pengeluaran mendekati atau melampaui kuota bulanan.

2. **Buku Kas & Manajemen Transaksi**
   - Pencatatan Pemasukan (*Income*), Pengeluaran (*Expense*), dan Setoran Modal (*Capital Injection*).
   - Filter berdasarkan jenis transaksi, bulan berjalan, dan pencarian cepat.
   - Hapus transaksi langsung dengan konfirmasi in-app yang aman.
   - Ekspor buku kas ke format Microsoft Excel (.csv UTF-8 BOM).

3. **Laporan Laba Rugi Komprehensif (P&L Statement)**
   - Standar akuntansi: Pendapatan Operasional &rarr; Harga Pokok Proyek (COGS) &rarr; Laba Kotor (*Gross Profit*) &rarr; Beban Operasional Usaha (OPEX) &rarr; Laba Bersih (*Net Profit*).
   - Rekonsiliasi modal disetor oleh founder.
   - Fitur cetak laporan laba rugi dan ekspor spreadsheet.

4. **Kontrol Anggaran & Peringatan Ambang Batas (*Budget Alerts*)**
   - Penetapan limit per kategori (Hosting & Domain, Software Tools, Operasional, Pemasaran).
   - Ambang batas alarm otomatis (default 80% & 100%).
   - Simulasi notifikasi push ke browser & riwayat alert.

5. **Siklus Quotation &rarr; Invoice &rarr; Pelunasan Kas Otomatis**
   - Pembuatan Quotation lengkap sesuai template resmi proposal SOL Agency.
   - Konversi 1-klik menjadi Invoice tagihan resmi.
   - Pelacakan pembayaran Down Payment (DP 50%) dan Pelunasan Akhir (50%).
   - **Otomatisasi Arus Kas:** Saat DP atau Pelunasan dicatat, sistem otomatis membukukan transaksi pemasukan ke buku kas & laba rugi.
   - Kirim langsung ke klien melalui pesan WhatsApp terformat otomatis atau Email resmi.

6. **Format Cetak PDF Pixel-Perfect & Proposal Multi-Halaman**
   - Template dokumen identik dengan dokumen fisik SOL Agency (kop surat, logo melingkar, tabel deliverables, grand total, terms of payment, stempel & tanda tangan digital Ferdi Yunanto).
   - Toggle tampilan antara **Lembar Tagihan 1 Halaman** dan **Dokumen Proposal Proyek Lengkap (Scope, Arsitektur Custom PHP 8.30 & Cloud Hosting)**.

7. **Tata Kelola Tim & RBAC (Role-Based Access Control)**
   - Struktur tim 2-person startup (*) + akun portal klien (*Client Viewer*).
   - Tombol ganti pengguna instan dan edit profil pengguna (nama, email, role, avatar).
   - Matriks hak akses fitur dan status Google OAuth2 SSO.

---

## 🚀 Panduan Instalasi & Menjalankan Aplikasi

### Kebutuhan Sistem
- Node.js versi 18 atau lebih baru
- npm / bun / yarn

### Langkah Instalasi
```bash
# 1. Clone repository
git clone https://github.com/username/sol-agency-finance-os.git
cd sol-agency-finance-os

# 2. Install dependensi
npm install

# 3. Jalankan server development
npm run dev
```

Aplikasi akan berjalan pada `http://localhost:3000`.

### Build untuk Produksi
```bash
npm run build
npm run preview
```

---

## 🛠️ Tech Stack
- **Frontend:** React 19, TypeScript
- **Styling:** Tailwind CSS v4 (Palet Sunset Red `#E53826`, Orange `#EE5D1F`, Golden `#FBBF24`)
- **Icons:** Lucide React
- **Animations:** Motion
- **Build Tool:** Vite 8

---

## 📄 Lisensi
Hak Cipta © 2026 PT. Solusi Optima Laju. Seluruh hak cipta dilindungi undang-undang.
