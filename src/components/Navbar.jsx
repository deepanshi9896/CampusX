import { NavLink, useNavigate, useLocation } from "react-router-dom";

// Only 3 nav buttons: Home (browse), Upcoming Events, Explore (scrolls to clubs section on home)
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  function goToExplore(e) {
    e.preventDefault();
    if (location.pathname === "/") {
      const section = document.getElementById("explore-clubs");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: "explore-clubs" } });
    }
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-logo">
          <div className="navbar-logo-mark">C</div>
          <div className="navbar-logo-text">CAMPUSX</div>
        </div>

        <nav className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              "navbar-link" + (isActive ? " active" : "")
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) =>
              "navbar-link" + (isActive ? " active" : "")
            }
          >
            Upcoming Events
          </NavLink>
          <button type="button" className="navbar-link" onClick={goToExplore}>
            Explore
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
