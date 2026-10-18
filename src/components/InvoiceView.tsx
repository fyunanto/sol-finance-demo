import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Invoice } from '../types';
import { formatRupiah, formatDateIndo, exportToCsv } from '../utils/formatters';
import {
  FileText,
  Eye,
  CheckCircle2,
  Clock,
  Share2,
  FileSpreadsheet,
  AlertCircle,
  MessageCircle,
  Mail,
  Copy,
  ExternalLink,
  DollarSign,
  Trash2
} from 'lucide-react';

export const InvoiceView: React.FC = () => {
  const {
    invoices,
    recordInvoicePayment,
    deleteInvoice,
    setPreviewDoc,
    companyInfo,
    currentUser
  } = useApp();

  const [shareInvoice, setShareInvoice] = useState<Invoice | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [confirmDeleteInvId, setConfirmDeleteInvId] = useState<string | null>(null);

  const handleExportCsv = () => {
    const headers = [
      'Nomor Invoice',
      'Klien',
      'Nama Proyek',
      'Tanggal Diterbitkan',
      'Jatuh Tempo',
      'Total Nilai (IDR)',
      'Nominal DP (IDR)',
      'Status DP',
      'Nominal Pelunasan (IDR)',
      'Status Pelunasan',
      'Status Akhir'
    ];

    const rows = invoices.map(i => [
      i.invoiceNumber,
      i.clientName,
      i.projectName,
      i.dateIssued,
      i.dueDate,
      i.grandTotal,
      i.dpAmount,
      i.dpStatus === 'paid' ? 'LUNAS' : 'BELUM',
      i.finalPaymentAmount,
      i.finalPaymentStatus === 'paid' ? 'LUNAS' : 'BELUM',
      i.status.toUpperCase()
    ]);

    exportToCsv(`SOL_Agency_Daftar_Invoice_${new Date().toISOString().split('T')[0]}`, headers, rows);
  };

  const openWhatsAppReminder = (inv: Invoice) => {
    const isDPPaid = inv.dpStatus === 'paid';
    const amountDue = !isDPPaid ? inv.dpAmount : inv.finalPaymentAmount;
    const stage = !isDPPaid ? 'Down Payment (DP) 50%' : 'Pelunasan Akhir (50%)';

    const text = `Halo Bapak/Ibu ${inv.clientContactPerson || inv.clientName},\n\nSalam dari SOL Agency (PT Solusi Optima Laju).\nBerikut adalah rincian tagihan resmi untuk proyek "${inv.projectName}":\n\nNomor Invoice: ${inv.invoiceNumber}\nTagihan Berjalan: ${stage}\nNominal: ${formatRupiah(amountDue)}\nJatuh Tempo: ${formatDateIndo(inv.dueDate)}\n\nPembayaran dapat ditransfer ke:\n${companyInfo.bankAccount.bankName}\nNo. Rekening: ${companyInfo.bankAccount.accountNumber}\na.n ${companyInfo.bankAccount.accountHolder}\n\nTerima kasih atas kerja samanya!\nSalam, ${companyInfo.founder} - SOL Agency (${companyInfo.website})`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const openEmailReminder = (inv: Invoice) => {
    const isDPPaid = inv.dpStatus === 'paid';
    const amountDue = !isDPPaid ? inv.dpAmount : inv.finalPaymentAmount;
    const stage = !isDPPaid ? 'Down Payment 50%' : 'Pelunasan Akhir 50%';

    const subject = `Invoice ${inv.invoiceNumber} - ${stage} [${inv.projectName}] - SOL Agency`;
    const body = `Yth. ${inv.clientContactPerson || inv.clientName},\n\nBerikut kami sampaikan lembar tagihan resmi untuk proyek "${inv.projectName}".\n\nNomor Invoice: ${inv.invoiceNumber}\nTahap: ${stage}\nJumlah Tagihan: ${formatRupiah(amountDue)}\n\nPembayaran ditransfer melalui:\n${companyInfo.bankAccount.bankName}\nNomor: ${companyInfo.bankAccount.accountNumber}\na.n ${companyInfo.bankAccount.accountHolder}\n\nSalam hormat,\n${currentUser.name}\nSOL Agency (PT Solusi Optima Laju)\nEmail: ${companyInfo.email}`;

    window.location.href = `mailto:${inv.clientEmail || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span>Manajemen Tagihan &amp; Piutang</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Invoice &amp; Penagihan Klien
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Lacak pembayaran termin Down Payment (DP 50%) dan Pelunasan. Setiap pelunasan otomatis dicatat ke arus kas dan laporan laba rugi.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors cursor-pointer self-start sm:self-center"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
          <span>Ekspor Invoice (Excel)</span>
        </button>
      </div>

      {/* Invoice Cards */}
      <div className="grid grid-cols-1 gap-5">
        {invoices.map(inv => {
          const isFullyPaid = inv.status === 'paid';
          const isDPPaid = inv.dpStatus === 'paid';

          return (
            <div
              key={inv.id}
              className={`p-6 rounded-2xl bg-white border transition-all shadow-xs ${
                isFullyPaid
                  ? 'border-emerald-200'
                  : isDPPaid
                  ? 'border-blue-200'
                  : 'border-amber-200'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                {/* Details */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-sm font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                      {inv.invoiceNumber}
                    </span>

                    <span
                      className={`text-[11px] font-extrabold px-3 py-1 rounded-full ${
                        isFullyPaid
                          ? 'bg-emerald-100 text-emerald-800'
                          : isDPPaid
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {isFullyPaid
                        ? '✓ LUNAS SELESAI (100%)'
                        : isDPPaid
                        ? 'DP 50% TERBAYAR (MENUNGGU PELUNASAN)'
                        : 'BELUM DIBAYAR'}
                    </span>

                    <span className="text-xs text-slate-400">
                      Diterbitkan: {formatDateIndo(inv.dateIssued)} | Jatuh Tempo: {formatDateIndo(inv.dueDate)}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">
                      {inv.projectName}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium">
                      Ditujukan Kepada: <span className="font-bold text-slate-900">{inv.clientName}</span> ({inv.clientContactPerson})
                    </p>
                  </div>

                  {/* Payment Milestone Statuses */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    
                    {/* DP Box */}
                    <div className={`p-3 rounded-xl border ${isDPPaid ? 'bg-emerald-50/70 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-700">Termin 1: Down Payment (50%)</span>
                        {isDPPaid ? (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Lunas</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                            Belum Bayar
                          </span>
                        )}
                      </div>
                      <div className="text-base font-extrabold font-mono text-slate-900 mt-1">
                        {formatRupiah(inv.dpAmount)}
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        {inv.dpPaidDate ? `Dibayar pada ${formatDateIndo(inv.dpPaidDate)}` : 'Dibayar saat kick-off proyek'}
                      </p>
                    </div>

                    {/* Final Payment Box */}
                    <div className={`p-3 rounded-xl border ${inv.finalPaymentStatus === 'paid' ? 'bg-emerald-50/70 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-700">Termin 2: Pelunasan Akhir (50%)</span>
                        {inv.finalPaymentStatus === 'paid' ? (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Lunas</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                            Tertunda
                          </span>
                        )}
                      </div>
                      <div className="text-base font-extrabold font-mono text-slate-900 mt-1">
                        {formatRupiah(inv.finalPaymentAmount)}
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        {inv.finalPaymentDate ? `Dibayar pada ${formatDateIndo(inv.finalPaymentDate)}` : 'Dibayar saat serah terima V1 live domain'}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex flex-col items-start lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <div className="text-left lg:text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      Total Nilai Kontrak
                    </span>
                    <div className="text-2xl font-extrabold font-mono text-slate-900">
                      {formatRupiah(inv.grandTotal)}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    
                    {/* View / Print PDF */}
                    <button
                      onClick={() => setPreviewDoc({ type: 'invoice', id: inv.id })}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-orange-400" />
                      <span>Lihat &amp; Cetak PDF</span>
                    </button>

                    {/* Share / Tagih Klien */}
                    <button
                      onClick={() => setShareInvoice(inv)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition-colors cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Kirim Tagihan</span>
                    </button>

                    {/* Record DP action if not yet paid */}
                    {!isDPPaid && currentUser.role !== 'client' && (
                      <button
                        onClick={() => recordInvoicePayment(inv.id, 'dp')}
                        className="px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                        title="Catat penerimaan uang DP 50% ke Kas Mandiri"
                      >
                        ✓ Catat DP 50%
                      </button>
                    )}

                    {/* Record Final Payment action */}
                    {isDPPaid && !isFullyPaid && currentUser.role !== 'client' && (
                      <button
                        onClick={() => recordInvoicePayment(inv.id, 'final')}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                        title="Catat pelunasan akhir 50% ke Kas Mandiri"
                      >
                        ✓ Catat Pelunasan 50%
                      </button>
                    )}

                    {/* Delete Invoice */}
                    {currentUser.role !== 'client' && (
                      confirmDeleteInvId !== inv.id ? (
                        <button
                          onClick={() => setConfirmDeleteInvId(inv.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Hapus Invoice Ini"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 p-1 bg-rose-50 border border-rose-300 rounded-lg">
                          <span className="text-[10px] font-bold text-rose-700">Hapus?</span>
                          <button
                            onClick={() => {
                              deleteInvoice(inv.id);
                              setConfirmDeleteInvId(null);
                            }}
                            className="px-2 py-0.5 rounded bg-rose-600 text-white font-extrabold text-[10px] hover:bg-rose-700 cursor-pointer"
                          >
                            Ya
                          </button>
                          <button
                            onClick={() => setConfirmDeleteInvId(null)}
                            className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold text-[10px] hover:bg-slate-300 cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                      )
                    )}

                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Share / Reminder Modal */}
      {shareInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Kirim Tagihan Invoice
                </h3>
              </div>
              <button
                onClick={() => setShareInvoice(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
              >
                &times;
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
              <p className="font-bold text-slate-900">{shareInvoice.invoiceNumber}</p>
              <p className="text-slate-600">{shareInvoice.clientName} ({shareInvoice.clientContactPerson})</p>
              <p className="font-mono font-bold text-blue-600">Total: {formatRupiah(shareInvoice.grandTotal)}</p>
            </div>

            <div className="space-y-2.5 text-xs">
              <button
                onClick={() => openWhatsAppReminder(shareInvoice)}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-900 font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                  <span>Kirim Tagihan via WhatsApp</span>
                </div>
                <ExternalLink className="w-4 h-4 text-emerald-600" />
              </button>

              <button
                onClick={() => openEmailReminder(shareInvoice)}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-blue-200 bg-blue-50 text-blue-900 font-bold hover:bg-blue-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span>Kirim via Email Resmi ({companyInfo.email})</span>
                </div>
                <ExternalLink className="w-4 h-4 text-blue-600" />
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setPreviewDoc({ type: 'invoice', id: shareInvoice.id });
                  setShareInvoice(null);
                }}
                className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
              >
                Buka Tampilan Lembar Invoice Cetak (PDF)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
