import { useEffect, useState } from "react";
import { api } from "./api"; 
import "./App.css";

function App() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data = await api.getAllRequests();
      setRequests(data);
    } catch (err) {
      console.error("Load failed:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id, newStatus) {
    try {
      await api.updateRequestStatus(id, newStatus);
      // Optimistic UI update: change state locally so it's instant
      setRequests(prev => 
        prev.map(r => r.id === id ? { ...r, status: newStatus } : r)
      );
    } catch (err) {
      alert("Update failed: " + err.message);
    }
  }

  if (loading) return <div className="loading">Loading Admin Panel...</div>;

  return (
    <div className="admin-wrapper">
      <header className="admin-nav">
        <h1>Fix-it Admin</h1>
        <div className="stats">Total: {requests.length}</div>
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
                    onChange={(e) => handleStatusChange(req.id, e.target.value)}
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
      </main>
    </div>
  );
}

export default App;
