export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  mobile: string;
  notes?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  clientId: string;
  clientName: string;
  company: string;
  projectName: string;
  service: string;
  startDate: string;
  deadline: string;
  status: 'discovery' | 'in_progress' | 'review' | 'completed' | 'on_hold';
  agreedPrice: number;
  deliverables?: string[];
  createdAt: string;
}

export interface InvoiceItem {
  description: string;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  company: string;
  clientEmail?: string;
  clientMobile?: string;
  projectId: string;
  projectName: string;
  amount: number;
  paidAmount: number;
  balanceAmount: number;
  issueDate: string;
  dueDate: string;
  status: 'draft' | 'issued' | 'paid' | 'partial' | 'overdue';
  items: InvoiceItem[];
  notes?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  receiptNumber: string;
  invoiceId: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  company: string;
  projectId: string;
  projectName: string;
  amount: number;
  paymentType: 'advance' | 'instalment' | 'final_settlement';
  paymentMethod: 'upi' | 'bank_transfer' | 'cash';
  transactionRef: string;
  paymentDate: string;
  notes?: string;
  status: 'verified' | 'pending_verification' | 'rejected';
  rejectionReason?: string;
  verifiedAt?: string;
  verifiedBy?: string;
  recordedBy: string;
  createdAt: string;
}

export interface UpiSettings {
  upiId: string;
  payeeName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  contactPhone: string;
  notes?: string;
}

export interface DashboardStats {
  summary: {
    totalRevenue: number;
    totalInvoiced: number;
    totalPaid: number;
    pendingPayments: number;
    pendingVerificationCount: number;
    pendingVerificationAmount: number;
    overdueCount: number;
    overdueAmount: number;
    clientCount: number;
    projectCount: number;
    invoiceCount: number;
    enquiryCount: number;
  };
  projectsByStatus: {
    discovery: number;
    in_progress: number;
    review: number;
    completed: number;
    on_hold: number;
  };
  recentPayments: Payment[];
  pendingVerificationList: Payment[];
  recentEnquiries: any[];
  overdueInvoices: Invoice[];
  upiSettings: UpiSettings;
}

const TOKEN_KEY = 'goodfolk_admin_token';

export const adminAuth = {
  getToken: () => sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY),
  setToken: (token: string, remember = true) => {
    sessionStorage.setItem(TOKEN_KEY, token);
    if (remember) localStorage.setItem(TOKEN_KEY, token);
  },
  clearToken: () => {
    sessionStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_KEY);
  },
  isAuthenticated: () => Boolean(adminAuth.getToken()),
};

const authFetch = async (url: string, options: RequestInit = {}) => {
  const token = adminAuth.getToken();
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(url, { ...options, headers });
  if (res.status === 401) {
    adminAuth.clearToken();
    window.location.href = '/admin';
    throw new Error('Unauthorized');
  }
  return res;
};

export const adminApi = {
  // Auth
  login: async (email: string, password: string) => {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    adminAuth.setToken(data.token);
    return data;
  },

  logout: async () => {
    try {
      await authFetch('/api/admin/logout', { method: 'POST' });
    } catch {}
    adminAuth.clearToken();
  },

  getMe: async () => {
    const res = await authFetch('/api/admin/me');
    return res.json();
  },

  // Stats
  getDashboardStats: async (): Promise<DashboardStats> => {
    const res = await authFetch('/api/admin/dashboard-stats');
    return res.json();
  },

  // Clients
  getClients: async (): Promise<Client[]> => {
    const res = await authFetch('/api/admin/clients');
    return res.json();
  },

  createClient: async (client: Omit<Client, 'id' | 'createdAt'>): Promise<Client> => {
    const res = await authFetch('/api/admin/clients', {
      method: 'POST',
      body: JSON.stringify(client),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to create client');
    }
    return res.json();
  },

  updateClient: async (id: string, updates: Partial<Client>): Promise<Client> => {
    const res = await authFetch(`/api/admin/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update client');
    return res.json();
  },

  deleteClient: async (id: string) => {
    const res = await authFetch(`/api/admin/clients/${id}`, { method: 'DELETE' });
    return res.json();
  },

  // Projects
  getProjects: async (): Promise<Project[]> => {
    const res = await authFetch('/api/admin/projects');
    return res.json();
  },

  createProject: async (project: any): Promise<Project> => {
    const res = await authFetch('/api/admin/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to create project');
    }
    return res.json();
  },

  updateProject: async (id: string, updates: Partial<Project>): Promise<Project> => {
    const res = await authFetch(`/api/admin/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    return res.json();
  },

  deleteProject: async (id: string) => {
    const res = await authFetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
    return res.json();
  },

  // Invoices
  getInvoices: async (): Promise<Invoice[]> => {
    const res = await authFetch('/api/admin/invoices');
    return res.json();
  },

  createInvoice: async (invoice: any): Promise<Invoice> => {
    const res = await authFetch('/api/admin/invoices', {
      method: 'POST',
      body: JSON.stringify(invoice),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to create invoice');
    }
    return res.json();
  },

  updateInvoice: async (id: string, updates: Partial<Invoice>): Promise<Invoice> => {
    const res = await authFetch(`/api/admin/invoices/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    return res.json();
  },

  deleteInvoice: async (id: string) => {
    const res = await authFetch(`/api/admin/invoices/${id}`, { method: 'DELETE' });
    return res.json();
  },

  // Payments & Reviews
  getPayments: async (): Promise<Payment[]> => {
    const res = await authFetch('/api/admin/payments');
    return res.json();
  },

  recordPayment: async (paymentData: any): Promise<{ success: boolean; payment: Payment; updatedInvoice: Invoice }> => {
    const res = await authFetch('/api/admin/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to record payment');
    }
    return data;
  },

  verifyPayment: async (paymentId: string) => {
    const res = await authFetch(`/api/admin/payments/${paymentId}/verify`, {
      method: 'POST',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to verify payment');
    return data;
  },

  rejectPayment: async (paymentId: string, reason?: string) => {
    const res = await authFetch(`/api/admin/payments/${paymentId}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to reject payment');
    return data;
  },

  // UPI Settings
  getUpiSettings: async (): Promise<UpiSettings> => {
    const res = await fetch('/api/settings/upi');
    return res.json();
  },

  updateUpiSettings: async (settings: Partial<UpiSettings>) => {
    const res = await authFetch('/api/admin/settings/upi', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update UPI settings');
    return data;
  },

  // Enquiries
  getEnquiries: async (): Promise<any[]> => {
    const res = await authFetch('/api/admin/enquiries');
    return res.json();
  },

  updateEnquiryStatus: async (id: string, status: string) => {
    const res = await authFetch(`/api/admin/enquiries/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
    return res.json();
  },

  convertEnquiry: async (id: string) => {
    const res = await authFetch(`/api/admin/enquiries/${id}/convert`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to convert enquiry');
    return res.json();
  },

  // Public Client Payment Portal APIs
  getPublicInvoice: async (invoiceNumber: string) => {
    const res = await fetch(`/api/public/invoices/${encodeURIComponent(invoiceNumber)}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Invoice not found');
    return data;
  },

  submitUtr: async (invoiceNumber: string, payload: {
    transactionRef: string;
    amount: number;
    paymentDate: string;
    remitterName?: string;
    notes?: string;
  }) => {
    const res = await fetch(`/api/public/invoices/${encodeURIComponent(invoiceNumber)}/submit-utr`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to submit payment reference');
    return data;
  },
};
