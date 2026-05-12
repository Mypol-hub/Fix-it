import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient"; // Ensure you copied this file from client-app
import "./App.css";

function App() {
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

    if (error) {
      console.error("Error fetching requests:", error);
    } else {
      setRequests(data);
    }
    setLoading(false);
  }

  async function updateStatus(id, newStatus) {
    const { error } = await supabase
      .from("requests")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      alert("Update failed: " + error.message);
    } else {
      // Update local state so UI refreshes immediately
      setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r));
    }
  }

  if (loading) return <div className="loading">Loading Dashboard...</div>;

  return (
    <div className="admin-wrapper">
      <header className="admin-nav">
        <h1>Fix-it Admin</h1>
        <div className="stats">
          Total Requests: {requests.length}
        </div>
      </header>

      <main className="admin-content">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Item</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>
                  <strong>{req.customer_name}</strong>
                  <br />
                  <small>{req.email}</small>
                </td>
                <td>{req.item_name}</td>
                <td>
                  <span className={`status-pill ${req.status.toLowerCase()}`}>
                    {req.status}
                  </span>
                </td>
                <td>
                  <select 
                    value={req.status}
                    onChange={(e) => updateStatus(req.id, e.target.value)}
                  >
                    <option value="Pending">Set Pending</option>
                    <option value="Repairing">Set Repairing</option>
                    <option value="Completed">Set Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
