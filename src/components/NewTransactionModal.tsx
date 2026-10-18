import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TransactionType } from '../types';
import { formatRupiah } from '../utils/formatters';
import { PlusCircle, X, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewTransactionModal: React.FC<NewTransactionModalProps> = ({
  isOpen,
  onClose
}) => {
  const { addTransaction, currentUser, companyInfo, setActiveTab } = useApp();

  const [type, setType] = useState<TransactionType>('expense');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Operasional & Utilitas');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState('Bank Mandiri');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

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

  const activeCategories =
    type === 'income'
      ? incomeCategories
      : type === 'capital'
      ? capitalCategories
      : expenseCategories;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(amount.replace(/[^0-9]/g, ''));
    if (!title.trim() || isNaN(amountNum) || amountNum <= 0) return;

    addTransaction({
      type,
      title: title.trim(),
      amount: amountNum,
      category,
      date,
      status: 'completed',
      paymentMethod,
      recordedBy: currentUser.name,
      notes: notes.trim() || undefined
    });

    setTitle('');
    setAmount('');
    setNotes('');
    onClose();
    // Navigate to transactions tab to show the recorded transaction
    setActiveTab('transactions');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-orange-100 text-[#EE5D1F]">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Catat Transaksi Keuangan Baru
              </h3>
              <p className="text-xs text-slate-500">
                Otomatis memperbarui saldo kas dan laporan laba rugi real-time
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-xs">
          
          {/* Type Switcher */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">
              Jenis Transaksi *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'expense', label: 'Pengeluaran', color: 'border-[#E53826] bg-red-50 text-[#E53826]' },
                { id: 'income', label: 'Pemasukan', color: 'border-blue-500 bg-blue-50 text-blue-800' },
                { id: 'capital', label: 'Setoran Modal', color: 'border-amber-500 bg-amber-50 text-amber-800' }
              ].map(item => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => {
                    setType(item.id as TransactionType);
                    if (item.id === 'income') setCategory('Pendapatan Proyek Klien');
                    else if (item.id === 'capital') setCategory('Setoran Modal Founder');
                    else setCategory('Operasional & Utilitas');
                  }}
                  className={`py-2 px-3 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                    type === item.id
                      ? item.color + ' ring-2 ring-offset-1 font-extrabold'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Deskripsi / Judul Transaksi *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Perpanjangan Domain, Biaya Hosting, Internet Kantor..."
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#EE5D1F] focus:outline-none"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Nominal (IDR) *
            </label>
            <input
              type="number"
              required
              min="1"
              step="1"
              placeholder="Contoh: 1250000"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono font-bold focus:ring-2 focus:ring-[#EE5D1F] focus:outline-none"
            />
            {amount && (
              <p className="text-[11px] text-[#EE5D1F] font-bold mt-1 font-mono">
                {formatRupiah(parseFloat(amount) || 0)}
              </p>
            )}
          </div>

          {/* Category & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Kategori
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#EE5D1F] focus:outline-none"
              >
                {activeCategories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Tanggal Transaksi
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#EE5D1F] focus:outline-none"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Metode Pembayaran
            </label>
            <select
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#EE5D1F] focus:outline-none"
            >
              <option value="Bank Mandiri">Bank Mandiri (137 000 505 7753 - Ferdi Yunanto)</option>
              <option value="Kas Kecil Tunai">Kas Kecil Tunai (Petty Cash)</option>
              <option value="BCA Transfer">BCA Transfer</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Catatan / Referensi (Opsional)
            </label>
            <textarea
              rows={2}
              placeholder="Nomor resi, nama vendor, atau keterangan tambahan..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#EE5D1F] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#E53826] to-[#EE5D1F] hover:opacity-90 text-white font-bold transition-all shadow-md cursor-pointer"
            >
              Simpan Transaksi
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
