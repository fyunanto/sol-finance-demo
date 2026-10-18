import {
  CompanyInfo,
  UserProfile,
  Quotation,
  Invoice,
  Transaction,
  BudgetLimit,
  AppNotification
} from '../types';
import {
  initialCompanyInfo,
  initialUsers,
  initialQuotations,
  initialInvoices,
  initialTransactions,
  initialBudgets,
  initialNotifications
} from './initialData';

// 1. DATA INTERNAL RIIL (SOL AGENCY - PRIVATE)
export const internalPreset = {
  companyInfo: initialCompanyInfo,
  users: initialUsers,
  quotations: initialQuotations,
  invoices: initialInvoices,
  transactions: initialTransactions,
  budgets: initialBudgets,
  notifications: initialNotifications
};

// 2. DATA DEMO SHOWCASE (FIKTIF & AMAN UNTUK CALON PEMBELI)
export const demoCompanyInfo: CompanyInfo = {
  name: "NEXA Digital",
  legalName: "PT. Solusi Kreasi Nusantara",
  brandTagline: "Digital Innovation, Bespoke Software & Cloud Solutions",
  email: "billing@nexadigital.id",
  contactEmail: "hello@nexadigital.id",
  website: "www.nexadigital.id",
  phone: "+62 812-3456-7890",
  founder: "Alex Pratama",
  partner: "Dian Anggoro",
  bankAccount: {
    bankName: "Bank Central Asia (BCA)",
    accountNumber: "522 098 7654",
    accountHolder: "PT Solusi Kreasi Nusantara"
  }
};

export const demoUsers: UserProfile[] = [
  {
    id: "demo-usr-1",
    name: "Alex Pratama",
    email: "alex@nexadigital.id",
    role: "founder_ceo",
    title: "Founder & Chief Executive",
    company: "PT. Solusi Kreasi Nusantara",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    isLoggedIn: true,
    authProvider: "google_sso"
  },
  {
    id: "demo-usr-2",
    name: "Dian Anggoro",
    email: "dian@nexadigital.id",
    role: "founder_partner",
    title: "Co-Founder & VP Finance",
    company: "PT. Solusi Kreasi Nusantara",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    isLoggedIn: false,
    authProvider: "google_sso"
  },
  {
    id: "demo-usr-3",
    name: "Siti Rahmawati",
    email: "siti@klien-contoh.co.id",
    role: "client",
    title: "Project Director",
    company: "PT Nusantara Prima Digital",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    isLoggedIn: false,
    authProvider: "google_sso"
  }
];

export const demoQuotations: Quotation[] = [
  {
    id: "demo-quot-1",
    quotationNumber: "Q/DEMO/001/2026",
    dateIssued: "2026-10-01",
    clientName: "PT Nusantara Prima Digital",
    clientContactPerson: "Siti Rahmawati",
    clientEmail: "siti@klien-contoh.co.id",
    clientAddress: "Sudirman Central Business District, Jakarta",
    projectName: "Enterprise Web App & Dashboard Integration",
    items: [
      {
        id: "demo-item-1",
        itemNumber: 1,
        title: "Bespoke SaaS Development & Cloud Architecture",
        deliverables: [
          "Cloud infrastructure provisioning & security hardening",
          "Automated financial cashbook & invoice generation module",
          "Role-based Access Control (CEO, Finance, Client Portal)",
          "Real-time analytics chart & PDF export engine"
        ],
        unitPrice: 15000000,
        quantity: 1,
        subtotal: 15000000
      }
    ],
    grandTotal: 15000000,
    grandTotalInWords: "Lima Belas Juta Rupiah",
    downPaymentPercent: 50,
    status: "converted",
    terms: [
      "Down Payment (DP): 50% setelah konfirmasi penawaran kerja.",
      "Pelunasan: 50% setelah serah terima sistem dan training.",
      "Pembayaran ditransfer ke rekening resmi perusahaan."
    ],
    bankAccount: {
      bankName: "Bank Central Asia (BCA)",
      accountNumber: "522 098 7654",
      accountHolder: "PT Solusi Kreasi Nusantara"
    },
    preparedBy: "Alex Pratama / NEXA Digital",
    convertedInvoiceId: "demo-inv-1",
    createdAt: "2026-10-01T09:00:00Z",
    updatedAt: "2026-10-05T14:00:00Z"
  }
];

export const demoInvoices: Invoice[] = [
  {
    id: "demo-inv-1",
    invoiceNumber: "INV/DEMO/001/2026",
    quotationId: "demo-quot-1",
    dateIssued: "2026-10-05",
    dueDate: "2026-10-15",
    clientName: "PT Nusantara Prima Digital",
    clientContactPerson: "Siti Rahmawati",
    clientEmail: "siti@klien-contoh.co.id",
    clientAddress: "Sudirman Central Business District, Jakarta",
    projectName: "Enterprise Web App & Dashboard Integration",
    items: demoQuotations[0].items,
    grandTotal: 15000000,
    grandTotalInWords: "Lima Belas Juta Rupiah",
    dpAmount: 7500000,
    dpPaidDate: "2026-10-06",
    dpStatus: "paid",
    finalPaymentAmount: 7500000,
    finalPaymentStatus: "unpaid",
    status: "dp_paid",
    terms: [
      "DP 50% sebesar Rp 7.500.000 telah lunas pada 06 Oktober 2026.",
      "Sisa pelunasan 50% dibayarkan setelah User Acceptance Test (UAT)."
    ],
    bankAccount: {
      bankName: "Bank Central Asia (BCA)",
      accountNumber: "522 098 7654",
      accountHolder: "PT Solusi Kreasi Nusantara"
    },
    preparedBy: "Alex Pratama / NEXA Digital",
    createdAt: "2026-10-05T10:00:00Z",
    updatedAt: "2026-10-06T11:00:00Z"
  }
];

export const demoTransactions: Transaction[] = [
  {
    id: "demo-tx-1",
    type: "capital",
    category: "Modal Awal Pendiri",
    title: "Injeksi Modal Awal Operasional",
    amount: 25000000,
    date: "2026-10-01",
    status: "completed",
    paymentMethod: "Bank BCA",
    recordedBy: "Alex Pratama",
    notes: "Modal setor awal kas perusahaan"
  },
  {
    id: "demo-tx-2",
    type: "income",
    category: "Pendapatan Proyek Klien",
    title: "DP 50% PT Nusantara Prima Digital",
    amount: 7500000,
    date: "2026-10-06",
    status: "completed",
    paymentMethod: "Bank BCA",
    recordedBy: "Dian Anggoro",
    notes: "Down payment Invoice INV/DEMO/001/2026",
    invoiceId: "demo-inv-1"
  },
  {
    id: "demo-tx-3",
    type: "expense",
    category: "Software Tools & Subscriptions",
    title: "Cloud Server Hosting & CI/CD",
    amount: 1250000,
    date: "2026-10-07",
    status: "completed",
    paymentMethod: "Kartu Kredit Bisnis",
    recordedBy: "Alex Pratama",
    notes: "Langganan AWS & domain"
  }
];

export const demoPreset = {
  companyInfo: demoCompanyInfo,
  users: demoUsers,
  quotations: demoQuotations,
  invoices: demoInvoices,
  transactions: demoTransactions,
  budgets: initialBudgets,
  notifications: [
    {
      id: "demo-notif-1",
      title: "Selamat Datang di Demo Mode",
      message: "Ini adalah lingkungan demo showcase untuk calon pembeli. Semua data aman dan fiktif.",
      type: "info" as const,
      timestamp: new Date().toISOString(),
      read: false,
      linkTab: "dashboard",
      targetAudience: "both" as const
    }
  ]
};

// 3. DATA BLANK (KOSONG BERSIH / CLEAN SLATE - RP 0)
export const blankCompanyInfo: CompanyInfo = {
  name: "Agency Name",
  legalName: "PT. Nama Perusahaan Anda",
  brandTagline: "Tagline Bisnis / Solusi Digital",
  email: "kontak@perusahaan.com",
  contactEmail: "admin@perusahaan.com",
  website: "www.perusahaan.com",
  phone: "+62 812-0000-0000",
  founder: "Founder Name",
  partner: "Finance Manager",
  bankAccount: {
    bankName: "Bank Pilihan",
    accountNumber: "000 000 0000",
    accountHolder: "Nama Pemilik Rekening"
  }
};

export const blankUsers: UserProfile[] = [
  {
    id: "blank-usr-1",
    name: "Administrator / Founder",
    email: "admin@perusahaan.com",
    role: "founder_ceo",
    title: "Chief Executive Officer",
    company: "PT. Nama Perusahaan Anda",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    isLoggedIn: true,
    authProvider: "google_sso"
  },
  {
    id: "blank-usr-2",
    name: "Finance & Operations",
    email: "finance@perusahaan.com",
    role: "founder_partner",
    title: "Financial Controller",
    company: "PT. Nama Perusahaan Anda",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    isLoggedIn: false,
    authProvider: "google_sso"
  }
];

export const blankPreset = {
  companyInfo: blankCompanyInfo,
  users: blankUsers,
  quotations: [] as Quotation[],
  invoices: [] as Invoice[],
  transactions: [] as Transaction[],
  budgets: initialBudgets.map(b => ({ ...b, monthlyLimit: 1000000 })),
  notifications: [
    {
      id: "blank-notif-1",
      title: "Sistem Siap Digunakan (Clean Slate)",
      message: "Database transaksi dan tagihan masih kosong (Rp 0). Silakan catat transaksi pertama Anda atau buat quotation baru.",
      type: "info" as const,
      timestamp: new Date().toISOString(),
      read: false,
      linkTab: "transactions",
      targetAudience: "both" as const
    }
  ]
};
