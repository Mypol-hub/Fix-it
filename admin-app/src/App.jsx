import { useEffect, useState } from "react";
import { api, supabase } from "./api"; 
import AdminLogin from "./pages/AdminLogin";
import "./App.css";

function App() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      loadDashboard();
    }
  }, [session]);

  async function loadDashboard() {
    try {
      const data = await api.getAllRequests();
      setRequests(data || []);
    } catch (err) {
      console.error("Load failed:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id, newStatus) {
    try {
      await api.updateRequestStatus(id, newStatus);
      setRequests(prev => 
        prev.map(r => r.id === id ? { ...r, status: newStatus } : r)
      );
    } catch (err) {
      alert("Update failed: " + err.message);
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  if (!session) {
    return <AdminLogin onLoginSuccess={(userSession) => setSession(userSession)} />;
  }

  if (loading) return <div className="loading">Loading Admin Panel...</div>;

  return (
    <div className="admin-wrapper">
      <header className="admin-nav">
        <div className="nav-left">
          <h1>Fix-it Admin</h1>
          <div className="stats">Total: {requests.length}</div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      <main className="admin-content">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Customer & Description</th>
              <th>Item & Photo</th>
              <th>Status & Feedback</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr><td colSpan="4" style={{textAlign: 'center'}}>No requests found.</td></tr>
            ) : (
              requests.map((req) => (
                <tr key={req.id}>
                  <td>
                    <strong>{req.customer_name}</strong>
                    <br />
                    <small>{req.email}</small>
                    <div className="admin-message-bubble">
                      "{req.description || req.message || 'No description provided'}"
                    </div>
                  </td>
                  <td>
                    {req.item_name}
                    {req.image_url && (
                      <div className="admin-photo-preview">
                        <a href={req.image_url} target="_blank" rel="noreferrer">
                          <img src={req.image_url} alt="Item" className="thumb-img" />
                        </a>
                      </div>
                    )}
                  </td>
                  <td>
                    <span className={`status-pill ${req.status.toLowerCase()}`}>
                      {req.status}
                    </span>
                    {req.feedback && (
                      <div className="admin-feedback-box">
                        <strong>Rating: {req.rating}/5</strong>
                        <p>{req.feedback}</p>
                      </div>
                    )}
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
              ))
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
