import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { formatRupiah, formatDateIndo, exportToCsv } from '../utils/formatters';
import { TransactionType } from '../types';
import {
  PlusCircle,
  FileSpreadsheet,
  Search,
  Filter,
  Trash2,
  Calendar,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface TransactionsViewProps {
  isOpenModal: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
}

export const TransactionsView: React.FC<TransactionsViewProps> = ({
  isOpenModal,
  onOpenModal,
  onCloseModal
}) => {
  const {
    transactions,
    addTransaction,
    deleteTransaction,
    currentUser,
    companyInfo
  } = useApp();

  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [confirmDeleteTxId, setConfirmDeleteTxId] = useState<string | null>(null);

  // Form State for new transaction
  const [newType, setNewType] = useState<TransactionType>('expense');
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('Operasional & Utilitas');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newPaymentMethod, setNewPaymentMethod] = useState('Bank Mandiri');
  const [newNotes, setNewNotes] = useState('');

  // Categories list
  const expenseCategories = [
    'Domain & Hosting Klien',
    'Software Tools & Subscriptions',
    'Operasional & Utilitas',
    'Legal & Legalitas PT',
    'Pemasaran & Ads',
    'Peralatan & Hardware',
    'Lain-lain'
  ];

  const incomeCategories = [
    'Pendapatan Proyek Klien',
    'Retainer Bulanan',
    'Konsultasi Teknis & Setup',
    'Pendapatan Lainnya'
  ];

  const capitalCategories = [
    'Setoran Modal Founder',
    'Suntikan Dana Tambahan'
  ];

  // Available categories based on selected type in modal
  const activeModalCategories =
    newType === 'income'
      ? incomeCategories
      : newType === 'capital'
      ? capitalCategories
      : expenseCategories;

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      if (filterType !== 'all' && t.type !== filterType) return false;
      if (filterCategory !== 'all' && t.category !== filterCategory) return false;
      if (selectedMonth !== 'all' && !t.date.startsWith(selectedMonth)) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = t.title.toLowerCase().includes(query);
        const matchCat = t.category.toLowerCase().includes(query);
        const matchNotes = (t.notes || '').toLowerCase().includes(query);
        if (!matchTitle && !matchCat && !matchNotes) return false;
      }
      return true;
    });
  }, [transactions, filterType, filterCategory, selectedMonth, searchQuery]);

  // Export to Excel / CSV
  const handleExportCsv = () => {
    const headers = [
      'ID Transaksi',
      'Tanggal',
      'Tipe',
      'Kategori',
      'Deskripsi / Judul',
      'Nominal (IDR)',
      'Metode Pembayaran',
      'Dicatat Oleh',
      'Status',
      'Catatan'
    ];

    const rows = filteredTransactions.map(t => [
      t.id,
      t.date,
      t.type === 'income' ? 'Pemasukan' : t.type === 'expense' ? 'Pengeluaran' : 'Modal',
      t.category,
      t.title,
      t.amount,
      t.paymentMethod,
      t.recordedBy,
      t.status,
      t.notes || ''
    ]);

    const dateStr = new Date().toISOString().split('T')[0];
    exportToCsv(`SOL_Agency_Buku_Kas_${dateStr}`, headers, rows);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(newAmount.replace(/[^0-9]/g, ''));
    if (!newTitle.trim() || isNaN(amountNum) || amountNum <= 0) return;

    addTransaction({
      type: newType,
      title: newTitle.trim(),
      amount: amountNum,
      category: newCategory,
      date: newDate,
      status: 'completed',
      paymentMethod: newPaymentMethod,
      recordedBy: currentUser.name,
      notes: newNotes.trim() || undefined
    });

    // Reset and close
    setNewTitle('');
    setNewAmount('');
    setNewNotes('');
    onCloseModal();
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Buku Kas &amp; Catatan Transaksi
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Mencatat seluruh arus kas masuk, pengeluaran operasional, dan suntikan modal founder secara real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors cursor-pointer"
            title="Download file CSV untuk Microsoft Excel"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Ekspor ke Excel (CSV)</span>
          </button>

          {currentUser.role !== 'client' && (
            <button
              onClick={onOpenModal}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Tambah Transaksi</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Type Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
          {[
            { id: 'all', label: 'Semua' },
            { id: 'income', label: 'Pemasukan' },
            { id: 'expense', label: 'Pengeluaran' },
            { id: 'capital', label: 'Modal' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
                filterType === tab.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Month dropdown */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Month selector */}
          <select
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
          >
            <option value="all">Semua Periode</option>
            <option value="2026-10">Oktober 2026</option>
            <option value="2026-09">September 2026</option>
          </select>

          {/* Search box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari transaksi..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none w-48 sm:w-60"
            />
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-4">Tipe &amp; Kategori</th>
                <th className="py-3 px-4">Deskripsi / Judul</th>
                <th className="py-3 px-4">Metode Bayar</th>
                <th className="py-3 px-4">Dicatat Oleh</th>
                <th className="py-3 px-4 text-right">Nominal</th>
                {currentUser.role !== 'client' && (
                  <th className="py-3 px-4 text-center">Aksi</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    Tidak ada transaksi yang cocok dengan filter
                  </td>
                </tr>
              ) : (
                filteredTransactions.map(t => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono text-slate-600 whitespace-nowrap">
                      {formatDateIndo(t.date)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`inline-flex items-center justify-center p-1 rounded-full ${
                            t.type === 'income'
                              ? 'bg-blue-100 text-blue-700'
                              : t.type === 'expense'
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {t.type === 'income' ? (
                            <ArrowUpRight className="w-3 h-3" />
                          ) : t.type === 'expense' ? (
                            <ArrowDownRight className="w-3 h-3" />
                          ) : (
                            <Wallet className="w-3 h-3" />
                          )}
                        </span>
                        <span className="font-semibold text-slate-900">{t.category}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{t.title}</div>
                      {t.notes && (
                        <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                          {t.notes}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-medium">
                      {t.paymentMethod}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {t.recordedBy}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold whitespace-nowrap">
                      <span
                        className={
                          t.type === 'income'
                            ? 'text-blue-700'
                            : t.type === 'expense'
                            ? 'text-rose-600'
                            : 'text-amber-700'
                        }
                      >
                        {t.type === 'income' ? '+ ' : t.type === 'expense' ? '- ' : '+ '}
                        {formatRupiah(t.amount)}
                      </span>
                    </td>
                    {currentUser.role !== 'client' && (
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        {confirmDeleteTxId !== t.id ? (
                          <button
                            onClick={() => setConfirmDeleteTxId(t.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Hapus Transaksi Ini"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 p-1 bg-rose-50 border border-rose-300 rounded-lg">
                            <span className="text-[10px] font-bold text-rose-700">Hapus?</span>
                            <button
                              onClick={() => {
                                deleteTransaction(t.id);
                                setConfirmDeleteTxId(null);
                              }}
                              className="px-2 py-0.5 rounded bg-rose-600 text-white font-extrabold text-[10px] hover:bg-rose-700 cursor-pointer"
                            >
                              Ya
                            </button>
                            <button
                              onClick={() => setConfirmDeleteTxId(null)}
                              className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold text-[10px] hover:bg-slate-300 cursor-pointer"
                            >
                              ✕
                            </button>
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
