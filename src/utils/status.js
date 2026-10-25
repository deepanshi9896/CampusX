export const STATUSES = ["Pending", "Under Process", "Approved", "Rejected"];

export function statusClass(status) {
  return "status-" + status.toLowerCase().replace(" ", "-");
}
