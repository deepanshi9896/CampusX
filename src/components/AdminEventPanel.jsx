function AdminEventPanel({ event, registrations, seatsLeft }) {
  const info = event.internal;

  const details = [
    ["Club head", info.clubHead],
    ["Organizer", info.organizer],
    ["Chief guest", info.chiefGuest],
    ["Event starts", info.startTime],
    ["Guest entry time", info.guestEntryTime],
    ["Event ends", info.endTime],
    ["Venue", event.location],
    ["Hosted by", event.host],
  ];

  return (
    <div className="admin-event-panel">
      <p className="modal-desc-label">INTERNAL DETAILS (ADMIN ONLY)</p>
      <div className="admin-detail-grid">
        {details.map(([label, value]) => (
          <div className="admin-detail" key={label}>
            <span>{label}</span>
            <b>{value}</b>
          </div>
        ))}
      </div>

      <div className="next-event-box">
        <span>Next event this club may host</span>
        <b>{info.nextEvent}</b>
      </div>

      <div className="attendee-head">
        <p className="modal-desc-label">REGISTERED STUDENTS</p>
        <span className="seat-pill">
          {registrations.length} registered · {seatsLeft} seats left
        </span>
      </div>

      {registrations.length === 0 ? (
        <p className="field-note">No one has registered yet.</p>
      ) : (
        <div className="attendee-table-wrap">
          <table className="attendee-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Ticket ID</th>
                <th>Registered at</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((item, index) => (
                <tr key={item.ticketId}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.ticketId}</td>
                  <td>{item.registeredAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminEventPanel;
