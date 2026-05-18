import "./RepairStatus.css";

export default function RepairStatus({ requests }) {
  return (
    <div className="repair-status">
      {(!requests || requests.length === 0) ? (
        <div className="empty-state">
          <p className="repair-status-empty">No active repair requests found.</p>
          <small>Submit the form above to start a new repair.</small>
        </div>
      ) : (
        <ul className="repair-status-list">
          {requests.map((req) => (
            <li key={req.id || Math.random()} className="repair-status-item">
              <div className="repair-info">
                <strong className="item-name">{req?.item_name || "Unknown Item"}</strong>
                <p className="problem-text">{req?.problem_description || "No details provided"}</p>
              </div>
<span
  className={`status-badge ${
    (req?.status || "").toLowerCase() === "completed"
      ? "status-completed"
      : (req?.status || "").toLowerCase() === "repairing"
      ? "status-repairing"
      : "status-pending"
  }`}
>
  {req?.status || "Pending"}
</span>
              <div className="request-footer">
                <small className="request-date">
                  Submitted: {req?.created_at ? new Date(req.created_at).toLocaleDateString() : "Just Now"}
                </small>
                
                {/* 🔥 FIX: Safe Optional Chain string converter handles undefined or numeric tracking fields safely */}
                {req?.id && (
                  <small className="request-id">
                    ID: {typeof req.id === "string" ? req.id.slice(0, 8) : String(req.id).slice(0, 8)}
                  </small>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
