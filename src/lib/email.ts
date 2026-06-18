import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

export interface ContactEmailPayload {
  name: string;
  email: string;
  phone?: string;
  role?: string;
  message: string;
  subject?: string;
  formType?: string;
}

interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  to: string;
}

function getSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST;
  const port = Number.parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM;

  if (!host || !user || !pass || !from || Number.isNaN(port)) {
    return null;
  }

  const toRaw = process.env.SMTP_TO || user;
  const to = toRaw
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean)
    .join(', ');

  return { host, port, user, pass, from, to };
}

export function isSmtpConfigured(): boolean {
  return getSmtpConfig() !== null;
}

function createTransporter(): Transporter | null {
  const config = getSmtpConfig();
  if (!config) return null;

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
}

function formatContactEmailBody(payload: ContactEmailPayload): string {
  const lines = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Role: ${payload.role || 'N/A'}`,
    `Phone: ${payload.phone || 'N/A'}`,
  ];

  if (payload.formType) {
    lines.push(`Form Type: ${payload.formType}`);
  }

  lines.push('', 'Message:', payload.message);

  return lines.join('\n');
}

export async function sendEmail(options: {
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}): Promise<{ success: boolean; error?: string }> {
  const config = getSmtpConfig();
  const transporter = createTransporter();

  if (!config || !transporter) {
    return { success: false, error: 'Configuration SMTP manquante.' };
  }

  try {
    await transporter.sendMail({
      from: config.from,
      to: config.to,
      replyTo: options.replyTo,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur SMTP inconnue';
    console.error('SMTP send error:', error);
    return { success: false, error: message };
  }
}

export async function sendContactEmail(
  payload: ContactEmailPayload
): Promise<{ success: boolean; error?: string }> {
  const subject =
    payload.subject || `Nouveau message: ${payload.name}${payload.role ? ` (${payload.role})` : ''}`;

  return sendEmail({
    subject,
    text: formatContactEmailBody(payload),
    replyTo: payload.email,
  });
}
