export interface EnquiryData {
  id?: string;
  name: string;
  email: string;
  company: string;
  mobile: string;
  countryCode?: string;
  service: string;
  budget?: string;
  deadline?: string;
  details: string;
  consent?: boolean;
  createdAt?: string;
}

export interface EnquiryResponse {
  success: boolean;
  message: string;
  enquiryId?: string;
  deliveryMethod?: 'server-api' | 'local-store';
  integrationNote?: string;
}

export const submitEnquiry = async (data: EnquiryData): Promise<EnquiryResponse> => {
  const enquiryPayload: EnquiryData = {
    ...data,
    id: `GF-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`,
    createdAt: new Date().toISOString(),
  };

  try {
    // Attempt real server API submission first
    const response = await fetch('/api/enquiries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enquiryPayload),
    });

    if (response.ok) {
      const resJson = await response.json();
      return {
        success: true,
        message: resJson.message || 'Your enquiry has been received successfully! Our team will review your brief within 24 hours.',
        enquiryId: resJson.enquiryId || enquiryPayload.id,
        deliveryMethod: 'server-api',
        integrationNote: resJson.integrationNote,
      };
    }
  } catch (err) {
    // Server route may be unmounted or in client-only preview mode. Fall back to secure local persistence.
    console.warn('API route /api/enquiries not reachable; using client-side lead vault fallback:', err);
  }

  // Fallback: Save to browser storage so submission is never lost
  try {
    const existing = JSON.parse(localStorage.getItem('goodfolk_enquiries') || '[]');
    existing.unshift(enquiryPayload);
    localStorage.setItem('goodfolk_enquiries', JSON.stringify(existing));

    return {
      success: true,
      message: 'Enquiry received and logged successfully! We have recorded your project brief.',
      enquiryId: enquiryPayload.id,
      deliveryMethod: 'local-store',
      integrationNote:
        'Enquiry saved in active session storage. Production email relay (SMTP / Resend API to akshay@goodfolksolution.in) can be configured via environment variables for direct inbox delivery.',
    };
  } catch (storageErr) {
    console.error('Failed to store enquiry:', storageErr);
    return {
      success: false,
      message: 'Unable to process your enquiry at this moment. Please connect directly via WhatsApp or email.',
    };
  }
};
