import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import SearchClubs from "../components/SearchClubs";
import ClubCard from "../components/ClubCard";
import ClubModal from "../components/ClubModal";
import clubs from "../data/clubs";

function Home({ user, onLogin }) {
  const [query, setQuery] = useState("");
  const [selectedClub, setSelectedClub] = useState(null); // controls the popup
  const [approvedClubs] = useState(() => JSON.parse(localStorage.getItem("campusxClubRequests") || "[]").filter((club) => club.status === "Approved").map((club) => ({ ...club, category: club.category.toUpperCase(), badge: "CAMPUSX", tags: (club.tags || "").split(",").map((tag) => tag.trim()).filter(Boolean), image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=700&q=80" })));
  const location = useLocation();

  // Scroll to the explore section when the navbar "Explore" link sends us
  // here from another page (e.g. from /events).
  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.state]);

  const allClubs = [...approvedClubs, ...clubs];
  const filtered = allClubs.filter((club) => {
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
      {user?.role === "user" && <div className="member-welcome container"><div><span className="eyebrow">WELCOME TO YOUR CAMPUS</span><h2>Hey, {user.name.split(" ")[0]} 👋</h2><p>Find your people or bring a new club idea to life.</p></div><button className="primary-button" onClick={() => window.location.assign("/create-club")}>+ Create a club</button></div>}
      {!user && <div className="join-strip container"><div><span className="eyebrow">YOUR IDEA, YOUR COMMUNITY</span><h2>Have an idea for a club?</h2><p>Start something people on campus will love.</p></div><button className="primary-button" onClick={onLogin}>Log in to create a club <span>→</span></button></div>}

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
