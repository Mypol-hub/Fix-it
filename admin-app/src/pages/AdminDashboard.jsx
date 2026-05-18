// admin-app/src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [activeModalImg, setActiveModalImg] = useState(null);

  // Load data immediately on mount since App.jsx already verified the session
  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    setLoading(true);
    try {
      // 1. Fetch all repair orders globally
      const { data: requestsData, error: reqError } = await supabase
        .from("requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (reqError) throw reqError;

      // 2. Fetch all user uploaded item gallery entries
      const { data: itemsData, error: itemsError } = await supabase
        .from("items")
        .select("*");

      if (itemsError) throw itemsError;

      // 3. Fetch all customer feedback rows
      const { data: feedbackData, error: fbError } = await supabase
        .from("feedbacks")
        .select("*");

      if (fbError) throw fbError;

      // 4. LINK DATASETS ACCURATELY BY MATCHING THE CORE PHONE DIGITS (LAST 6)
      const mergedData = (requestsData || []).map(req => {
        // Extract just the last 6 digits for matching purposes only
        const reqPhoneRaw = req.phone ? req.phone.toString().replace(/\D/g, "") : "";
        const reqPhoneTail = reqPhoneRaw.substring(reqPhoneRaw.length - 6);
        
        const reqName = req.item_name ? req.item_name.toLowerCase().trim() : "";

        // Find items that match the same last 6 phone digits
        const userItems = (itemsData || []).filter(item => {
          const itemPhoneRaw = item.phone ? item.phone.toString().replace(/\D/g, "") : "";
          const itemPhoneTail = itemPhoneRaw.substring(itemPhoneRaw.length - 6);
          
          return itemPhoneTail !== "" && itemPhoneTail === reqPhoneTail;
        });

        // 1. Try a name match first within this user's items
        let matchedItem = userItems.find(item => {
          const itemName = item.item_name ? item.item_name.toLowerCase().trim() : "";
          return itemName !== "" && (itemName.includes(reqName) || reqName.includes(itemName));
        });

        // 2. Fallback: If only one unique item belongs to this phone tail, use it
        if (!matchedItem && userItems.length === 1) {
          matchedItem = userItems[0]; 
        }

        // 1. Try to find a specific feedback that matches BOTH the user's phone tail AND mentions the item name
        let matchedFeedback = (feedbackData || []).find(fb => {
          const fbPhoneRaw = fb.phone ? fb.phone.toString().replace(/\D/g, "") : "";
          const fbPhoneTail = fbPhoneRaw.substring(fbPhoneRaw.length - 6); // 🚨 FIXED: Convert to 6-digit tail
          const fbText = fb.feedback ? fb.feedback.toLowerCase() : "";
          
          return fbPhoneTail !== "" && 
                 fbPhoneTail === reqPhoneTail && 
                 fbText.includes(reqName);
        });

        // 2. Fallback: If no item-specific feedback is found, grab and merge all messages from this user
        if (!matchedFeedback) {
          const allUserFeedbacks = (feedbackData || []).filter(fb => {
            const fbPhoneRaw = fb.phone ? fb.phone.toString().replace(/\D/g, "") : "";
            const fbPhoneTail = fbPhoneRaw.substring(fbPhoneRaw.length - 6); // 🚨 FIXED: Convert to 6-digit tail
            return fbPhoneTail !== "" && fbPhoneTail === reqPhoneTail;
          });

          // Combine multiple messages cleanly using a separator
          if (allUserFeedbacks.length > 0) {
            matchedFeedback = {
              feedback: allUserFeedbacks.map(fb => fb.feedback).filter(Boolean).join(" | "),
              rating: allUserFeedbacks[0].rating || 0
            };
          }
        }

        // Image lookup prioritization
        let imageSource = null;
        if (req.image_url) imageSource = req.image_url;
        else if (req.image_path) imageSource = req.image_path;
        else if (req.photo) imageSource = req.photo;
        else if (req.image) imageSource = req.image;
        else if (matchedItem) {
          imageSource = matchedItem.image_url || matchedItem.image_path || matchedItem.photo;
        }

        let finalPublicUrl = null;

        if (imageSource) {
          if (imageSource.startsWith("http://") || imageSource.startsWith("https://")) {
            finalPublicUrl = imageSource;
          } else {
            const { data: urlData } = supabase.storage
              .from("item-images") 
              .getPublicUrl(imageSource);
            
            finalPublicUrl = urlData?.publicUrl || null;
          }
        }

        return {
          ...req,
          image_url: finalPublicUrl,
          feedback: matchedFeedback?.feedback || null,
          rating: matchedFeedback?.rating || req.rating || 0
        };
      });

      setRequests(mergedData);
    } catch (err) {
      console.error("CRITICAL ADMIN FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id, newStatus) {
    try {
      const { error } = await supabase
        .from("requests")
        .update({ status: newStatus.toLowerCase() })
        .eq("id", id);

      if (error) throw error;
      setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus.toLowerCase() } : r));
    } catch (err) {
      alert("Could not update status: " + err.message);
    }
  }

  async function handleDelete(id) {
    if (window.confirm("Delete this request forever?")) {
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

  const filteredRequests = requests.filter(req => 
    req.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.item_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.phone?.toString().includes(searchTerm)
  );

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="header-left">
          <h1>Admin Control Panel</h1>
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

      {loading ? <p className="loading-text">Synchronizing records...</p> : (
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
              {filteredRequests.map((req) => {
                const normalizedStatus = (req.status || "pending").toLowerCase();
                return (
                  <tr key={req.id}>
                    <td>
                      <div className="cust-info">
                        <strong>{req.customer_name}</strong><br />
                        <small>📞 {req.phone || "No phone"}</small>
                      </div>
                      <div className="admin-message-bubble">
                         "{req.problem_description || "No description"}"
                      </div>
                    </td>

                    <td>
                      <span className="item-name" style={{ display: "block", marginBottom: "6px", fontWeight: "600" }}>
                        {req.item_name}
                      </span>
                      {req.image_url ? (
                        <div className="img-container">
                          <img 
                            src={req.image_url} 
                            alt="Repair asset" 
                            className="admin-thumb magnifying-glass" 
                            onClick={() => setActiveModalImg(req.image_url)}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentElement.innerHTML = '<span class="no-img" style="color: #94a3b8; font-size: 0.85rem;">Image Error</span>';
                            }}
                          />
                        </div>
                      ) : (
                        <div className="no-img" style={{ color: "#94a3b8", fontSize: "0.85rem" }}>No photo</div>
                      )}
                    </td>

                    <td>
                      <span className={`status-pill ${normalizedStatus}`}>
                        {normalizedStatus}
                      </span>
                      {req.feedback && (
                        <div className="feedback-section">
                          <div className="stars">{"⭐".repeat(req.rating || 0)}</div>
                          <p className="feedback-text">{req.feedback}</p>
                        </div>
                      )}
                    </td>

                    <td className="action-cell-flex">
                      <select 
                        value={normalizedStatus} 
                        onChange={(e) => handleStatusChange(req.id, e.target.value)}
                        className={`status-select ${normalizedStatus}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="repairing">Repairing</option>
                        <option value="completed">Completed</option>
                      </select>
                      <button className="bin-btn" onClick={() => handleDelete(req.id)}>🗑️</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {activeModalImg && (
        <div className="admin-image-modal" onClick={() => setActiveModalImg(null)}>
          <div className="modal-close-button">&times;</div>
          <img src={activeModalImg} alt="Enlarged view" className="modal-display-image" />
        </div>
      )}
    </div>
  );
}
