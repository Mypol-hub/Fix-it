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
                {/* ✅ Matches your Supabase column name */}
                <strong className="item-name">{req.item_name}</strong>
                
                {/* ✅ Matches your Supabase column name */}
                <p className="problem-text">{req.problem_description}</p>
              </div>

              <span
                className={`status-badge ${
                  req.status === "Completed"
                    ? "status-completed"
                    : req.status === "In Progress"
                    ? "status-progress"
                    : "status-pending"
                }`}
              >
                {req.status || "Pending"}
              </span>
              
              <small className="request-date">
                Submitted: {new Date(req.created_at).toLocaleDateString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
