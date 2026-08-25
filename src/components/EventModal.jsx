import { useEffect } from "react";

// Popup modal for an event - shown on top of the Events page when an event
// card is clicked. Shows the event's image and full description. Closing
// it just clears the selected event - no route change involved.
function EventModal({ event, onClose }) {
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
            {event.day} {event.month}
          </div>
          <h2 className="modal-title">{event.title}</h2>

          <p className="modal-desc-label">DESCRIPTION</p>
          <p className="modal-desc">{event.description}</p>
        </div>
      </div>
    </div>
  );
}

export default EventModal;
