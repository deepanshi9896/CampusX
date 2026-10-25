import { useState } from "react";
import events from "../data/events";
import EventModal from "../components/EventModal";

function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null); // controls the popup

  return (
    <div className="container events-page">
      <div className="events-header">
        <h1>UPCOMING EVENTS</h1>
        <p>What's coming up across campus — {events.length} events</p>
      </div>

      {events.map((event) => (
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
            <button
              type="button"
              className="club-card-btn"
              style={{ marginTop: 16, width: 180 }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedEvent(event);
              }}
            >
              View full details
            </button>
          </div>
        </article>
      ))}

      {/* Popup shown on top of this same page - clicking an event never
          navigates to a different route */}
      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
}

export default Events;
