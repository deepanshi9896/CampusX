import { useState } from "react";
import events from "../data/events";
import EventModal from "../components/EventModal";
import { isCollegeEmail, sendMail } from "../utils/email";
import { readList, writeList } from "../utils/storage";
import { makeTicketId } from "../utils/ticket";

const REGISTRATIONS_KEY = "campusxRegistrations";

function Events({ user }) {
  const isAdmin = user?.role === "admin";
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrations, setRegistrations] = useState(() =>
    readList(REGISTRATIONS_KEY)
  );

  function registrationsFor(event) {
    return registrations.filter((item) => item.eventId === event.id);
  }

  function myRegistrationFor(event) {
    if (!user || isAdmin) return null;
    return registrationsFor(event).find((item) => item.username === user.username);
  }

  function seatsLeft(event) {
    const taken = registrations.filter((item) => item.eventId === event.id);
    return event.seats - taken.length;
  }

  function registerForEvent(event, name, email) {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) return { error: "Please enter your name." };
    if (!isCollegeEmail(cleanEmail)) {
      return { error: "Please use your @chitkara.edu.in email." };
    }

    const alreadyRegistered = registrationsFor(event).some(
      (item) => item.email === cleanEmail
    );
    if (alreadyRegistered) return { error: "This email is already registered." };
    if (seatsLeft(event) <= 0) return { error: "Sorry, all seats are taken." };

    const registration = {
      eventId: event.id,
      name: cleanName,
      email: cleanEmail,
      username: user ? user.username : "",
      ticketId: makeTicketId(),
      registeredAt: new Date().toLocaleString(),
    };

    const updated = [...registrations, registration];
    setRegistrations(updated);
    writeList(REGISTRATIONS_KEY, updated);

    sendMail({
      to: cleanEmail,
      subject: `You are registered for ${event.title}`,
      message: `Hi ${cleanName}, your seat for ${event.title} on ${event.day} ${event.month} at ${event.location} is confirmed. Your ticket ID is ${registration.ticketId}.`,
    });

    return { error: "", registration };
  }

  return (
    <div className="container events-page">
      <div className="events-header">
        <h1>UPCOMING EVENTS</h1>
        <p>What's coming up across campus — {events.length} events</p>
      </div>

      {events.map((event) => {
        const left = seatsLeft(event);
        const mine = myRegistrationFor(event);

        return (
          <article
            className="event-card"
            key={event.id}
            role="button"
            onClick={() => setSelectedEvent(event)}
          >
            <div className="event-media">
              <img src={event.image} alt={event.title} />
              <span className="event-tag">{event.tag}</span>
              <div className="event-date">
                <span className="day">{event.day}</span>
                <span className="month">{event.month}</span>
              </div>
            </div>

            <div className="event-body">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div className="event-meta">
                <span>
                  Hosted by <strong>{event.host}</strong>
                </span>
                <span>📍 {event.location}</span>
              </div>

              <div className="event-actions">
                <button
                  type="button"
                  className="club-card-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEvent(event);
                  }}
                >
                  View full details
                </button>

                <button
                  type="button"
                  className="primary-button register-button"
                  disabled={!isAdmin && !mine && left <= 0}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEvent(event);
                  }}
                >
                  {isAdmin
                    ? "Attendees & internal info"
                    : mine
                    ? "View my ticket"
                    : left > 0
                    ? "Register now"
                    : "Event full"}
                </button>

                <span className={left <= 5 ? "seat-pill seat-low" : "seat-pill"}>
                  {isAdmin
                    ? `${registrationsFor(event).length} registered · ${left} seats left`
                    : left > 0
                    ? `${left} of ${event.seats} seats left`
                    : "No seats left"}
                </span>
              </div>
            </div>
          </article>
        );
      })}

      <EventModal
        event={selectedEvent}
        user={user}
        isAdmin={isAdmin}
        seatsLeft={selectedEvent ? seatsLeft(selectedEvent) : 0}
        registrations={selectedEvent ? registrationsFor(selectedEvent) : []}
        myRegistration={selectedEvent ? myRegistrationFor(selectedEvent) : null}
        onRegister={registerForEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
}

export default Events;
