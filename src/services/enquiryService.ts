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
  deliveryMethod?: 'google-sheets';
  integrationNote?: string;
}

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwLec-O8zdz_Uq40uzR1a8YCD_-jELUtckCf7EiAgzMDtibOJI5DIPAx0Lfqk1tPld9/exec';

export const submitEnquiry = async (data: EnquiryData): Promise<EnquiryResponse> => {
  const enquiryPayload: EnquiryData = {
    ...data,
    id: `GF-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`,
    createdAt: new Date().toISOString(),
  };

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(enquiryPayload),
    });

    return {
      success: true,
      message: 'Thank you! Your enquiry has been submitted.',
      enquiryId: enquiryPayload.id,
      deliveryMethod: 'google-sheets',
      integrationNote: 'Submission sent to Google Sheets.',
    };
  } catch (error) {
    console.error('Google Sheets submission failed:', error);

    return {
      success: false,
      message: 'Enquiry could not be submitted. Please contact us directly by email or WhatsApp.',
    };
  }
};
