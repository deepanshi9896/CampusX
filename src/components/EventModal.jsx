import { useEffect, useState } from "react";
import TicketCard from "./TicketCard";
import AdminEventPanel from "./AdminEventPanel";

function RegisterBox({ event, user, seatsLeft, myRegistration, onRegister }) {
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [justRegistered, setJustRegistered] = useState(null);

  const ticket = justRegistered || myRegistration;

  function handleSubmit(e) {
    e.preventDefault();
    const result = onRegister(event, name, email);

    if (result.error) {
      setError(result.error);
      return;
    }

    setError("");
    setJustRegistered(result.registration);
  }

  if (ticket) {
    return (
      <>
        <div className="register-box register-success">
          ✓ You are registered! {seatsLeft} seats are left now. A confirmation
          email was sent to {ticket.email}.
        </div>
        <TicketCard event={event} registration={ticket} />
      </>
    );
  }

  if (seatsLeft <= 0) {
    return <div className="register-box register-full">This event is full.</div>;
  }

  return (
    <form className="register-box" onSubmit={handleSubmit}>
      <div className="register-top">
        <p className="modal-desc-label">REGISTER FOR THIS EVENT</p>
        <span className={seatsLeft <= 5 ? "seat-pill seat-low" : "seat-pill"}>
          {seatsLeft} of {event.seats} seats left
        </span>
      </div>

      <label>
        Full name
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
      </label>

      <label>
        College email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="yourname@chitkara.edu.in"
        />
      </label>

      {error && <p className="auth-error">{error}</p>}

      <button type="submit" className="primary-button">
        Confirm registration <span>→</span>
      </button>
    </form>
  );
}

function EventModal({
  event,
  user,
  isAdmin,
  seatsLeft,
  registrations,
  myRegistration,
  onRegister,
  onClose,
}) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!event) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-media">
          <img src={event.image} alt={event.title} />
          <span className="event-tag" style={{ top: 14, left: 14 }}>
            {event.tag}
          </span>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-category">
            {event.day} {event.month} · 📍 {event.location}
          </div>
          <h2 className="modal-title">{event.title}</h2>

          <p className="modal-desc-label">DESCRIPTION</p>
          <p className="modal-desc">{event.description}</p>

          {isAdmin ? (
            <AdminEventPanel
              event={event}
              registrations={registrations}
              seatsLeft={seatsLeft}
            />
          ) : (
            <RegisterBox
              key={event.id}
              event={event}
              user={user}
              seatsLeft={seatsLeft}
              myRegistration={myRegistration}
              onRegister={onRegister}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default EventModal;
