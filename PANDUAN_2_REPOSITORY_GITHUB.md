# 🚀 Panduan Setup 2 Versi Repository GitHub (Internal SOL Agency & Demo Calon Pembeli)

Dokumen ini berisi panduan teknis langkah demi langkah untuk memisahkan aplikasi **SOL Agency Financial & Billing OS** menjadi **2 Repository berbeda di GitHub**:
1. **Repository 1 (Private):** Untuk operasional internal tim SOL Agency (data keuangan asli, rekening bank, nama klien asli).
2. **Repository 2 (Public / Showcase Demo):** Untuk dipamerkan atau didemokan ke calon pembeli/klien (informasi rahasia ditutup, data kosong / disamarkan).

---

## ❓ Apakah Bisa Membuat 2 Repository dan di-Rename?
**JAWABAN: BISA BANGET dan SANGAT DIREKOMENDASIKAN!**
Ini adalah praktik standar industri software (*best practice*). Dengan 2 repositori:
- Rahasia keuangan PT Solusi Optima Laju dan mutasi kas tidak akan pernah bocor ke publik.
- Anda bebas memberikan akses link atau demo langsung ke calon pembeli.
- Nama repository di GitHub bisa di-rename kapan saja dengan 2 klik saja.

---

## 📋 Langkah 1: Rename Repository yang Sudah Ada di GitHub (Versi Internal)

Jika saat ini repositori Anda memiliki nama default (misal `ai-studio-app` atau sejenisnya):
1. Buka repositori Anda di browser: `https://github.com/USERNAME_ANDA/NAMA_REPO_LAMA`
2. Klik tab **Settings** (ikon gerigi) di bagian navigasi atas repository.
3. Di tab **General** paling atas, terdapat kolom **Repository name**.
4. Ubah namanya menjadi:
   ```text
   sol-agency-finance-internal
   ```
5. Klik tombol **Rename**.
6. Pastikan visibility repositori diatur ke **Private** (di bagian paling bawah Settings > *Danger Zone* > *Change repository visibility*).

---

## 📋 Langkah 2: Membuat Repository Baru untuk Demo Calon Pembeli

1. Buka [GitHub New Repository](https://github.com/new).
2. Isi nama repository:
   ```text
   agency-finance-os-demo
   ```
3. Pilih **Public** (jika ingin bisa dilihat portofolio Anda) atau **Private** (jika hanya ingin dishare ke calon pembeli tertentu).
4. **PENTING:** Jangan centang *"Add a README file"*, biarkan repositori baru tersebut kosong.
5. Klik **Create repository**.

---

## 📋 Langkah 3: Menyiapkan Kode Versi Demo di Komputer Anda

Anda punya 2 cara termudah:

### Cara A: Menggunakan Branch Baru (Satu Folder, 2 Branch)
Di folder proyek Anda saat ini:
```bash
# 1. Buat branch baru khusus demo
git checkout -b demo-clean

# 2. Buka aplikasi dan klik tombol "Demo Mode" di Navbar atas,
# pilih opsi "Versi 3: Bersih Kosong (Blank)" atau "Versi 2: Demo Showcase"

# 3. Hubungkan branch ini ke repo demo Anda di GitHub:
git remote add demo-origin https://github.com/USERNAME_ANDA/agency-finance-os-demo.git

# 4. Push ke GitHub repository demo:
git push -u demo-origin demo-clean:main
```

### Cara B: Salin ke Folder Baru (Paling Bersih & Mandiri)
1. Salin seluruh isi folder proyek ini ke folder baru di komputer Anda, misal bernama `agency-finance-os-demo`.
2. Hapus folder `.git` yang ada di dalam folder baru tersebut (agar tidak bentrok dengan repo lama).
3. Buka terminal di folder baru tersebut:
```bash
git init
git branch -M main
git add .
git commit -m "feat: initial commit demo showcase version with clean slate data"
git remote add origin https://github.com/USERNAME_ANDA/agency-finance-os-demo.git
git push -u origin main
```

---

## 🔒 Bagaimana Cara Menutup Semua Informasi di Versi Demo?

### Solusi 1: Built-in 1-Click Switcher (Sudah Tersedia di Aplikasi!)
Aplikasi ini sudah kami lengkapi dengan tombol **"Mode Demo / Showroom"** di pojok kanan atas Navbar:
1. Klik tombol **"Mode Demo"**.
2. Pilih salah satu dari 2 mode demo:
   - **Mode Showcase (Data Fiktif Aman):** Data otomatis berganti ke agensi contoh *"NEXA Digital"*, nama klien dummy, angka aman, grafik tetap cantik untuk presentasi.
   - **Mode Bersih Kosong (Clean Slate - Rp 0):** Seluruh mutasi kas, transaksi, quotation, dan invoice menjadi Rp 0 dan kosong bersih. Sangat cocok jika Anda mau demo *live* mengetik transaksi dan membuat invoice di depan calon pembeli!

### Solusi 2: Mengganti File Default Secara Permanen di Repo Demo
Jika Anda ingin repo demo tersebut secara default selamanya bersih kosong dari awal buka:
Buka file `src/data/initialData.ts` di repo demo, ganti isinya dengan:
```typescript
export const initialCompanyInfo = {
  name: "Agency Name",
  legalName: "PT. Solusi Digital Pratama",
  brandTagline: "Digital Growth & Bespoke Software Engineering",
  email: "demo@agency.id",
  contactEmail: "contact@agency.id",
  website: "www.agency.id",
  phone: "+62 812-0000-0000",
  founder: "Founder Name",
  partner: "Finance Lead",
  bankAccount: {
    bankName: "Bank Central Asia (BCA)",
    accountNumber: "000 000 0000",
    accountHolder: "PT Solusi Digital Pratama"
  }
};

export const initialQuotations = [];
export const initialInvoices = [];
export const initialTransactions = [];
export const initialUsers = [
  {
    id: "demo-1",
    name: "Demo Admin",
    email: "admin@demo.id",
    role: "founder_ceo",
    title: "Chief Executive Officer",
    company: "PT. Solusi Digital Pratama",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    isLoggedIn: true,
    authProvider: "google_sso"
  }
];
```

---

## 🔐 Fitur Menu Login Internal & Akses Keamanan (Versi Internal)

Pada repositori **Versi Internal (`sol-agency-finance-internal`)**, sistem telah dilengkapi dengan **Layar Login & Kunci Sesi Internal**:
1. **Layar Login Eksklusif SOL Agency (`InternalLoginView`):**
   - Mendukung login dengan **Email & PIN Keamanan** (PIN default: `1234` atau PIN kustom).
   - Mendukung **Single Sign-On (Google Workspace SSO - @solagency.id)**.
   - Mendukung **Akses Cepat Direksi (1-Klik)** untuk Ferdi Yunanto (CEO & Tech Lead) dan Reza Pratama (Co-Founder & Finance).
   - Terdapat tombol pintas **Mode Demo Publik** bagi calon pembeli yang ingin mencoba tanpa kredensial internal.
2. **Cara Kunci Sesi / Keluar (Logout) Kapan Saja:**
   - Di **Navbar atas**: Klik ikon gembok di sebelah profil atau buka menu profil pengguna > klik **"Menu Login / Kunci Sesi"**.
   - Di **Sidebar navigasi**: Klik tombol **"Menu Login Internal"**.
   - Sesi internal langsung terkunci dan kembali ke portal login yang aman.

---

## 🌐 Bonus: Deploy Versi Demo Online Gratis (Vercel / Netlify)
Agar calon pembeli bisa langsung mencoba aplikasi tanpa perlu clone atau install coding:
1. Buka [Vercel](https://vercel.com) atau [Netlify](https://netlify.com).
2. Login dengan akun GitHub Anda.
3. Klik **"Add New Project"** dan pilih repository `agency-finance-os-demo`.
4. Klik tombol **"Deploy"**.
5. Dalam 60 detik, Anda akan mendapatkan link website aktif seperti:
   ```text
   https://agency-finance-demo.vercel.app
   ```
6. Link ini bisa langsung Anda bagikan di proposal penawaran atau via WhatsApp ke calon pembeli kapan pun!
