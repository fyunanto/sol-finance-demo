import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SolLogo } from './SolLogo';
import { formatRupiah, formatRupiahFull } from '../utils/formatters';
import { Printer, Download, X, Mail, Phone, Globe, CheckCircle2, FileText, Sparkles } from 'lucide-react';

export const DocumentPrintModal: React.FC = () => {
  const { previewDoc, setPreviewDoc, quotations, invoices, companyInfo } = useApp();
  const [docViewMode, setDocViewMode] = useState<'sheet' | 'proposal'>('sheet');

  if (!previewDoc) return null;

  const isQuotation = previewDoc.type === 'quotation';
  const quotation = isQuotation ? quotations.find(q => q.id === previewDoc.id) : null;
  const invoice = !isQuotation ? invoices.find(i => i.id === previewDoc.id) : null;

  if (!quotation && !invoice) return null;

  const docNumber = isQuotation ? quotation!.quotationNumber : invoice!.invoiceNumber;
  const dateIssued = isQuotation ? quotation!.dateIssued : invoice!.dateIssued;
  const clientName = isQuotation ? quotation!.clientName : invoice!.clientName;
  const clientContact = isQuotation ? quotation!.clientContactPerson : invoice!.clientContactPerson;
  const clientAddress = isQuotation ? quotation!.clientAddress : invoice!.clientAddress;
  const projectName = isQuotation ? quotation!.projectName : invoice!.projectName;
  const items = isQuotation ? quotation!.items : invoice!.items;
  const grandTotal = isQuotation ? quotation!.grandTotal : invoice!.grandTotal;
  const grandTotalInWords = isQuotation ? quotation!.grandTotalInWords : invoice!.grandTotalInWords;
  const terms = isQuotation ? quotation!.terms : invoice!.terms;
  const preparedBy = isQuotation ? quotation!.preparedBy : invoice!.preparedBy;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/85 backdrop-blur-sm p-4 sm:p-6 flex flex-col items-center">
      
      {/* Floating Action Bar (Hidden during print) */}
      <div className="w-full max-w-4xl flex flex-wrap items-center justify-between gap-3 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl mb-4 no-print border border-slate-700">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#E53826] text-white">
            {isQuotation ? 'QUOTATION' : 'INVOICE'}
          </span>
          <span className="text-sm font-bold text-slate-200">
            {docNumber}
          </span>
        </div>

        {/* View Mode Toggle */}
        {isQuotation && (
          <div className="flex items-center p-1 bg-slate-800 rounded-xl text-xs">
            <button
              onClick={() => setDocViewMode('sheet')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                docViewMode === 'sheet'
                  ? 'bg-[#EE5D1F] text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Lembar Penawaran (1 Halaman)
            </button>
            <button
              onClick={() => setDocViewMode('proposal')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                docViewMode === 'proposal'
                  ? 'bg-[#EE5D1F] text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Proposal Lengkap (Scope &amp; Tech)
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#E53826] to-[#EE5D1F] hover:opacity-90 text-white text-xs font-bold shadow transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Simpan PDF (Ctrl+P)</span>
          </button>

          <button
            onClick={() => setPreviewDoc(null)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* A4 Document Canvas - Pixel-perfect match of SOL Agency PDF */}
      <div className="w-full max-w-4xl bg-white text-slate-900 shadow-2xl rounded-sm p-8 sm:p-14 print:p-0 print:shadow-none print:w-full min-h-[1050px] flex flex-col justify-between border border-slate-200 print:border-0 relative font-sans">
        
        {/* Proposal Full Multi-page View */}
        {docViewMode === 'proposal' && isQuotation ? (
          <div className="space-y-8 text-xs text-slate-800 leading-relaxed">
            {/* Proposal Page 1 Header */}
            <div className="flex items-start justify-between border-b pb-6 border-slate-200">
              <div>
                <h1 className="text-3xl font-extrabold text-[#E53826] tracking-tight">
                  Proposal
                </h1>
                <p className="text-sm font-bold text-slate-900 mt-1">
                  Website Development &amp; Digital Setup Project (V1 - MVP)
                </p>
                <p className="text-xs font-extrabold text-[#EE5D1F] mt-0.5 uppercase tracking-wide">
                  {clientName}
                </p>
              </div>
              <SolLogo size="lg" />
            </div>

            {/* Metadata Table */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1 font-medium">
              <div className="grid grid-cols-4 gap-2">
                <span className="text-slate-500">Prepared for:</span>
                <span className="col-span-3 font-bold text-slate-900">{clientContact} / {clientName}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <span className="text-slate-500">Prepared by:</span>
                <span className="col-span-3 font-bold text-slate-900">Ferdi Yunanto / SOL Agency</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <span className="text-slate-500">Date:</span>
                <span className="col-span-3 font-bold text-slate-900">{dateIssued}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <span className="text-slate-500">Project Name:</span>
                <span className="col-span-3 font-bold text-slate-900">{projectName}</span>
              </div>
            </div>

            {/* 1. Executive Summary */}
            <div className="space-y-2">
              <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider text-[#E53826]">
                1. EXECUTIVE SUMMARY
              </h3>
              <p className="text-justify">
                {clientName} dibangun di atas tiga pilar utama: mendukung perusahaan internasional dengan eksekusi lokal di Indonesia (Source, Build &amp; Operate), dan memberdayakan bisnis Indonesia serta UKM untuk berkembang dan menjangkau pasar baru (Grow).
              </p>
              <p className="text-justify">
                Untuk membangun jejak digital internasional yang kredibel, profesional, dengan performa tinggi tanpa plugin bloat, proposal ini merangkum strategi, arsitektur teknis, dan rincian investasi transparan untuk website Version 1 (V1).
              </p>
            </div>

            {/* 2. Technical Specs */}
            <div className="space-y-2">
              <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider text-[#E53826]">
                2. TECHNICAL SPECIFICATIONS &amp; DIGITAL INFRASTRUCTURE
              </h3>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-700">
                <li><b>Platform &amp; Technology:</b> Custom PHP 8.30 (Modern lightweight MVC structure) dengan clean HTML5, Tailwind CSS framework, dan vanilla JavaScript.</li>
                <li><b>Hosting Infrastructure:</b> Rumahweb Medium Cloud Power Package (1.5 CPU Core, 2 GB RAM, MariaDB).</li>
                <li><b>Domain:</b> nestraya.com / nestraya.id termasuk Free Domain &amp; Free Let's Encrypt SSL.</li>
                <li><b>Responsive Design:</b> Mobile-first layout optimal untuk smartphone, tablet, dan desktop monitor.</li>
                <li><b>Security:</b> Server-side Monarx Security, SSL encryption, dan weekly offshore backup.</li>
                <li><b>Enquiry &amp; SMTP:</b> Form inquiry dengan visitor segmentation flow dan SMTP Mailer delivery.</li>
              </ul>
            </div>

            {/* 3. Project Scope */}
            <div className="space-y-2">
              <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider text-[#E53826]">
                3. PROJECT SCOPE &amp; ARCHITECTURE (MVP)
              </h3>
              <p>5 Halaman Utama: 1. Home, 2. Services (International Support &amp; SME Growth), 3. About, 4. Contact, 5. Business Enquiry.</p>
              <p>Bilingual Capabilities (EN/ID) dengan toggle switcher.</p>
            </div>

            {/* 4. Investment Summary */}
            <div className="space-y-2">
              <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider text-[#E53826]">
                4. TOTAL DEVELOPMENT INVESTMENT
              </h3>
              <div className="p-3 bg-[#FFDDD2] rounded-lg flex justify-between items-center text-slate-900 font-extrabold">
                <span>One-time Development Service Fee (Option A: MVP)</span>
                <span className="font-mono text-base">Rp. {grandTotal.toLocaleString('id-ID')},-</span>
              </div>
            </div>
          </div>
        ) : (
          /* Official Single Page Quotation / Invoice (Matching Exact Template) */
          <div>
            <div className="flex items-start justify-between">
              {/* Meta Top Left */}
              <div className="text-xs space-y-1 text-slate-800 font-sans">
                <div className="flex gap-2">
                  <span className="font-semibold text-slate-600 w-28">Date Issued:</span>
                  <span className="font-bold">{dateIssued}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold text-slate-600 w-28">
                    {isQuotation ? 'Quotation No.:' : 'Invoice No.:'}
                  </span>
                  <span className="font-bold">{docNumber}</span>
                </div>
              </div>

              {/* Sol Agency Signature Badge Top Right */}
              <div className="shrink-0 -mt-2">
                <SolLogo size="lg" />
              </div>
            </div>

            {/* Large Title & Addressed To */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b-2 border-[#E53826]">
              <div>
                <h1 className="text-4xl sm:text-5xl font-black text-[#E53826] tracking-tight">
                  {isQuotation ? 'Quotation' : 'Invoice'}
                </h1>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-500 block mb-0.5">Addressed to</span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  {clientName}
                </h2>
                {clientContact && (
                  <p className="text-xs text-slate-600">{clientContact}</p>
                )}
                {clientAddress && (
                  <p className="text-[11px] text-slate-500">{clientAddress}</p>
                )}
              </div>
            </div>

            {/* Items Table */}
            <div className="mt-6">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[#E53826] text-slate-900 font-bold">
                    <th className="py-2.5 text-left w-12">Items</th>
                    <th className="py-2.5 text-left">Deliverables</th>
                    <th className="py-2.5 text-right w-28">Unit Price</th>
                    <th className="py-2.5 text-right w-28">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item, idx) => (
                    <tr key={item.id || idx} className="align-top">
                      <td className="py-4 font-bold text-slate-900 text-sm">
                        {idx + 1}
                      </td>
                      <td className="py-4 pr-4">
                        <div className="font-bold text-slate-900 text-sm mb-1">
                          {item.title}
                        </div>
                        <ul className="space-y-1 text-slate-700 text-xs pl-0">
                          {item.deliverables && item.deliverables.map((deliv, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-1.5">
                              <span className="text-slate-400 select-none">-</span>
                              <span>{deliv}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="py-4 text-right font-medium text-slate-900">
                        {item.unitPrice.toLocaleString('id-ID')}
                      </td>
                      <td className="py-4 text-right font-bold text-slate-900">
                        {item.subtotal.toLocaleString('id-ID')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Grand Total Bar (Warm Orange banner matching PDF) */}
            <div className="mt-4 bg-[#FFDDD2] rounded-md p-3 flex items-center justify-between text-slate-900">
              <span className="font-extrabold text-sm sm:text-base text-slate-800">
                Grand Total
              </span>
              <span className="font-black text-sm sm:text-base text-slate-900 font-mono">
                Rp. {grandTotal.toLocaleString('id-ID')},-
              </span>
            </div>

            {/* Words subtext */}
            <div className="text-center text-[11px] font-semibold text-slate-700 mt-1 italic">
              ({grandTotalInWords})
            </div>

            {/* Invoice-Specific DP & Final Payment Tracker */}
            {!isQuotation && invoice && (
              <div className="mt-4 space-y-1.5 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="italic text-slate-700">
                    DP 50% paid {invoice.dpPaidDate ? `on ${invoice.dpPaidDate}` : 'prior to kickoff'}
                  </span>
                  <span className="font-bold text-slate-900 font-mono">
                    Rp. {invoice.dpAmount.toLocaleString('id-ID')},-
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-200">
                  <span className="font-bold text-slate-900">
                    {invoice.finalPaymentStatus === 'paid' ? 'Final payment 50% paid' : 'Final payment 50% required'}
                  </span>
                  <span className={`font-bold font-mono ${invoice.finalPaymentStatus === 'paid' ? 'text-emerald-700' : 'text-slate-900'}`}>
                    Rp. {invoice.finalPaymentAmount.toLocaleString('id-ID')},-
                  </span>
                </div>
              </div>
            )}

            {/* Terms of Payment Section */}
            <div className="mt-8 text-xs text-slate-800 space-y-1.5">
              <h4 className="font-bold text-slate-900 text-xs">
                Terms of Payment
              </h4>
              <div className="space-y-1 text-[11px] text-slate-700 leading-relaxed">
                <p>• Down Payment (DP): 50% upon proposal approval and hosting setup confirmation.</p>
                <p>• Final Payment: 50% upon final launch, full migration to client-owned production domain. All administrative credentials and source files will be fully handed over upon completion of this final payment.</p>
                <p>
                  • Payments can be made via transfer to:
                </p>
                <p className="pl-4 font-bold text-slate-900">
                  Rek. Bank Mandiri 137 000 505 7753 a.n Ferdi Yunanto
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Section: Signature & Corporate Red Banner */}
        <div className="mt-12 pt-6">
          
          {/* Signatory */}
          <div className="flex justify-end text-center mb-8">
            <div className="w-56 space-y-1">
              <p className="text-xs font-bold text-slate-900">SOL Agency</p>
              
              {/* Realistic Digital Stylized Signature SVG */}
              <div className="h-16 flex items-center justify-center my-1 select-none">
                <svg viewBox="0 0 160 60" className="h-14 w-auto text-slate-900" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 20 45 C 30 15, 45 10, 50 35 C 55 50, 65 20, 75 18 C 85 16, 88 40, 95 38 C 102 36, 110 25, 120 28 C 130 31, 140 38, 148 35" />
                  <path d="M 35 30 L 70 28" />
                  <path d="M 50 12 L 48 50" />
                  <path d="M 10 50 C 50 48, 120 46, 155 42" strokeWidth="1.5" />
                </svg>
              </div>

              <p className="text-xs font-bold text-slate-900">{companyInfo.founder || 'Ferdi Yunanto'}</p>
              <p className="text-[10px] text-slate-500">Founder &amp; Technical Lead</p>
            </div>
          </div>

          {/* Watermark note */}
          <div className="text-center text-[10px] text-slate-400 italic mb-2">
            Original document issued by {companyInfo.name}
          </div>

          {/* Red/Coral Footer Bar matching PDF and user requested exact data */}
          <div className="bg-[#E53826] text-white py-2.5 px-6 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <SolLogo size="sm" />
              <span className="font-extrabold tracking-wider text-sm uppercase">{companyInfo.name}</span>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 gap-y-1 text-[11px] font-medium">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                <span>{companyInfo.email}</span>
              </span>
              <span className="opacity-60">|</span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" />
                <span>{companyInfo.website}</span>
              </span>
              <span className="opacity-60">|</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                <span>{companyInfo.phone}</span>
              </span>
              <span className="opacity-60">|</span>
              <span className="font-bold uppercase">{companyInfo.legalName}</span>
            </div>
          </div>


        </div>

      </div>

    </div>
  );
};
