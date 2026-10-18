export type TransactionType = 'income' | 'expense' | 'capital';

export interface Transaction {
  id: string;
  type: TransactionType;
  category: string;
  title: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending';
  paymentMethod: string;
  recordedBy: string;
  notes?: string;
  invoiceId?: string;
  quotationId?: string;
}

export interface QuotationItem {
  id: string;
  itemNumber: number;
  title: string;
  deliverables: string[];
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

export type QuotationStatus = 'draft' | 'sent' | 'approved' | 'converted' | 'declined';

export interface Quotation {
  id: string;
  quotationNumber: string;
  dateIssued: string;
  clientName: string;
  clientContactPerson: string;
  clientEmail?: string;
  clientAddress?: string;
  projectName: string;
  items: QuotationItem[];
  grandTotal: number;
  grandTotalInWords: string;
  downPaymentPercent: number;
  status: QuotationStatus;
  terms: string[];
  bankAccount: BankDetails;
  preparedBy: string;
  convertedInvoiceId?: string;
  createdAt: string;
  updatedAt: string;
}

export type InvoiceStatus = 'unpaid' | 'dp_paid' | 'paid' | 'overdue';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  quotationId?: string;
  dateIssued: string;
  dueDate: string;
  clientName: string;
  clientContactPerson: string;
  clientEmail?: string;
  clientAddress?: string;
  projectName: string;
  items: QuotationItem[];
  grandTotal: number;
  grandTotalInWords: string;
  dpAmount: number;
  dpPaidDate?: string;
  dpStatus: 'unpaid' | 'paid';
  finalPaymentAmount: number;
  finalPaymentDate?: string;
  finalPaymentStatus: 'unpaid' | 'paid';
  status: InvoiceStatus;
  terms: string[];
  bankAccount: BankDetails;
  preparedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface BudgetLimit {
  id: string;
  category: string;
  monthlyLimit: number;
  warningThresholdPercent: number; // default 80%
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'warning' | 'info' | 'success' | 'alert';
  timestamp: string;
  read: boolean;
  linkTab?: string;
  targetAudience: 'both' | 'internal' | 'client';
}

export type UserRole = 'founder_ceo' | 'founder_partner' | 'client';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  company: string;
  avatar: string;
  isLoggedIn: boolean;
  authProvider: 'google_sso' | 'internal';
}

export type DataPresetMode = 'internal' | 'demo' | 'blank';

export interface CompanyInfo {
  name: string;
  legalName: string;
  brandTagline: string;
  email: string;
  contactEmail: string;
  website: string;
  phone: string;
  founder: string;
  partner: string;
  bankAccount: BankDetails;
}

