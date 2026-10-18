import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SolLogo } from './SolLogo';
import {
  ShieldCheck,
  Key,
  Lock,
  CheckCircle2,
  X,
  ExternalLink,
  User,
  AlertCircle
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    currentUser,
    users,
    switchUserRole,
    sendNotification
  } = useApp();

  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSimulateOAuth = (userId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      switchUserRole(userId);
      setSuccessMsg(`Berhasil login via Google OAuth2 SSO! Sesi terenkripsi aktif.`);
      setTimeout(() => {
        setSuccessMsg('');
        setIsAuthModalOpen(false);
      }, 1200);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <div>
              <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                Autentikasi OAuth2 &amp; SSO
              </h3>
              <p className="text-[11px] text-slate-500">Google Workspace Enterprise Security</p>
            </div>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Brand context */}
        <div className="text-center py-2">
          <SolLogo size="md" className="justify-center" />
          <p className="text-xs text-slate-600 mt-2 font-medium">
            Sistem Keamanan &amp; Single Sign-On PT. Solusi Optima Laju
          </p>
        </div>

        {/* Current Active Session */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700">Sesi Login Aktif</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>OAuth2 Token Valid</span>
            </span>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <img
              src={currentUser.avatar}
              alt=""
              className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500/20"
            />
            <div className="min-w-0">
              <p className="font-bold text-slate-900 truncate">{currentUser.name}</p>
              <p className="text-[11px] text-slate-500 font-mono truncate">{currentUser.email}</p>
              <p className="text-[10px] text-orange-600 font-semibold">{currentUser.title}</p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200/60 text-[10px] text-slate-500 space-y-0.5 font-mono">
            <div>Scope: openid, email, profile, financial.read_write</div>
            <div>Auth Protocol: OAuth 2.0 / OpenID Connect</div>
          </div>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Single Sign-On Account Switcher */}
        <div className="space-y-2 text-xs">
          <label className="block font-bold text-slate-700">
            Masuk dengan Akun Google Terotorisasi:
          </label>

          {users.map(u => (
            <button
              key={u.id}
              disabled={isLoading}
              onClick={() => handleSimulateOAuth(u.id)}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all text-left cursor-pointer ${
                u.id === currentUser.id
                  ? 'bg-orange-50/70 border-orange-300 font-bold text-orange-950'
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {/* Google "G" icon style */}
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

                <div className="truncate">
                  <div className="truncate text-xs">{u.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono truncate">{u.email}</div>
                </div>
              </div>

              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 shrink-0">
                {u.role === 'founder_ceo' ? 'CEO' : u.role === 'founder_partner' ? 'Finance' : 'Client'}
              </span>
            </button>
          ))}
        </div>

        {/* Security Footer Note */}
        <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 text-center leading-relaxed">
          Koneksi dilindungi oleh enkripsi 256-bit TLS dan token OAuth2 berbasis role. Tidak ada kredensial sensitif yang diekspos di client.
        </div>

      </div>
    </div>
  );
};
