import { ALLOWED_DOMAIN, EMAILJS } from "../config";
import { readList, writeList } from "./storage";

const MAIL_LOG_KEY = "campusxMailLog";

export function isCollegeEmail(email) {
  const pattern = /^[^\s@]+@chitkara\.edu\.in$/i;
  return pattern.test(email.trim());
}

export function getMailLog() {
  return readList(MAIL_LOG_KEY);
}

function isEmailServiceConfigured() {
  return Boolean(EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey);
}

async function deliverWithEmailJs({ to, subject, message }) {
  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: EMAILJS.serviceId,
      template_id: EMAILJS.templateId,
      user_id: EMAILJS.publicKey,
      template_params: { to_email: to, subject, message },
    }),
  });

  return response.ok;
}

export async function sendMail({ to, subject, message }) {
  let delivered = false;

  if (isEmailServiceConfigured()) {
    try {
      delivered = await deliverWithEmailJs({ to, subject, message });
    } catch (error) {
      delivered = false;
    }
  }

  const entry = {
    id: Date.now() + Math.random(),
    to,
    subject,
    message,
    sentAt: new Date().toLocaleString(),
    delivered,
  };

  writeList(MAIL_LOG_KEY, [entry, ...getMailLog()]);
}

export { ALLOWED_DOMAIN };
