import { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

function Navbar({ user, onLogin, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [exploreActive, setExploreActive] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/") {
      setExploreActive(false);
      return undefined;
    }

    function checkScroll() {
      const section = document.getElementById("explore-clubs");
      if (!section) return;
      setExploreActive(section.getBoundingClientRect().top <= 140);
    }

    checkScroll();
    window.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      window.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [location.pathname]);

  function goToExplore(e) {
    e.preventDefault();

    if (location.pathname === "/") {
      document
        .getElementById("explore-clubs")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: "explore-clubs" } });
    }
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <button
          className="navbar-logo logo-button"
          onClick={() => navigate("/")}
        >
          <div className="navbar-logo-mark">C</div>
          <div className="navbar-logo-text">CAMPUSX</div>
        </button>

        <nav className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              "navbar-link" + (isActive && !exploreActive ? " active" : "")
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

          <button
            type="button"
            className={"navbar-link" + (exploreActive ? " active" : "")}
            onClick={goToExplore}
          >
            Explore
          </button>
        </nav>

        <div className="navbar-account">
          {user ? (
            <>
              <span className="nav-welcome">
                Hi, {user.name.split(" ")[0]}
              </span>

              {user.role === "admin" && (
                <span className="admin-badge">ADMIN</span>
              )}

              {user.role === "admin" ? (
                <button
                  className="nav-cta"
                  onClick={() => navigate("/admin")}
                >
                  Admin panel
                </button>
              ) : (
                <button
                  className="nav-cta"
                  onClick={() => navigate("/create-club")}
                >
                  + Create club
                </button>
              )}

              <button className="nav-logout" onClick={onLogout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <button className="nav-login" onClick={onLogin}>
                Log in
              </button>

              <button className="nav-cta" onClick={onLogin}>
                Get started <span>→</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;