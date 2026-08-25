import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import SearchClubs from "../components/SearchClubs";
import ClubCard from "../components/ClubCard";
import ClubModal from "../components/ClubModal";
import clubs from "../data/clubs";

function Home() {
  const [query, setQuery] = useState("");
  const [selectedClub, setSelectedClub] = useState(null); // controls the popup
  const location = useLocation();

  // Scroll to the explore section when the navbar "Explore" link sends us
  // here from another page (e.g. from /events).
  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.state]);

  const filtered = clubs.filter((club) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      club.name.toLowerCase().includes(q) ||
      club.category.toLowerCase().includes(q) ||
      club.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  return (
    <>
      <Hero />

      <div className="container">
        <SearchClubs query={query} setQuery={setQuery} />

        <section id="explore-clubs" className="explore">
          <div className="explore-heading">
            <h2>EXPLORE CLUBS</h2>
            <span className="explore-count">{filtered.length} clubs</span>
          </div>

          {filtered.length === 0 ? (
            <div className="explore-empty">
              No clubs match "{query}". Try a different hobby.
            </div>
          ) : (
            <div className="club-grid">
              {filtered.map((club) => (
                <ClubCard key={club.id} club={club} onSelect={setSelectedClub} />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Popup shown on top of this same page - clicking a club never
          navigates to a different route */}
      <ClubModal club={selectedClub} onClose={() => setSelectedClub(null)} />
    </>
  );
}

export default Home;
