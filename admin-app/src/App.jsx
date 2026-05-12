import { useEffect, useState } from "react";
import { api, supabase } from "./api"; 
import AdminLogin from "./pages/AdminLogin";
import "./App.css";

function App() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) loadDashboard();
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
      setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    } catch (err) {
      alert("Update failed: " + err.message);
    }
  }

  async function handleDelete(id) {
    if (window.confirm("Delete this request forever to save storage?")) {
      const { error } = await supabase.from('requests').delete().eq('id', id);
      if (!error) {
        setRequests(prev => prev.filter(req => req.id !== id));
      } else {
        alert("Delete failed: " + error.message);
      }
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const filteredRequests = requests.filter(req => 
    req.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.item_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.phone?.includes(searchTerm)
  );

  if (!session) return <AdminLogin onLoginSuccess={(s) => setSession(s)} />;
  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-wrapper">
      <header className="admin-nav">
        <div className="nav-left">
          <h1>Fix-it Admin</h1>
          <input 
            type="text" 
            placeholder="Search name, phone, or item..." 
            className="search-bar"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="logout-btn-clean" onClick={handleLogout}>Logout</button>
      </header>

      <main className="admin-content">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Customer & Contact</th>
              <th>Item & Photo</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((req) => (
              <tr key={req.id}>
                <td>
                  <strong>{req.customer_name}</strong><br />
                  <small>📞 {req.phone || "No phone"}</small><br />
                  <small>✉️ {req.email}</small>
                  <div className="admin-message-bubble">"{req.problem_description}"</div>
                <td>
                  {req.item_name}
                  {req.image_url && (
                <div className="admin-photo-preview">
                  <img src={req.image_url} alt="Item" className="thumb-img" />
                </div>
                  )}
                </td>

                  <select 
                    className={`status-select ${req.status.toLowerCase()}`}
                    value={req.status}
                    onChange={(e) => handleStatusChange(req.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Repairing">Repairing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td className="action-cell">
                  <button className="bin-btn" onClick={() => handleDelete(req.id)}>🗑️</button>
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
