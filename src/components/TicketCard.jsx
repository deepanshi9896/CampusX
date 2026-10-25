import { useEffect, useState } from "react";
import { createQrImage, ticketText } from "../utils/ticket";

function TicketCard({ event, registration }) {
  const [qrImage, setQrImage] = useState("");

  useEffect(() => {
    let active = true;

    createQrImage(ticketText(event, registration)).then((image) => {
      if (active) setQrImage(image);
    });

    return () => {
      active = false;
    };
  }, [event, registration]);

  return (
    <div className="ticket-card">
      <div className="ticket-info">
        <p className="modal-desc-label">YOUR TICKET</p>
        <h3>{event.title}</h3>
        <p>
          {event.day} {event.month} · 📍 {event.location}
        </p>
        <div className="ticket-row">
          <span>Name</span>
          <b>{registration.name}</b>
        </div>
        <div className="ticket-row">
          <span>Email</span>
          <b>{registration.email}</b>
        </div>
        <div className="ticket-row">
          <span>Ticket ID</span>
          <b>{registration.ticketId}</b>
        </div>
        <p className="field-note">Show this QR code at the entry gate.</p>
      </div>

      <div className="ticket-qr">
        {qrImage ? (
          <>
            <img src={qrImage} alt="Ticket QR code" />
            <a href={qrImage} download={`${registration.ticketId}.png`}>
              Download QR
            </a>
          </>
        ) : (
          <span className="field-note">Making your QR…</span>
        )}
      </div>
    </div>
  );
}

export default TicketCard;
