import { useState } from "react";
import StatusTracker from "../components/StatusTracker";
import { getMailLog, sendMail } from "../utils/email";
import { readList, writeList } from "../utils/storage";
import { STATUSES, statusClass } from "../utils/status";

const REQUESTS_KEY = "campusxClubRequests";

function AdminDashboard() {
  const [requests, setRequests] = useState(() => readList(REQUESTS_KEY));
  const [mailLog, setMailLog] = useState(() => getMailLog());
  const [filter, setFilter] = useState("All");

  function mailTextFor(request, status) {
    if (status === "Approved") {
      return `Good news ${request.founder}! "${request.name}" is approved and now visible in Explore Clubs.`;
    }
    if (status === "Rejected") {
      return `Hi ${request.founder}, sorry, "${request.name}" was not approved this time.`;
    }
    if (status === "Under Process") {
      return `Hi ${request.founder}, the admin has started working on "${request.name}".`;
    }
    return `Hi ${request.founder}, "${request.name}" is back in the pending queue.`;
  }

  async function update(request, status) {
    if (request.status === status) return;

    const updated = requests.map((item) =>
      item.id === request.id ? { ...item, status } : item
    );
    setRequests(updated);
    writeList(REQUESTS_KEY, updated);

    await sendMail({
      to: request.founderEmail,
      subject: `Your club "${request.name}" is now: ${status}`,
      message: mailTextFor(request, status),
    });
    setMailLog(getMailLog());
  }

  const visible = requests.filter(
    (item) => filter === "All" || item.status === filter
  );
  const countOf = (status) =>
    requests.filter((item) => item.status === status).length;
  const inReview = countOf("Pending") + countOf("Under Process");

  return (
    <div className="admin-page container">
      <div className="admin-top">
        <div>
          <p className="eyebrow">CAMPUSX CONTROL ROOM</p>
          <h1>
            Admin <span>dashboard.</span>
          </h1>
          <p>Review club applications and keep campus communities thriving.</p>
        </div>
        <div className="admin-avatar">A</div>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <span>Total requests</span>
          <b>{requests.length}</b>
          <small>All submissions</small>
        </div>
        <div className="stat-card stat-pending">
          <span>In review</span>
          <b>{inReview}</b>
          <small>Needs your attention</small>
        </div>
        <div className="stat-card">
          <span>Approved</span>
          <b>{countOf("Approved")}</b>
          <small>Ready to grow</small>
        </div>
        <div className="stat-card">
          <span>Rejected</span>
          <b>{countOf("Rejected")}</b>
          <small>Not approved</small>
        </div>
      </div>

      <div className="requests-heading">
        <div>
          <h2>Club applications</h2>
          <p>Review the details before making a decision.</p>
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option>Pending</option>
          <option>Under Process</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
      </div>

      {visible.length === 0 ? (
        <div className="admin-empty">
          <div>▤</div>
          <h3>No applications here yet</h3>
          <p>When students submit a club request, it will appear here.</p>
        </div>
      ) : (
        <div className="request-list">
          {visible.map((request) => (
            <article className="request-card" key={request.id}>
              <div className="request-card-top">
                <div className="club-initial">
                  {request.name?.charAt(0)?.toUpperCase() || "C"}
                </div>
                <div className="request-main">
                  <div className="request-title-line">
                    <h3>{request.name}</h3>
                    <span className={`status ${statusClass(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                  <p>
                    {request.category} · Submitted {request.submittedAt}
                  </p>
                </div>
              </div>

              <p className="request-description">{request.description}</p>

              <div className="request-meta">
                <span>
                  <b>Founder</b>
                  {request.founder}
                </span>
                <span>
                  <b>Founder email</b>
                  {request.founderEmail || "—"}
                </span>
                <span>
                  <b>Contact</b>
                  {request.contact}
                </span>
              </div>

              <StatusTracker status={request.status} />

              <div className="status-control">
                <span>Change status</span>
                <div className="status-buttons">
                  {STATUSES.map((status) => (
                    <button
                      key={status}
                      className={
                        request.status === status
                          ? `status-button on ${statusClass(status)}`
                          : "status-button"
                      }
                      onClick={() => update(request, status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <section className="mail-log">
        <h2>Email activity</h2>
        {mailLog.length === 0 ? (
          <p className="field-note">No emails sent yet.</p>
        ) : (
          mailLog.slice(0, 8).map((mail) => (
            <div className="mail-row" key={mail.id}>
              <b>{mail.subject}</b>
              <span>
                To {mail.to} · {mail.sentAt} ·{" "}
                {mail.delivered ? "Delivered" : "Saved in log (email service not set up)"}
              </span>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;
