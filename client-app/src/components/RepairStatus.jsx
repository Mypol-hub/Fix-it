import "./RepairStatus.css";

export default function RepairStatus({ requests }) {
  return (
    <div className="repair-status">
      <h3>Repair Status</h3>
      {(!requests || requests.length === 0) ? (
        <p className="repair-status-empty">No repair requests yet.</p>
      ) : (
        <ul className="repair-status-list">
          {requests.map((req, idx) => (
            <li key={idx} className="repair-status-item">
              <p>{req.itemName}</p>
              <p>{req.problem}</p>
              <span
                className={`status-badge ${
                  req.status === "Completed"
                    ? "status-completed"
                    : req.status === "In Progress"
                    ? "status-progress"
                    : "status-pending"
                }`}
              >
                {req.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
