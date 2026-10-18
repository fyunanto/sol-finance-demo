import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Quotation, QuotationItem, QuotationStatus } from '../types';
import { formatRupiah, formatDateIndo, angkaKeTerbilang, numberToWordsEnglish } from '../utils/formatters';
import {
  FileSpreadsheet,
  PlusCircle,
  Eye,
  ArrowRight,
  Send,
  CheckCircle2,
  Share2,
  Trash2,
  Copy,
  Clock,
  Sparkles,
  ExternalLink,
  MessageCircle,
  Mail
} from 'lucide-react';

interface QuotationViewProps {
  isOpenNewModal: boolean;
  onOpenNewModal: () => void;
  onCloseNewModal: () => void;
}

export const QuotationView: React.FC<QuotationViewProps> = ({
  isOpenNewModal,
  onOpenNewModal,
  onCloseNewModal
}) => {
  const {
    quotations,
    addQuotation,
    updateQuotationStatus,
    convertQuotationToInvoice,
    deleteQuotation,
    setPreviewDoc,
    setActiveTab,
    currentUser,
    companyInfo
  } = useApp();

  const [shareModalQuotation, setShareModalQuotation] = useState<Quotation | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [confirmDeleteQuotId, setConfirmDeleteQuotId] = useState<string | null>(null);

  // Form State for new quotation
  const [clientName, setClientName] = useState('');
  const [clientContactPerson, setClientContactPerson] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [projectName, setProjectName] = useState('');
  const [itemTitle, setItemTitle] = useState('Website One-time Development Service Fee');
  const [itemDeliverablesText, setItemDeliverablesText] = useState(
    'Domain & hosting (1 year)\nInfrastructure setup\nCustom PHP Development (V1)\nBilingual System (EN/ID)\nEnquiry & SMTP Integration\nBasic SEO & Analytics'
  );
  const [itemPrice, setItemPrice] = useState('3200000');
  const [dpPercent, setDpPercent] = useState<number>(50);

  const handleCreateQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(itemPrice.replace(/[^0-9]/g, '')) || 0;
    const deliverablesList = itemDeliverablesText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const items: QuotationItem[] = [
      {
        id: `item-${Date.now()}`,
        itemNumber: 1,
        title: itemTitle.trim(),
        deliverables: deliverablesList,
        unitPrice: priceNum,
        quantity: 1,
        subtotal: priceNum
      }
    ];

    const quotNum = `Q/${String(quotations.length + 1).padStart(3, '0')}/${String(new Date().getMonth() + 1).padStart(2, '0')}/${new Date().getFullYear()}`;
    const enWords = numberToWordsEnglish(priceNum);
    const idWords = angkaKeTerbilang(priceNum);

    const newId = addQuotation({
      quotationNumber: quotNum,
      dateIssued: new Date().toISOString().split('T')[0],
      clientName: clientName.trim(),
      clientContactPerson: clientContactPerson.trim(),
      clientEmail: clientEmail.trim() || undefined,
      clientAddress: clientAddress.trim() || undefined,
      projectName: projectName.trim(),
      items,
      grandTotal: priceNum,
      grandTotalInWords: `${enWords} (${idWords})`,
      downPaymentPercent: dpPercent,
      status: 'sent',
      terms: [
        `Down Payment (DP): ${dpPercent}% upon proposal approval and hosting setup confirmation.`,
        `Final Payment: ${100 - dpPercent}% upon final launch, full migration to client-owned production domain, all administrative credentials and source files will be fully handed over upon completion of this final payment.`,
        `Payments can be made via transfer to: Rek. Bank Mandiri 137 000 505 7753 a.n Ferdi Yunanto`
      ],
      bankAccount: companyInfo.bankAccount,
      preparedBy: `${currentUser.name} / SOL Agency`
    });

    onCloseNewModal();
    // Open preview
    setPreviewDoc({ type: 'quotation', id: newId });
  };

  const handleShare = (q: Quotation) => {
    setShareModalQuotation(q);
  };

  const copyShareLink = (q: Quotation) => {
    const link = `${window.location.origin}?doc=quotation&id=${q.id}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const openWhatsAppShare = (q: Quotation) => {
    const text = `Halo Bapak/Ibu ${q.clientContactPerson || q.clientName}, berikut kami lampirkan dokumen resmi Quotation / Penawaran Harga dari SOL Agency (PT Solusi Optima Laju):\n\nNomor: ${q.quotationNumber}\nProyek: ${q.projectName}\nTotal Investasi: ${formatRupiah(q.grandTotal)}\nTermin: DP ${q.downPaymentPercent}% & Pelunasan ${100 - q.downPaymentPercent}%\n\nSilakan tinjau dan konfirmasi. Terima kasih! Salam, ${companyInfo.founder} - SOL Agency (${companyInfo.website})`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const openEmailShare = (q: Quotation) => {
    const subject = `Quotation ${q.quotationNumber} - ${q.projectName} [SOL Agency]`;
    const body = `Yth. ${q.clientContactPerson || q.clientName},\n\nTerlampir penawaran resmi untuk proyek ${q.projectName} dari SOL Agency (PT Solusi Optima Laju).\n\nNomor Quotation: ${q.quotationNumber}\nTotal Investasi: ${formatRupiah(q.grandTotal)}\n\nRekening Pembayaran:\n${companyInfo.bankAccount.bankName}\nNo. Rekening: ${companyInfo.bankAccount.accountNumber}\na.n ${companyInfo.bankAccount.accountHolder}\n\nEmail Resmi: ${companyInfo.email}\nWebsite: ${companyInfo.website}\n\nSalam hangat,\n${currentUser.name}\nSOL Agency`;
    const mailto = `mailto:${q.clientEmail || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[11px] font-bold mb-1">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Siklus Penawaran Klien</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Manajemen Penawaran (Quotation)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Buat penawaran harga profesional, kirim langsung ke klien, dan konversi 1-klik menjadi invoice resmi saat disetujui.
          </p>
        </div>

        {currentUser.role !== 'client' && (
          <button
            onClick={onOpenNewModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer self-start sm:self-center"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Buat Quotation Baru</span>
          </button>
        )}
      </div>

      {/* Quotation Cards / Table */}
      <div className="grid grid-cols-1 gap-4">
        {quotations.map(q => {
          const isConverted = q.status === 'converted';

          return (
            <div
              key={q.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-orange-200 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              {/* Left Details */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-sm font-extrabold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">
                    {q.quotationNumber}
                  </span>
                  
                  {/* Status Badge */}
                  <span
                    className={`text-[11px] font-extrabold px-3 py-1 rounded-full ${
                      q.status === 'converted'
                        ? 'bg-purple-100 text-purple-800'
                        : q.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : q.status === 'sent'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {q.status === 'converted'
                      ? '✓ DIKONVERSI KE INVOICE'
                      : q.status === 'approved'
                      ? '✓ DISETUJUI KLIEN'
                      : q.status === 'sent'
                      ? 'TERKIRIM KE KLIEN'
                      : 'DRAFT'}
                  </span>

                  <span className="text-xs text-slate-400">
                    Diterbitkan: {formatDateIndo(q.dateIssued)}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {q.projectName}
                  </h3>
                  <div className="text-xs text-slate-600 flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5">
                    <span className="font-semibold text-slate-800">
                      Klien: {q.clientName}
                    </span>
                    {q.clientContactPerson && (
                      <span>({q.clientContactPerson})</span>
                    )}
                    {q.clientEmail && (
                      <span className="text-slate-400 font-mono">
                        {q.clientEmail}
                      </span>
                    )}
                  </div>
                </div>

                {/* Items Summary */}
                <div className="text-xs text-slate-500 pt-1">
                  Deliverable:{' '}
                  {q.items.map(item => item.title).join(', ')}
                </div>
              </div>

              {/* Right Side: Total & Actions */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <div className="text-left lg:text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Total Nilai Investasi
                  </span>
                  <div className="text-xl font-extrabold font-mono text-slate-900">
                    {formatRupiah(q.grandTotal)}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    DP {q.downPaymentPercent}%: {formatRupiah(Math.round(q.grandTotal * (q.downPaymentPercent / 100)))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  
                  {/* View / Print PDF */}
                  <button
                    onClick={() => setPreviewDoc({ type: 'quotation', id: q.id })}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                    title="Lihat Format Dokumen Asli SOL Agency"
                  >
                    <Eye className="w-3.5 h-3.5 text-orange-600" />
                    <span>Lihat / Cetak PDF</span>
                  </button>

                  {/* Share to Client */}
                  <button
                    onClick={() => handleShare(q)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition-colors cursor-pointer"
                    title="Kirim ke Klien via Email / WA"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Kirim ke Klien</span>
                  </button>

                  {/* Convert to Invoice Button (Prompt: "ada status misal dari quotation, akan menjadi invoice") */}
                  {!isConverted && currentUser.role !== 'client' && (
                    <button
                      onClick={() => {
                        const invId = convertQuotationToInvoice(q.id);
                        if (invId) {
                          setActiveTab('invoices');
                        }
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                      title="Konversi Quotation Menjadi Invoice Tagihan Resmi"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Jadikan Invoice</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}

                  {isConverted && (
                    <button
                      onClick={() => setActiveTab('invoices')}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200 hover:bg-purple-100 transition-colors cursor-pointer"
                    >
                      <span>Buka Invoice</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}

                  {/* Client Approval simulator */}
                  {q.status === 'sent' && (
                    <button
                      onClick={() => updateQuotationStatus(q.id, 'approved')}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 text-xs font-medium transition-colors cursor-pointer"
                      title="Tandai Disetujui Klien"
                    >
                      Setujui
                    </button>
                  )}

                  {currentUser.role !== 'client' && (
                    confirmDeleteQuotId !== q.id ? (
                      <button
                        onClick={() => setConfirmDeleteQuotId(q.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Hapus Quotation Ini"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 p-1 bg-rose-50 border border-rose-300 rounded-lg">
                        <span className="text-[10px] font-bold text-rose-700">Hapus?</span>
                        <button
                          onClick={() => {
                            deleteQuotation(q.id);
                            setConfirmDeleteQuotId(null);
                          }}
                          className="px-2 py-0.5 rounded bg-rose-600 text-white font-extrabold text-[10px] hover:bg-rose-700 cursor-pointer"
                        >
                          Ya
                        </button>
                        <button
                          onClick={() => setConfirmDeleteQuotId(null)}
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
          );
        })}
      </div>

      {/* Share / Kirim Langsung Modal */}
      {shareModalQuotation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-orange-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Kirim Quotation ke Klien
                </h3>
              </div>
              <button
                onClick={() => setShareModalQuotation(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
              >
                &times;
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
              <p className="font-bold text-slate-900">{shareModalQuotation.quotationNumber}</p>
              <p className="text-slate-600">{shareModalQuotation.clientName} ({shareModalQuotation.clientContactPerson})</p>
              <p className="font-mono font-bold text-orange-600">{formatRupiah(shareModalQuotation.grandTotal)}</p>
            </div>

            <div className="space-y-2.5 text-xs">
              <button
                onClick={() => openWhatsAppShare(shareModalQuotation)}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-900 font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                  <span>Kirim Pesan WhatsApp Langsung</span>
                </div>
                <ExternalLink className="w-4 h-4 text-emerald-600" />
              </button>

              <button
                onClick={() => openEmailShare(shareModalQuotation)}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-blue-200 bg-blue-50 text-blue-900 font-bold hover:bg-blue-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span>Kirim via Email ({companyInfo.email})</span>
                </div>
                <ExternalLink className="w-4 h-4 text-blue-600" />
              </button>

              <button
                onClick={() => copyShareLink(shareModalQuotation)}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white text-slate-800 font-bold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>{copiedLink ? '✓ Tautan Berhasil Disalin!' : 'Salin Tautan Portal Klien'}</span>
                </div>
                {copiedLink ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : null}
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setPreviewDoc({ type: 'quotation', id: shareModalQuotation.id });
                  setShareModalQuotation(null);
                }}
                className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
              >
                Buka Tampilan Cetak / PDF Lengkap
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
