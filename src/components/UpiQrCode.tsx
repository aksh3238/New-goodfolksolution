import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Copy, Check, ExternalLink, QrCode as QrIcon } from 'lucide-react';

interface UpiQrCodeProps {
  upiId: string;
  payeeName: string;
  amount: number;
  invoiceNumber: string;
  note?: string;
  size?: number;
  className?: string;
}

export const UpiQrCode: React.FC<UpiQrCodeProps> = ({
  upiId,
  payeeName,
  amount,
  invoiceNumber,
  note,
  size = 220,
  className = '',
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Construct official UPI payment URI specification
  // Format: upi://pay?pa={UPI_ID}&pn={NAME}&am={AMOUNT}&cu=INR&tn={NOTE}&tr={REF}
  const cleanAmount = amount > 0 ? amount.toFixed(2) : '1.00';
  const cleanNote = note || `Invoice ${invoiceNumber}`;
  const upiUri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${cleanAmount}&cu=INR&tn=${encodeURIComponent(cleanNote)}&tr=${encodeURIComponent(invoiceNumber)}`;

  useEffect(() => {
    QRCode.toDataURL(upiUri, {
      width: size,
      margin: 1.5,
      color: {
        dark: '#123578', // Goodfolk Navy for high-contrast brand aesthetic
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Failed to generate UPI QR code:', err));
  }, [upiUri, size]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={`flex flex-col items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-xs text-center ${className}`}>
      {/* Top Header */}
      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#123578] mb-3 font-heading">
        <QrIcon className="w-4 h-4 text-[#ED650B]" />
        <span>Scan & Pay via UPI</span>
      </div>

      {/* QR Frame */}
      <div className="relative p-3 bg-white rounded-2xl border-2 border-slate-100 shadow-sm">
        {qrDataUrl ? (
          <img
            src={qrDataUrl}
            alt={`UPI Payment QR Code for ₹${amount}`}
            className="rounded-xl w-auto h-auto mx-auto aspect-square"
            style={{ maxWidth: `${size}px` }}
          />
        ) : (
          <div
            className="bg-slate-100 animate-pulse rounded-xl flex items-center justify-center text-xs text-slate-400 font-mono aspect-square"
            style={{ width: `${size}px`, height: `${size}px` }}
          >
            Generating QR...
          </div>
        )}
      </div>

      {/* Amount Display */}
      <div className="mt-4">
        <span className="text-[11px] font-mono text-slate-400 uppercase">Amount Due</span>
        <div className="text-2xl font-extrabold font-mono text-[#123578]">
          ₹{amount.toLocaleString('en-IN')}
        </div>
      </div>

      {/* UPI ID Pill with Copy */}
      <div className="mt-3 w-full max-w-xs flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
        <div className="text-left truncate mr-2">
          <span className="text-[10px] text-slate-400 block font-mono">Payee UPI ID</span>
          <span className="font-mono font-bold text-slate-800 truncate block">{upiId}</span>
        </div>
        <button
          onClick={handleCopyUpi}
          className="p-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-[#123578] transition-colors shrink-0"
          title="Copy UPI ID"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Direct UPI App Intent Trigger (Mobile / Desktop supported) */}
      <div className="mt-4 w-full max-w-xs space-y-2">
        <a
          href={upiUri}
          className="w-full bg-[#ED650B] hover:bg-[#d95605] active:scale-[0.99] text-white font-semibold py-3 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
        >
          <span>Pay via UPI App (GPay / PhonePe / Paytm)</span>
          <ExternalLink className="w-4 h-4" />
        </a>

        <p className="text-[10px] text-slate-400 leading-normal">
          Works with Google Pay, PhonePe, Paytm, BHIM, Cred, or any BHIM-UPI application.
        </p>
      </div>
    </div>
  );
};
