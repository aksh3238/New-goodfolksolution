import React from 'react';
import { Payment } from '../../services/adminService';
import { GoodfolkLogo } from '../GoodfolkLogo';
import { X, Printer, CheckCircle } from 'lucide-react';

interface ReceiptViewModalProps {
  payment: Payment | null;
  onClose: () => void;
}

export const ReceiptViewModal: React.FC<ReceiptViewModalProps> = ({ payment, onClose }) => {
  if (!payment) return null;

  const handlePrint = () => {
    window.print();
  };

  const methodLabel: Record<string, string> = {
    upi: 'UPI Transfer',
    bank_transfer: 'Bank Transfer (IMPS / NEFT)',
    cash: 'Cash Remittance',
  };
  const displayMethod = methodLabel[payment.paymentMethod] || payment.paymentMethod;

  const typeLabel = {
    advance: 'Advance Project Kickoff Payment',
    instalment: 'Project Progress Milestone Instalment',
    final_settlement: 'Final Deliverable Project Settlement',
  }[payment.paymentType] || payment.paymentType;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-xs overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Controls Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase text-slate-500">
              Receipt Voucher
            </span>
            <span className="text-sm font-bold text-[#123578] font-mono">
              {payment.receiptNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
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

        {/* Printable Receipt Voucher */}
        <div className="p-8 sm:p-12 space-y-6 bg-white text-slate-800" id="printable-receipt">
          {/* Top Logo & Title */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-slate-200 pb-6">
            <div>
              <GoodfolkLogo size="md" />
              <p className="text-[11px] text-slate-500 mt-2">
                Goodfolk Solution · official receipt voucher<br />
                domain: goodfolksolution.in
              </p>
            </div>
            <div className="text-right sm:self-start">
              <span className="text-xs font-mono uppercase tracking-wider text-[#ED650B] font-bold">
                Payment Receipt
              </span>
              <div className="text-lg font-bold font-mono text-[#123578]">
                {payment.receiptNumber}
              </div>
              <div className="text-xs text-slate-500 font-mono">
                Date: {payment.paymentDate}
              </div>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
                  Payment Verified & Received
                </div>
                <div className="text-xs text-emerald-700">
                  {typeLabel}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-emerald-800 font-medium">Amount Received</div>
              <div className="text-2xl font-extrabold font-mono text-emerald-900">
                ₹{payment.amount.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          {/* Details Table */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-200">
              <div>
                <span className="text-slate-400 block mb-0.5">Received From</span>
                <span className="font-bold text-[#123578] text-sm block">
                  {payment.clientName}
                </span>
                <span className="text-slate-600">{payment.company}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Applied to Project / Invoice</span>
                <span className="font-semibold text-slate-900 block">
                  {payment.projectName}
                </span>
                <span className="text-slate-500 font-mono">
                  Invoice Ref: {payment.invoiceNumber}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div>
                <span className="text-slate-400 block">Payment Method</span>
                <span className="font-semibold text-slate-800">{displayMethod}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Transaction Reference</span>
                <span className="font-mono font-bold text-[#123578]">{payment.transactionRef}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Recorded By</span>
                <span className="text-slate-800">{payment.recordedBy}</span>
              </div>
            </div>

            {payment.notes && (
              <div className="pt-2 border-t border-slate-200 text-slate-600 italic">
                “{payment.notes}”
              </div>
            )}
          </div>

          {/* Bottom Seal & Authorized Signatory */}
          <div className="flex justify-between items-end pt-6 border-t border-slate-200">
            <div className="text-[11px] text-slate-400 max-w-xs leading-relaxed">
              This electronic receipt voucher confirms that payment has been successfully credited to Goodfolk Solution accounts.
            </div>
            <div className="text-center">
              <div className="inline-block p-2 border border-slate-200 rounded-lg bg-slate-50 mb-1">
                <span className="font-heading font-extrabold text-xs text-[#123578] tracking-widest uppercase">
                  GOODFOLK ACCOUNTS
                </span>
              </div>
              <div className="text-[10px] text-slate-400">Authorized Financial Receipt</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
