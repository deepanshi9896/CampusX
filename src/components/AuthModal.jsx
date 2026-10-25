import { useState } from "react";

function AuthModal({ open, onClose, onLogin }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  if (!open) return null;

  function submit(e) {
    e.preventDefault(); setMessage("");
    // Demo admin account: admin / admin123. Admin role is never selected by signup.
    if (mode === "login" && username.trim().toLowerCase() === "admin" && password === "admin123") {
      onLogin({ name: "CampusX Admin", username: "admin", role: "admin" }); return;
    }
    const accounts = JSON.parse(localStorage.getItem("campusxAccounts") || "[]");
    if (mode === "signup") {
      if (accounts.some((a) => a.username.toLowerCase() === username.trim().toLowerCase())) { setMessage("This username already exists. Try logging in."); return; }
      const account = { name: name.trim(), username: username.trim(), password, role: "user" };
      localStorage.setItem("campusxAccounts", JSON.stringify([...accounts, account]));
      onLogin({ name: account.name, username: account.username, role: "user" }); return;
    }
    const account = accounts.find((a) => a.username === username.trim() && a.password === password);
    if (!account) { setMessage("Username or password is incorrect."); return; }
    onLogin({ name: account.name, username: account.username, role: "user" });
  }

  return <div className="auth-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <section className="auth-panel">
      <button className="auth-close" onClick={onClose} aria-label="Close">×</button>
      <div className="auth-mark">C</div><p className="eyebrow">YOUR CAMPUS. YOUR COMMUNITY.</p>
      <h2>{mode === "login" ? "Welcome back" : "Join CampusX"}</h2>
      <p className="auth-subtitle">{mode === "login" ? "Log in to find your people." : "Create an account and find your community."}</p>
      <form onSubmit={submit} className="auth-form">
        {mode === "signup" && <label>Full name<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required /></label>}
        <label>Username<input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" autoComplete="username" required /></label>
        <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" autoComplete={mode === "login" ? "current-password" : "new-password"} required minLength={mode === "signup" ? 4 : undefined} /></label>
        {message && <p className="auth-error">{message}</p>}
        <button className="primary-button auth-submit" type="submit">{mode === "login" ? "Log in" : "Create account"} <span>→</span></button>
      </form>
      {mode === "login" && <p className="admin-hint">Demo admin: <b>admin</b> / <b>admin123</b></p>}
      <p className="auth-switch">{mode === "login" ? "New to CampusX?" : "Already have an account?"} <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setMessage(""); }}> {mode === "login" ? "Sign up" : "Log in"}</button></p>
    </section>
  </div>;
}
export default AuthModal;
