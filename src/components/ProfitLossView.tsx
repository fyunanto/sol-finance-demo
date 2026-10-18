import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatRupiah, exportToCsv } from '../utils/formatters';
import {
  TrendingUp,
  FileSpreadsheet,
  Printer,
  Calendar,
  PieChart,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

export const ProfitLossView: React.FC = () => {
  const { transactions, companyInfo, totalCapital, currentCashBalance } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');

  // Filter transactions based on period
  const periodTransactions = transactions.filter(t => {
    if (selectedPeriod === 'all') return true;
    return t.date.startsWith(selectedPeriod);
  });

  // 1. Revenue
  const incomeTransactions = periodTransactions.filter(t => t.type === 'income');
  const totalRevenue = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);

  // Group revenues by category
  const revenueByCategory = incomeTransactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  // 2. Direct Project Costs (COGS: Domain, Hosting, direct assets)
  const cogsCategories = ['Domain & Hosting Klien'];
  const cogsTransactions = periodTransactions.filter(
    t => t.type === 'expense' && cogsCategories.includes(t.category)
  );
  const totalCogs = cogsTransactions.reduce((sum, t) => sum + t.amount, 0);

  // 3. Gross Profit
  const grossProfit = totalRevenue - totalCogs;
  const grossMargin = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0;

  // 4. Operating Expenses (OPEX)
  const opexTransactions = periodTransactions.filter(
    t => t.type === 'expense' && !cogsCategories.includes(t.category)
  );
  const totalOpex = opexTransactions.reduce((sum, t) => sum + t.amount, 0);

  // Group Opex by Category
  const opexByCategory = opexTransactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  // 5. Net Operating Profit
  const netProfit = grossProfit - totalOpex;
  const netMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

  const handleExportCsv = () => {
    const headers = ['Pos Laporan', 'Kategori / Rincian', 'Nominal (IDR)'];
    const rows: (string | number)[][] = [
      ['I. PENDAPATAN OPERASIONAL', '', ''],
      ...Object.entries(revenueByCategory).map(([cat, val]) => ['Pendapatan', cat, val]),
      ['TOTAL PENDAPATAN', '', totalRevenue],
      ['', '', ''],
      ['II. BEBAN POKOK PROYEK (COGS)', '', ''],
      ...cogsTransactions.map(t => ['COGS', `${t.title} (${t.category})`, t.amount]),
      ['TOTAL BEBAN POKOK (COGS)', '', totalCogs],
      ['', '', ''],
      ['LABA KOTOR (GROSS PROFIT)', '', grossProfit],
      ['', '', ''],
      ['III. BEBAN OPERASIONAL (OPEX)', '', ''],
      ...Object.entries(opexByCategory).map(([cat, val]) => ['Beban Operasional', cat, val]),
      ['TOTAL BEBAN OPERASIONAL', '', totalOpex],
      ['', '', ''],
      ['LABA BERSIH OPERASIONAL (NET PROFIT)', '', netProfit],
      ['', '', ''],
      ['INFORMASI ARUS KAS', 'Total Setoran Modal', totalCapital],
      ['INFORMASI ARUS KAS', 'Saldo Kas Bank Saat Ini', currentCashBalance]
    ];

    exportToCsv(`SOL_Agency_Laba_Rugi_${selectedPeriod}`, headers, rows);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[11px] font-bold mb-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Laba Rugi Komprehensif</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Laporan Laba Rugi Real-Time (P&amp;L)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Rekap otomatis pendapatan, beban pokok proyek, dan operasional PT. Solusi Optima Laju.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Period Selector */}
          <select
            value={selectedPeriod}
            onChange={e => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 text-xs font-bold focus:ring-2 focus:ring-orange-500 focus:outline-none"
          >
            <option value="all">Semua Periode (Akumulasi)</option>
            <option value="2026-10">Oktober 2026</option>
            <option value="2026-09">September 2026</option>
          </select>

          <button
            onClick={handleExportCsv}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Ekspor Excel</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-orange-400" />
            <span>Cetak / PDF</span>
          </button>
        </div>
      </div>

      {/* Visual Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 no-print">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Total Pendapatan (Revenue)
          </span>
          <div className="text-2xl font-extrabold text-blue-700 font-mono mt-1">
            {formatRupiah(totalRevenue)}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {incomeTransactions.length} transaksi penerimaan
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Laba Kotor (Gross Profit)
          </span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">
            {formatRupiah(grossProfit)}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Gross Margin: <span className="font-bold text-slate-700">{grossMargin.toFixed(1)}%</span>
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Laba Bersih Operasional (Net)
          </span>
          <div className={`text-2xl font-extrabold font-mono mt-1 ${netProfit >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
            {formatRupiah(netProfit)}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Net Margin: <span className="font-bold text-slate-700">{netMargin.toFixed(1)}%</span>
          </p>
        </div>
      </div>

      {/* Printable Financial Statement Paper */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 max-w-4xl mx-auto">
        
        {/* Statement Header */}
        <div className="text-center pb-6 border-b border-slate-200">
          <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
            PT. SOLUSI OPTIMA LAJU (SOL AGENCY)
          </h3>
          <p className="text-sm font-bold text-orange-600 mt-0.5">
            LAPORAN LABA RUGI OPERASIONAL (PROFIT &amp; LOSS STATEMENT)
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Periode: {selectedPeriod === 'all' ? 'Seluruh Waktu (Sejak Pendirian)' : selectedPeriod === '2026-10' ? 'Oktober 2026' : 'September 2026'} | Mata Uang: Indonesian Rupiah (IDR)
          </p>
        </div>

        {/* Statement Body */}
        <div className="py-6 space-y-6 text-xs text-slate-800">
          
          {/* Section 1: Pendapatan */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-extrabold text-slate-900 pb-1 border-b border-slate-300">
              <span className="uppercase tracking-wider">I. PENDAPATAN OPERASIONAL</span>
              <span>NOMINAL (IDR)</span>
            </div>
            {Object.keys(revenueByCategory).length === 0 ? (
              <div className="py-2 text-slate-400 italic">Belum ada pendapatan pada periode ini</div>
            ) : (
              Object.entries(revenueByCategory).map(([cat, amount]) => (
                <div key={cat} className="flex justify-between py-1 text-slate-700 pl-4">
                  <span>{cat}</span>
                  <span className="font-mono font-medium">{formatRupiah(amount)}</span>
                </div>
              ))
            )}
            <div className="flex justify-between font-bold pt-2 border-t border-slate-200 text-slate-900 bg-slate-50/70 p-2 rounded">
              <span>TOTAL PENDAPATAN USAHA</span>
              <span className="font-mono text-blue-700 font-extrabold">{formatRupiah(totalRevenue)}</span>
            </div>
          </div>

          {/* Section 2: Beban Pokok Proyek (COGS) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-extrabold text-slate-900 pb-1 border-b border-slate-300">
              <span className="uppercase tracking-wider">II. BEBAN POKOK PROYEK KLIEN (COGS)</span>
              <span>NOMINAL (IDR)</span>
            </div>
            {cogsTransactions.length === 0 ? (
              <div className="py-2 text-slate-400 italic">Tidak ada beban langsung proyek pada periode ini</div>
            ) : (
              cogsTransactions.map(t => (
                <div key={t.id} className="flex justify-between py-1 text-slate-700 pl-4">
                  <div>
                    <span>{t.title}</span>
                    <span className="text-[10px] text-slate-400 block">{t.notes || t.category}</span>
                  </div>
                  <span className="font-mono font-medium">{formatRupiah(t.amount)}</span>
                </div>
              ))
            )}
            <div className="flex justify-between font-bold pt-2 border-t border-slate-200 text-slate-900 bg-slate-50/70 p-2 rounded">
              <span>TOTAL BEBAN POKOK PROYEK (COGS)</span>
              <span className="font-mono text-rose-600 font-extrabold">({formatRupiah(totalCogs)})</span>
            </div>
          </div>

          {/* Gross Profit Highlight */}
          <div className="p-3 rounded-xl bg-orange-50 border border-orange-200 flex justify-between items-center text-sm font-extrabold text-orange-950">
            <span>LABA KOTOR (GROSS PROFIT)</span>
            <span className="font-mono text-base">{formatRupiah(grossProfit)}</span>
          </div>

          {/* Section 3: Beban Operasional Usaha (OPEX) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-extrabold text-slate-900 pb-1 border-b border-slate-300">
              <span className="uppercase tracking-wider">III. BEBAN OPERASIONAL USAHA (OPEX)</span>
              <span>NOMINAL (IDR)</span>
            </div>
            {Object.keys(opexByCategory).length === 0 ? (
              <div className="py-2 text-slate-400 italic">Tidak ada beban operasional pada periode ini</div>
            ) : (
              Object.entries(opexByCategory).map(([cat, amount]) => (
                <div key={cat} className="flex justify-between py-1 text-slate-700 pl-4">
                  <span>{cat}</span>
                  <span className="font-mono font-medium">{formatRupiah(amount)}</span>
                </div>
              ))
            )}
            <div className="flex justify-between font-bold pt-2 border-t border-slate-200 text-slate-900 bg-slate-50/70 p-2 rounded">
              <span>TOTAL BEBAN OPERASIONAL (OPEX)</span>
              <span className="font-mono text-rose-600 font-extrabold">({formatRupiah(totalOpex)})</span>
            </div>
          </div>

          {/* Net Profit Highlight */}
          <div className={`p-4 rounded-xl border flex justify-between items-center text-sm font-extrabold ${
            netProfit >= 0
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-rose-50 border-rose-300 text-rose-950'
          }`}>
            <div>
              <span className="text-base uppercase tracking-tight block">
                LABA BERSIH OPERASIONAL (NET OPERATING PROFIT)
              </span>
              <span className="text-xs font-normal opacity-80">
                Laba bersih yang diperoleh dari kegiatan operasional SOL Agency
              </span>
            </div>
            <span className="font-mono text-xl">{formatRupiah(netProfit)}</span>
          </div>

          {/* Cash & Equity Reconciliation */}
          <div className="pt-6 border-t-2 border-slate-300 space-y-2">
            <div className="font-extrabold text-slate-900 uppercase tracking-wider text-xs">
              IV. REKONSILIASI KAS &amp; SETORAN MODAL FOUNDER
            </div>
            <div className="flex justify-between py-1 text-slate-600 pl-4">
              <span>Total Modal Awal Disetor (Ferdi Yunanto &amp; Partner):</span>
              <span className="font-mono font-medium">{formatRupiah(totalCapital)}</span>
            </div>
            <div className="flex justify-between py-1 text-slate-600 pl-4">
              <span>Laba/Rugi Bersih Akumulatif:</span>
              <span className="font-mono font-medium">{formatRupiah(netProfit)}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t border-slate-200 text-slate-900 bg-slate-100 p-2.5 rounded-lg">
              <span>POSISI KAS BANK MANDIRI REAL-TIME</span>
              <span className="font-mono text-emerald-800 text-sm">{formatRupiah(currentCashBalance)}</span>
            </div>
          </div>

        </div>

        {/* Signatures & Certification */}
        <div className="pt-8 border-t border-slate-200 grid grid-cols-2 gap-8 text-center text-xs">
          <div>
            <p className="text-slate-500">Disiapkan Oleh:</p>
            <p className="font-bold text-slate-800 mt-1">Reza Pratama</p>
            <p className="text-[10px] text-slate-400">Co-Founder / Financial Operations</p>
            <div className="h-10"></div>
            <p className="text-[10px] text-slate-500">PT. Solusi Optima Laju</p>
          </div>
          <div>
            <p className="text-slate-500">Disetujui Oleh:</p>
            <p className="font-bold text-slate-800 mt-1">Ferdi Yunanto</p>
            <p className="text-[10px] text-slate-400">Founder &amp; Technical Lead</p>
            <div className="h-10"></div>
            <p className="text-[10px] text-slate-500">PT. Solusi Optima Laju</p>
          </div>
        </div>

      </div>

    </div>
  );
};
