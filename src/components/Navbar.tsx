import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SolLogo } from './SolLogo';
import { formatRupiah } from '../utils/formatters';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  ChevronDown,
  UserCheck,
  LogOut,
  Sparkles,
  Wallet,
  PlusCircle,
  ExternalLink,
  Layers,
  Lock
} from 'lucide-react';

interface NavbarProps {
  onOpenNewTransaction: () => void;
  onOpenNewQuotation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenNewTransaction,
  onOpenNewQuotation
}) => {
  const {
    companyInfo,
    currentUser,
    users,
    switchUserRole,
    notifications,
    markNotificationRead,
    clearAllNotifications,
    currentCashBalance,
    setIsAuthModalOpen,
    setActiveTab,
    budgetAlerts,
    openEditUserModal,
    dataPresetMode,
    setIsDemoSettingsModalOpen,
    logoutUser,
    lockSession
  } = useApp();


  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;
  const hasBudgetAlert = budgetAlerts.some(b => b.isOver);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setActiveTab('dashboard')}
            >
              <SolLogo size="md" />
              <div className="hidden sm:block">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 tracking-tight text-lg">
                    {companyInfo.name}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    dataPresetMode === 'internal'
                      ? 'bg-red-50 text-[#E53826] border-red-200'
                      : dataPresetMode === 'demo'
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    {dataPresetMode === 'internal' ? 'Finance OS' : dataPresetMode === 'demo' ? 'Demo Showcase' : 'Clean Slate (Rp 0)'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  {companyInfo.legalName} • {companyInfo.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Center: Live Cash & Quick Metrics */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Wallet className="w-3.5 h-3.5 text-emerald-700" />
              <span className="text-xs font-semibold text-emerald-700">Kas Aktif:</span>
              <span className="text-xs font-extrabold text-emerald-900 font-mono">
                {formatRupiah(currentCashBalance)}
              </span>
            </div>

            {hasBudgetAlert && (
              <div
                onClick={() => setActiveTab('budgets')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold cursor-pointer hover:bg-rose-100 transition-colors animate-pulse"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>Anggaran Melebihi Batas!</span>
              </div>
            )}
          </div>

          {/* Right Navigation & User Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Dual Repo & Demo Mode Switcher Button */}
            <button
              onClick={() => setIsDemoSettingsModalOpen(true)}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                dataPresetMode === 'internal'
                  ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-300'
                  : dataPresetMode === 'demo'
                  ? 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-300'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-300'
              }`}
              title="Atur Versi Demo Calon Pembeli & Panduan 2 Repository GitHub"
            >
              <Layers className="w-3.5 h-3.5 text-[#E53826]" />
              <span className="hidden sm:inline">
                {dataPresetMode === 'internal' ? 'Mode: Internal' : dataPresetMode === 'demo' ? 'Mode: Demo Showcase' : 'Mode: Blank (Rp 0)'}
              </span>
              <span className="sm:hidden">
                {dataPresetMode === 'internal' ? 'Internal' : dataPresetMode === 'demo' ? 'Demo' : 'Blank'}
              </span>
            </button>

            {/* Quick Action Buttons (Only for Agency Team) */}
            {currentUser.role !== 'client' && (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={onOpenNewTransaction}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-xs cursor-pointer"
                  title="Catat Pemasukan, Pengeluaran, atau Modal Baru"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-[#EE5D1F]" />
                  <span className="hidden xs:inline">Catat Transaksi</span>
                  <span className="xs:hidden">Transaksi</span>
                </button>
                <button
                  onClick={onOpenNewQuotation}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-[#E53826] to-[#EE5D1F] text-white hover:opacity-90 transition-all shadow-xs cursor-pointer"
                  title="Buat Lembar Penawaran Harga Baru"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Buat Penawaran</span>
                  <span className="xs:hidden">Quotation</span>
                </button>
              </div>
            )}


            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Pemberitahuan"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">Notifikasi &amp; Pembaruan</span>
                      {unreadCount > 0 && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-700">
                          {unreadCount} Baru
                        </span>
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <button
                        onClick={clearAllNotifications}
                        className="text-xs text-slate-500 hover:text-slate-800 font-medium"
                      >
                        Bersihkan
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="py-8 text-center text-slate-400 text-xs">
                        Belum ada notifikasi baru
                      </div>
                    ) : (
                      notifications.map(notif => (
                        <div
                          key={notif.id}
                          onClick={() => {
                            markNotificationRead(notif.id);
                            if (notif.linkTab) setActiveTab(notif.linkTab);
                            setShowNotifications(false);
                          }}
                          className={`p-3 transition-colors hover:bg-slate-50 cursor-pointer flex gap-3 ${
                            !notif.read ? 'bg-orange-50/50' : ''
                          }`}
                        >
                          <div className="shrink-0 mt-0.5">
                            {notif.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                            {notif.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                            {notif.type === 'alert' && <AlertTriangle className="w-4 h-4 text-rose-600" />}
                            {notif.type === 'info' && <Info className="w-4 h-4 text-blue-500" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-slate-900">{notif.title}</p>
                            <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">{notif.message}</p>
                            <span className="text-[10px] text-slate-400 mt-1 block">
                              {new Date(notif.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile & Role Switcher */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => openEditUserModal(currentUser)}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold border border-orange-200 transition-colors cursor-pointer"
                title="Langsung ubah nama, email, role, atau profil pengguna"
              >
                <UserCheck className="w-3.5 h-3.5 text-orange-600" />
                <span>Ubah Pengguna</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
                  title="Klik untuk memilih akun lain"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-orange-500/20"
                  />
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-bold text-slate-900 leading-tight">
                      {currentUser.name}
                    </p>
                    <p className="text-[10px] font-semibold text-slate-500">
                      {currentUser.role === 'founder_ceo'
                        ? 'Co-Founder & CEO'
                        : currentUser.role === 'founder_partner'
                        ? 'Co-Founder & Finance'
                        : 'Client (Viewer)'}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-semibold">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Google OAuth2 SSO Active</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{currentUser.email}</p>
                  </div>

                  {/* Role Switcher Section for Instant Testing */}
                  <div className="px-3 py-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1">
                      Ganti Akun / Role RBAC:
                    </p>
                    {users.map(u => (
                      <button
                        key={u.id}
                        onClick={() => {
                          switchUserRole(u.id);
                          setShowUserMenu(false);
                        }}
                        className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                          u.id === currentUser.id
                            ? 'bg-orange-50 font-bold text-orange-700'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <img src={u.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                          <div>
                            <div>{u.name}</div>
                            <div className="text-[10px] text-slate-400">{u.title}</div>
                          </div>
                        </div>
                        {u.id === currentUser.id && <UserCheck className="w-4 h-4 text-orange-600" />}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-slate-100 px-2 pt-2">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        setIsDemoSettingsModalOpen(true);
                      }}
                      className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 flex items-center gap-2 mb-1 cursor-pointer"
                    >
                      <Layers className="w-4 h-4 text-indigo-600" />
                      <span>Atur 2 Versi &amp; Demo Calon Pembeli</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        openEditUserModal(currentUser);
                      }}
                      className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-bold text-orange-700 bg-orange-50 hover:bg-orange-100 flex items-center gap-2 mb-1 cursor-pointer"
                    >
                      <UserCheck className="w-4 h-4 text-orange-600" />
                      <span>Edit Profil / Kelola Pengguna</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        setIsAuthModalOpen(true);
                      }}
                      className="w-full text-left px-2 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-100 flex items-center gap-2 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-slate-400" />
                      <span>Detail Autentikasi OAuth2</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        setActiveTab('team_rbac');
                      }}
                      className="w-full text-left px-2 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-100 flex items-center gap-2 cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4 text-slate-400" />
                      <span>Hak Akses Tim (2-Person RBAC)</span>
                    </button>
                  </div>

                  {/* Menu Login & Kunci Sesi Internal */}
                  <div className="border-t border-slate-100 p-2 bg-slate-50/60 rounded-b-xl">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        logoutUser();
                      }}
                      className="w-full text-left px-2.5 py-2 rounded-lg text-xs font-bold text-red-600 bg-white hover:bg-red-50 border border-red-200/80 flex items-center justify-between transition-colors shadow-xs cursor-pointer"
                      title="Kunci sesi keuangan dan kembali ke Menu Login Internal"
                    >
                      <div className="flex items-center gap-2">
                        <LogOut className="w-4 h-4 text-red-600" />
                        <span>Menu Login / Kunci Sesi</span>
                      </div>
                      <span className="text-[10px] text-red-500 font-bold bg-red-100 px-1.5 py-0.5 rounded">
                        Logout
                      </span>
                    </button>
                  </div>
                </div>
              )}

              </div>

              {/* Quick Lock / Logout Icon Button */}
              <button
                onClick={logoutUser}
                className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200 transition-colors cursor-pointer"
                title="Kunci Sesi & Kembali ke Menu Login"
              >
                <Lock className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
