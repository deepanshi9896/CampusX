import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";
import AuthModal from "./components/AuthModal";
import CreateClub from "./pages/CreateClub";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("campusxUser") || "null")
  );

  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    if (location.state?.scrollTo) return;
    window.scrollTo(0, 0);
  }, [location.pathname, location.state]);

  function handleLogin(account) {
    setUser(account);
    localStorage.setItem("campusxUser", JSON.stringify(account));
    setAuthOpen(false);

    navigate(account.role === "admin" ? "/admin" : "/");
  }

  function logout() {
    localStorage.removeItem("campusxUser");
    setUser(null);
    navigate("/");
  }

  return (
    <>
      <Navbar
        user={user}
        onLogin={() => setAuthOpen(true)}
        onLogout={logout}
      />

      <main style={{ flex: 1 }}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                user={user}
                onLogin={() => setAuthOpen(true)}
              />
            }
          />

          <Route path="/events" element={<Events user={user} />} />

          <Route
            path="/create-club"
            element={
              user?.role === "user" ? (
                <CreateClub
                  user={user}
                  onLogin={() => setAuthOpen(true)}
                />
              ) : (
                <Home
                  user={user}
                  onLogin={() => setAuthOpen(true)}
                />
              )
            }
          />

          <Route
            path="/admin"
            element={
              user?.role === "admin" ? (
                <AdminDashboard />
              ) : (
                <Home
                  user={user}
                  onLogin={() => setAuthOpen(true)}
                />
              )
            }
          />
        </Routes>
      </main>

      <Footer />

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onLogin={handleLogin}
      />
    </>
  );
}

export default App;