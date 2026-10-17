
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

const dataDir = path.resolve(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const enquiriesFilePath = path.join(dataDir, 'enquiries.json');

const getEnquiries = (): any[] => {
  if (!fs.existsSync(enquiriesFilePath)) return [];

  try {
    return JSON.parse(fs.readFileSync(enquiriesFilePath, 'utf-8'));
  } catch (error) {
    console.error('Error reading enquiries:', error);
    return [];
  }
};

const saveEnquiries = (data: any[]) => {
  fs.writeFileSync(enquiriesFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 465),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Goodfolk Solution API',
    timestamp: new Date().toISOString(),
  });
});

// Customer enquiry + automatic thank-you email
app.post('/api/enquiries', async (req, res) => {
  const {
    name,
    email,
    company,
    mobile,
    service,
    budget,
    deadline,
    details,
  } = req.body;

  if (!name || !email || !company || !mobile || !service || !details) {
    return res.status(400).json({
      success: false,
      message: 'Please complete all required fields.',
    });
  }

  const enquiryId = `GF-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .substring(2, 5)
    .toUpperCase()}`;

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

  try {
    await transporter.sendMail({
      from: `"Goodfolk Solution" <${process.env.SMTP_EMAIL}>`,
      to: email,
      replyTo: process.env.SMTP_EMAIL,
      subject: `Enquiry Received — ${enquiryId}`,
      text: `Hi ${name},

Thank you for contacting Goodfolk Solution.

We have successfully received your project enquiry.

Enquiry ID: ${enquiryId}
Company: ${company}
Service: ${service}

Our team will review your requirements and get back to you within 24 hours.

Please keep your Enquiry ID for future communication.

Regards,
Goodfolk Solution
akshay@goodfolksolution.in`,
    });

    console.log(`Thank-you email sent for ${enquiryId}`);
  } catch (error) {
    console.error('Customer email failed:', error);
  }

  return res.json({
    success: true,
    message: 'Your enquiry has been received.',
    enquiryId,
  });
});

// Admin enquiry list
app.get('/api/enquiries', (_req, res) => {
  res.json({
    count: getEnquiries().length,
    enquiries: getEnquiries(),
  });
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
    console.log(`Goodfolk Solution server running on port ${PORT}`);
  });
}

startServer();
