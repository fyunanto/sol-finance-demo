import React, { createContext, useContext, useState, useEffect } from 'react';
import {

  Transaction,
  Quotation,
  Invoice,
  BudgetLimit,
  AppNotification,
  UserProfile,
  CompanyInfo,
  QuotationStatus,
  InvoiceStatus,
  DataPresetMode
} from '../types';
import {
  initialCompanyInfo,
  initialUsers,
  initialQuotations,
  initialInvoices,
  initialTransactions,
  initialBudgets,
  initialNotifications
} from '../data/initialData';
import {
  internalPreset,
  demoPreset,
  blankPreset
} from '../data/demoPresets';

interface AppContextType {

  companyInfo: CompanyInfo;
  users: UserProfile[];
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  switchUserRole: (userId: string) => void;
  updateUser: (userId: string, updatedData: Partial<UserProfile>) => void;
  addUser: (newUser: Omit<UserProfile, 'id'>) => string;
  deleteUser: (userId: string) => void;
  isEditUserModalOpen: boolean;
  setIsEditUserModalOpen: (open: boolean) => void;
  editingUser: UserProfile | null;
  openEditUserModal: (user?: UserProfile) => void;
  
  // Navigation & Modals
  activeTab: string;
  setActiveTab: (tab: string) => void;
  previewDoc: { type: 'quotation' | 'invoice'; id: string } | null;
  setPreviewDoc: (doc: { type: 'quotation' | 'invoice'; id: string } | null) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  
  // Transactions
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  
  // Quotations
  quotations: Quotation[];
  addQuotation: (q: Omit<Quotation, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateQuotationStatus: (id: string, status: QuotationStatus) => void;
  convertQuotationToInvoice: (quotationId: string) => string;
  deleteQuotation: (id: string) => void;

  // Invoices
  invoices: Invoice[];
  addInvoice: (inv: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateInvoiceStatus: (id: string, status: InvoiceStatus) => void;
  recordInvoicePayment: (invoiceId: string, paymentType: 'dp' | 'final') => void;
  deleteInvoice: (id: string) => void;

  // Budgets
  budgets: BudgetLimit[];
  updateBudgetLimit: (id: string, newLimit: number, threshold?: number) => void;
  
  // Notifications
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  sendNotification: (notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;

  // Calculations
  totalCapital: number;
  totalIncome: number;
  totalExpense: number;
  currentCashBalance: number;
  operationalNetProfit: number;
  totalReceivables: number;
  budgetAlerts: { category: string; spent: number; limit: number; percent: number; isOver: boolean }[];
  resetToDefaultData: () => void;

  // Preset & Demo Controls
  dataPresetMode: DataPresetMode;
  switchDataPreset: (preset: DataPresetMode) => void;
  isDemoSettingsModalOpen: boolean;
  setIsDemoSettingsModalOpen: (open: boolean) => void;

  // Internal Authentication & Session Controls
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  loginUser: (userId: string) => void;
  logoutUser: () => void;
  lockSession: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRESET_MODE: 'sol_agency_preset_mode_v2',
  COMPANY_INFO: 'sol_agency_company_info_v2',
  TRANSACTIONS: 'sol_agency_transactions_v2',
  QUOTATIONS: 'sol_agency_quotations_v2',
  INVOICES: 'sol_agency_invoices_v2',
  BUDGETS: 'sol_agency_budgets_v2',
  NOTIFICATIONS: 'sol_agency_notifications_v2',
  USERS: 'sol_agency_users_v2',
  CURRENT_USER_ID: 'sol_agency_current_user_id_v2',
  IS_AUTHENTICATED: 'sol_agency_is_authenticated_v2'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dataPresetMode, setDataPresetMode] = useState<DataPresetMode>(() => {
    return (localStorage.getItem(STORAGE_KEYS.PRESET_MODE) as DataPresetMode) || 'internal';
  });
  const [isDemoSettingsModalOpen, setIsDemoSettingsModalOpen] = useState<boolean>(false);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.IS_AUTHENTICATED);
    if (saved !== null) {
      return saved === 'true';
    }
    // Default to true if user was already in session, or false for fresh internal login
    return false;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPANY_INFO);
      return saved ? JSON.parse(saved) : initialCompanyInfo;
    } catch {
      return initialCompanyInfo;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPANY_INFO, JSON.stringify(companyInfo));
  }, [companyInfo]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRESET_MODE, dataPresetMode);
  }, [dataPresetMode]);

  const [users, setUsers] = useState<UserProfile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USERS);
      return saved ? JSON.parse(saved) : initialUsers;
    } catch {
      return initialUsers;
    }
  });

  
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const savedUserId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
    const savedUsers = (() => {
      try {
        const s = localStorage.getItem(STORAGE_KEYS.USERS);
        return s ? JSON.parse(s) : initialUsers;
      } catch {
        return initialUsers;
      }
    })();
    const found = savedUsers.find((u: UserProfile) => u.id === savedUserId);
    return found || savedUsers[0] || initialUsers[0];
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [previewDoc, setPreviewDoc] = useState<{ type: 'quotation' | 'invoice'; id: string } | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);

  const openEditUserModal = (user?: UserProfile) => {
    setEditingUser(user || currentUser);
    setIsEditUserModalOpen(true);
  };

  const updateUser = (userId: string, updatedData: Partial<UserProfile>) => {
    setUsers(prev => {
      const updated = prev.map(u => (u.id === userId ? { ...u, ...updatedData } : u));
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updated));
      return updated;
    });

    if (currentUser.id === userId) {
      setCurrentUser(prev => ({ ...prev, ...updatedData }));
    }

    sendNotification({
      title: 'Profil Pengguna Diperbarui',
      message: `Informasi pengguna ${updatedData.name || currentUser.name} berhasil disimpan.`,
      type: 'success',
      targetAudience: 'internal'
    });
  };

  const addUser = (newUser: Omit<UserProfile, 'id'>) => {
    const newId = `usr-${Date.now()}`;
    const userWithId: UserProfile = {
      ...newUser,
      id: newId
    };
    setUsers(prev => {
      const updated = [...prev, userWithId];
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updated));
      return updated;
    });

    sendNotification({
      title: 'Pengguna Baru Ditambahkan',
      message: `${userWithId.name} (${userWithId.title}) telah terdaftar dalam sistem RBAC SOL Agency.`,
      type: 'info',
      targetAudience: 'internal'
    });

    return newId;
  };

  const deleteUser = (userId: string) => {
    if (users.length <= 1) return;
    setUsers(prev => {
      const updated = prev.filter(u => u.id !== userId);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updated));
      return updated;
    });

    if (currentUser.id === userId) {
      const remaining = users.filter(u => u.id !== userId);
      if (remaining.length > 0) {
        setCurrentUser(remaining[0]);
      }
    }
  };

  // Core Data States
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      return saved ? JSON.parse(saved) : initialTransactions;
    } catch {
      return initialTransactions;
    }
  });

  const [quotations, setQuotations] = useState<Quotation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUOTATIONS);
      return saved ? JSON.parse(saved) : initialQuotations;
    } catch {
      return initialQuotations;
    }
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INVOICES);
      return saved ? JSON.parse(saved) : initialInvoices;
    } catch {
      return initialInvoices;
    }
  });

  const [budgets, setBudgets] = useState<BudgetLimit[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BUDGETS);
      return saved ? JSON.parse(saved) : initialBudgets;
    } catch {
      return initialBudgets;
    }
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return saved ? JSON.parse(saved) : initialNotifications;
    } catch {
      return initialNotifications;
    }
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUOTATIONS, JSON.stringify(quotations));
  }, [quotations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, currentUser.id);
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  const switchUserRole = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      sendNotification({
        title: `Berganti Akun: ${user.name}`,
        message: `Mode akses aktif sekarang: ${user.title} (${user.role === 'client' ? 'Akses Klien' : 'Internal Tim'})`,
        type: 'info',
        targetAudience: 'internal'
      });
    }
  };

  const sendNotification = (notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Push notification to browser if permitted
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(`SOL Agency: ${notif.title}`, {
          body: notif.message,
          icon: '/favicon.ico'
        });
      } catch {
        // Ignore notification errors in iframe
      }
    }
  };

  // Check budget limits whenever transactions change
  useEffect(() => {
    const currentMonthPrefix = new Date().toISOString().slice(0, 7); // e.g. "2026-10"
    budgets.forEach(b => {
      const spent = transactions
        .filter(t => t.type === 'expense' && t.category === b.category && t.date.startsWith(currentMonthPrefix))
        .reduce((sum, t) => sum + t.amount, 0);

      const ratio = b.monthlyLimit > 0 ? (spent / b.monthlyLimit) * 100 : 0;
      if (ratio >= 100) {
        // Check if alert already sent recently
        const alreadyAlerted = notifications.some(
          n => n.title.includes('Melebihi Anggaran') && n.message.includes(b.category)
        );
        if (!alreadyAlerted) {
          sendNotification({
            title: `🚨 Peringatan: Melebihi Anggaran ${b.category}`,
            message: `Pengeluaran ${b.category} bulan ini mencapai Rp ${spent.toLocaleString('id-ID')} (melewati batas Rp ${b.monthlyLimit.toLocaleString('id-ID')}).`,
            type: 'alert',
            linkTab: 'budgets',
            targetAudience: 'internal'
          });
        }
      }
    });
  }, [transactions, budgets]);

  // Transaction Actions
  const addTransaction = (tx: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...tx,
      id: `tx-${Date.now()}`
    };
    setTransactions(prev => [newTx, ...prev]);

    sendNotification({
      title: tx.type === 'income' ? 'Pemasukan Baru Dicatat' : tx.type === 'expense' ? 'Pengeluaran Baru Dicatat' : 'Setoran Modal Dicatat',
      message: `${tx.title}: Rp ${tx.amount.toLocaleString('id-ID')} (${tx.category})`,
      type: tx.type === 'income' ? 'success' : tx.type === 'capital' ? 'info' : 'warning',
      linkTab: 'transactions',
      targetAudience: 'internal'
    });
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // Quotation Actions
  const addQuotation = (q: Omit<Quotation, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newId = `quot-${Date.now()}`;
    const now = new Date().toISOString();
    const newQuotation: Quotation = {
      ...q,
      id: newId,
      createdAt: now,
      updatedAt: now
    };
    setQuotations(prev => [newQuotation, ...prev]);

    sendNotification({
      title: `Quotation Baru Dibuat: ${q.quotationNumber}`,
      message: `Penawaran untuk ${q.clientName} senilai Rp ${q.grandTotal.toLocaleString('id-ID')} telah diterbitkan.`,
      type: 'info',
      linkTab: 'quotations',
      targetAudience: 'both'
    });

    return newId;
  };

  const updateQuotationStatus = (id: string, status: QuotationStatus) => {
    setQuotations(prev =>
      prev.map(q => {
        if (q.id === id) {
          const updated = { ...q, status, updatedAt: new Date().toISOString() };
          return updated;
        }
        return q;
      })
    );

    const q = quotations.find(item => item.id === id);
    if (q) {
      sendNotification({
        title: `Status Quotation Diperbarui: ${q.quotationNumber}`,
        message: `Status penawaran ke ${q.clientName} berubah menjadi "${status.toUpperCase()}".`,
        type: status === 'approved' ? 'success' : 'info',
        linkTab: 'quotations',
        targetAudience: 'both'
      });
    }
  };

  const convertQuotationToInvoice = (quotationId: string) => {
    const q = quotations.find(item => item.id === quotationId);
    if (!q) return '';

    const invId = `inv-${Date.now()}`;
    const now = new Date().toISOString();
    const invNumber = `IN/${String(invoices.length + 1).padStart(3, '0')}/SOL/${new Date().getFullYear()}`;
    const dpVal = Math.round(q.grandTotal * (q.downPaymentPercent / 100));
    const finalVal = q.grandTotal - dpVal;

    const newInvoice: Invoice = {
      id: invId,
      invoiceNumber: invNumber,
      quotationId: q.id,
      dateIssued: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      clientName: q.clientName,
      clientContactPerson: q.clientContactPerson,
      clientEmail: q.clientEmail,
      clientAddress: q.clientAddress,
      projectName: q.projectName,
      items: q.items,
      grandTotal: q.grandTotal,
      grandTotalInWords: q.grandTotalInWords,
      dpAmount: dpVal,
      dpStatus: 'unpaid',
      finalPaymentAmount: finalVal,
      finalPaymentStatus: 'unpaid',
      status: 'unpaid',
      terms: q.terms,
      bankAccount: q.bankAccount,
      preparedBy: currentUser.name,
      createdAt: now,
      updatedAt: now
    };

    setInvoices(prev => [newInvoice, ...prev]);
    
    // Update quotation status to converted
    setQuotations(prev =>
      prev.map(item =>
        item.id === quotationId
          ? { ...item, status: 'converted', convertedInvoiceId: invId, updatedAt: now }
          : item
      )
    );

    sendNotification({
      title: `⚡ Invoice Diterbitkan: ${invNumber}`,
      message: `Quotation ${q.quotationNumber} berhasil dikonversi menjadi Invoice untuk ${q.clientName}. Tagihan siap dikirim!`,
      type: 'success',
      linkTab: 'invoices',
      targetAudience: 'both'
    });

    return invId;
  };

  const deleteQuotation = (id: string) => {
    setQuotations(prev => prev.filter(q => q.id !== id));
  };

  // Invoice Actions
  const addInvoice = (inv: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newId = `inv-${Date.now()}`;
    const now = new Date().toISOString();
    const newInvoice: Invoice = {
      ...inv,
      id: newId,
      createdAt: now,
      updatedAt: now
    };
    setInvoices(prev => [newInvoice, ...prev]);

    sendNotification({
      title: `Invoice Baru Dibuat: ${inv.invoiceNumber}`,
      message: `Invoice tagihan untuk ${inv.clientName} senilai Rp ${inv.grandTotal.toLocaleString('id-ID')} siap dikirim.`,
      type: 'info',
      linkTab: 'invoices',
      targetAudience: 'both'
    });

    return newId;
  };

  const updateInvoiceStatus = (id: string, status: InvoiceStatus) => {
    setInvoices(prev =>
      prev.map(inv => (inv.id === id ? { ...inv, status, updatedAt: new Date().toISOString() } : inv))
    );
  };

  const recordInvoicePayment = (invoiceId: string, paymentType: 'dp' | 'final') => {
    const inv = invoices.find(i => i.id === invoiceId);
    if (!inv) return;

    const today = new Date().toISOString().split('T')[0];
    let updatedInv: Invoice;

    if (paymentType === 'dp') {
      updatedInv = {
        ...inv,
        dpStatus: 'paid',
        dpPaidDate: today,
        status: inv.finalPaymentStatus === 'paid' ? 'paid' : 'dp_paid',
        updatedAt: new Date().toISOString()
      };

      // Automatically record income transaction!
      addTransaction({
        type: 'income',
        category: 'Pendapatan Proyek Klien',
        title: `DP 50% ${inv.clientName} (${inv.invoiceNumber})`,
        amount: inv.dpAmount,
        date: today,
        status: 'completed',
        paymentMethod: 'Bank Mandiri',
        recordedBy: currentUser.name,
        notes: `Pembayaran DP 50% Invoice ${inv.invoiceNumber} untuk proyek ${inv.projectName}`,
        invoiceId: inv.id,
        quotationId: inv.quotationId
      });

      sendNotification({
        title: `🎉 DP 50% Diterima (${inv.invoiceNumber})`,
        message: `Pembayaran DP Rp ${inv.dpAmount.toLocaleString('id-ID')} dari ${inv.clientName} otomatis masuk ke Arus Kas real-time.`,
        type: 'success',
        linkTab: 'invoices',
        targetAudience: 'both'
      });
    } else {
      updatedInv = {
        ...inv,
        finalPaymentStatus: 'paid',
        finalPaymentDate: today,
        status: 'paid',
        updatedAt: new Date().toISOString()
      };

      // Automatically record income transaction!
      addTransaction({
        type: 'income',
        category: 'Pendapatan Proyek Klien',
        title: `Pelunasan 50% ${inv.clientName} (${inv.invoiceNumber})`,
        amount: inv.finalPaymentAmount,
        date: today,
        status: 'completed',
        paymentMethod: 'Bank Mandiri',
        recordedBy: currentUser.name,
        notes: `Pelunasan Akhir 50% Invoice ${inv.invoiceNumber} untuk proyek ${inv.projectName}`,
        invoiceId: inv.id,
        quotationId: inv.quotationId
      });

      sendNotification({
        title: `🚀 Invoice LUNAS: ${inv.invoiceNumber}`,
        message: `Pelunasan Rp ${inv.finalPaymentAmount.toLocaleString('id-ID')} diterima. Proyek ${inv.projectName} resmi selesai dan lunas!`,
        type: 'success',
        linkTab: 'invoices',
        targetAudience: 'both'
      });
    }

    setInvoices(prev => prev.map(i => (i.id === invoiceId ? updatedInv : i)));
  };

  const deleteInvoice = (id: string) => {
    setInvoices(prev => prev.filter(i => i.id !== id));
  };

  // Budgets
  const updateBudgetLimit = (id: string, newLimit: number, threshold = 80) => {
    setBudgets(prev =>
      prev.map(b => (b.id === id ? { ...b, monthlyLimit: newLimit, warningThresholdPercent: threshold } : b))
    );
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Calculations
  const totalCapital = transactions
    .filter(t => t.type === 'capital')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const currentCashBalance = totalCapital + totalIncome - totalExpense;
  const operationalNetProfit = totalIncome - totalExpense;

  const totalReceivables = invoices.reduce((sum, inv) => {
    let due = 0;
    if (inv.dpStatus === 'unpaid') due += inv.dpAmount;
    if (inv.finalPaymentStatus === 'unpaid') due += inv.finalPaymentAmount;
    return sum + due;
  }, 0);

  const currentMonthPrefix = new Date().toISOString().slice(0, 7);
  const budgetAlerts = budgets.map(b => {
    const spent = transactions
      .filter(t => t.type === 'expense' && t.category === b.category && t.date.startsWith(currentMonthPrefix))
      .reduce((sum, t) => sum + t.amount, 0);
    const percent = b.monthlyLimit > 0 ? (spent / b.monthlyLimit) * 100 : 0;
    return {
      category: b.category,
      spent,
      limit: b.monthlyLimit,
      percent,
      isOver: percent >= 100
    };
  });

  const switchDataPreset = (preset: DataPresetMode) => {
    let selected;
    if (preset === 'demo') {
      selected = demoPreset;
    } else if (preset === 'blank') {
      selected = blankPreset;
    } else {
      selected = internalPreset;
    }

    setDataPresetMode(preset);
    setCompanyInfo(selected.companyInfo);
    setUsers(selected.users);
    setCurrentUser(selected.users[0]);
    setTransactions(selected.transactions);
    setQuotations(selected.quotations);
    setInvoices(selected.invoices);
    setBudgets(selected.budgets);
    setNotifications(selected.notifications);

    localStorage.setItem(STORAGE_KEYS.PRESET_MODE, preset);
    localStorage.setItem(STORAGE_KEYS.COMPANY_INFO, JSON.stringify(selected.companyInfo));
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(selected.users));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, selected.users[0].id);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(selected.transactions));
    localStorage.setItem(STORAGE_KEYS.QUOTATIONS, JSON.stringify(selected.quotations));
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(selected.invoices));
    localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(selected.budgets));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(selected.notifications));

    const modeLabels: Record<DataPresetMode, string> = {
      internal: 'Versi 1: Internal SOL Agency (Data Riil)',
      demo: 'Versi 2: Showcase Calon Pembeli (Data Fiktif Aman)',
      blank: 'Versi 3: Bersih Kosong (Clean Slate - Rp 0)'
    };

    sendNotification({
      title: 'Mode Data Berhasil Dialihkan',
      message: `Aplikasi sekarang aktif di "${modeLabels[preset]}".`,
      type: 'info',
      targetAudience: 'both'
    });
  };

  const loginUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, user.id);
    }
    setIsAuthenticated(true);
    localStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, 'true');
    sendNotification({
      title: 'Selamat Datang!',
      message: `Login berhasil sebagai ${user?.name || 'User'} (${user?.title || 'Tim Internal'}).`,
      type: 'success',
      targetAudience: 'internal'
    });
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    localStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, 'false');
    sendNotification({
      title: 'Sesi Terkunci / Keluar',
      message: 'Anda telah keluar dari sesi internal SOL Agency. Silakan login kembali untuk mengakses data.',
      type: 'info',
      targetAudience: 'internal'
    });
  };

  const lockSession = () => {
    logoutUser();
  };

  const resetToDefaultData = () => {
    switchDataPreset('internal');
  };

  return (
    <AppContext.Provider
      value={{
        companyInfo,
        users,
        currentUser,
        setCurrentUser,
        switchUserRole,
        updateUser,
        addUser,
        deleteUser,
        isEditUserModalOpen,
        setIsEditUserModalOpen,
        editingUser,
        openEditUserModal,
        activeTab,
        setActiveTab,
        previewDoc,
        setPreviewDoc,
        isAuthModalOpen,
        setIsAuthModalOpen,
        transactions,
        addTransaction,
        deleteTransaction,
        quotations,
        addQuotation,
        updateQuotationStatus,
        convertQuotationToInvoice,
        deleteQuotation,
        invoices,
        addInvoice,
        updateInvoiceStatus,
        recordInvoicePayment,
        deleteInvoice,
        budgets,
        updateBudgetLimit,
        notifications,
        markNotificationRead,
        clearAllNotifications,
        sendNotification,
        totalCapital,
        totalIncome,
        totalExpense,
        currentCashBalance,
        operationalNetProfit,
        totalReceivables,
        budgetAlerts,
        resetToDefaultData,
        dataPresetMode,
        switchDataPreset,
        isDemoSettingsModalOpen,
        setIsDemoSettingsModalOpen,
        isAuthenticated,
        setIsAuthenticated,
        loginUser,
        logoutUser,
        lockSession
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
