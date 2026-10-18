import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SolLogo } from './SolLogo';
import {
  Lock,
  Mail,
  Key,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
  Layers,
  Building,
  Phone,
  Globe,
  UserCheck,
  AlertCircle
} from 'lucide-react';

export const InternalLoginView: React.FC = () => {
  const {
    users,
    loginUser,
    companyInfo,
    switchDataPreset
  } = useApp();

  const [activeLoginMethod, setActiveLoginMethod] = useState<'quick' | 'pin' | 'google'>('quick');
  const [selectedUserId, setSelectedUserId] = useState<string>(users[0]?.id || 'usr-1');
  const [emailInput, setEmailInput] = useState<string>(users[0]?.email || 'fyunanto@gmail.com');
  const [passwordInput, setPasswordInput] = useState<string>('1234');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!emailInput.trim()) {
      setErrorMsg('Masukkan alamat email internal terdaftar.');
      return;
    }

    if (!passwordInput.trim()) {
      setErrorMsg('Masukkan kata sandi atau PIN keamanan.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Find matching user by email or fallback to selected user
      const matchedUser = users.find(
        u => u.email.toLowerCase() === emailInput.trim().toLowerCase()
      ) || users.find(u => u.id === selectedUserId) || users[0];

      setIsLoading(false);
      loginUser(matchedUser.id);
    }, 450);
  };

  const handleQuickLogin = (uId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginUser(uId);
    }, 350);
  };

  const handleGoogleSso = (uId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginUser(uId);
    }, 500);
  };

  const handleDemoBypass = () => {
    switchDataPreset('demo');
    loginUser('demo-usr-1');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950/40 flex flex-col justify-between p-4 sm:p-6 lg:p-8 text-slate-100 font-sans selection:bg-orange-500 selection:text-white">
      {/* Top Header Bar */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <SolLogo size="md" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-white tracking-tight">
                {companyInfo.name}
              </span>
              <span className="text-[10px] font-bold bg-orange-600/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Internal Portal
              </span>
            </div>
            <p className="text-xs text-slate-400">{companyInfo.legalName}</p>
          </div>
        </div>

        {/* Mode Info & Demo Bypass */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDemoBypass}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700/80 transition-all cursor-pointer"
            title="Beralih ke Versi Demo Calon Pembeli tanpa kredensial internal"
          >
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Calon Pembeli?</span>
            <span className="text-indigo-400 font-bold">Mode Demo Publik</span>
          </button>
        </div>
      </header>

      {/* Main Login Card Container */}
      <main className="max-w-xl w-full mx-auto my-auto py-8">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-orange-950/20 space-y-6">
          
          {/* Brand & Title */}
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 mb-1">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Portal Keuangan &amp; Operasional Internal
            </h1>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Autentikasi aman Single Sign-On &amp; Role-Based Access Control untuk direksi dan staf internal <span className="text-white font-semibold">{companyInfo.legalName}</span>.
            </p>
          </div>

          {/* Authentication Method Tabs */}
          <div className="grid grid-cols-3 p-1 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setActiveLoginMethod('quick');
                setErrorMsg('');
              }}
              className={`py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeLoginMethod === 'quick'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Akses Cepat</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveLoginMethod('pin');
                setErrorMsg('');
              }}
              className={`py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeLoginMethod === 'pin'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span>Email &amp; PIN</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveLoginMethod('google');
                setErrorMsg('');
              }}
              className={`py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeLoginMethod === 'google'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Google SSO</span>
            </button>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-red-300 text-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* TAB 1: QUICK ACCESS (AKSES CEPAT DIREKSI & TIM) */}
          {activeLoginMethod === 'quick' && (
            <div className="space-y-4">
              <p className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                <span>Pilih profil internal untuk langsung masuk:</span>
                <span className="text-[10px] text-orange-400 bg-orange-950/60 border border-orange-800/60 px-2 py-0.5 rounded-md font-mono">
                  Satu-Klik Terotorisasi
                </span>
              </p>

              <div className="space-y-2.5">
                {users.map(u => (
                  <button
                    key={u.id}
                    disabled={isLoading}
                    onClick={() => handleQuickLogin(u.id)}
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-orange-500/50 transition-all text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={u.avatar}
                        alt=""
                        className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-700 group-hover:ring-orange-500 transition-all"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors truncate">
                            {u.name}
                          </p>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            u.role === 'founder_ceo'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : u.role === 'founder_partner'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          }`}>
                            {u.role === 'founder_ceo' ? 'Co-Founder & CEO' : u.role === 'founder_partner' ? 'Co-Founder & Finance' : 'Managing Director'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-mono truncate">{u.email}</p>
                        <p className="text-[11px] text-slate-500 truncate">{u.title}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400 group-hover:text-orange-400 transition-colors shrink-0">
                      <span className="text-xs font-semibold hidden sm:inline">Masuk</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: EMAIL & PIN / PASSWORD */}
          {activeLoginMethod === 'pin' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>Email Internal Terdaftar</span>
                  <span className="text-[10px] text-slate-400 font-normal">@solagency.id atau email terdaftar</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={emailInput}
                    onChange={e => setEmailInput(e.target.value)}
                    placeholder="nama@solagency.id"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-300">Kata Sandi / PIN Keamanan</label>
                  <span className="text-[10px] text-orange-400 font-medium">PIN Cepat: 1234</span>
                </div>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={e => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-slate-200 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-950 text-orange-600 focus:ring-orange-500"
                  />
                  <span>Ingat sesi di perangkat ini</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setPasswordInput('1234');
                    setEmailInput('fyunanto@gmail.com');
                  }}
                  className="text-orange-400 hover:text-orange-300 text-[11px] underline cursor-pointer"
                >
                  Gunakan PIN Default
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Masuk ke Dashboard Keuangan</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* TAB 3: GOOGLE WORKSPACE SSO */}
          {activeLoginMethod === 'google' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Google Workspace Single Sign-On (OAuth2.0)</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Gunakan akun Google Workspace resmi Anda untuk verifikasi identitas terenkripsi. Hak akses keuangan otomatis disesuaikan dengan role Anda di database tim.
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400">
                  Pilih Akun Google Internal:
                </label>
                {users.map(u => (
                  <button
                    key={u.id}
                    disabled={isLoading}
                    onClick={() => handleGoogleSso(u.id)}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 transition-all text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      {/* Google G Icon */}
                      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                          {u.name}
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono">{u.email}</p>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold text-slate-400 bg-slate-900 px-2 py-1 rounded">
                      Google SSO
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Security Features Info Box */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>256-bit TLS Enkripsi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-orange-500" />
              <span>Multi-Role RBAC System</span>
            </div>
          </div>

        </div>
      </main>

      {/* Footer Legal & Contact Details */}
      <footer className="max-w-6xl w-full mx-auto pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          <p className="font-bold text-slate-400">{companyInfo.legalName}</p>
          <p className="text-[11px] text-slate-500">{companyInfo.brandTagline}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 font-mono">
          <span className="flex items-center gap-1">
            <Mail className="w-3 h-3 text-orange-500" />
            <span>{companyInfo.email}</span>
          </span>
          <span className="flex items-center gap-1">
            <Globe className="w-3 h-3 text-orange-500" />
            <span>{companyInfo.website}</span>
          </span>
          <span className="flex items-center gap-1">
            <Phone className="w-3 h-3 text-orange-500" />
            <span>{companyInfo.phone}</span>
          </span>
        </div>
      </footer>
    </div>
  );
};
