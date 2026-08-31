import { useEffect } from "react";

// Popup modal shown on top of the current page when a club card is clicked.
// Closing it (X button, backdrop click, or Escape key) just clears the
// selected club - there is no route change involved.
function ClubModal({ club, onClose }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!club) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-media">
          <img src={club.image} alt={club.name} />
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-category">{club.category}</div>
          <h2 className="modal-title">{club.name}</h2>

          <p className="modal-desc-label">DESCRIPTION</p>
          <p className="modal-desc">{club.description}</p>

          <div className="modal-tags">
            {club.tags.map((tag) => (
              <span className="club-card-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubModal;
