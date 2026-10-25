import { useState } from "react";
import { useNavigate } from "react-router-dom";
function CreateClub({ user }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", category: "Coding & Technology", description: "", tags: "", contact: "" });
  const [done, setDone] = useState(false);
  function change(e) { setForm({ ...form, [e.target.name]: e.target.value }); }
  function submit(e) {
    e.preventDefault();
    const requests = JSON.parse(localStorage.getItem("campusxClubRequests") || "[]");
    const request = { ...form, id: Date.now(), founder: user.name, username: user.username, status: "Pending", submittedAt: new Date().toLocaleDateString() };
    localStorage.setItem("campusxClubRequests", JSON.stringify([request, ...requests])); setDone(true);
  }
  return <div className="workflow-page container">
    <button className="back-link" onClick={() => navigate("/")}>← Back to CampusX</button>
    {done ? <section className="success-panel"><div className="success-icon">✓</div><p className="eyebrow">REQUEST SUBMITTED</p><h1>Your club idea is in review.</h1><p>CampusX admins will review your details. You can check back with the admin team for its status.</p><button className="primary-button" onClick={() => navigate("/")}>Explore clubs →</button></section> : <>
      <p className="eyebrow">MAKE IT HAPPEN</p><h1 className="workflow-title">Create your <span>club.</span></h1><p className="workflow-intro">Have an idea for your campus? Tell us about it. Your request will be sent to the admin team for approval.</p>
      <form className="club-form" onSubmit={submit}>
        <div className="form-heading"><span>01</span><div><h3>Club details</h3><p>Give your community a name and a purpose.</p></div></div>
        <label>Club name *<input name="name" value={form.name} onChange={change} placeholder="e.g. The Photography Circle" required /></label>
        <label>Category *<select name="category" value={form.category} onChange={change}><option>Coding & Technology</option><option>Arts & Culture</option><option>Dance & Music</option><option>Sports & Fitness</option><option>Social Impact</option><option>Literature & Writing</option><option>Other</option></select></label>
        <label>About the club *<textarea name="description" value={form.description} onChange={change} placeholder="What will members do? Who can join?" rows="4" required /></label>
        <label>Tags <input name="tags" value={form.tags} onChange={change} placeholder="photography, creative, beginners" /></label>
        <div className="form-heading form-heading-spaced"><span>02</span><div><h3>Founder details</h3><p>Admins can contact you if they need more information.</p></div></div>
        <label>Founder<input value={`${user.name} (@${user.username})`} readOnly /></label>
        <label>Contact email or phone *<input name="contact" value={form.contact} onChange={change} placeholder="Your college email or phone" required /></label>
        <button className="primary-button form-submit" type="submit">Submit for approval <span>→</span></button>
        <p className="form-note">Your request will show as <b>Pending</b> until an admin reviews it.</p>
      </form>
    </>}
  </div>;
}
export default CreateClub;
