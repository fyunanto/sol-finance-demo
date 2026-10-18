import {
  CompanyInfo,
  UserProfile,
  Quotation,
  Invoice,
  Transaction,
  BudgetLimit,
  AppNotification
} from '../types';

export const initialCompanyInfo: CompanyInfo = {
  name: "SOL Agency",
  legalName: "PT. Solusi Optima Laju",
  brandTagline: "Digital Setup, Bespoke Engineering & Growth",
  email: "invoice@solagency.id",
  contactEmail: "connect.solagency@gmail.com",
  website: "www.solagency.id",
  phone: "+6285212828253",
  founder: "Ferdi Yunanto",
  partner: "Reza Pratama",
  bankAccount: {
    bankName: "Bank Mandiri",
    accountNumber: "137 000 505 7753",
    accountHolder: "Ferdi Yunanto"
  }
};

export const initialUsers: UserProfile[] = [
  {
    id: "usr-1",
    name: "Ferdi Yunanto",
    email: "fyunanto@gmail.com",
    role: "founder_ceo",
    title: "Founder & Technical Lead",
    company: "PT. Solusi Optima Laju",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    isLoggedIn: true,
    authProvider: "google_sso"
  },
  {
    id: "usr-2",
    name: "Reza Pratama",
    email: "reza@solagency.id",
    role: "founder_partner",
    title: "Co-Founder & Financial Ops",
    company: "PT. Solusi Optima Laju",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    isLoggedIn: false,
    authProvider: "google_sso"
  },
  {
    id: "usr-3",
    name: "Marilin Herman (Riri)",
    email: "hermanmarilin3@gmail.com",
    role: "client",
    title: "Managing Director",
    company: "PT Nestraya Jaya Global",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    isLoggedIn: false,
    authProvider: "google_sso"
  }
];

export const initialQuotations: Quotation[] = [
  {
    id: "quot-1",
    quotationNumber: "Q/001/09/2026",
    dateIssued: "2026-09-24",
    clientName: "PT Nestraya Jaya Global",
    clientContactPerson: "Marilin Herman (Riri)",
    clientEmail: "hermanmarilin3@gmail.com",
    clientAddress: "The East Building, Kuningan, Jakarta Selatan",
    projectName: "Nestraya Jaya Global Corporate Website (V1 - MVP)",
    items: [
      {
        id: "item-1",
        itemNumber: 1,
        title: "Website One-time Development Service Fee",
        deliverables: [
          "Domain & hosting (1 year)",
          "Infrastructure setup & Rumahweb Cloud coordination",
          "Custom PHP Development (V1) - 10 bilingual pages (Home, Services, About, Contact, Enquiry) with Tailwind CSS",
          "Bilingual System (EN/ID) language switcher architecture",
          "Enquiry & SMTP Integration with visitor segmentation flow",
          "Basic SEO & Analytics (Search Console & XML sitemap)",
          "Bonus EMS dashboard page with database"
        ],
        unitPrice: 3200000,
        quantity: 1,
        subtotal: 3200000
      }
    ],
    grandTotal: 3200000,
    grandTotalInWords: "Three Million Two Hundred Thousand Rupiah (Tiga Juta Dua Ratus Ribu Rupiah)",
    downPaymentPercent: 50,
    status: "converted",
    terms: [
      "Down Payment (DP): 50% upon proposal approval and hosting setup confirmation.",
      "Final Payment: 50% upon final launch, full migration to client-owned production domain, all administrative credentials and source files will be fully handed over upon completion of this final payment.",
      "Payments can be made via transfer to: Rek. Bank Mandiri 137 000 505 7753 a.n Ferdi Yunanto"
    ],
    bankAccount: {
      bankName: "Bank Mandiri",
      accountNumber: "137 000 505 7753",
      accountHolder: "Ferdi Yunanto"
    },
    preparedBy: "Ferdi Yunanto / SOL Agency",
    convertedInvoiceId: "inv-1",
    createdAt: "2026-09-24T09:00:00Z",
    updatedAt: "2026-09-26T14:30:00Z"
  },
  {
    id: "quot-2",
    quotationNumber: "Q/002/10/2026",
    dateIssued: "2026-10-03",
    clientName: "PT Nusantara Prima Digital",
    clientContactPerson: "Budi Santoso",
    clientEmail: "budi@nusantaraprima.co.id",
    clientAddress: "Sudirman Central Business District, Jakarta",
    projectName: "Brand Identity & Web Portal Setup",
    items: [
      {
        id: "item-201",
        itemNumber: 1,
        title: "Corporate Brand Identity & Guidelines",
        deliverables: [
          "Logo suite & visual brand guidelines",
          "Digital color palettes, typography hierarchy, social media kit",
          "Business card & letterhead digital templates"
        ],
        unitPrice: 2800000,
        quantity: 1,
        subtotal: 2800000
      },
      {
        id: "item-202",
        itemNumber: 2,
        title: "Landing Page Development",
        deliverables: [
          "High-conversion responsive landing page",
          "Contact form integration & automated WhatsApp redirect",
          "Speed optimization score 95+ on Google PageSpeed"
        ],
        unitPrice: 2200000,
        quantity: 1,
        subtotal: 2200000
      }
    ],
    grandTotal: 5000000,
    grandTotalInWords: "Five Million Rupiah (Lima Juta Rupiah)",
    downPaymentPercent: 50,
    status: "approved",
    terms: [
      "Down Payment (DP): 50% upon approval before design kick-off.",
      "Final Payment: 50% upon full delivery and source asset handover.",
      "Payments can be made via transfer to: Rek. Bank Mandiri 137 000 505 7753 a.n Ferdi Yunanto"
    ],
    bankAccount: {
      bankName: "Bank Mandiri",
      accountNumber: "137 000 505 7753",
      accountHolder: "Ferdi Yunanto"
    },
    preparedBy: "Ferdi Yunanto / SOL Agency",
    createdAt: "2026-10-03T11:00:00Z",
    updatedAt: "2026-10-04T15:20:00Z"
  }
];

export const initialInvoices: Invoice[] = [
  {
    id: "inv-1",
    invoiceNumber: "IN/001/SOL/X/2026",
    quotationId: "quot-1",
    dateIssued: "2026-10-01",
    dueDate: "2026-10-15",
    clientName: "PT Nestraya Jaya Global",
    clientContactPerson: "Marilin Herman (Riri)",
    clientEmail: "hermanmarilin3@gmail.com",
    clientAddress: "The East Building, Kuningan, Jakarta Selatan",
    projectName: "Nestraya Jaya Global Corporate Website (V1 - MVP)",
    items: [
      {
        id: "inv-item-1",
        itemNumber: 1,
        title: "Website One-time Development Service Fee",
        deliverables: [
          "Domain & hosting (1 year)",
          "Infrastructure setup",
          "Custom PHP Development (V1)",
          "Bilingual System (EN/ID)",
          "Enquiry & SMTP Integration",
          "Basic SEO & Analytics"
        ],
        unitPrice: 3200000,
        quantity: 1,
        subtotal: 3200000
      }
    ],
    grandTotal: 3200000,
    grandTotalInWords: "Three Million Two Hundred Thousand Rupiah (Tiga Juta Dua Ratus Ribu Rupiah)",
    dpAmount: 1600000,
    dpPaidDate: "2026-09-26",
    dpStatus: "paid",
    finalPaymentAmount: 1600000,
    finalPaymentStatus: "unpaid",
    status: "dp_paid",
    terms: [
      "Down Payment (DP): 50% upon proposal approval and hosting setup confirmation.",
      "Final Payment: 50% upon final launch, full migration to client-owned production domain, all administrative credentials and source files will be fully handed over upon completion of this final payment.",
      "Payments can be made via transfer to: Rek. Bank Mandiri 137 000 505 7753 a.n Ferdi Yunanto"
    ],
    bankAccount: {
      bankName: "Bank Mandiri",
      accountNumber: "137 000 505 7753",
      accountHolder: "Ferdi Yunanto"
    },
    preparedBy: "Ferdi Yunanto",
    createdAt: "2026-10-01T08:00:00Z",
    updatedAt: "2026-10-01T08:00:00Z"
  }
];

export const initialTransactions: Transaction[] = [
  {
    id: "tx-cap-1",
    type: "capital",
    category: "Setoran Modal Founder",
    title: "Setoran Modal Awal - Ferdi Yunanto",
    amount: 10000000,
    date: "2026-09-01",
    status: "completed",
    paymentMethod: "Bank Mandiri",
    recordedBy: "Ferdi Yunanto",
    notes: "Modal disetor 50% untuk pendirian dan kas operasional awal PT Solusi Optima Laju"
  },
  {
    id: "tx-cap-2",
    type: "capital",
    category: "Setoran Modal Founder",
    title: "Setoran Modal Awal - Reza Pratama",
    amount: 10000000,
    date: "2026-09-01",
    status: "completed",
    paymentMethod: "Bank Mandiri",
    recordedBy: "Reza Pratama",
    notes: "Modal disetor 50% untuk pendirian dan kas operasional awal PT Solusi Optima Laju"
  },
  {
    id: "tx-exp-1",
    type: "expense",
    category: "Legal & Legalitas PT",
    title: "Biaya Pendirian PT & Notaris SK Kemenkumham",
    amount: 3500000,
    date: "2026-09-05",
    status: "completed",
    paymentMethod: "Bank Mandiri",
    recordedBy: "Ferdi Yunanto",
    notes: "Pengurusan Akta Pendirian, NIB, dan NPWP PT Solusi Optima Laju"
  },
  {
    id: "tx-exp-2",
    type: "expense",
    category: "Software Tools & Subscriptions",
    title: "Google Workspace & Domain solagency.id",
    amount: 380000,
    date: "2026-09-10",
    status: "completed",
    paymentMethod: "Bank Mandiri",
    recordedBy: "Ferdi Yunanto",
    notes: "Email bisnis invoice@solagency.id & domain resmi"
  },
  {
    id: "tx-exp-3",
    type: "expense",
    category: "Software Tools & Subscriptions",
    title: "Langganan Figma Pro & ChatGPT Plus",
    amount: 620000,
    date: "2026-09-15",
    status: "completed",
    paymentMethod: "Bank Mandiri",
    recordedBy: "Reza Pratama",
    notes: "Tools desain UI/UX dan asistensi riset teknis"
  },
  {
    id: "tx-inc-1",
    type: "income",
    category: "Pendapatan Proyek Klien",
    title: "DP 50% Nestraya Jaya Global (V1 MVP)",
    amount: 1600000,
    date: "2026-09-26",
    status: "completed",
    paymentMethod: "Bank Mandiri",
    recordedBy: "Ferdi Yunanto",
    notes: "Pembayaran DP 50% sesuai Quotation Q/001/09/2026 & Invoice IN/001/SOL/X/2026",
    invoiceId: "inv-1",
    quotationId: "quot-1"
  },
  {
    id: "tx-exp-4",
    type: "expense",
    category: "Domain & Hosting Klien",
    title: "Rumahweb Cloud Hosting & Domain nestraya.com",
    amount: 1250000,
    date: "2026-09-27",
    status: "completed",
    paymentMethod: "Bank Mandiri",
    recordedBy: "Ferdi Yunanto",
    notes: "Paket Rumahweb Medium Cloud Power Package 1 tahun + Domain & SSL"
  },
  {
    id: "tx-exp-5",
    type: "expense",
    category: "Operasional & Utilitas",
    title: "Internet Kantor & Ruang Kerja Coworking",
    amount: 450000,
    date: "2026-10-02",
    status: "completed",
    paymentMethod: "Bank Mandiri",
    recordedBy: "Reza Pratama",
    notes: "Koneksi internet fiber optik periode Oktober 2026"
  },
  {
    id: "tx-inc-2",
    type: "income",
    category: "Pendapatan Proyek Klien",
    title: "DP 50% Project Brand Identity PT Nusantara Prima Digital",
    amount: 2500000,
    date: "2026-10-06",
    status: "completed",
    paymentMethod: "Bank Mandiri",
    recordedBy: "Reza Pratama",
    notes: "Pembayaran DP 50% dari Quotation Q/002/10/2026"
  }
];

export const initialBudgets: BudgetLimit[] = [
  {
    id: "bdg-1",
    category: "Domain & Hosting Klien",
    monthlyLimit: 1500000,
    warningThresholdPercent: 80
  },
  {
    id: "bdg-2",
    category: "Software Tools & Subscriptions",
    monthlyLimit: 1200000,
    warningThresholdPercent: 80
  },
  {
    id: "bdg-3",
    category: "Operasional & Utilitas",
    monthlyLimit: 1000000,
    warningThresholdPercent: 80
  },
  {
    id: "bdg-4",
    category: "Pemasaran & Ads",
    monthlyLimit: 2000000,
    warningThresholdPercent: 75
  },
  {
    id: "bdg-5",
    category: "Legal & Legalitas PT",
    monthlyLimit: 5000000,
    warningThresholdPercent: 80
  }
];

export const initialNotifications: AppNotification[] = [
  {
    id: "notif-1",
    title: "DP 50% Masuk ke Kas Bank Mandiri",
    message: "Pembayaran DP Rp 1.600.000 dari PT Nestraya Jaya Global (Invoice IN/001/SOL/X/2026) telah masuk ke kas real-time.",
    type: "success",
    timestamp: "2026-09-26T14:35:00Z",
    read: false,
    linkTab: "invoices",
    targetAudience: "both"
  },
  {
    id: "notif-2",
    title: "Peringatan Ambang Batas Anggaran Hosting",
    message: "Pengeluaran 'Domain & Hosting Klien' bulan ini telah mencapai Rp 1.250.000 (83.3% dari kuota Rp 1.500.000).",
    type: "warning",
    timestamp: "2026-09-27T10:15:00Z",
    read: false,
    linkTab: "budgets",
    targetAudience: "internal"
  },
  {
    id: "notif-3",
    title: "Quotation Disetujui Klien",
    message: "PT Nusantara Prima Digital telah menyetujui Quotation Q/002/10/2026 senilai Rp 5.000.000.",
    type: "info",
    timestamp: "2026-10-04T15:20:00Z",
    read: true,
    linkTab: "quotations",
    targetAudience: "both"
  }
];
