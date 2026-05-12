import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
  // This performs a "Join" to get data from related tables
  const { data, error } = await supabase
    .from("requests")
    .select(`
      *,
      items (image_url),
      feedbacks (feedback)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching data:", error);
  } else {
    // Mapping the data so it fits your existing table structure
    const formattedData = data.map(req => ({
      ...req,
      image_url: req.items?.[0]?.image_url, // Takes the first image found
      feedback: req.feedbacks?.[0]?.feedback // Takes the first feedback found
    }));
    setRequests(formattedData);
  }
  setLoading(false);
}

  async function handleStatusChange(id, newStatus) {
    const { error } = await supabase
      .from("requests")
      .update({ status: newStatus })
      .eq("id", id);

    if (!error) {
      setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r));
    }
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="header-left">
          <h1>Admin Control Panel</h1>
          <span className="badge">Total: {requests.length}</span>
        </div>
        <button onClick={() => supabase.auth.signOut()} className="logout-btn">Logout</button>
      </header>

      {loading ? <p className="loading-text">Loading repair requests...</p> : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer & Message</th>
                <th>Item & Media</th>
                <th>Status & Feedback</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  {/* 1. Customer Info + Client Message */}
                  <td>
                    <div className="cust-info">
                      <strong>{req.customer_name}</strong>
                      <small>{req.email}</small>
                    </div>
                    <div className="msg-preview">
                       "{req.problem_description || "No description provided"}"
                    </div>
                  </td>

                  {/* 2. Item Name + Image Upload */}
                  <td>
                    <span className="item-name">{req.item_name}</span>
                    {req.image_url ? (
                      <div className="img-container">
                        <a href={req.image_url} target="_blank" rel="noreferrer">
                          <img src={req.image_url} alt="Item" className="admin-thumb" />
                        </a>
                      </div>
                    ) : (
                      <div className="no-img">No photo</div>
                    )}
                  </td>

                  {/* 3. Status + Feedback/Rating */}
                  <td>
                    <span className={`status-pill ${req.status.toLowerCase()}`}>
                      {req.status}
                    </span>
                    {req.feedback && (
                      <div className="feedback-section">
                        <div className="stars">{"⭐".repeat(req.rating || 0)}</div>
                        <p className="feedback-text">{req.feedback}</p>
                      </div>
                    )}
                  </td>

                  {/* 4. Action Dropdown */}
                  <td>
                    <select 
                      value={req.status} 
                      onChange={(e) => handleStatusChange(req.id, e.target.value)}
                      className={`status-select ${req.status.toLowerCase()}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Repairing">Repairing</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
