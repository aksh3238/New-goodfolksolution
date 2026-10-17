import React, { useState, useEffect } from 'react';
import { adminApi, Invoice, Payment } from '../services/adminService';
import { GoodfolkLogo } from '../components/GoodfolkLogo';
import { UpiQrCode } from '../components/UpiQrCode';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  Send,
  Loader2,
  FileText,
  Search,
} from 'lucide-react';

interface ClientPaymentPageProps {
  initialInvoiceNumber?: string;
  onNavigateHome: () => void;
}

export const ClientPaymentPage: React.FC<ClientPaymentPageProps> = ({
  initialInvoiceNumber = '',
  onNavigateHome,
}) => {
  const [invoiceNumberInput, setInvoiceNumberInput] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('invoice') || initialInvoiceNumber || 'GF-2026-001';
  });

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [upiSettings, setUpiSettings] = useState<{
    upiId: string;
    payeeName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
  }>({
    upiId: '9817961412@upi',
    payeeName: 'Goodfolk Solution',
    bankName: 'HDFC Bank',
    accountNumber: '50200084918231',
    ifscCode: 'HDFC0001234',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // UTR submission form state
  const [utrNumber, setUtrNumber] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [remitterName, setRemitterName] = useState('');
  const [remitterPhone, setRemitterPhone] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [isSubmittingUtr, setIsSubmittingUtr] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [copiedUpi, setCopiedUpi] = useState(false);

  const fetchInvoiceData = async (invNum: string) => {
    if (!invNum.trim()) return;
    setIsLoading(true);
    setFetchError(null);
    setSubmissionSuccess(null);
    setSubmissionError(null);

    try {
      const data = await adminApi.getPublicInvoice(invNum.trim());
      setInvoice(data.invoice);
      setPayments(data.payments || []);
      if (data.upi) {
        setUpiSettings(data.upi);
      }
      setAmountPaid(String(data.invoice.balanceAmount));
    } catch (err: any) {
      setInvoice(null);
      setFetchError(err.message || 'Invoice not found. Please verify your invoice reference.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (invoiceNumberInput) {
      fetchInvoiceData(invoiceNumberInput);
    }
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchInvoiceData(invoiceNumberInput);
  };

  const handleSubmitUtr = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoice) return;

    if (!utrNumber.trim()) {
      setSubmissionError('Please enter the 12-digit UTR / Transaction Reference from your payment app.');
      return;
    }

    setIsSubmittingUtr(true);
    setSubmissionError(null);
    setSubmissionSuccess(null);

    try {
      const res = await adminApi.submitUtr(invoice.invoiceNumber, {
        transactionRef: utrNumber.trim(),
        amount: Number(amountPaid) || invoice.balanceAmount,
        paymentDate,
        remitterName: remitterName.trim() || invoice.clientName,
        notes: notes ? `${notes} (Contact: ${remitterPhone})` : `Submitted by ${remitterName || invoice.clientName}`,
      });

      setSubmissionSuccess(res.message);
      setUtrNumber('');
      setNotes('');
      // Reload invoice data to show new pending entry
      fetchInvoiceData(invoice.invoiceNumber);
    } catch (err: any) {
      setSubmissionError(err.message || 'Failed to submit payment reference. Please try again.');
    } finally {
      setIsSubmittingUtr(false);
    }
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiSettings.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <button
            onClick={onNavigateHome}
            className="focus:outline-none"
            aria-label="Goodfolk Solution Home"
          >
            <GoodfolkLogo size="md" />
          </button>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified Direct UPI Payment Portal
            </span>
          </div>
        </div>

        {/* Invoice Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={invoiceNumberInput}
                onChange={(e) => setInvoiceNumberInput(e.target.value)}
                placeholder="Enter Invoice Reference (e.g. GF-2026-001)"
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#123578] hover:bg-[#0c2452] text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors shrink-0"
            >
              {isLoading ? 'Loading...' : 'Find Invoice'}
            </button>
          </form>
        </div>

        {fetchError && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Invoice Lookup Error</p>
              <p className="text-xs mt-0.5">{fetchError}</p>
            </div>
          </div>
        )}

        {invoice && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Invoice Summary Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-mono text-[#ED650B] font-bold uppercase tracking-wider">
                    Goodfolk Client Invoice
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#123578]">
                    {invoice.invoiceNumber}
                  </h1>
                  <p className="text-sm text-slate-600 mt-1 font-medium">
                    {invoice.projectName}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-xs text-slate-400 font-mono">Billed To</div>
                  <div className="text-base font-bold text-slate-800">{invoice.clientName}</div>
                  <div className="text-xs text-slate-500">{invoice.company}</div>
                  <div className="mt-2">
                    {invoice.status === 'paid' ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Paid in Full
                      </span>
                    ) : invoice.status === 'partial' ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-100 text-amber-800 border border-amber-300">
                        <Clock className="w-3.5 h-3.5" /> Partially Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase bg-blue-100 text-[#123578] border border-blue-300">
                        Payment Due
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Financial Metric Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] text-slate-500 font-mono uppercase">Total Invoiced</span>
                  <div className="text-xl font-bold font-mono text-slate-900 mt-1">
                    ₹{invoice.amount.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <span className="text-[11px] text-emerald-700 font-mono uppercase">Verified Paid</span>
                  <div className="text-xl font-bold font-mono text-emerald-800 mt-1">
                    ₹{invoice.paidAmount.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100">
                  <span className="text-[11px] text-[#ED650B] font-mono uppercase">Outstanding Balance</span>
                  <div className="text-2xl font-extrabold font-mono text-[#ED650B] mt-1">
                    ₹{invoice.balanceAmount.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Due Date Notice */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 font-mono">
                <span>Issue Date: {invoice.issueDate}</span>
                <span>Due Date: <strong className="text-slate-800">{invoice.dueDate || 'Upon Receipt'}</strong></span>
              </div>
            </div>

            {/* If Balance Outstanding > 0: Show UPI Payment + UTR Submission */}
            {invoice.balanceAmount > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: QR Code & UPI Deep Link */}
                <div className="lg:col-span-5 space-y-6">
                  <UpiQrCode
                    upiId={upiSettings.upiId}
                    payeeName={upiSettings.payeeName}
                    amount={invoice.balanceAmount}
                    invoiceNumber={invoice.invoiceNumber}
                    note={`Invoice ${invoice.invoiceNumber}`}
                    size={220}
                  />

                  {/* Bank Transfer Details Fallback */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 text-xs space-y-2">
                    <div className="font-heading font-bold text-[#123578] uppercase tracking-wider text-[11px]">
                      Bank Transfer Option (IMPS / NEFT)
                    </div>
                    <div className="space-y-1 text-slate-600 font-mono">
                      <div><span className="text-slate-400">Account: </span>Goodfolk Solution</div>
                      <div><span className="text-slate-400">Bank: </span>{upiSettings.bankName}</div>
                      <div><span className="text-slate-400">A/c No: </span>{upiSettings.accountNumber}</div>
                      <div><span className="text-slate-400">IFSC: </span>{upiSettings.ifscCode}</div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Submit UTR Reference Form */}
                <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-[#ED650B] uppercase tracking-wider">
                      Step 2: Confirm Payment
                    </span>
                    <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-[#123578] mt-1">
                      Submit Payment Reference / UTR
                    </h2>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      After transferring via your UPI app (Google Pay, PhonePe, Paytm, Cred), enter your 12-digit UTR or Transaction ID below.
                    </p>
                  </div>

                  {/* Submission Status Alerts */}
                  {submissionSuccess && (
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs space-y-1 animate-in fade-in">
                      <div className="font-bold flex items-center gap-1.5 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Reference Submitted for Verification
                      </div>
                      <p className="leading-relaxed">
                        {submissionSuccess}
                      </p>
                      <p className="text-[11px] text-emerald-700 pt-1 font-mono">
                        Note: Your invoice status remains pending until our accounts team verifies receipt against our bank statement.
                      </p>
                    </div>
                  )}

                  {submissionError && (
                    <div className="p-4 rounded-2xl bg-red-50 border border-red-300 text-red-700 text-xs flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{submissionError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmitUtr} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1">
                        Transaction Reference / UTR Number <span className="text-[#ED650B]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 402918471029 (from UPI app transfer receipt)"
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                      />
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Found in your GPay / PhonePe / Paytm payment receipt details as 'UPI Transaction ID' or 'UTR'.
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 uppercase mb-1">
                          Amount Transferred (INR) <span className="text-[#ED650B]">*</span>
                        </label>
                        <input
                          type="number"
                          required
                          value={amountPaid}
                          onChange={(e) => setAmountPaid(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 uppercase mb-1">
                          Date of Payment <span className="text-[#ED650B]">*</span>
                        </label>
                        <input
                          type="date"
                          required
                          value={paymentDate}
                          onChange={(e) => setPaymentDate(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 uppercase mb-1">
                          Remitter / Sender Name
                        </label>
                        <input
                          type="text"
                          placeholder={invoice.clientName}
                          value={remitterName}
                          onChange={(e) => setRemitterName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 uppercase mb-1">
                          Remitter Contact Phone
                        </label>
                        <input
                          type="text"
                          placeholder="+91 98123 45678"
                          value={remitterPhone}
                          onChange={(e) => setRemitterPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1">
                        Optional Notes / Payment Remarks
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Sent via Google Pay from HDFC account ending 4821"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingUtr}
                      className="w-full bg-[#123578] hover:bg-[#0c2452] active:scale-[0.99] disabled:opacity-70 text-white font-semibold py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                    >
                      {isSubmittingUtr ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting Reference...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Payment Reference for Verification</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-200 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-heading font-extrabold text-emerald-950">
                  This Invoice is Settled in Full
                </h2>
                <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                  Thank you! All agreed deliverables have been verified and settled. No further remittance is required.
                </p>
              </div>
            )}

            {/* Payment & Submission History */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="font-heading font-extrabold text-lg text-[#123578] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#ED650B]" />
                Remittance & Verification Audit Log
              </h3>

              {payments.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No payments or references submitted for this invoice yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 uppercase font-mono text-[10px]">
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3">Transaction UTR</th>
                        <th className="py-2.5 px-3">Method</th>
                        <th className="py-2.5 px-3 text-right">Amount</th>
                        <th className="py-2.5 px-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {payments.map((p) => (
                        <tr key={p.id}>
                          <td className="py-3 px-3 font-mono text-slate-600">{p.paymentDate}</td>
                          <td className="py-3 px-3 font-mono font-bold text-slate-800">{p.transactionRef}</td>
                          <td className="py-3 px-3 uppercase text-[10px] text-slate-500 font-mono">{p.paymentMethod}</td>
                          <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                            ₹{p.amount.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3 px-3 text-center">
                            {p.status === 'verified' ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                <CheckCircle2 className="w-3 h-3" /> Verified & Credited
                              </span>
                            ) : p.status === 'rejected' ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800" title={p.rejectionReason}>
                                <AlertCircle className="w-3 h-3" /> Rejected
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 animate-pulse">
                                <Clock className="w-3 h-3" /> Verification Pending
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
