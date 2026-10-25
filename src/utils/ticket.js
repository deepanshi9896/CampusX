import QRCode from "qrcode";

export function makeTicketId() {
  return "CX-" + Date.now().toString(36).toUpperCase();
}

export function ticketText(event, registration) {
  return [
    "CAMPUSX EVENT TICKET",
    `Ticket ID: ${registration.ticketId}`,
    `Event: ${event.title}`,
    `Date: ${event.day} ${event.month}`,
    `Venue: ${event.location}`,
    `Name: ${registration.name}`,
    `Email: ${registration.email}`,
  ].join("\n");
}

export function createQrImage(text) {
  return QRCode.toDataURL(text, {
    width: 240,
    margin: 1,
    color: { dark: "#16161f", light: "#ffffff" },
  });
}
