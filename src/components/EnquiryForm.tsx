import React, { useState } from 'react';
import { submitEnquiry, EnquiryData } from '../services/enquiryService';
import { Send, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

interface EnquiryFormProps {
  isCompact?: boolean;
  onNavigateToPrivacy?: () => void;
  defaultService?: string;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  isCompact = false,
  onNavigateToPrivacy,
  defaultService = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    countryCode: '+91',
    mobile: '',
    service: defaultService || '',
    budget: '',
    deadline: '',
    details: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
    enquiryId?: string;
    deliveryMethod?: string;
    integrationNote?: string;
  } | null>(null);

  const countryCodes = [
    { code: '+91', country: 'India' },
    { code: '+1', country: 'USA/Canada' },
    { code: '+44', country: 'UK' },
    { code: '+971', country: 'UAE' },
    { code: '+65', country: 'Singapore' },
    { code: '+61', country: 'Australia' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
    { code: '+81', country: 'Japan' },
    { code: '+966', country: 'Saudi Arabia' },
  ];

  const services = [
    'Branding & Packaging',
    'Creative Design',
    'Performance Marketing Creatives',
    'Video Production & Editing',
    'Digital Marketing & Social Media Management',
  ];

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your business email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Please enter your company or brand name';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{6,15}$/.test(formData.mobile.replace(/[\s-]/g, ''))) {
      newErrors.mobile = 'Please enter a valid mobile phone number';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service category';
    }

    if (!formData.details.trim()) {
      newErrors.details = 'Please briefly outline your project needs';
    } else if (formData.details.trim().length < 15) {
      newErrors.details = 'Please provide at least a short sentence (15+ characters)';
    }

    if (!isCompact && !formData.consent) {
      newErrors.consent = 'You must agree to the privacy policy to submit';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const result = await submitEnquiry({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        countryCode: formData.countryCode,
        mobile: `${formData.countryCode} ${formData.mobile}`,
        service: formData.service,
        budget: formData.budget,
        deadline: formData.deadline,
        details: formData.details,
        consent: formData.consent,
      });

      setSubmitResult(result);
      if (result.success) {
        // Reset form fields
        setFormData({
          name: '',
          email: '',
          company: '',
          countryCode: '+91',
          mobile: '',
          service: '',
          budget: '',
          deadline: '',
          details: '',
          consent: false,
        });
        setErrors({});
      }
    } catch {
      setSubmitResult({
        success: false,
        message: 'A network error occurred while submitting. Please reach us directly via WhatsApp or email.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
      {submitResult && submitResult.success ? (
        <div className="py-6 text-center space-y-4">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#123578]">
              Enquiry Submitted Successfully
            </h3>
            <p className="text-slate-600 mt-2 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              {submitResult.message}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left max-w-md mx-auto space-y-2 text-xs text-slate-600">
            <div className="flex justify-between font-mono">
              <span className="font-medium text-slate-500">Reference ID:</span>
              <span className="font-bold text-[#123578]">{submitResult.enquiryId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Destination:</span>
              <span className="font-medium text-slate-700">akshay@goodfolksolution.in</span>
            </div>
            {submitResult.integrationNote && (
              <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/80 leading-normal">
                {submitResult.integrationNote}
              </p>
            )}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href={`https://wa.me/919817961412?text=Hi%20Goodfolk%20Solution%2C%20I%20just%20submitted%20project%20enquiry%20${submitResult.enquiryId}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs px-4 py-2.5 rounded-lg transition-colors"
            >
              Follow up on WhatsApp
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => setSubmitResult(null)}
              className="text-xs text-slate-600 hover:text-slate-900 underline underline-offset-4 py-2"
            >
              Submit another project enquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {submitResult && !submitResult.success && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Submission Failed</p>
                <p className="text-xs mt-0.5">{submitResult.message}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label
                htmlFor="enquiry-name"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Full Name <span className="text-[#ED650B]">*</span>
              </label>
              <input
                id="enquiry-name"
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ED650B] transition-colors ${
                  errors.name ? 'border-red-400 bg-red-50/20' : 'border-slate-300 bg-white'
                }`}
              />
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
            </div>

            {/* Business Email */}
            <div>
              <label
                htmlFor="enquiry-email"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Business Email <span className="text-[#ED650B]">*</span>
              </label>
              <input
                id="enquiry-email"
                type="email"
                placeholder="rahul@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ED650B] transition-colors ${
                  errors.email ? 'border-red-400 bg-red-50/20' : 'border-slate-300 bg-white'
                }`}
              />
              {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Company / Brand */}
            <div>
              <label
                htmlFor="enquiry-company"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Company / Brand <span className="text-[#ED650B]">*</span>
              </label>
              <input
                id="enquiry-company"
                type="text"
                placeholder="e.g. Aura Botanics"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ED650B] transition-colors ${
                  errors.company ? 'border-red-400 bg-red-50/20' : 'border-slate-300 bg-white'
                }`}
              />
              {errors.company && <p className="text-xs text-red-600 mt-1">{errors.company}</p>}
            </div>

            {/* Mobile Number with Country Code */}
            <div>
              <label
                htmlFor="enquiry-mobile"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Mobile Number <span className="text-[#ED650B]">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  value={formData.countryCode}
                  onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                  aria-label="Country Code"
                  className="px-2.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                >
                  {countryCodes.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} ({c.country})
                    </option>
                  ))}
                </select>
                <input
                  id="enquiry-mobile"
                  type="tel"
                  placeholder="98123 45678"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  style={{ width: '121px' }}
                  className={`w-[121px] px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ED650B] transition-colors ${
                    errors.mobile ? 'border-red-400 bg-red-50/20' : 'border-slate-300 bg-white'
                  }`}
                />
              </div>
              {errors.mobile && <p className="text-xs text-red-600 mt-1">{errors.mobile}</p>}
            </div>
          </div>

          {/* Service Required */}
          <div>
            <label
              htmlFor="enquiry-service"
              className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Service Required <span className="text-[#ED650B]">*</span>
            </label>
            <select
              id="enquiry-service"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ED650B] transition-colors ${
                errors.service ? 'border-red-400 bg-red-50/20' : 'border-slate-300 bg-white'
              }`}
            >
              <option value="">Select a service category...</option>
              {services.map((svc) => (
                <option key={svc} value={svc}>
                  {svc}
                </option>
              ))}
            </select>
            {errors.service && <p className="text-xs text-red-600 mt-1">{errors.service}</p>}
          </div>

          {/* Optional fields for full Contact page */}
          {!isCompact && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="enquiry-budget"
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Approximate Budget <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  id="enquiry-budget"
                  type="text"
                  placeholder="e.g. ₹50,000 - ₹1,50,000 / $1,000+"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                />
              </div>
              <div>
                <label
                  htmlFor="enquiry-deadline"
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Preferred Deadline <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  id="enquiry-deadline"
                  type="text"
                  placeholder="e.g. Within 3-4 weeks / Next month"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
                />
              </div>
            </div>
          )}

          {/* Project Details */}
          <div>
            <label
              htmlFor="enquiry-details"
              className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Project Details <span className="text-[#ED650B]">*</span>
            </label>
            <textarea
              id="enquiry-details"
              rows={isCompact ? 3 : 4}
              placeholder="Tell us about your brand, goals, key deliverables, and vision..."
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ED650B] transition-colors resize-none ${
                errors.details ? 'border-red-400 bg-red-50/20' : 'border-slate-300 bg-white'
              }`}
            />
            {errors.details && <p className="text-xs text-red-600 mt-1">{errors.details}</p>}
          </div>

          {/* Consent Checkbox */}
          {!isCompact && (
            <div>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-1 rounded border-slate-300 text-[#ED650B] focus:ring-[#ED650B]"
                />
                <span className="text-xs text-slate-600 leading-relaxed">
                  I agree to Goodfolk Solution processing my details to review this enquiry as described in the{' '}
                  <button
                    type="button"
                    onClick={onNavigateToPrivacy}
                    className="text-[#123578] font-semibold underline underline-offset-2 hover:text-[#ED650B]"
                  >
                    Privacy Policy
                  </button>
                  .
                </span>
              </label>
              {errors.consent && <p className="text-xs text-red-600 mt-1">{errors.consent}</p>}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#ED650B] hover:bg-[#d95605] active:scale-[0.99] disabled:opacity-70 text-white font-semibold py-3 px-6 rounded-xl shadow-xs transition-all duration-150 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#ED650B] focus:ring-offset-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing Enquiry...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Enquiry</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
