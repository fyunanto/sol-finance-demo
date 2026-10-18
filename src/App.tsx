import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { TransactionsView } from './components/TransactionsView';
import { ProfitLossView } from './components/ProfitLossView';
import { BudgetView } from './components/BudgetView';
import { QuotationView } from './components/QuotationView';
import { InvoiceView } from './components/InvoiceView';
import { TeamRbacView } from './components/TeamRbacView';
import { DocumentPrintModal } from './components/DocumentPrintModal';
import { AuthModal } from './components/AuthModal';
import { EditUserModal } from './components/EditUserModal';
import { NewTransactionModal } from './components/NewTransactionModal';
import { NewQuotationModal } from './components/NewQuotationModal';
import { DualRepoDemoModal } from './components/DualRepoDemoModal';
import { InternalLoginView } from './components/InternalLoginView';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab, currentUser, isAuthenticated } = useApp();
  const [isNewTxModalOpen, setIsNewTxModalOpen] = useState(false);
  const [isNewQuotModalOpen, setIsNewQuotModalOpen] = useState(false);

  // Jika belum login / sesi terkunci, tampilkan Layar Login Internal SOL Agency
  if (!isAuthenticated) {
    return <InternalLoginView />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        onOpenNewTransaction={() => setIsNewTxModalOpen(true)}
        onOpenNewQuotation={() => setIsNewQuotModalOpen(true)}
      />

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Main Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && (
            <DashboardView
              onOpenNewTransaction={() => setIsNewTxModalOpen(true)}
              onOpenNewQuotation={() => setIsNewQuotModalOpen(true)}
            />
          )}

          {activeTab === 'transactions' && (
            <TransactionsView
              isOpenModal={isNewTxModalOpen}
              onOpenModal={() => setIsNewTxModalOpen(true)}
              onCloseModal={() => setIsNewTxModalOpen(false)}
            />
          )}

          {activeTab === 'profit_loss' && <ProfitLossView />}

          {activeTab === 'budgets' && <BudgetView />}

          {activeTab === 'quotations' && (
            <QuotationView
              isOpenNewModal={isNewQuotModalOpen}
              onOpenNewModal={() => setIsNewQuotModalOpen(true)}
              onCloseNewModal={() => setIsNewQuotModalOpen(false)}
            />
          )}

          {activeTab === 'invoices' && <InvoiceView />}

          {activeTab === 'team_rbac' && <TeamRbacView />}
        </main>
      </div>

      {/* Global Modals & Print Overlay */}
      <DocumentPrintModal />
      <AuthModal />
      <EditUserModal />
      <DualRepoDemoModal />
      <NewTransactionModal
        isOpen={isNewTxModalOpen}
        onClose={() => setIsNewTxModalOpen(false)}
      />
      <NewQuotationModal
        isOpen={isNewQuotModalOpen}
        onClose={() => setIsNewQuotModalOpen(false)}
      />
    </div>
  );
};


export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
