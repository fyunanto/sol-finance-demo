import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SolLogo } from './SolLogo';
import {
  GitBranch,
  Shield,
  Layers,
  Sparkles,
  Check,
  Copy,
  ExternalLink,
  Info,
  X,
  FileCode,
  Terminal,
  RefreshCw,
  Eye,
  EyeOff,
  Globe,
  Lock,
  ArrowRight
} from 'lucide-react';
import { DataPresetMode } from '../types';

export const DualRepoDemoModal: React.FC = () => {
  const {
    dataPresetMode,
    switchDataPreset,
    isDemoSettingsModalOpen,
    setIsDemoSettingsModalOpen,
    companyInfo
  } = useApp();

  const [activeTab, setActiveTab] = useState<'switcher' | 'github_guide' | 'blank_code'>('switcher');
  const [copiedScript, setCopiedScript] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  if (!isDemoSettingsModalOpen) return null;

  const gitScript = `# 1. Di GitHub: Buat repository baru (misal: "agency-finance-os-demo")
# PENTING: Jangan centang "Add a README" agar repositori kosong.

# 2. Buka terminal di folder proyek Anda:
# Buat branch baru khusus demo atau clone ke folder baru:
git checkout -b demo-clean-version

# 3. Atau buat repository terpisah (Recommended untuk 2 Repo):
# Buat folder baru di komputer Anda:
mkdir agency-finance-os-demo
cd agency-finance-os-demo
git init
git branch -M main

# Salin semua file dari proyek ini ke folder baru (kecuali folder .git)
# Lalu hubungkan ke repository demo baru Anda di GitHub:
git remote add origin https://github.com/USERNAME_ANDA/agency-finance-os-demo.git

# 4. Push ke GitHub:
git add .
git commit -m "feat: release clean demo showcase version"
git push -u origin main

# SELESAI! Anda sekarang punya 2 Repository mandiri:
# - Repo 1 (Private): sol-agency-finance-internal
# - Repo 2 (Public / Showcase): agency-finance-os-demo`;

  const blankDataSnippet = `// Ganti isi src/data/initialData.ts di repositori Demo Anda dengan ini:
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
];`;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(gitScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(blankDataSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E53826] to-[#EE5D1F] flex items-center justify-center shadow-md">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">Manajemen 2 Versi & Demo Calon Pembeli</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Solusi Dual Repo
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Pisahkan versi rahasia internal SOL Agency dengan versi demo showcase untuk calon pembeli/klien.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDemoSettingsModalOpen(false)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('switcher')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-lg transition-all border-b-2 cursor-pointer ${
              activeTab === 'switcher'
                ? 'bg-white text-slate-900 border-[#E53826] shadow-xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-100'
            }`}
          >
            <RefreshCw className="w-4 h-4 text-[#E53826]" />
            <span>1-Click Switcher Mode Langsung</span>
          </button>

          <button
            onClick={() => setActiveTab('github_guide')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-lg transition-all border-b-2 cursor-pointer ${
              activeTab === 'github_guide'
                ? 'bg-white text-slate-900 border-[#E53826] shadow-xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-100'
            }`}
          >
            <GitBranch className="w-4 h-4 text-emerald-600" />
            <span>Panduan 2 Repository GitHub & Rename</span>
          </button>

          <button
            onClick={() => setActiveTab('blank_code')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-lg transition-all border-b-2 cursor-pointer ${
              activeTab === 'blank_code'
                ? 'bg-white text-slate-900 border-[#E53826] shadow-xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-100'
            }`}
          >
            <FileCode className="w-4 h-4 text-indigo-600" />
            <span>Kode Template Data Kosong (Blank)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          
          {/* TAB 1: 1-CLICK SWITCHER */}
          {activeTab === 'switcher' && (
            <div className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 leading-relaxed">
                  <p className="font-bold text-amber-950 mb-1">
                    Anda tidak perlu coding ulang untuk melakukan demonstrasi ke calon pembeli!
                  </p>
                  Sistem ini telah kami lengkapi dengan 3 Preset bawaan. Anda dapat beralih dalam 1 klik sebelum screen-sharing atau meeting dengan klien:
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* PRESET 1: INTERNAL SOL AGENCY */}
                <div
                  onClick={() => switchDataPreset('internal')}
                  className={`p-5 rounded-xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                    dataPresetMode === 'internal'
                      ? 'border-[#E53826] bg-red-50/40 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  {dataPresetMode === 'internal' && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 bg-[#E53826] text-white text-[10px] font-black rounded-full uppercase tracking-wider">
                      Aktif Sekarang
                    </span>
                  )}
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-[#E53826] mb-3">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">
                      Versi 1: Internal SOL Agency
                    </h4>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 mb-2">
                      Private • Operasional Riil
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      Memuat data asli PT Solusi Optima Laju, kas riil Bank Mandiri, proposal dan invoice asli PT Nestraya Jaya Global.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-200/80 text-[11px] font-semibold text-slate-700">
                    🔐 Gunakan untuk operasional harian 2-person founder.
                  </div>
                </div>

                {/* PRESET 2: DEMO SHOWCASE */}
                <div
                  onClick={() => switchDataPreset('demo')}
                  className={`p-5 rounded-xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                    dataPresetMode === 'demo'
                      ? 'border-indigo-600 bg-indigo-50/40 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  {dataPresetMode === 'demo' && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-black rounded-full uppercase tracking-wider">
                      Aktif Sekarang
                    </span>
                  )}
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 mb-3">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">
                      Versi 2: Demo Showcase
                    </h4>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-700 mb-2">
                      Fiktif Aman • Demo Presentation
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      Memuat profil contoh "NEXA Digital", nama klien fiktif, angka contoh, rekening contoh tanpa membocorkan data rahasia SOL Agency.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-200/80 text-[11px] font-semibold text-indigo-800">
                    ✨ Grafik & pipeline terisi indah untuk presentasi fitur.
                  </div>
                </div>

                {/* PRESET 3: BLANK / CLEAN SLATE */}
                <div
                  onClick={() => switchDataPreset('blank')}
                  className={`p-5 rounded-xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                    dataPresetMode === 'blank'
                      ? 'border-emerald-600 bg-emerald-50/40 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  {dataPresetMode === 'blank' && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-black rounded-full uppercase tracking-wider">
                      Aktif Sekarang
                    </span>
                  )}
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 mb-3">
                      <EyeOff className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">
                      Versi 3: Bersih Kosong (Blank)
                    </h4>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 mb-2">
                      Clean Slate • Rp 0
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      Seluruh informasi dan transaksi ditutup/dikosongkan (Rp 0). Sangat pas jika Anda ingin mendemokan proses input dari awal di depan calon pembeli.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-200/80 text-[11px] font-semibold text-emerald-800">
                    🧼 Kosong total, siap untuk uji coba langsung pembeli.
                  </div>
                </div>

              </div>

              {/* Status Banner */}
              <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Status Mode Saat Ini:</p>
                    <p className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{companyInfo.name}</span>
                      <span className="text-xs text-slate-400 font-normal">({companyInfo.legalName})</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsDemoSettingsModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gradient-to-r from-[#E53826] to-[#EE5D1F] text-xs font-bold text-white hover:opacity-90 transition-opacity"
                >
                  Tutup & Mulai Gunakan Mode Ini
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: GITHUB GUIDE */}
          {activeTab === 'github_guide' && (
            <div className="space-y-6">
              <div className="prose prose-slate max-w-none text-xs text-slate-600 space-y-4">
                
                {/* Step 1 */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#E53826] text-white text-xs flex items-center justify-center font-bold">1</span>
                    Bisa membuat 2 Repository di GitHub?
                  </h4>
                  <p className="text-xs leading-relaxed text-slate-600">
                    <strong>BISA BANGET dan SANGAT DIREKOMENDASIKAN!</strong> Ini adalah standar industri terbaik (*best practice*). Anda membuat:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <strong className="text-slate-900">Repository 1 (Private):</strong> <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">sol-agency-finance-internal</code> &rarr; Untuk internal Anda dan tim SOL Agency. Berisi data riil operasional.
                    </li>
                    <li>
                      <strong className="text-slate-900">Repository 2 (Public / Unlisted Showcase):</strong> <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">agency-finance-os-demo</code> &rarr; Untuk showcase calon pembeli. Semua data sudah dikosongkan atau disamarkan.
                    </li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                    Bagaimana Cara Rename Repository di GitHub?
                  </h4>
                  <ol className="list-decimal pl-5 space-y-1 text-slate-600">
                    <li>Buka repository Anda di <strong>github.com/username/nama-repo</strong>.</li>
                    <li>Klik tab <strong>Settings</strong> di menu atas repository.</li>
                    <li>Pada bagian <strong>General</strong> paling atas, ada kolom <strong>Repository name</strong>.</li>
                    <li>Ubah namanya (misalnya dari <code className="bg-slate-200 px-1 rounded">my-app</code> menjadi <code className="bg-slate-200 px-1 rounded">sol-agency-finance-internal</code>), lalu klik tombol <strong>Rename</strong>.</li>
                    <li>GitHub otomatis mengalihkan URL lama ke URL baru tanpa merusak apapun!</li>
                  </ol>
                </div>

                {/* Step 3 */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold">3</span>
                      Perintah Terminal (Git Command) untuk Push ke Repository Demo Baru
                    </h4>
                    <button
                      onClick={handleCopyScript}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedScript ? 'Tersalin ke Clipboard!' : 'Salin Skrip'}</span>
                    </button>
                  </div>

                  <pre className="p-3.5 rounded-lg bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
                    {gitScript}
                  </pre>
                </div>

                {/* Bonus Tip */}
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1.5">
                  <p className="font-bold flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-emerald-600" />
                    💡 Tips Tambahan: Deploy Versi Demo ke Web Online Gratis!
                  </p>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    Agar calon pembeli tidak perlu menginstall Node.js di komputernya, Anda bisa hubungkan repository demo tersebut ke <strong>Vercel.com</strong> atau <strong>Netlify.com</strong> (100% gratis). Calon pembeli cukup membuka link seperti <code className="bg-emerald-100 px-1.5 py-0.5 rounded font-bold">https://demo-agency-finance.vercel.app</code> langsung di browser atau HP mereka!
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: BLANK CODE */}
          {activeTab === 'blank_code' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Isi File src/data/initialData.ts untuk Versi Demo Bersih
                  </h4>
                  <p className="text-xs text-slate-500">
                    Salin kode di bawah ini ke file <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">src/data/initialData.ts</code> pada repositori demo Anda untuk menjadikannya kosong total permanen.
                  </p>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Tersalin!' : 'Salin Kode'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-950 text-emerald-400 text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800 max-h-[350px]">
                {blankDataSnippet}
              </pre>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600">
                <strong>Catatan:</strong> Jika Anda memakai fitur <strong>1-Click Switcher</strong> di tab pertama, Anda bahkan tidak perlu mengganti kode secara manual karena aplikasi ini sudah otomatis menyediakannya!
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Data riil SOL Agency selalu aman tersimpan di storage internal.</span>
          </div>
          <button
            onClick={() => setIsDemoSettingsModalOpen(false)}
            className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Selesai
          </button>
        </div>

      </div>
    </div>
  );
};
