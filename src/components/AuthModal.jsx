import { useEffect, useState } from "react";
import { ADMIN_LOGIN, ADMIN_PASSWORD_PREFIX } from "../config";
import { readList, writeList } from "../utils/storage";

const ACCOUNTS_KEY = "campusxAccounts";

function AuthModal({ open, onClose, onLogin }) {
  const [mode, setMode] = useState("login");
  const [loginAs, setLoginAs] = useState("student");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (open) {
      setMode("login");
      setLoginAs("student");
      setName("");
      setUsername("");
      setPassword("");
      setMessage("");
    }
  }, [open]);

  if (!open) return null;

  const isAdminLogin = mode === "login" && loginAs === "admin";

  function loginAsAdmin() {
    if (!password.startsWith(ADMIN_PASSWORD_PREFIX)) {
      setMessage(`Admin password must start with ${ADMIN_PASSWORD_PREFIX}`);
      return;
    }

    const usernameMatches =
      username.trim().toLowerCase() === ADMIN_LOGIN.username;
    const passwordMatches = password === ADMIN_LOGIN.password;

    if (!usernameMatches || !passwordMatches) {
      setMessage("Admin username or password is incorrect.");
      return;
    }

    onLogin({ name: "CampusX Admin", username: ADMIN_LOGIN.username, role: "admin" });
  }

  function signUpStudent() {
    if (password.startsWith(ADMIN_PASSWORD_PREFIX)) {
      setMessage(`Student password cannot start with ${ADMIN_PASSWORD_PREFIX}`);
      return;
    }

    const accounts = readList(ACCOUNTS_KEY);
    const taken = accounts.some(
      (item) => item.username.toLowerCase() === username.trim().toLowerCase()
    );

    if (taken) {
      setMessage("This username already exists. Try logging in.");
      return;
    }

    const account = {
      name: name.trim(),
      username: username.trim(),
      password,
      role: "user",
    };
    writeList(ACCOUNTS_KEY, [...accounts, account]);
    onLogin({ name: account.name, username: account.username, role: "user" });
  }

  function loginStudent() {
    if (password.startsWith(ADMIN_PASSWORD_PREFIX)) {
      setMessage("Admins must log in from the Admin tab.");
      return;
    }

    const accounts = readList(ACCOUNTS_KEY);
    const account = accounts.find(
      (item) => item.username === username.trim() && item.password === password
    );

    if (!account) {
      setMessage("Username or password is incorrect.");
      return;
    }

    onLogin({ name: account.name, username: account.username, role: "user" });
  }

  function submit(e) {
    e.preventDefault();
    setMessage("");

    if (mode === "signup") return signUpStudent();
    if (loginAs === "admin") return loginAsAdmin();
    return loginStudent();
  }

  function switchMode() {
    setMode(mode === "login" ? "signup" : "login");
    setLoginAs("student");
    setMessage("");
  }

  function chooseRole(role) {
    setLoginAs(role);
    setMessage("");
  }

  return (
    <div
      className="auth-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section className="auth-panel">
        <button className="auth-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="auth-mark">C</div>
        <p className="eyebrow">
          {isAdminLogin ? "ADMIN ACCESS" : "YOUR CAMPUS. YOUR COMMUNITY."}
        </p>
        <h2>
          {isAdminLogin ? "Admin login" : mode === "login" ? "Welcome back" : "Join CampusX"}
        </h2>
        <p className="auth-subtitle">
          {isAdminLogin
            ? "Sign in to review club requests."
            : mode === "login"
            ? "Log in to find your people."
            : "Create an account and find your community."}
        </p>

        {mode === "login" && (
          <div className="role-switch">
            <button
              type="button"
              className={loginAs === "student" ? "role-on" : ""}
              onClick={() => chooseRole("student")}
            >
              Student
            </button>
            <button
              type="button"
              className={loginAs === "admin" ? "role-on" : ""}
              onClick={() => chooseRole("admin")}
            >
              Admin
            </button>
          </div>
        )}

        <form onSubmit={submit} className="auth-form">
          {mode === "signup" && (
            <label>
              Full name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </label>
          )}

          <label>
            Username
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="username"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              required
              minLength={mode === "signup" ? 4 : undefined}
            />
          </label>

          {message && <p className="auth-error">{message}</p>}

          <button className="primary-button auth-submit" type="submit">
            {mode === "login" ? "Log in" : "Create account"} <span>→</span>
          </button>
        </form>

        {!isAdminLogin && (
          <p className="auth-switch">
            {mode === "login" ? "New to CampusX?" : "Already have an account?"}{" "}
            <button onClick={switchMode}>
              {mode === "login" ? "Sign up" : "Log in"}
            </button>
          </p>
        )}
      </section>
    </div>
  );
}

export default AuthModal;
