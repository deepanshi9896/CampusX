function StatusTracker({ status }) {
  const isApproved = status === "Approved";
  const isRejected = status === "Rejected";
  const isUnderProcess = status === "Under Process";

  let lastState = "idle";
  if (isApproved) lastState = "done";
  if (isRejected) lastState = "rejected";

  const steps = [
    {
      label: "Submitted",
      hint: "Your request has reached CampusX.",
      state: "done",
    },
    {
      label: isUnderProcess ? "Under process" : "Pending review",
      hint: isUnderProcess
        ? "The admin is working on your request."
        : "The admin has been emailed and will check your request.",
      state: "done",
    },
    {
      label: isRejected ? "Rejected" : "Created",
      hint: isRejected
        ? "The admin did not approve this club."
        : "Your club is live in Explore Clubs.",
      state: lastState,
    },
  ];

  function symbolFor(step, index) {
    if (step.state === "done") return "✓";
    if (step.state === "rejected") return "✕";
    return index + 1;
  }

  return (
    <div className="tracker">
      {steps.map((step, index) => (
        <div key={step.label} className={`tracker-step tracker-${step.state}`}>
          <span className="tracker-dot">{symbolFor(step, index)}</span>
          <span className="tracker-label">{step.label}</span>
          <span className="tracker-hint">{step.hint}</span>
        </div>
      ))}
    </div>
  );
}

export default StatusTracker;
