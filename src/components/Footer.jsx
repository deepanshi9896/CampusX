
import { Link, useNavigate, useLocation } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

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

  function goToHome(e) {
    e.preventDefault();

    if (location.pathname === "/") {
      // Already on Home → directly go to top
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } else {
      // Coming from another page → navigate to Home
      navigate("/");
    }
  }

  function goToEvents(e) {
    e.preventDefault();

    if (location.pathname === "/events") {
      // Already on Events → directly go to top
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } else {
      // Coming from another page → navigate to Events
      navigate("/events");
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">

          {/* BRAND */}
          <div>
            <div className="navbar-logo">
              <div className="navbar-logo-mark">C</div>
              <div className="navbar-logo-text">CAMPUSX</div>
            </div>

            <h3 className="footer-portal-title">
              Student Club Management Portal
            </h3>

            <p className="footer-desc">
              Empowering students through clubs, events, and a vibrant campus
              community. Your university journey starts here.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4>QUICK LINKS</h4>

            <ul>
              <li>
                <a href="/" onClick={goToHome}>
                  Home
                </a>
              </li>

              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={goToExplore}
                >
                  Clubs
                </button>
              </li>

              <li>
                <a href="/events" onClick={goToEvents}>
                  Upcoming Events
                </a>
              </li>
            </ul>
          </div>

          {/* CLUB CATEGORIES */}
          <div>
            <h4>CLUB CATEGORIES</h4>

            <ul>
              <li><span>Sports Clubs</span></li>
              <li><span>Academic Clubs</span></li>
              <li><span>Cultural Clubs</span></li>
              <li><span>Technical Clubs</span></li>
              <li><span>Arts & Performance</span></li>
              <li><span>Volunteer & Social</span></li>
            </ul>
          </div>

          {/* CONTACT US */}
          <div>
            <h4>CONTACT US</h4>

            <div className="footer-contact-block">
              <div className="footer-contact-row">
                📍 Chitkara University, Rajpura, Punjab
              </div>
            </div>

            <div className="footer-contact-block">
              <div className="label">OSL</div>
              <div className="footer-contact-row">
                ✉ osl@chitkara.edu.in
              </div>
              <div className="footer-contact-row">
                📷 @osl.chitkara
              </div>
            </div>

            <div className="footer-contact-block">
              <div className="label">OSA</div>
              <div className="footer-contact-row">
                ✉ osa@chitkara.edu.in
              </div>
              <div className="footer-contact-row">
                📷 @osa.chitkara
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="footer-bottom">
          <span>
            © 2026 CampusX. Built for the campus community.
          </span>

          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
