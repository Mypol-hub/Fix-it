// admin-app/src/pages/AdminDashboard.jsx
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
    const { data, error } = await supabase
      .from("requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Error:", error);
    else setRequests(data);
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
        <h1>Admin Control Panel</h1>
        <button onClick={() => supabase.auth.signOut()} className="logout-btn">Logout</button>
      </header>

      {loading ? <p>Loading requests...</p> : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Item</th>
                <th>Description</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td>
                    <div className="cust-info">
                      <strong>{req.customer_name}</strong>
                      <span>{req.email}</span>
                    </div>
                  </td>
                  <td>{req.item_name}</td>
                  <td><p className="truncate">{req.problem_description}</p></td>
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
                  <td>{new Date(req.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
