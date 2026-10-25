import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusTracker from "../components/StatusTracker";
import { ADMIN_EMAIL, ALLOWED_DOMAIN } from "../config";
import { isCollegeEmail, sendMail } from "../utils/email";
import { readList, writeList } from "../utils/storage";
import { statusClass } from "../utils/status";

const REQUESTS_KEY = "campusxClubRequests";

function CreateClub({ user }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "Coding & Technology",
    description: "",
    tags: "",
    founderName: user.name,
    founderEmail: "",
    contact: "",
  });
  const [error, setError] = useState("");
  const [submittedClub, setSubmittedClub] = useState(null);
  const [myRequests, setMyRequests] = useState(() =>
    readList(REQUESTS_KEY).filter((item) => item.username === user.username)
  );

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();

    if (!isCollegeEmail(form.founderEmail)) {
      setError(`Founder email must end with ${ALLOWED_DOMAIN}`);
      return;
    }

    setError("");

    const request = {
      ...form,
      founderEmail: form.founderEmail.trim().toLowerCase(),
      id: Date.now(),
      founder: form.founderName.trim(),
      username: user.username,
      status: "Pending",
      submittedAt: new Date().toLocaleDateString(),
    };

    const allRequests = readList(REQUESTS_KEY);
    writeList(REQUESTS_KEY, [request, ...allRequests]);
    setMyRequests([request, ...myRequests]);
    setSubmittedClub(request);

    sendMail({
      to: request.founderEmail,
      subject: `Club request received: ${request.name}`,
      message: `Hi ${request.founder}, a request to create "${request.name}" was submitted with your email. If this was not you, please contact the CampusX admin right away.`,
    });

    sendMail({
      to: ADMIN_EMAIL,
      subject: `New club request: ${request.name}`,
      message: `${request.founder} (${request.founderEmail}) has requested a new club called "${request.name}". Please log in to the admin dashboard to approve or reject it.`,
    });
  }

  function refreshStatuses() {
    const latest = readList(REQUESTS_KEY).filter(
      (item) => item.username === user.username
    );
    setMyRequests(latest);
  }

  const latestSubmitted = submittedClub
    ? myRequests.find((item) => item.id === submittedClub.id)
    : null;

  return (
    <div className="workflow-page container">
      <button className="back-link" onClick={() => navigate("/")}>
        ← Back to CampusX
      </button>

      {latestSubmitted && (
        <section className="success-panel">
          <div className="success-icon">✓</div>
          <p className="eyebrow">REQUEST SUBMITTED</p>
          <h1>Your club idea is in review.</h1>
          <p>
            We emailed {latestSubmitted.founderEmail} and the admin team. Track
            the progress below.
          </p>
          <StatusTracker status={latestSubmitted.status} />
          <button className="primary-button" onClick={() => setSubmittedClub(null)}>
            Create another club →
          </button>
        </section>
      )}

      {!latestSubmitted && (
        <>
          <p className="eyebrow">MAKE IT HAPPEN</p>
          <h1 className="workflow-title">
            Create your <span>club.</span>
          </h1>
          <p className="workflow-intro">
            Have an idea for your campus? Tell us about it. Your request will be
            sent to the admin team for approval.
          </p>

          <form className="club-form" onSubmit={submit}>
            <div className="form-heading">
              <span>01</span>
              <div>
                <h3>Club details</h3>
                <p>Give your community a name and a purpose.</p>
              </div>
            </div>

            <label>
              Club name *
              <input
                name="name"
                value={form.name}
                onChange={change}
                placeholder="e.g. The Photography Circle"
                required
              />
            </label>

            <label>
              Category *
              <select name="category" value={form.category} onChange={change}>
                <option>Coding & Technology</option>
                <option>Arts & Culture</option>
                <option>Dance & Music</option>
                <option>Sports & Fitness</option>
                <option>Social Impact</option>
                <option>Literature & Writing</option>
                <option>Other</option>
              </select>
            </label>

            <label>
              About the club *
              <textarea
                name="description"
                value={form.description}
                onChange={change}
                placeholder="What will members do? Who can join?"
                rows="4"
                required
              />
            </label>

            <label>
              Tags
              <input
                name="tags"
                value={form.tags}
                onChange={change}
                placeholder="photography, creative, beginners"
              />
            </label>

            <div className="form-heading form-heading-spaced">
              <span>02</span>
              <div>
                <h3>Founder details</h3>
                <p>Admins can contact you if they need more information.</p>
              </div>
            </div>

            <label>
              Founder name *
              <input
                name="founderName"
                value={form.founderName}
                onChange={change}
                required
              />
            </label>

            <label>
              Founder college email *
              <input
                type="email"
                name="founderEmail"
                value={form.founderEmail}
                onChange={change}
                placeholder={`yourname${ALLOWED_DOMAIN}`}
                required
              />
              <small className="field-note">
                Only {ALLOWED_DOMAIN} emails are accepted. A copy of this request
                is mailed to this address.
              </small>
            </label>

            <label>
              Contact email or phone *
              <input
                name="contact"
                value={form.contact}
                onChange={change}
                placeholder="Your college email or phone"
                required
              />
            </label>

            {error && <p className="auth-error">{error}</p>}

            <button className="primary-button form-submit" type="submit">
              Submit for approval <span>→</span>
            </button>
            <p className="form-note">
              Your request will show as <b>Pending</b> until an admin reviews it.
            </p>
          </form>
        </>
      )}

      {myRequests.length > 0 && (
        <section className="my-requests">
          <div className="my-requests-top">
            <h2>Your club requests</h2>
            <button className="club-card-btn" onClick={refreshStatuses}>
              Refresh status
            </button>
          </div>

          {myRequests.map((item) => (
            <article className="my-request-card" key={item.id}>
              <div className="request-title-line">
                <h3>{item.name}</h3>
                <span className={`status ${statusClass(item.status)}`}>
                  {item.status}
                </span>
              </div>
              <p>
                {item.category} · Submitted {item.submittedAt}
              </p>
              <StatusTracker status={item.status} />
            </article>
          ))}
        </section>
      )}
    </div>
  );
}

export default CreateClub;
