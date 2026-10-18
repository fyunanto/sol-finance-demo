import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QuotationItem } from '../types';
import { formatRupiah, angkaKeTerbilang, numberToWordsEnglish } from '../utils/formatters';
import { FileSpreadsheet, X, Sparkles } from 'lucide-react';

interface NewQuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewQuotationModal: React.FC<NewQuotationModalProps> = ({
  isOpen,
  onClose
}) => {
  const {
    quotations,
    addQuotation,
    currentUser,
    companyInfo,
    setActiveTab,
    setPreviewDoc
  } = useApp();

  const [clientName, setClientName] = useState('');
  const [clientContactPerson, setClientContactPerson] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [projectName, setProjectName] = useState('');
  const [itemTitle, setItemTitle] = useState('Website One-time Development Service Fee');
  const [itemDeliverablesText, setItemDeliverablesText] = useState(
    'Domain & hosting (1 year)\nInfrastructure setup & Rumahweb Cloud coordination\nCustom PHP Development (V1) with Tailwind CSS\nBilingual System (EN/ID) language switcher\nEnquiry & SMTP Integration with visitor segmentation\nBasic SEO & Analytics\nBonus EMS dashboard page with database'
  );
  const [itemPrice, setItemPrice] = useState('3200000');
  const [dpPercent, setDpPercent] = useState<number>(50);

  if (!isOpen) return null;

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

    onClose();
    setActiveTab('quotations');
    setPreviewDoc({ type: 'quotation', id: newId });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-orange-100 text-[#EE5D1F]">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Buat Penawaran Harga (Quotation)
              </h3>
              <p className="text-xs text-slate-500">
                Mengikuti template resmi SOL Agency (PT Solusi Optima Laju)
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

        <form onSubmit={handleCreateQuotation} className="space-y-4 pt-4 text-xs">
          
          {/* Client Name & Person */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Nama Perusahaan Klien *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: PT Nestraya Jaya Global"
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#EE5D1F] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Kontak Person / PIC *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Marilin Herman (Riri)"
                value={clientContactPerson}
                onChange={e => setClientContactPerson(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#EE5D1F] focus:outline-none"
              />
            </div>
          </div>

          {/* Email & Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Email Klien
              </label>
              <input
                type="email"
                placeholder="Contoh: hermanmarilin3@gmail.com"
                value={clientEmail}
                onChange={e => setClientEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-[#EE5D1F] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Lokasi / Alamat Klien
              </label>
              <input
                type="text"
                placeholder="Contoh: The East Building, Kuningan, Jakarta Selatan"
                value={clientAddress}
                onChange={e => setClientAddress(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#EE5D1F] focus:outline-none"
              />
            </div>
          </div>

          {/* Project Name */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Nama Proyek *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Nestraya Jaya Global Corporate Website (V1 - MVP)"
              value={projectName}
              onChange={e => setProjectName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#EE5D1F] focus:outline-none"
            />
          </div>

          {/* Deliverable Title */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Judul Layanan / Item Paket
            </label>
            <input
              type="text"
              required
              value={itemTitle}
              onChange={e => setItemTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#EE5D1F] focus:outline-none"
            />
          </div>

          {/* Deliverable Items (1 item per line) */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Rincian Deliverables (1 poin per baris)
            </label>
            <textarea
              rows={4}
              value={itemDeliverablesText}
              onChange={e => setItemDeliverablesText(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-[11px] focus:ring-2 focus:ring-[#EE5D1F] focus:outline-none"
            />
          </div>

          {/* Price & DP % */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Total Biaya Layanan (IDR) *
              </label>
              <input
                type="number"
                required
                min="1"
                value={itemPrice}
                onChange={e => setItemPrice(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono font-bold focus:ring-2 focus:ring-[#EE5D1F] focus:outline-none"
              />
              {itemPrice && (
                <p className="text-[11px] text-[#EE5D1F] font-bold mt-1 font-mono">
                  {formatRupiah(parseFloat(itemPrice) || 0)}
                </p>
              )}
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Skema Down Payment (DP)
              </label>
              <select
                value={dpPercent}
                onChange={e => setDpPercent(parseInt(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-bold focus:ring-2 focus:ring-[#EE5D1F] focus:outline-none"
              >
                <option value={50}>DP 50% &amp; Pelunasan 50% (Standar SOL)</option>
                <option value={30}>DP 30% &amp; Pelunasan 70%</option>
                <option value={100}>Pembayaran Penuh 100%</option>
              </select>
            </div>
          </div>

          {/* Official Bank Info */}
          <div className="p-3 bg-orange-50/70 rounded-xl border border-orange-200 text-[11px] text-slate-700">
            <span className="font-bold text-[#E53826]">Rekening Pembayaran SOL Agency: </span>
            {companyInfo.bankAccount.bankName} {companyInfo.bankAccount.accountNumber} a.n {companyInfo.bankAccount.accountHolder} • Hubungi: {companyInfo.phone}
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
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#E53826] to-[#EE5D1F] hover:opacity-90 text-white font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Buat &amp; Buka Lembar Penawaran</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
