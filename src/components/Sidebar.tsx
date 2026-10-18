import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Receipt,
  TrendingUp,
  Sliders,
  FileSpreadsheet,
  FileText,
  Users,
  Shield,
  Clock,
  Printer,
  Layers,
  Lock
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    currentUser,
    invoices,
    quotations,
    budgetAlerts,
    companyInfo,
    dataPresetMode,
    setIsDemoSettingsModalOpen,
    logoutUser
  } = useApp();


  const unpaidInvoicesCount = invoices.filter(i => i.status !== 'paid').length;
  const activeQuotesCount = quotations.filter(q => q.status === 'draft' || q.status === 'sent' || q.status === 'approved').length;
  const overBudgetCount = budgetAlerts.filter(b => b.isOver).length;

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dasbor Eksekutif',
      sublabel: 'Arus Kas & Analitik',
      icon: LayoutDashboard,
      allowedRoles: ['founder_ceo', 'founder_partner', 'client']
    },
    {
      id: 'transactions',
      label: 'Buku Kas & Transaksi',
      sublabel: 'Pemasukan, Beban & Modal',
      icon: Receipt,
      allowedRoles: ['founder_ceo', 'founder_partner']
    },
    {
      id: 'profit_loss',
      label: 'Laporan Laba Rugi',
      sublabel: 'P&L Statement Real-time',
      icon: TrendingUp,
      allowedRoles: ['founder_ceo', 'founder_partner']
    },
    {
      id: 'budgets',
      label: 'Kontrol Anggaran',
      sublabel: 'Limit & Ambang Batas',
      icon: Sliders,
      badge: overBudgetCount > 0 ? `${overBudgetCount} Alert` : undefined,
      badgeColor: 'bg-rose-100 text-rose-700',
      allowedRoles: ['founder_ceo', 'founder_partner']
    },
    {
      id: 'quotations',
      label: 'Penawaran / Quotation',
      sublabel: 'Siklus Penawaran Klien',
      icon: FileSpreadsheet,
      badge: activeQuotesCount > 0 ? activeQuotesCount : undefined,
      badgeColor: 'bg-orange-100 text-orange-700',
      allowedRoles: ['founder_ceo', 'founder_partner', 'client']
    },
    {
      id: 'invoices',
      label: 'Invoice & Penagihan',
      sublabel: 'DP 50% & Pelunasan',
      icon: FileText,
      badge: unpaidInvoicesCount > 0 ? `${unpaidInvoicesCount} Tagihan` : undefined,
      badgeColor: 'bg-blue-100 text-blue-700',
      allowedRoles: ['founder_ceo', 'founder_partner', 'client']
    },
    {
      id: 'team_rbac',
      label: 'Manajemen Tim & RBAC',
      sublabel: '2-Person Agency Roles',
      icon: Users,
      allowedRoles: ['founder_ceo', 'founder_partner']
    }
  ];

  const visibleNavItems = navItems.filter(item =>
    item.allowedRoles.includes(currentUser.role)
  );

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 min-h-[calc(100vh-4rem)] border-r border-slate-800 no-print">
      
      {/* Agency Identification Bar */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Mode Akses Aktif
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`w-2 h-2 rounded-full ${
                currentUser.role === 'founder_ceo' ? 'bg-orange-500' :
                currentUser.role === 'founder_partner' ? 'bg-blue-500' : 'bg-emerald-500'
              }`} />
              <span className="text-xs font-bold text-white truncate max-w-[140px]">
                {currentUser.name}
              </span>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-orange-400 border border-slate-700">
            {currentUser.role === 'founder_ceo' ? 'CEO' : currentUser.role === 'founder_partner' ? 'Partner' : 'Client'}
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="p-3 space-y-1.5 flex-1">
        {visibleNavItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer group ${
                isActive
                  ? 'bg-gradient-to-r from-[#E53826] to-[#EE5D1F] text-white font-bold shadow-md shadow-red-950/40'
                  : 'hover:bg-slate-800/70 text-slate-300 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  className={`w-5 h-5 shrink-0 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#EE5D1F]'
                  }`}
                />
                <div className="truncate">
                  <div className="text-xs font-bold leading-tight">{item.label}</div>
                  <div
                    className={`text-[10px] leading-tight truncate mt-0.5 ${
                      isActive ? 'text-red-100 font-medium' : 'text-slate-500 group-hover:text-slate-400'
                    }`}
                  >
                    {item.sublabel}
                  </div>
                </div>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0 ${
                    item.badgeColor || 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Dual Repo & Demo Mode Trigger Widget */}
      <div className="px-3 pb-3">
        <button
          onClick={() => setIsDemoSettingsModalOpen(true)}
          className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
            dataPresetMode === 'internal'
              ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 text-slate-200'
              : dataPresetMode === 'demo'
              ? 'bg-indigo-950/60 hover:bg-indigo-950 border-indigo-700/60 text-indigo-200'
              : 'bg-emerald-950/60 hover:bg-emerald-950 border-emerald-700/60 text-emerald-200'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Setup 2 Versi & Demo
            </span>
            <Layers className="w-3.5 h-3.5 text-[#EE5D1F]" />
          </div>
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${
              dataPresetMode === 'internal' ? 'bg-[#EE5D1F]' : dataPresetMode === 'demo' ? 'bg-indigo-400' : 'bg-emerald-400'
            }`} />
            <span>
              {dataPresetMode === 'internal' ? 'Mode Internal SOL' : dataPresetMode === 'demo' ? 'Mode Demo Klien' : 'Mode Kosong (Blank)'}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            {dataPresetMode === 'internal'
              ? 'Data riil SOL Agency aktif'
              : dataPresetMode === 'demo'
              ? 'Data contoh aman fiktif'
              : 'Data Rp 0 siap live-demo'}
          </p>
        </button>
      </div>

      {/* Menu Login & Kunci Sesi Internal */}
      <div className="px-3 pb-3">
        <button
          onClick={logoutUser}
          className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-800 hover:border-red-500/40 bg-slate-900/60 hover:bg-red-950/30 text-slate-400 hover:text-red-400 text-xs font-semibold transition-all cursor-pointer group"
          title="Kunci sesi keuangan & buka Portal Login Internal"
        >
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-slate-500 group-hover:text-red-400 transition-colors" />
            <span>Menu Login Internal</span>
          </div>
          <span className="text-[10px] font-bold text-slate-500 group-hover:text-red-400 bg-slate-800 px-1.5 py-0.5 rounded transition-colors">
            Kunci
          </span>
        </button>
      </div>

      {/* Bottom Company & Legal Info */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 text-xs text-slate-400 space-y-2">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-[#EE5D1F] shrink-0" />
          <span className="text-[11px] font-bold text-slate-200 truncate">{companyInfo.legalName}</span>
        </div>
        <p className="text-[10px] text-slate-400 leading-relaxed truncate">
          {companyInfo.bankAccount.bankName} {companyInfo.bankAccount.accountNumber}<br />
          WA/Telp: <span className="text-slate-300 font-bold">{companyInfo.phone}</span><br />
          Email: {companyInfo.email}
        </p>
        <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800/50 flex justify-between">
          <span>{companyInfo.website}</span>
          <span className="text-[#EE5D1F] font-bold">2-Repo Ready</span>
        </div>
      </div>


    </aside>
  );
};
