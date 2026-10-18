import React from 'react';
import { useApp } from '../context/AppContext';
import { formatRupiah, formatRupiahFull } from '../utils/formatters';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  AlertTriangle,
  Receipt,
  FileCheck,
  FileText,
  Clock,
  CheckCircle2,
  ChevronRight,
  PlusCircle,
  Eye,
  Sliders,
  Sparkles
} from 'lucide-react';

interface DashboardViewProps {
  onOpenNewTransaction: () => void;
  onOpenNewQuotation: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onOpenNewTransaction,
  onOpenNewQuotation
}) => {
  const {
    currentCashBalance,
    totalIncome,
    totalExpense,
    totalCapital,
    operationalNetProfit,
    totalReceivables,
    budgetAlerts,
    transactions,
    invoices,
    quotations,
    setActiveTab,
    setPreviewDoc,
    recordInvoicePayment,
    currentUser
  } = useApp();

  const profitMargin = totalIncome > 0 ? (operationalNetProfit / totalIncome) * 100 : 0;
  const overBudgetItems = budgetAlerts.filter(b => b.isOver);
  const warningBudgetItems = budgetAlerts.filter(b => !b.isOver && b.percent >= 75);

  // Group transactions by month for simple analytics visualization
  const monthlyData = [
    {
      month: 'Sep 2026',
      income: transactions
        .filter(t => t.type === 'income' && t.date.startsWith('2026-09'))
        .reduce((sum, t) => sum + t.amount, 0),
      expense: transactions
        .filter(t => t.type === 'expense' && t.date.startsWith('2026-09'))
        .reduce((sum, t) => sum + t.amount, 0)
    },
    {
      month: 'Okt 2026',
      income: transactions
        .filter(t => t.type === 'income' && t.date.startsWith('2026-10'))
        .reduce((sum, t) => sum + t.amount, 0),
      expense: transactions
        .filter(t => t.type === 'expense' && t.date.startsWith('2026-10'))
        .reduce((sum, t) => sum + t.amount, 0)
    }
  ];

  const maxBarValue = Math.max(
    ...monthlyData.map(d => Math.max(d.income, d.expense)),
    5000000
  );

  return (
    <div className="space-y-6">
      
      {/* Welcome & Agency Brief Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden border border-slate-700/50">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <TrendingUp className="w-64 h-64 text-orange-500" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-semibold border border-orange-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>Sistem Manajemen Keuangan SOL Agency (2-Person Startup)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Halo, {currentUser.name} 👋
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Pantau arus kas harian, laba rugi real-time, status quotation ke invoice, dan batasan anggaran operasional dalam satu layar terpadu.
            </p>
          </div>

          {currentUser.role !== 'client' && (
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={onOpenNewTransaction}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E53826] to-[#EE5D1F] hover:opacity-90 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Catat Transaksi</span>
              </button>
              <button
                onClick={onOpenNewQuotation}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#EE5D1F]" />
                <span>+ Quotation Baru</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Over-Budget Notification Banner (Requirement: Peringatan jika anggaran melebihi batas) */}
      {overBudgetItems.length > 0 && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-rose-100 text-rose-600 shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-rose-900">
                Peringatan: Anggaran Melebihi Batas yang Ditentukan!
              </h4>
              <p className="text-xs text-rose-700 mt-0.5">
                {overBudgetItems.map(item => (
                  <span key={item.category} className="inline-block mr-3">
                    • <b>{item.category}</b>: Terpakai {formatRupiah(item.spent)} dari limit {formatRupiah(item.limit)} ({item.percent.toFixed(0)}%)
                  </span>
                ))}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('budgets')}
            className="self-start sm:self-center px-3.5 py-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 text-xs font-bold shrink-0 transition-colors cursor-pointer"
          >
            Sesuaikan Anggaran
          </button>
        </div>
      )}

      {/* 5 Core Financial Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Card 1: Saldo Kas */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Saldo Kas Bank
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl font-extrabold text-slate-900 font-mono">
              {formatRupiah(currentCashBalance)}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Mandiri: 1370005057753</span>
            </div>
          </div>
        </div>

        {/* Card 2: Total Pemasukan */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Pemasukan
            </span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl font-extrabold text-blue-700 font-mono">
              {formatRupiah(totalIncome)}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Dari invoice &amp; proyek klien
            </div>
          </div>
        </div>

        {/* Card 3: Total Pengeluaran */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Beban/Beban
            </span>
            <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl font-extrabold text-rose-600 font-mono">
              {formatRupiah(totalExpense)}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Hosting, tools &amp; operasional
            </div>
          </div>
        </div>

        {/* Card 4: Laba Bersih Usaha (P&L) */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Laba Bersih (P&amp;L)
            </span>
            <div className={`p-2 rounded-lg ${operationalNetProfit >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className={`text-xl font-extrabold font-mono ${operationalNetProfit >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
              {formatRupiah(operationalNetProfit)}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Margin: <span className="font-bold text-slate-700">{profitMargin.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Card 5: Piutang Klien (Unpaid Receivables) */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Piutang Belum Bayar
            </span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl font-extrabold text-amber-600 font-mono">
              {formatRupiah(totalReceivables)}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Menunggu pelunasan
            </div>
          </div>
        </div>

      </div>

      {/* Main Grid: Real-Time Cash Flow Chart + Budget Watch */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Real-Time Cash Flow & Monthly Comparison (2 columns) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Arus Kas Bulanan (Pemasukan vs Pengeluaran)
              </h2>
              <p className="text-xs text-slate-500">
                Visualisasi arus kas masuk dari klien vs pengeluaran operasional agency
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-blue-500" />
                <span className="text-slate-600 font-medium">Pemasukan</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-rose-500" />
                <span className="text-slate-600 font-medium">Pengeluaran</span>
              </div>
            </div>
          </div>

          {/* Interactive Visual Bar Chart */}
          <div className="space-y-6 pt-4">
            {monthlyData.map(data => {
              const incomeWidth = Math.min(100, Math.max(5, (data.income / maxBarValue) * 100));
              const expenseWidth = Math.min(100, Math.max(5, (data.expense / maxBarValue) * 100));
              const net = data.income - data.expense;

              return (
                <div key={data.month} className="space-y-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span className="text-slate-900">{data.month}</span>
                    <span className={`font-mono ${net >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                      Arus Bersih: {formatRupiah(net)}
                    </span>
                  </div>

                  {/* Income bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>Pemasukan</span>
                      <span className="font-semibold text-blue-700 font-mono">{formatRupiah(data.income)}</span>
                    </div>
                    <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${incomeWidth}%` }}
                      />
                    </div>
                  </div>

                  {/* Expense bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>Pengeluaran</span>
                      <span className="font-semibold text-rose-600 font-mono">{formatRupiah(data.expense)}</span>
                    </div>
                    <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-rose-500 rounded-full transition-all duration-500"
                        style={{ width: `${expenseWidth}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Capital Injections Summary */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <span className="p-1 rounded bg-orange-100 text-orange-700 font-bold">Modal</span>
              <span>Total Modal Disetor Founder (2 Orang):</span>
            </div>
            <span className="font-mono font-bold text-slate-900">
              {formatRupiah(totalCapital)}
            </span>
          </div>
        </div>

        {/* Budget Status Widget (1 column) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Batas Anggaran</h3>
                <p className="text-xs text-slate-500">Status kuota pengeluaran bulan ini</p>
              </div>
              <button
                onClick={() => setActiveTab('budgets')}
                className="text-xs text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Kelola</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4 mt-4">
              {budgetAlerts.map(b => (
                <div key={b.category} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-800 truncate max-w-[130px]">
                      {b.category}
                    </span>
                    <span className={`font-mono font-bold ${b.isOver ? 'text-rose-600' : b.percent >= 75 ? 'text-amber-600' : 'text-slate-600'}`}>
                      {b.percent.toFixed(0)}%
                    </span>
                  </div>

                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        b.isOver ? 'bg-rose-600' : b.percent >= 75 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, b.percent)}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>{formatRupiah(b.spent)}</span>
                    <span>Max {formatRupiah(b.limit)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-500">
              Notifikasi otomatis dikirim jika biaya &gt; 80% kuota
            </span>
          </div>
        </div>

      </div>

      {/* Invoice & Quotation Pipeline / Billing Lifecycle */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Siklus Transaksi: Penawaran (Quotation) &rarr; Invoice &rarr; Pelunasan
            </h3>
            <p className="text-xs text-slate-500">
              Pantau status penawaran dan invoice aktif yang membutuhkan tindakan
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('quotations')}
              className="text-xs font-semibold text-orange-600 hover:text-orange-700 cursor-pointer"
            >
              Semua Quotation ({quotations.length})
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => setActiveTab('invoices')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              Semua Invoice ({invoices.length})
            </button>
          </div>
        </div>

        {/* Invoice List Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                <th className="py-2.5 px-3">No. Invoice</th>
                <th className="py-2.5 px-3">Klien &amp; Proyek</th>
                <th className="py-2.5 px-3">Total Nilai</th>
                <th className="py-2.5 px-3">DP 50%</th>
                <th className="py-2.5 px-3">Pelunasan 50%</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Aksi Cepat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map(inv => (
                <tr key={inv.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">
                    {inv.invoiceNumber}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900">{inv.clientName}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">{inv.projectName}</div>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">
                    {formatRupiah(inv.grandTotal)}
                  </td>
                  <td className="py-3 px-3 font-mono">
                    {inv.dpStatus === 'paid' ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Lunas ({formatRupiah(inv.dpAmount)})</span>
                      </span>
                    ) : (
                      <span className="text-amber-600 font-semibold">
                        Belum ({formatRupiah(inv.dpAmount)})
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 font-mono">
                    {inv.finalPaymentStatus === 'paid' ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Lunas ({formatRupiah(inv.finalPaymentAmount)})</span>
                      </span>
                    ) : (
                      <span className="text-rose-600 font-semibold">
                        Tertunda ({formatRupiah(inv.finalPaymentAmount)})
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        inv.status === 'paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : inv.status === 'dp_paid'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {inv.status === 'paid'
                        ? 'LUNAS (100%)'
                        : inv.status === 'dp_paid'
                        ? 'DP DIBAYAR (50%)'
                        : 'BELUM BAYAR'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setPreviewDoc({ type: 'invoice', id: inv.id })}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Lihat & Cetak Dokumen PDF"
                      >
                        <Eye className="w-4 h-4 text-orange-600" />
                      </button>

                      {/* Action to pay remaining 50% */}
                      {inv.finalPaymentStatus === 'unpaid' && currentUser.role !== 'client' && (
                        <button
                          onClick={() => recordInvoicePayment(inv.id, 'final')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-colors cursor-pointer"
                          title="Catat Pelunasan 50% ke Kas"
                        >
                          Pelunasan 50%
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
