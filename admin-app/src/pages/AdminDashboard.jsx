import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Added Search State

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    setLoading(true);
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
      const mergedData = data.map(req => ({
        ...req,
        image_url: req.image_url || req.items?.[0]?.image_url || null,
        feedback: req.feedbacks?.[0]?.feedback || null
      }));
      setRequests(mergedData);
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

  // --- ADDED DELETE LOGIC ---
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
  };

  // --- ADDED SEARCH LOGIC ---
  const filteredRequests = requests.filter(req => 
    req.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.item_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.phone?.includes(searchTerm)
  );

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="header-left">
          <h1>Admin Control Panel</h1>
          {/* --- ADDED SEARCH BAR --- */}
          <input 
            type="text" 
            placeholder="Search name, phone, or item..." 
            className="admin-search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="badge">Total: {filteredRequests.length}</span>
        </div>
        <button onClick={handleLogout} className="logout-btn-clean">Logout</button>
      </header>

      {loading ? <p className="loading-text">Loading repair requests...</p> : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer & Contact</th>
                <th>Item & Media</th>
                <th>Status & Feedback</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => (
                <tr key={req.id}>
                  {/* 1. Customer Info + Phone + Description */}
                  <td>
                    <div className="cust-info">
                      <strong>{req.customer_name}</strong><br />
                      <small>📞 {req.phone || "No phone"}</small><br />
                      <small>✉️ {req.email}</small>
                    </div>
                    <div className="admin-message-bubble">
                       "{req.problem_description || "No description"}"
                    </div>
                  </td>

                  {/* 2. Item Name + Magnified Photo */}
                  <td>
                    <span className="item-name">{req.item_name}</span>
                    {req.image_url ? (
                      <div className="img-container">
                        <a href={req.image_url} target="_blank" rel="noreferrer">
                          <img 
                            src={req.image_url} 
                            alt="Item" 
                            className="admin-thumb magnifying-glass" 
                            title="Click to enlarge"
                          />
                        </a>
                      </div>
                    ) : (
                      <div className="no-img">No photo</div>
                    )}
                  </td>

                  {/* 3. Status Display */}
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

                  {/* 4. Action: Change Status & DELETE BIN */}
                  <td className="action-cell-flex">
                    <select 
                      value={req.status} 
                      onChange={(e) => handleStatusChange(req.id, e.target.value)}
                      className={`status-select ${req.status.toLowerCase()}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Repairing">Repairing</option>
                      <option value="Completed">Completed</option>
                    </select>
                    
                    <button 
                      className="bin-btn" 
                      onClick={() => handleDelete(req.id)}
                      title="Delete forever"
                    >
                      🗑️
                    </button>
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
