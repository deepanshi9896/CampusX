// A single club card. Clicking the card or the button opens the popup
// modal on the same page (handled by the parent via onSelect) - it does
// NOT navigate to a new page/route.
function ClubCard({ club, onSelect }) {
  return (
    <div className="club-card" role="button" onClick={() => onSelect(club)}>
      <div className="club-card-media">
        <img src={club.image} alt={club.name} />
        <span className="club-card-badge">{club.badge}</span>
      </div>

      <div className="club-card-body">
        <div className="club-card-category">{club.category}</div>
        <h3 className="club-card-name">{club.name}</h3>
        <p className="club-card-desc">{club.description}</p>

        <div className="club-card-tags">
          {club.tags.map((tag) => (
            <span className="club-card-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <button
          type="button"
          className="club-card-btn"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(club);
          }}
        >
          View club
        </button>
      </div>
    </div>
  );
}

export default ClubCard;
