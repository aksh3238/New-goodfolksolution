import React, { useState, useEffect } from 'react';
import {
  adminApi,
  DashboardStats,
  Client,
  Project,
  Invoice,
  Payment,
  UpiSettings,
} from '../../services/adminService';
import { GoodfolkLogo } from '../../components/GoodfolkLogo';
import { InvoiceViewModal } from '../../components/admin/InvoiceViewModal';
import { ReceiptViewModal } from '../../components/admin/ReceiptViewModal';
import { UpiQrCode } from '../../components/UpiQrCode';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  FileText,
  CreditCard,
  Mail,
  Shield,
  LogOut,
  Plus,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Search,
  Receipt,
  ArrowUpRight,
  Eye,
  Check,
  X,
  QrCode as QrIcon,
  Save,
  CheckCircle,
  XCircle,
  RotateCcw,
} from 'lucide-react';

interface AdminDashboardPageProps {
  onLogout: () => void;
  onNavigateHome: () => void;
}

type TabType = 'overview' | 'clients' | 'projects' | 'invoices' | 'payments' | 'enquiries' | 'upi';

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  onLogout,
  onNavigateHome,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [upiSettings, setUpiSettings] = useState<UpiSettings>({
    upiId: '9817961412@upi',
    payeeName: 'Goodfolk Solution',
    bankName: 'HDFC Bank',
    accountNumber: '50200084918231',
    ifscCode: 'HDFC0001234',
    contactPhone: '+91 9817961412',
    notes: 'Direct personal UPI transfers to Akshay / Goodfolk Solution.',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [selectedInvoiceForView, setSelectedInvoiceForView] = useState<Invoice | null>(null);
  const [selectedPaymentForView, setSelectedPaymentForView] = useState<Payment | null>(null);

  // Forms Modals
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [showAddInvoiceModal, setShowAddInvoiceModal] = useState(false);
  const [showRecordPaymentModal, setShowRecordPaymentModal] = useState(false);

  // Preselected invoice for recording payment
  const [paymentFormInvoiceId, setPaymentFormInvoiceId] = useState<string>('');

  // Form states
  const [newClient, setNewClient] = useState({ name: '', company: '', email: '', mobile: '', notes: '' });
  const [newProject, setNewProject] = useState({
    clientId: '',
    projectName: '',
    service: 'Branding & Packaging',
    startDate: new Date().toISOString().split('T')[0],
    deadline: '',
    status: 'in_progress' as const,
    agreedPrice: '',
    deliverables: '',
  });
  const [newInvoice, setNewInvoice] = useState({
    projectId: '',
    amount: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    notes: '',
    itemDesc: '',
  });
  const [newPayment, setNewPayment] = useState<{
    invoiceId: string;
    amount: string;
    paymentType: 'advance' | 'instalment' | 'final_settlement';
    paymentMethod: 'upi' | 'bank_transfer' | 'cash';
    transactionRef: string;
    paymentDate: string;
    notes: string;
  }>({
    invoiceId: '',
    amount: '',
    paymentType: 'instalment',
    paymentMethod: 'upi',
    transactionRef: '',
    paymentDate: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [isSavingUpi, setIsSavingUpi] = useState(false);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [statsData, clientsData, projectsData, invoicesData, paymentsData, enquiriesData, upiData] =
        await Promise.all([
          adminApi.getDashboardStats(),
          adminApi.getClients(),
          adminApi.getProjects(),
          adminApi.getInvoices(),
          adminApi.getPayments(),
          adminApi.getEnquiries(),
          adminApi.getUpiSettings(),
        ]);

      setStats(statsData);
      setClients(clientsData);
      setProjects(projectsData);
      setInvoices(invoicesData);
      setPayments(paymentsData);
      setEnquiries(enquiriesData);
      if (upiData) setUpiSettings(upiData);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Handlers
  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    try {
      await adminApi.createClient(newClient);
      setShowAddClientModal(false);
      setNewClient({ name: '', company: '', email: '', mobile: '', notes: '' });
      setFormSuccess('Client added successfully!');
      setTimeout(() => setFormSuccess(null), 3000);
      loadAllData();
    } catch (err: any) {
      setFormError(err.message || 'Error creating client');
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    try {
      const deliverablesList = newProject.deliverables
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      await adminApi.createProject({
        ...newProject,
        agreedPrice: Number(newProject.agreedPrice),
        deliverables: deliverablesList,
      });
      setShowAddProjectModal(false);
      setNewProject({
        clientId: '',
        projectName: '',
        service: 'Branding & Packaging',
        startDate: new Date().toISOString().split('T')[0],
        deadline: '',
        status: 'in_progress',
        agreedPrice: '',
        deliverables: '',
      });
      setFormSuccess('Project created successfully!');
      setTimeout(() => setFormSuccess(null), 3000);
      loadAllData();
    } catch (err: any) {
      setFormError(err.message || 'Error creating project');
    }
  };

  const handleAddInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    try {
      const amountNum = Number(newInvoice.amount);
      const items = newInvoice.itemDesc
        ? [{ description: newInvoice.itemDesc, amount: amountNum }]
        : undefined;

      await adminApi.createInvoice({
        projectId: newInvoice.projectId,
        amount: amountNum,
        issueDate: newInvoice.issueDate,
        dueDate: newInvoice.dueDate,
        notes: newInvoice.notes,
        items,
      });
      setShowAddInvoiceModal(false);
      setNewInvoice({
        projectId: '',
        amount: '',
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: '',
        notes: '',
        itemDesc: '',
      });
      setFormSuccess('Invoice generated successfully!');
      setTimeout(() => setFormSuccess(null), 3000);
      loadAllData();
    } catch (err: any) {
      setFormError(err.message || 'Error creating invoice');
    }
  };

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    try {
      const res = await adminApi.recordPayment({
        invoiceId: newPayment.invoiceId || paymentFormInvoiceId,
        amount: Number(newPayment.amount),
        paymentType: newPayment.paymentType,
        paymentMethod: newPayment.paymentMethod,
        transactionRef: newPayment.transactionRef,
        paymentDate: newPayment.paymentDate,
        notes: newPayment.notes,
        recordedBy: 'Akshay',
      });

      setShowRecordPaymentModal(false);
      setNewPayment({
        invoiceId: '',
        amount: '',
        paymentType: 'instalment',
        paymentMethod: 'upi',
        transactionRef: '',
        paymentDate: new Date().toISOString().split('T')[0],
        notes: '',
      });
      setFormSuccess(`Payment recorded! Voucher ${res.payment.receiptNumber} generated.`);
      setTimeout(() => setFormSuccess(null), 4000);
      loadAllData();
      setSelectedPaymentForView(res.payment);
    } catch (err: any) {
      setFormError(err.message || 'Error recording payment');
    }
  };

  const handleVerifyPayment = async (paymentId: string) => {
    if (!confirm('Verify that this remittance has been received in your UPI/Bank account?')) return;
    try {
      const res = await adminApi.verifyPayment(paymentId);
      setFormSuccess(res.message);
      setTimeout(() => setFormSuccess(null), 4000);
      loadAllData();
      if (res.payment) setSelectedPaymentForView(res.payment);
    } catch (err: any) {
      alert(err.message || 'Failed to verify payment');
    }
  };

  const handleRejectPayment = async (paymentId: string) => {
    const reason = prompt('Please enter the reason for rejection (e.g. UTR not found in bank statement, amount mismatch):');
    if (reason === null) return;
    try {
      const res = await adminApi.rejectPayment(paymentId, reason);
      setFormSuccess(res.message);
      setTimeout(() => setFormSuccess(null), 3000);
      loadAllData();
    } catch (err: any) {
      alert(err.message || 'Failed to reject payment');
    }
  };

  const handleSaveUpiSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingUpi(true);
    setFormError(null);
    try {
      await adminApi.updateUpiSettings(upiSettings);
      setFormSuccess('UPI ID and payment remittance settings saved successfully!');
      setTimeout(() => setFormSuccess(null), 3500);
      loadAllData();
    } catch (err: any) {
      setFormError(err.message || 'Failed to update UPI settings');
    } finally {
      setIsSavingUpi(false);
    }
  };

  const handleConvertEnquiry = async (enquiryId: string) => {
    if (!confirm('Convert this enquiry into a new active client and draft project?')) return;
    try {
      await adminApi.convertEnquiry(enquiryId);
      setFormSuccess('Enquiry successfully converted to client and project!');
      setTimeout(() => setFormSuccess(null), 3000);
      loadAllData();
    } catch (err: any) {
      alert(err.message || 'Failed to convert enquiry');
    }
  };

  const handleOpenPaymentForInvoice = (inv: Invoice) => {
    setPaymentFormInvoiceId(inv.id);
    setNewPayment((prev) => ({
      ...prev,
      invoiceId: inv.id,
      amount: String(inv.balanceAmount),
      paymentType: inv.paidAmount === 0 ? 'advance' : 'instalment',
    }));
    setShowRecordPaymentModal(true);
  };

  const pendingPaymentsList = payments.filter((p) => p.status === 'pending_verification');
  const verifiedPaymentsList = payments.filter((p) => p.status === 'verified');
  const rejectedPaymentsList = payments.filter((p) => p.status === 'rejected');

  return (
    <div className="min-h-screen bg-[#F7F7F5] flex flex-col font-sans">
      {/* Top Admin Header Bar */}
      <header className="bg-[#123578] text-white border-b border-[#0c2452] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Brand + Staff Pill */}
            <div className="flex items-center gap-3">
              <GoodfolkLogo variant="dark" size="md" />
              <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 text-white text-xs font-mono font-medium border border-white/10">
                <Shield className="w-3.5 h-3.5 text-[#ED650B]" />
                ADMIN SUITE
              </div>
            </div>

            {/* Right: Actions & User */}
            <div className="flex items-center gap-4">
              <button
                onClick={loadAllData}
                disabled={isLoading}
                className="p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors focus:outline-none"
                title="Refresh Database"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>

              <button
                onClick={onNavigateHome}
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white bg-white/10 px-3 py-1.5 rounded-lg transition-colors border border-white/10"
              >
                <span>View Public Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <div className="h-6 w-px bg-white/20" />

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#ED650B] text-white flex items-center justify-center font-bold text-xs">
                  A
                </div>
                <div className="hidden md:block text-left text-xs leading-tight">
                  <div className="font-semibold text-white">Akshay</div>
                  <div className="text-[10px] text-white/60">Accounts & Lead Review</div>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="p-2 text-white/70 hover:text-rose-300 rounded-lg hover:bg-white/10 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="bg-[#0c2452] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none text-xs font-medium">
              {[
                { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                { id: 'clients', label: `Clients (${clients.length})`, icon: Users },
                { id: 'projects', label: `Projects (${projects.length})`, icon: FolderKanban },
                { id: 'invoices', label: `Invoices (${invoices.length})`, icon: FileText },
                {
                  id: 'payments',
                  label: `Payments (${payments.length})`,
                  icon: CreditCard,
                  badge: pendingPaymentsList.length > 0 ? pendingPaymentsList.length : undefined,
                },
                { id: 'enquiries', label: `Enquiries (${enquiries.length})`, icon: Mail },
                { id: 'upi', label: 'UPI & Bank Settings', icon: QrIcon },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap transition-colors relative ${
                      isActive
                        ? 'bg-[#ED650B] text-white font-semibold shadow-xs'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span className="ml-1 bg-amber-400 text-amber-950 px-1.5 py-0.2 rounded-full text-[10px] font-bold">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Global Success Notification */}
        {formSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-800 text-xs sm:text-sm font-semibold flex items-center justify-between shadow-xs animate-in fade-in duration-150">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{formSuccess}</span>
            </div>
            <button onClick={() => setFormSuccess(null)} className="text-emerald-600 hover:text-emerald-900">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && stats && (
          <div className="space-y-8 animate-in fade-in duration-150">
            {/* Pending UTR Verification Action Banner if any exist */}
            {pendingPaymentsList.length > 0 && (
              <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold">
                    {pendingPaymentsList.length}
                  </div>
                  <div>
                    <strong className="text-sm">Client UTR Submissions Pending Review</strong>
                    <p className="text-amber-800 text-xs">
                      Clients have submitted {pendingPaymentsList.length} payment references totaling ₹
                      {stats.summary.pendingVerificationAmount.toLocaleString('en-IN')}. Verify against your bank statement to credit invoices.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('payments')}
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shrink-0"
                >
                  Review Pending Payments →
                </button>
              </div>
            )}

            {/* Metric KPI Cards (4 columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-heading">
                    Total Contracted
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#123578] flex items-center justify-center">
                    <Receipt className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#123578]">
                    ₹{stats.summary.totalRevenue.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Across {stats.summary.projectCount} client scopes</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-heading">
                    Verified Received
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-700">
                    ₹{stats.summary.totalPaid.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {Math.round((stats.summary.totalPaid / (stats.summary.totalRevenue || 1)) * 100)}% verified in bank
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-heading">
                    Outstanding Balance
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#ED650B] flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#ED650B]">
                    ₹{stats.summary.pendingPayments.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Due across active milestone terms</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-heading">
                    Overdue Invoices
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-700">
                    ₹{stats.summary.overdueAmount.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-rose-600 font-medium mt-1">
                    {stats.summary.overdueCount} {stats.summary.overdueCount === 1 ? 'invoice' : 'invoices'} past due date
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Strip */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase text-slate-400 font-mono">Quick Admin Actions:</span>
                <button
                  onClick={() => setShowAddClientModal(true)}
                  className="bg-[#123578] hover:bg-[#0c2452] text-white text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Client
                </button>
                <button
                  onClick={() => setShowAddProjectModal(true)}
                  className="bg-[#123578] hover:bg-[#0c2452] text-white text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Project
                </button>
                <button
                  onClick={() => setShowAddInvoiceModal(true)}
                  className="bg-[#123578] hover:bg-[#0c2452] text-white text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Generate Invoice
                </button>
                <button
                  onClick={() => {
                    setPaymentFormInvoiceId('');
                    setShowRecordPaymentModal(true);
                  }}
                  className="bg-[#ED650B] hover:bg-[#d95605] text-white text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <CreditCard className="w-3.5 h-3.5" /> Direct Verified Payment
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <span>Active UPI ID:</span>
                <strong className="text-[#123578] bg-slate-100 px-2 py-0.5 rounded">{upiSettings.upiId}</strong>
              </div>
            </div>

            {/* Split Row: Verified Remittances + Pipeline */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-extrabold text-lg text-[#123578] flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-[#ED650B]" />
                    Verified Payment Remittances
                  </h3>
                  <button
                    onClick={() => setActiveTab('payments')}
                    className="text-xs font-semibold text-[#123578] hover:text-[#ED650B] flex items-center gap-1"
                  >
                    View All ({payments.length}) <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 uppercase font-mono text-[10px]">
                        <th className="py-2.5 px-3">Receipt / Date</th>
                        <th className="py-2.5 px-3">Client & Company</th>
                        <th className="py-2.5 px-3">Transaction UTR</th>
                        <th className="py-2.5 px-3 text-right">Amount</th>
                        <th className="py-2.5 px-3 text-center">Receipt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {verifiedPaymentsList.slice(0, 5).map((pay) => (
                        <tr key={pay.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3 px-3">
                            <span className="font-mono font-bold text-[#123578]">{pay.receiptNumber}</span>
                            <div className="text-[10px] text-slate-400">{pay.paymentDate}</div>
                          </td>
                          <td className="py-3 px-3">
                            <div className="font-semibold text-slate-800">{pay.clientName}</div>
                            <div className="text-[10px] text-slate-500">{pay.company}</div>
                          </td>
                          <td className="py-3 px-3">
                            <span className="font-mono text-slate-700 font-semibold">{pay.transactionRef}</span>
                            <div className="text-[10px] text-slate-400 uppercase font-mono">{pay.paymentMethod}</div>
                          </td>
                          <td className="py-3 px-3 text-right font-mono font-extrabold text-emerald-700 text-sm">
                            ₹{pay.amount.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3 px-3 text-center">
                            <button
                              onClick={() => setSelectedPaymentForView(pay)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#123578] hover:text-white transition-colors"
                              title="View & Print Official Receipt"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right: Pipeline */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
                <h3 className="font-heading font-extrabold text-lg text-[#123578] flex items-center gap-2">
                  <FolderKanban className="w-5 h-5 text-[#ED650B]" />
                  Active Project Pipeline
                </h3>

                <div className="space-y-3">
                  {[
                    { label: 'In Progress', count: stats.projectsByStatus.in_progress, color: 'bg-blue-600', text: 'text-blue-700' },
                    { label: 'Client Review', count: stats.projectsByStatus.review, color: 'bg-purple-600', text: 'text-purple-700' },
                    { label: 'Discovery / Briefing', count: stats.projectsByStatus.discovery, color: 'bg-amber-500', text: 'text-amber-700' },
                    { label: 'Completed', count: stats.projectsByStatus.completed, color: 'bg-emerald-600', text: 'text-emerald-700' },
                    { label: 'On Hold', count: stats.projectsByStatus.on_hold, color: 'bg-slate-400', text: 'text-slate-600' },
                  ].map((st) => (
                    <div key={st.label} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${st.color}`} />
                        <span className="text-xs font-semibold text-slate-700">{st.label}</span>
                      </div>
                      <span className={`font-mono font-bold text-sm ${st.text}`}>
                        {st.count}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setActiveTab('projects')}
                    className="w-full py-2.5 text-xs font-semibold text-[#123578] bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-center"
                  >
                    Manage All Projects →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. CLIENTS TAB */}
        {activeTab === 'clients' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-heading font-extrabold text-[#123578]">
                  Clients Database ({clients.length})
                </h2>
                <p className="text-xs text-slate-500">
                  Manage client accounts, contact profiles, and associated projects
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search clients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                  />
                </div>
                <button
                  onClick={() => setShowAddClientModal(true)}
                  className="bg-[#ED650B] hover:bg-[#d95605] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4" /> Add Client
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clients
                .filter(
                  (c) =>
                    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    c.email.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((client) => {
                  const clientProjects = projects.filter((p) => p.clientId === client.id);
                  const clientInvoices = invoices.filter((inv) => inv.clientId === client.id);
                  const clientTotalInvoiced = clientInvoices.reduce((a, b) => a + b.amount, 0);
                  const clientBalance = clientInvoices.reduce((a, b) => a + b.balanceAmount, 0);

                  return (
                    <div
                      key={client.id}
                      className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                          <span>{client.id}</span>
                          <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">Active Client</span>
                        </div>
                        <h3 className="font-heading font-extrabold text-lg text-[#123578]">
                          {client.name}
                        </h3>
                        <p className="text-xs font-semibold text-slate-700">{client.company}</p>

                        <div className="mt-4 space-y-1.5 text-xs text-slate-500 font-mono">
                          <div>Email: <span className="text-slate-800">{client.email}</span></div>
                          <div>Phone: <span className="text-slate-800">{client.mobile}</span></div>
                        </div>

                        {client.notes && (
                          <p className="text-xs text-slate-500 italic mt-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                            “{client.notes}”
                          </p>
                        )}
                      </div>

                      <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
                        <div className="flex justify-between text-slate-600">
                          <span>Projects:</span>
                          <span className="font-bold text-[#123578]">{clientProjects.length}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Invoiced Total:</span>
                          <span className="font-mono font-bold text-slate-900">₹{clientTotalInvoiced.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Outstanding Balance:</span>
                          <span className="font-mono font-bold text-[#ED650B]">₹{clientBalance.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* 3. PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-heading font-extrabold text-[#123578]">
                  Project Management ({projects.length})
                </h2>
                <p className="text-xs text-slate-500">
                  Track client scopes, agreed budgets, start dates, deadlines, and delivery status
                </p>
              </div>

              <button
                onClick={() => setShowAddProjectModal(true)}
                className="bg-[#ED650B] hover:bg-[#d95605] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => {
                const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
                  in_progress: { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-700', label: 'In Progress' },
                  completed: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', label: 'Completed' },
                  review: { bg: 'bg-purple-50 border-purple-200', text: 'text-purple-700', label: 'In Review' },
                  discovery: { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', label: 'Discovery' },
                  on_hold: { bg: 'bg-slate-100 border-slate-200', text: 'text-slate-600', label: 'On Hold' },
                };
                const currentStatus = statusStyles[proj.status] || statusStyles.in_progress;

                return (
                  <div
                    key={proj.id}
                    className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-mono text-slate-400">{proj.id}</span>
                        <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${currentStatus.bg} ${currentStatus.text}`}>
                          {currentStatus.label}
                        </span>
                      </div>

                      <h3 className="font-heading font-extrabold text-lg text-[#123578] leading-snug">
                        {proj.projectName}
                      </h3>

                      <div className="mt-1 text-xs text-slate-600 font-medium">
                        {proj.clientName} · <span className="text-slate-800 font-bold">{proj.company}</span>
                      </div>

                      <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1.5 font-mono">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Agreed Price:</span>
                          <span className="font-bold text-[#123578]">₹{proj.agreedPrice.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Timeline:</span>
                          <span className="text-slate-700">{proj.startDate} → {proj.deadline || 'Flexible'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Service:</span>
                          <span className="text-slate-700 font-sans">{proj.service}</span>
                        </div>
                      </div>

                      {proj.deliverables && proj.deliverables.length > 0 && (
                        <div className="mt-3">
                          <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">
                            Key Deliverables
                          </div>
                          <ul className="text-xs text-slate-600 space-y-1">
                            {proj.deliverables.slice(0, 3).map((d, idx) => (
                              <li key={idx} className="flex items-center gap-1.5 truncate">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#ED650B]" />
                                <span className="truncate">{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <select
                        value={proj.status}
                        onChange={async (e) => {
                          const newSt = e.target.value as any;
                          await adminApi.updateProject(proj.id, { status: newSt });
                          loadAllData();
                        }}
                        className="text-xs font-semibold py-1.5 px-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none"
                      >
                        <option value="discovery">Discovery</option>
                        <option value="in_progress">In Progress</option>
                        <option value="review">In Review</option>
                        <option value="completed">Completed</option>
                        <option value="on_hold">On Hold</option>
                      </select>

                      <button
                        onClick={() => {
                          setNewInvoice((prev) => ({
                            ...prev,
                            projectId: proj.id,
                            amount: String(proj.agreedPrice),
                            itemDesc: proj.projectName,
                          }));
                          setShowAddInvoiceModal(true);
                        }}
                        className="text-xs font-semibold text-[#ED650B] hover:text-[#d95605] py-1 px-2"
                      >
                        + Generate Invoice
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. INVOICES TAB */}
        {activeTab === 'invoices' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-heading font-extrabold text-[#123578]">
                  Invoices & Quotations ({invoices.length})
                </h2>
                <p className="text-xs text-slate-500">
                  Generate, track, and print official client tax invoices and billing notices
                </p>
              </div>

              <button
                onClick={() => setShowAddInvoiceModal(true)}
                className="bg-[#ED650B] hover:bg-[#d95605] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Generate Invoice
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-mono text-[11px]">
                      <th className="py-3 px-4">Invoice #</th>
                      <th className="py-3 px-4">Client & Company</th>
                      <th className="py-3 px-4">Project</th>
                      <th className="py-3 px-4">Due Date</th>
                      <th className="py-3 px-4 text-right">Total</th>
                      <th className="py-3 px-4 text-right">Paid</th>
                      <th className="py-3 px-4 text-right">Balance</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#123578]">
                          {inv.invoiceNumber}
                          <div className="text-[10px] text-slate-400">{inv.issueDate}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-800">{inv.clientName}</div>
                          <div className="text-[10px] text-slate-500">{inv.company}</div>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-700 max-w-[200px] truncate" title={inv.projectName}>
                          {inv.projectName}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-600">
                          {inv.dueDate || 'Upon Receipt'}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                          ₹{inv.amount.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono text-emerald-700 font-semibold">
                          ₹{inv.paidAmount.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono font-bold text-[#ED650B]">
                          ₹{inv.balanceAmount.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              inv.status === 'paid'
                                ? 'bg-emerald-100 text-emerald-800'
                                : inv.status === 'partial'
                                ? 'bg-amber-100 text-amber-800'
                                : inv.status === 'overdue'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-blue-100 text-[#123578]'
                            }`}
                          >
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => setSelectedInvoiceForView(inv)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#123578] hover:text-white transition-colors"
                              title="View & Print Official Invoice"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <a
                              href={`/pay?invoice=${encodeURIComponent(inv.invoiceNumber)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#ED650B] hover:text-white transition-colors"
                              title="Open Client Payment Portal"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                            {inv.balanceAmount > 0 && (
                              <button
                                onClick={() => handleOpenPaymentForInvoice(inv)}
                                className="bg-[#ED650B] hover:bg-[#d95605] text-white text-[11px] font-semibold px-2 py-1 rounded-md transition-colors"
                                title="Direct record verified payment"
                              >
                                + Pay
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 5. PAYMENTS & UTR REVIEW TAB */}
        {activeTab === 'payments' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-heading font-extrabold text-[#123578]">
                  Payment Remittances & UTR Verification
                </h2>
                <p className="text-xs text-slate-500">
                  Review client-submitted UPI UTR references, manually credit verified funds, or record direct payments
                </p>
              </div>

              <button
                onClick={() => {
                  setPaymentFormInvoiceId('');
                  setShowRecordPaymentModal(true);
                }}
                className="bg-[#ED650B] hover:bg-[#d95605] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Direct Record Verified Payment
              </button>
            </div>

            {/* SECTION A: PENDING CLIENT UTR SUBMISSIONS */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-amber-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
                  <h3 className="font-heading font-extrabold text-lg text-slate-900">
                    Awaiting Manual Verification ({pendingPaymentsList.length})
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-mono">
                  Never auto-credited until confirmed in your bank account
                </span>
              </div>

              {pendingPaymentsList.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  No pending UTR submissions awaiting review. All received payments are up to date!
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-amber-50/60 border-b border-amber-200 text-amber-900 uppercase font-mono text-[10px]">
                        <th className="py-2.5 px-3">Submission Ref</th>
                        <th className="py-2.5 px-3">Invoice / Client</th>
                        <th className="py-2.5 px-3">Submitted UTR / Transaction ID</th>
                        <th className="py-2.5 px-3">Date & Remitter</th>
                        <th className="py-2.5 px-3 text-right">Amount</th>
                        <th className="py-2.5 px-3 text-center">Admin Verification Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-100/60">
                      {pendingPaymentsList.map((pay) => (
                        <tr key={pay.id} className="hover:bg-amber-50/30">
                          <td className="py-3 px-3 font-mono font-bold text-amber-950">
                            {pay.receiptNumber}
                          </td>
                          <td className="py-3 px-3">
                            <div className="font-bold text-[#123578]">{pay.invoiceNumber}</div>
                            <div className="text-[11px] text-slate-600">{pay.clientName} ({pay.company})</div>
                          </td>
                          <td className="py-3 px-3">
                            <span className="font-mono font-extrabold text-slate-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                              {pay.transactionRef}
                            </span>
                            {pay.notes && <div className="text-[10px] text-slate-500 italic mt-1">“{pay.notes}”</div>}
                          </td>
                          <td className="py-3 px-3 font-mono text-slate-600">
                            <div>{pay.paymentDate}</div>
                            <div className="text-[10px] text-slate-400">{pay.recordedBy}</div>
                          </td>
                          <td className="py-3 px-3 text-right font-mono font-extrabold text-[#ED650B] text-sm">
                            ₹{pay.amount.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3 px-3 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleVerifyPayment(pay.id)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                                title="Confirm funds received in bank and credit invoice"
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                                Verify & Credit
                              </button>
                              <button
                                onClick={() => handleRejectPayment(pay.id)}
                                className="bg-white hover:bg-rose-50 text-rose-700 border border-rose-300 font-semibold text-xs px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                                title="Reject reference if payment not received"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* SECTION B: VERIFIED PAYMENTS AUDIT VAULT */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-heading font-extrabold text-lg text-[#123578]">
                  Verified Payment Receipts ({verifiedPaymentsList.length})
                </h3>
                <span className="text-xs text-slate-500 font-mono">
                  Total Verified: ₹{stats ? stats.summary.totalPaid.toLocaleString('en-IN') : '0'}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-mono text-[10px]">
                      <th className="py-3 px-4">Receipt #</th>
                      <th className="py-3 px-4">Invoice Ref</th>
                      <th className="py-3 px-4">Client & Project</th>
                      <th className="py-3 px-4">Method</th>
                      <th className="py-3 px-4">Transaction UTR</th>
                      <th className="py-3 px-4">Payment Date</th>
                      <th className="py-3 px-4 text-right">Amount Paid</th>
                      <th className="py-3 px-4 text-center">Official Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {verifiedPaymentsList.map((pay) => (
                      <tr key={pay.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#123578]">
                          {pay.receiptNumber}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-600">
                          {pay.invoiceNumber}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-800">{pay.clientName}</div>
                          <div className="text-[10px] text-slate-500">{pay.projectName}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2 py-0.5 rounded font-mono font-bold uppercase text-[10px] bg-slate-100 text-slate-700">
                            {pay.paymentMethod}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-700 font-semibold max-w-[150px] truncate" title={pay.transactionRef}>
                          {pay.transactionRef}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-600">
                          {pay.paymentDate}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono font-extrabold text-emerald-700 text-sm">
                          ₹{pay.amount.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => setSelectedPaymentForView(pay)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#123578] hover:text-white transition-colors"
                            title="View & Print Official Receipt"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SECTION C: REJECTED REFERENCES (if any) */}
            {rejectedPaymentsList.length > 0 && (
              <div className="bg-white rounded-3xl p-6 border border-rose-200 shadow-xs space-y-3">
                <h4 className="font-heading font-bold text-sm text-rose-800 uppercase tracking-wider">
                  Rejected References ({rejectedPaymentsList.length})
                </h4>
                <div className="space-y-2 text-xs">
                  {rejectedPaymentsList.map((p) => (
                    <div key={p.id} className="p-3 bg-rose-50/50 rounded-xl border border-rose-100 flex items-center justify-between">
                      <div>
                        <span className="font-mono font-bold text-slate-800">{p.transactionRef}</span>
                        <span className="text-slate-500 mx-2">·</span>
                        <span className="text-slate-600">{p.clientName} ({p.invoiceNumber})</span>
                        <span className="text-slate-400 mx-2">·</span>
                        <span className="text-rose-700 italic">“{p.rejectionReason}”</span>
                      </div>
                      <span className="font-mono text-slate-600">₹{p.amount.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 6. ENQUIRIES TAB */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-heading font-extrabold text-[#123578]">
                  Website Project Enquiries ({enquiries.length})
                </h2>
                <p className="text-xs text-slate-500">
                  Incoming lead briefs submitted through goodfolksolution.in enquiry forms
                </p>
              </div>
            </div>

            {enquiries.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
                <Mail className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="font-heading font-bold text-slate-700">No New Enquiries Recorded</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  When potential clients submit the enquiry form on the public website, their briefs appear here with 1-click conversion into active client projects.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-mono text-slate-400 font-bold">{enq.id}</span>
                        <span
                          className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                            enq.status === 'converted'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-blue-100 text-[#123578]'
                          }`}
                        >
                          {enq.status || 'new'}
                        </span>
                      </div>

                      <h3 className="font-heading font-extrabold text-lg text-[#123578]">
                        {enq.name}
                      </h3>
                      <div className="text-xs font-semibold text-slate-700">{enq.company}</div>

                      <div className="mt-3 space-y-1 text-xs text-slate-600 font-mono">
                        <div>Email: {enq.email}</div>
                        <div>Mobile: {enq.mobile}</div>
                        <div>Service: {enq.service}</div>
                        {enq.budget && <div>Budget: {enq.budget}</div>}
                      </div>

                      <div className="mt-4 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-700 leading-relaxed">
                        “{enq.details}”
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-mono">
                        Submitted: {new Date(enq.createdAt).toLocaleDateString()}
                      </span>

                      {enq.status !== 'converted' ? (
                        <button
                          onClick={() => handleConvertEnquiry(enq.id)}
                          className="bg-[#ED650B] hover:bg-[#d95605] text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" /> Convert to Client & Project
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Converted to Client
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 7. UPI & BANK SETTINGS TAB */}
        {activeTab === 'upi' && (
          <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-150">
            <div>
              <h2 className="text-2xl font-heading font-extrabold text-[#123578]">
                UPI & Direct Bank Remittance Settings
              </h2>
              <p className="text-xs text-slate-500">
                Configure your personal UPI ID, payee business title, and bank account remittance coordinates
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form Column */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                <form onSubmit={handleSaveUpiSettings} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">
                      Personal Payee UPI ID <span className="text-[#ED650B]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="9817961412@upi"
                      value={upiSettings.upiId}
                      onChange={(e) => setUpiSettings({ ...upiSettings, upiId: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono font-bold text-[#123578] focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      All client UPI payment links and QR codes will automatically route remittances to this VPA.
                    </span>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">
                      Payee Display Name <span className="text-[#ED650B]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Goodfolk Solution / Akshay"
                      value={upiSettings.payeeName}
                      onChange={(e) => setUpiSettings({ ...upiSettings, payeeName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        placeholder="HDFC Bank"
                        value={upiSettings.bankName}
                        onChange={(e) => setUpiSettings({ ...upiSettings, bankName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1">
                        Account Number
                      </label>
                      <input
                        type="text"
                        placeholder="50200084918231"
                        value={upiSettings.accountNumber}
                        onChange={(e) => setUpiSettings({ ...upiSettings, accountNumber: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1">
                        IFSC Code
                      </label>
                      <input
                        type="text"
                        placeholder="HDFC0001234"
                        value={upiSettings.ifscCode}
                        onChange={(e) => setUpiSettings({ ...upiSettings, ifscCode: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1">
                        Confirmation Contact Mobile
                      </label>
                      <input
                        type="text"
                        placeholder="+91 9817961412"
                        value={upiSettings.contactPhone}
                        onChange={(e) => setUpiSettings({ ...upiSettings, contactPhone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">
                      Remittance Notes
                    </label>
                    <textarea
                      rows={2}
                      value={upiSettings.notes || ''}
                      onChange={(e) => setUpiSettings({ ...upiSettings, notes: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSavingUpi}
                    className="w-full bg-[#123578] hover:bg-[#0c2452] active:scale-[0.99] text-white font-semibold py-3 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 text-sm focus:outline-none"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSavingUpi ? 'Saving Changes...' : 'Save UPI Remittance Settings'}</span>
                  </button>
                </form>
              </div>

              {/* Live Preview Column */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600">
                  <strong className="text-slate-800 font-bold block mb-1">Live UPI QR Code Preview</strong>
                  This is the exact QR code and deep link that appears on client invoices and payment pages:
                </div>

                <UpiQrCode
                  upiId={upiSettings.upiId}
                  payeeName={upiSettings.payeeName}
                  amount={50000}
                  invoiceNumber="SAMPLE-DEMO"
                  note="Goodfolk Solution Demo Payment"
                  size={200}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL: ADD CLIENT */}
      {showAddClientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-heading font-extrabold text-xl text-[#123578]">Add New Client</h3>
              <button onClick={() => setShowAddClientModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                {formError}
              </div>
            )}

            <form onSubmit={handleAddClient} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Client Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Singhania"
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Company / Brand Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Terra Organic Goods"
                  value={newClient.company}
                  onChange={(e) => setNewClient({ ...newClient, company: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="vikram@terraorganic.com"
                  value={newClient.email}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Mobile Number (with country code) *</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98123 45678"
                  value={newClient.mobile}
                  onChange={(e) => setNewClient({ ...newClient, mobile: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Client Notes / Context</label>
                <textarea
                  rows={2}
                  placeholder="Brand launch goals, communication preferences..."
                  value={newClient.notes}
                  onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                />
              </div>
              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddClientModal(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-[#ED650B] hover:bg-[#d95605] text-white font-semibold"
                >
                  Save Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD PROJECT */}
      {showAddProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-heading font-extrabold text-xl text-[#123578]">Create New Project</h3>
              <button onClick={() => setShowAddProjectModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                {formError}
              </div>
            )}

            <form onSubmit={handleAddProject} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Select Client *</label>
                <select
                  required
                  value={newProject.clientId}
                  onChange={(e) => setNewProject({ ...newProject, clientId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                >
                  <option value="">Select a client...</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.company})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Project Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Terra Organic Packaging Rollout"
                  value={newProject.projectName}
                  onChange={(e) => setNewProject({ ...newProject, projectName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Service Required *</label>
                  <select
                    value={newProject.service}
                    onChange={(e) => setNewProject({ ...newProject, service: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                  >
                    <option value="Branding & Packaging">Branding & Packaging</option>
                    <option value="Creative Design">Creative Design</option>
                    <option value="Performance Marketing Creatives">Performance Marketing Creatives</option>
                    <option value="Video Production & Editing">Video Production & Editing</option>
                    <option value="Digital Marketing & Social Media Management">Digital Marketing & Social Media Management</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Agreed Price (INR) *</label>
                  <input
                    type="number"
                    required
                    placeholder="120000"
                    value={newProject.agreedPrice}
                    onChange={(e) => setNewProject({ ...newProject, agreedPrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newProject.startDate}
                    onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Deadline Date</label>
                  <input
                    type="date"
                    value={newProject.deadline}
                    onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Deliverables (one per line)</label>
                <textarea
                  rows={2}
                  placeholder="Primary Bottle Label Artwork&#10;Secondary Outer Box Dielines&#10;E-commerce PDP Banner Suite"
                  value={newProject.deliverables}
                  onChange={(e) => setNewProject({ ...newProject, deliverables: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddProjectModal(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-[#ED650B] hover:bg-[#d95605] text-white font-semibold"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: GENERATE INVOICE */}
      {showAddInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-heading font-extrabold text-xl text-[#123578]">Generate Tax Invoice</h3>
              <button onClick={() => setShowAddInvoiceModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                {formError}
              </div>
            )}

            <form onSubmit={handleAddInvoice} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Select Project *</label>
                <select
                  required
                  value={newInvoice.projectId}
                  onChange={(e) => {
                    const selProj = projects.find((p) => p.id === e.target.value);
                    setNewInvoice({
                      ...newInvoice,
                      projectId: e.target.value,
                      amount: selProj ? String(selProj.agreedPrice) : newInvoice.amount,
                      itemDesc: selProj ? selProj.projectName : newInvoice.itemDesc,
                    });
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                >
                  <option value="">Select a project...</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.projectName} ({p.company})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Invoice Item Description</label>
                <input
                  type="text"
                  placeholder="e.g. 50% Kickoff Advance for Packaging Design"
                  value={newInvoice.itemDesc}
                  onChange={(e) => setNewInvoice({ ...newInvoice, itemDesc: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Invoice Total Amount (INR) *</label>
                <input
                  type="number"
                  required
                  placeholder="75000"
                  value={newInvoice.amount}
                  onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Issue Date</label>
                  <input
                    type="date"
                    value={newInvoice.issueDate}
                    onChange={(e) => setNewInvoice({ ...newInvoice, issueDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newInvoice.dueDate}
                    onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Invoice Notes / Terms</label>
                <textarea
                  rows={2}
                  placeholder="e.g. 50% advance due upon receipt, balance on final file signoff"
                  value={newInvoice.notes}
                  onChange={(e) => setNewInvoice({ ...newInvoice, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddInvoiceModal(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-[#ED650B] hover:bg-[#d95605] text-white font-semibold"
                >
                  Generate Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DIRECT RECORD PAYMENT */}
      {showRecordPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-heading font-extrabold text-xl text-[#123578]">Record Direct Payment</h3>
              <button onClick={() => setShowRecordPaymentModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                {formError}
              </div>
            )}

            <form onSubmit={handleRecordPayment} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Select Invoice to Credit *</label>
                <select
                  required
                  value={newPayment.invoiceId || paymentFormInvoiceId}
                  onChange={(e) => {
                    const invId = e.target.value;
                    setPaymentFormInvoiceId(invId);
                    const selInv = invoices.find((inv) => inv.id === invId);
                    if (selInv) {
                      setNewPayment((prev) => ({
                        ...prev,
                        invoiceId: invId,
                        amount: String(selInv.balanceAmount),
                      }));
                    }
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                >
                  <option value="">Select an invoice...</option>
                  {invoices.map((inv) => (
                    <option key={inv.id} value={inv.id}>
                      {inv.invoiceNumber} - {inv.company} (Bal: ₹{inv.balanceAmount.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Amount Paid (INR) *</label>
                  <input
                    type="number"
                    required
                    placeholder="50000"
                    value={newPayment.amount}
                    onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Payment Type</label>
                  <select
                    value={newPayment.paymentType}
                    onChange={(e) => setNewPayment({ ...newPayment, paymentType: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                  >
                    <option value="advance">Kickoff Advance</option>
                    <option value="instalment">Milestone Instalment</option>
                    <option value="final_settlement">Final Settlement</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Payment Method *</label>
                  <select
                    value={newPayment.paymentMethod}
                    onChange={(e) => setNewPayment({ ...newPayment, paymentMethod: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                  >
                    <option value="upi">Direct UPI Transfer</option>
                    <option value="bank_transfer">Bank Transfer (IMPS/NEFT)</option>
                    <option value="cash">Cash Remittance</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Payment Date *</label>
                  <input
                    type="date"
                    required
                    value={newPayment.paymentDate}
                    onChange={(e) => setNewPayment({ ...newPayment, paymentDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Transaction Reference / UTR Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. HDFC-IMPS-89210492810 or UPI-4029184710"
                  value={newPayment.transactionRef}
                  onChange={(e) => setNewPayment({ ...newPayment, transactionRef: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 font-mono focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                />
                <span className="text-[10px] text-slate-400">
                  Prevents duplicate entries. Must be unique per transaction.
                </span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Payment Notes</label>
                <textarea
                  rows={2}
                  placeholder="Confirmed in bank / UPI current account..."
                  value={newPayment.notes}
                  onChange={(e) => setNewPayment({ ...newPayment, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowRecordPaymentModal(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-[#ED650B] hover:bg-[#d95605] text-white font-semibold"
                >
                  Record & Issue Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW MODALS */}
      <InvoiceViewModal
        invoice={selectedInvoiceForView}
        upiId={upiSettings.upiId}
        payeeName={upiSettings.payeeName}
        onClose={() => setSelectedInvoiceForView(null)}
        onRecordPaymentClick={(inv) => {
          setSelectedInvoiceForView(null);
          handleOpenPaymentForInvoice(inv);
        }}
      />

      <ReceiptViewModal
        payment={selectedPaymentForView}
        onClose={() => setSelectedPaymentForView(null)}
      />
    </div>
  );
};
