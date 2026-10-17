import React, { useState } from 'react';
import { Invoice } from '../../services/adminService';
import { GoodfolkLogo } from '../GoodfolkLogo';
import { UpiQrCode } from '../UpiQrCode';
import { X, Printer, CheckCircle2, AlertCircle, Clock, Link, Check, ExternalLink } from 'lucide-react';

interface InvoiceViewModalProps {
  invoice: Invoice | null;
  upiId?: string;
  payeeName?: string;
  onClose: () => void;
  onRecordPaymentClick?: (invoice: Invoice) => void;
}

export const InvoiceViewModal: React.FC<InvoiceViewModalProps> = ({
  invoice,
  upiId = '9817961412@upi',
  payeeName = 'Goodfolk Solution',
  onClose,
  onRecordPaymentClick,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyPaymentLink = () => {
    const url = `${window.location.origin}/pay?invoice=${encodeURIComponent(invoice.invoiceNumber)}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const getStatusBadge = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Paid in Full
          </span>
        );
      case 'partial':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3.5 h-3.5" />
            Partially Paid
          </span>
        );
      case 'overdue':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-300">
            <AlertCircle className="w-3.5 h-3.5" />
            Overdue
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-[#123578] border border-blue-300">
            Issued
          </span>
        );
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-xs overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Modal Action Header (Excluded in Print) */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase text-slate-500">
              Tax Invoice
            </span>
            <span className="text-sm font-bold text-[#123578] font-mono">
              {invoice.invoiceNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyPaymentLink}
              className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
              title="Copy Client Payment Portal Link"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Link className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Client Pay Link'}</span>
            </button>

            {invoice.balanceAmount > 0 && onRecordPaymentClick && (
              <button
                onClick={() => onRecordPaymentClick(invoice)}
                className="bg-[#ED650B] hover:bg-[#d95605] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5"
              >
                + Record Manual Payment
              </button>
            )}
            <button
              onClick={handlePrint}
              className="bg-white hover:bg-slate-100 text-[#123578] border border-slate-300 text-xs font-semibold px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              aria-label="Close"
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Sheet */}
        <div className="p-8 sm:p-12 space-y-8 bg-white text-slate-800" id="printable-invoice">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-slate-200 pb-8">
            <div>
              <GoodfolkLogo size="lg" />
              <p className="text-xs text-slate-500 mt-3 leading-relaxed max-w-xs">
                Goodfolk Solution · Creative Advertising, Branding, Design & Performance Marketing<br />
                domain: goodfolksolution.in<br />
                email: akshay@goodfolksolution.in<br />
                mobile: +91 9817961412
              </p>
            </div>

            <div className="text-right sm:self-start space-y-2">
              <h1 className="text-2xl font-heading font-extrabold text-[#123578] tracking-tight">
                INVOICE
              </h1>
              <div className="text-xs font-mono space-y-1 text-slate-600">
                <div>
                  <span className="text-slate-400">Invoice No: </span>
                  <span className="font-bold text-slate-900">{invoice.invoiceNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400">Date: </span>
                  <span>{invoice.issueDate}</span>
                </div>
                <div>
                  <span className="text-slate-400">Due Date: </span>
                  <span className="font-semibold text-rose-700">{invoice.dueDate || 'Upon Receipt'}</span>
                </div>
              </div>
              <div className="pt-2">{getStatusBadge(invoice.status)}</div>
            </div>
          </div>

          {/* Client & Project Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Billed To
              </span>
              <h3 className="font-heading font-bold text-base text-[#123578] mt-1">
                {invoice.clientName}
              </h3>
              <p className="text-xs text-slate-600 font-medium">{invoice.company}</p>
              {invoice.clientEmail && (
                <p className="text-xs text-slate-500 font-mono mt-1">{invoice.clientEmail}</p>
              )}
              {invoice.clientMobile && (
                <p className="text-xs text-slate-500 font-mono">{invoice.clientMobile}</p>
              )}
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Project Scope
              </span>
              <h4 className="font-heading font-semibold text-sm text-slate-900 mt-1">
                {invoice.projectName}
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Ref ID: {invoice.projectId}
              </p>
              {invoice.notes && (
                <p className="text-xs text-slate-600 italic mt-2 border-t border-slate-200 pt-2">
                  “{invoice.notes}”
                </p>
              )}
            </div>
          </div>

          {/* Itemized Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-[#123578] text-[11px] font-heading font-bold uppercase tracking-wider text-[#123578]">
                  <th className="py-3 px-2">Description / Deliverable</th>
                  <th className="py-3 px-2 text-right">Amount (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {invoice.items && invoice.items.length > 0 ? (
                  invoice.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-2 text-slate-800 font-medium">
                        {item.description}
                      </td>
                      <td className="py-3.5 px-2 text-right font-mono text-slate-900">
                        ₹{item.amount.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="py-3.5 px-2 text-slate-800 font-medium">
                      {invoice.projectName}
                    </td>
                    <td className="py-3.5 px-2 text-right font-mono text-slate-900">
                      ₹{invoice.amount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Totals & Breakdown */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pt-4 border-t border-slate-200">
            {/* Payment Remittance Details & UPI QR Preview */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs space-y-3 max-w-sm w-full">
              <div className="font-heading font-bold text-[#123578] uppercase tracking-wider text-[11px] flex items-center justify-between">
                <span>Direct UPI Remittance</span>
                <span className="text-emerald-700 font-mono text-[10px]">Zero Fees</span>
              </div>
              <div className="text-slate-600 space-y-1">
                <div><span className="text-slate-400">Account: </span>Goodfolk Solution</div>
                <div><span className="text-slate-400">Bank: </span>HDFC Bank (Current A/c)</div>
                <div>
                  <span className="text-slate-400">UPI ID: </span>
                  <span className="font-mono font-bold text-[#123578] bg-white px-2 py-0.5 rounded border border-slate-200 inline-block">
                    {upiId}
                  </span>
                </div>
                <div><span className="text-slate-400">Confirmation WhatsApp: </span>+91 9817961412</div>
              </div>

              {/* Dynamic QR code for outstanding balance */}
              {invoice.balanceAmount > 0 && (
                <div className="pt-2 border-t border-slate-200 flex flex-col items-center text-center">
                  <UpiQrCode
                    upiId={upiId}
                    payeeName={payeeName}
                    amount={invoice.balanceAmount}
                    invoiceNumber={invoice.invoiceNumber}
                    size={150}
                    className="p-3 shadow-none border-0 bg-transparent"
                  />
                </div>
              )}
            </div>

            {/* Price Calculations */}
            <div className="w-full sm:w-64 space-y-2 text-xs">
              <div className="flex justify-between py-1 text-slate-600">
                <span>Subtotal:</span>
                <span className="font-mono">₹{invoice.amount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-1 text-emerald-700 font-medium">
                <span>Payments Received:</span>
                <span className="font-mono">- ₹{invoice.paidAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-2 border-t-2 border-[#123578] text-sm font-bold text-[#123578]">
                <span>Outstanding Balance:</span>
                <span className="font-mono text-base text-[#ED650B]">
                  ₹{invoice.balanceAmount.toLocaleString('en-IN')}
                </span>
              </div>

              {invoice.balanceAmount > 0 && (
                <div className="pt-2">
                  <a
                    href={`/pay?invoice=${encodeURIComponent(invoice.invoiceNumber)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#123578] hover:bg-[#0c2452] text-white py-2 px-3 rounded-xl text-center font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>Open Client Pay Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Footer Terms */}
          <div className="pt-6 border-t border-slate-200 text-center text-xs text-slate-400 leading-relaxed">
            Thank you for partnering with Goodfolk Solution. All creative deliverables transfer upon final settlement.<br />
            After transferring via UPI, submit your UTR reference to akshay@goodfolksolution.in or via the pay portal.
          </div>
        </div>
      </div>
    </div>
  );
};
