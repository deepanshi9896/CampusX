const SUGGESTED_TAGS = [
  "singing",
  "dance",
  "bhangra",
  "theatre",
  "writing",
  "fashion",
  "art",
  "photography",
  "coding",
  "public speaking",
];

// Controlled search: parent (Home page) owns the query state
function SearchClubs({ query, setQuery }) {
  function handleTagClick(tag) {
    // If the same tag is clicked again, clear the search
    if (query.toLowerCase() === tag.toLowerCase()) {
      setQuery("");
    } else {
      setQuery(tag);
    }
  }

  return (
    <section className="finder">
      <h2 className="finder-title">
        FIND A CLUB THAT <span>FITS YOUR VIBE.</span>
      </h2>

      <p className="finder-desc">
        Type a hobby — singing, coding, bhangra, sketching, anything — and
        we'll match you to a club on campus.
      </p>

      <div className="finder-search">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          type="text"
<<<<<<< HEAD
          placeholder="Search by hobby, category or club name..."
=======
          placeholder="Try 'singing', 'bhangra', 'coding'..."
>>>>>>> a1b0e90b99c908ab98f56abb371ddca1bb92866f
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="finder-pills">
        {SUGGESTED_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            className={
              "finder-pill" +
              (query.toLowerCase() === tag.toLowerCase() ? " active" : "")
            }
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </section>
  );
}

export default SearchClubs;