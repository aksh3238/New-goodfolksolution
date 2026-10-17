import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// Ensure data directory exists
const dataDir = path.resolve(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const enquiriesFilePath = path.join(dataDir, 'enquiries.json');

// Helper to read enquiries
const getEnquiries = () => {
  if (!fs.existsSync(enquiriesFilePath)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(enquiriesFilePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading enquiries.json:', err);
    return [];
  }
};

// Helper to save enquiries
const saveEnquiries = (data: unknown[]) => {
  fs.writeFileSync(enquiriesFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

// API: Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Goodfolk Solution API',
  });
});

// API: Process Enquiry Submissions
app.post('/api/enquiries', (req, res) => {
  const { name, email, company, mobile, service, budget, deadline, details } = req.body;

  // Validation
  if (!name || !email || !company || !mobile || !service || !details) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields. Please ensure name, email, company, mobile, service, and project details are provided.',
    });
  }

  const enquiryId = `GF-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
  const newEnquiry = {
    id: enquiryId,
    name,
    email,
    company,
    mobile,
    service,
    budget: budget || 'Not specified',
    deadline: deadline || 'Not specified',
    details,
    createdAt: new Date().toISOString(),
    status: 'new',
    assignedTo: 'Akshay (Lead Review)',
  };

  const enquiries = getEnquiries();
  enquiries.unshift(newEnquiry);
  saveEnquiries(enquiries);

  console.log(`[ENQUIRY RECEIVED] ID: ${enquiryId}`);
  console.log(`Client: ${name} (${company}) | Mobile: ${mobile} | Email: ${email}`);
  console.log(`Service: ${service} | Budget: ${budget || 'N/A'}`);
  console.log(`Details: ${details}`);
  console.log(`Ready for email dispatch to: akshay@goodfolksolution.in\n`);

  return res.json({
    success: true,
    message: 'Your project enquiry has been received and logged in our system. Akshay and the Goodfolk team will review your specifications within 24 hours.',
    enquiryId,
    integrationNote: 'Enquiry securely recorded in Goodfolk Lead Vault. Automated inbox delivery ready for akshay@goodfolksolution.in.',
  });
});

// API: List enquiries (for administrative verification)
app.get('/api/enquiries', (_req, res) => {
  const enquiries = getEnquiries();
  res.json({ count: enquiries.length, enquiries });
});

async function startServer() {
  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Goodfolk Solution Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
