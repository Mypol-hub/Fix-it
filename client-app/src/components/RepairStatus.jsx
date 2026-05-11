import "./RepairStatus.css";

export default function RepairStatus({ requests }) {
  return (
    <div className="repair-status">
      {(!requests || requests.length === 0) ? (
        <p className="repair-status-empty">No active repair requests found.</p>
      ) : (
        <ul className="repair-status-list">
          {requests.map((req) => (
            <li key={req.id} className="repair-status-item">
              <div className="repair-info">
                <strong className="item-name">{req.item_name}</strong>
                <p className="problem-text">{req.problem_description}</p>
              </div>

              {/* ✅ Classes now match your Dashboard.css exactly */}
              <span
                className={`status-badge ${
                  req.status === "Completed"
                    ? "status-completed"
                    : req.status === "Repairing"
                    ? "status-repairing"
                    : "status-pending"
                }`}
              >
                {req.status || "Pending"}
              </span>
              
              <div className="request-footer">
                <small className="request-date">
                  Submitted: {new Date(req.created_at).toLocaleDateString()}
                </small>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
