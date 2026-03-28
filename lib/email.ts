import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
  from,
}: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}) {
  return transporter.sendMail({
    from: from || process.env.EMAIL_FROM || "noreply@practicalbacommunity.com",
    to,
    subject,
    html,
  });
}

export async function sendContactEmail(data: {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}) {
  return sendEmail({
    to: process.env.CONTACT_EMAIL || "Tolulopesaliu180@gmail.com",
    subject: `[Contact Form] ${data.subject} from ${data.fullName}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  });
}

export async function sendWelcomeEmail(data: { name: string; email: string }) {
  return sendEmail({
    to: data.email,
    subject: "Welcome to the Practical BA Community!",
    html: `
      <h2>Welcome to the Practical BA Community, ${data.name}!</h2>
      <p>We're thrilled to have you here. You now have access to:</p>
      <ul>
        <li>Free BA resources and guides</li>
        <li>Community support and networking</li>
        <li>Exclusive tips and career insights</li>
      </ul>
      <p>Stay tuned for updates!</p>
      <p>— Tolu</p>
    `,
  });
}

export async function sendDownloadEmail(data: { name: string; email: string; downloadUrl?: string | null }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://practicalbacommunity.com";
  const downloadLink = data.downloadUrl ? `${siteUrl}${data.downloadUrl}` : `${siteUrl}/guide.pdf`;
  return sendEmail({
    to: data.email,
    subject: "Your Free BA Starter Guide is Here! 🎁",
    html: `
      <h2>Your Free BA Starter Guide, ${data.name}!</h2>
      <p>Thank you for signing up! Click the link below to download your free guide:</p>
      <p><a href="${downloadLink}">Download Your BA Starter Guide</a></p>
      <p>Happy learning!</p>
      <p>— Tolu</p>
    `,
  });
}
