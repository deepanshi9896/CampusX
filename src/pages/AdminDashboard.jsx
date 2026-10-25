import { useState } from "react";
function AdminDashboard() {
  const [requests, setRequests] = useState(() => JSON.parse(localStorage.getItem("campusxClubRequests") || "[]"));
  const [filter, setFilter] = useState("All");
  function update(id, status) {
    const updated = requests.map((r) => r.id === id ? { ...r, status } : r);
    setRequests(updated); localStorage.setItem("campusxClubRequests", JSON.stringify(updated));
  }
  const visible = requests.filter((r) => filter === "All" || r.status === filter);
  const pending = requests.filter((r) => r.status === "Pending").length;
  return <div className="admin-page container">
    <div className="admin-top"><div><p className="eyebrow">CAMPUSX CONTROL ROOM</p><h1>Admin <span>dashboard.</span></h1><p>Review club applications and keep campus communities thriving.</p></div><div className="admin-avatar">A</div></div>
    <div className="admin-stats"><div className="stat-card"><span>Total requests</span><b>{requests.length}</b><small>All submissions</small></div><div className="stat-card stat-pending"><span>Pending review</span><b>{pending}</b><small>Needs your attention</small></div><div className="stat-card"><span>Approved</span><b>{requests.filter((r) => r.status === "Approved").length}</b><small>Ready to grow</small></div><div className="stat-card"><span>Rejected</span><b>{requests.filter((r) => r.status === "Rejected").length}</b><small>Not approved</small></div></div>
    <div className="requests-heading"><div><h2>Club applications</h2><p>Review the details before making a decision.</p></div><select value={filter} onChange={(e) => setFilter(e.target.value)}><option>All</option><option>Pending</option><option>Approved</option><option>Rejected</option></select></div>
    {visible.length === 0 ? <div className="admin-empty"><div>▤</div><h3>No applications here yet</h3><p>When students submit a club request, it will appear here.</p></div> : <div className="request-list">{visible.map((r) => <article className="request-card" key={r.id}><div className="request-card-top"><div className="club-initial">{r.name?.charAt(0)?.toUpperCase() || "C"}</div><div className="request-main"><div className="request-title-line"><h3>{r.name}</h3><span className={`status status-${r.status.toLowerCase()}`}>{r.status}</span></div><p>{r.category} · Submitted {r.submittedAt}</p></div></div><p className="request-description">{r.description}</p><div className="request-meta"><span><b>Founder</b>{r.founder} (@{r.username})</span><span><b>Contact</b>{r.contact}</span><span><b>Tags</b>{r.tags || "—"}</span></div>{r.status === "Pending" && <div className="request-actions"><button className="reject-button" onClick={() => update(r.id, "Rejected")}>Reject</button><button className="approve-button" onClick={() => update(r.id, "Approved")}>✓ Approve club</button></div>}</article>)}</div>}
  </div>;
}
export default AdminDashboard;
