import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import { supabase } from "../supabaseClient";

// Components
import RequestForm from "../components/RequestForm";
import RepairStatus from "../components/RepairStatus";
import ItemCard from "../components/ItemCard";
import ItemUpload from "../components/ItemUpload";
import FeedbackForm from "../components/FeedbackForm";

import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation(); 

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [items, setItems] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);

  // Extract item name directly from URL params safely
  const params = new URLSearchParams(location.search);
  const selectedItem = params.get("item") || "";

  // 1. Safe Auth Guard & Session Sync
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (!mounted) return;

      if (error || !session) {
        setAuthLoading(false);
        navigate("/login"); 
      } else {
        setUser(session.user);
        setAuthLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      
      if (event === "SIGNED_OUT") {
        setUser(null);
        navigate("/login");
      } else if (session) {
        setUser(session.user);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  // 2. Fetch data automatically whenever user profile initializes
  useEffect(() => {
    if (user) {
      fetchAllData();
    }
  }, [user]);

  // 3. Centralized Data Fetcher
  async function fetchAllData() {
    if (!user) return;
    setIsDataLoading(true);

    try {
      const { data: reqData } = await supabase
        .from("requests")
        .select("*")
        .eq("user_id", user.id)
        .order('created_at', { ascending: false });
      setRequests(reqData || []);

      const { data: fbData } = await supabase
        .from("feedbacks")
        .select("*")
        .eq("user_id", user.id)
        .order('created_at', { ascending: false });
      setFeedbacks(fbData || []);

      const { data: itemData } = await supabase
        .from("items")
        .select("*")
        .eq("user_id", user.id);
      setItems(itemData || []);

    } catch (err) {
      console.error("Dashboard engine data fetch error:", err);
    } finally {
      setIsDataLoading(false);
    }
  }

  // 🗑️ DELETE HANDLER 1: Items (Wipes from DB and Storage Bucket)
  const handleDeleteItem = async (itemId, storagePath) => {
    if (!window.confirm("Are you sure you want to delete this gallery item?")) return;
    
    try {
      if (storagePath) {
        await supabase.storage.from("item-images").remove([storagePath]);
      }
      const { error } = await supabase.from("items").delete().eq("id", itemId);
      if (error) throw error;
      fetchAllData(); // Refresh UI lists
    } catch (err) {
      alert("Failed to delete item: " + err.message);
    }
  };

  // 🗑️ DELETE HANDLER 2: Active Tracking
  const handleDeleteTracking = async (requestId) => {
    if (!window.confirm("Are you sure you want to delete this active tracking request?")) return;
    
    try {
      const { error } = await supabase.from("requests").delete().eq("id", requestId);
      if (error) throw error;
      fetchAllData();
    } catch (err) {
      alert("Failed to delete tracking: " + err.message);
    }
  };

  // 🗑️ DELETE HANDLER 3: Messages
  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm("Are you sure you want to delete this message from your history?")) return;
    
    try {
      const { error } = await supabase.from("feedbacks").delete().eq("id", messageId);
      if (error) throw error;
      fetchAllData();
    } catch (err) {
      alert("Failed to delete message: " + err.message);
    }
  };

  if (authLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Verifying secure session...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-brand">
          <h1>Customer Portal</h1>
          <p className="user-tag">
            Account: <strong>{user.phone || user.user_metadata?.phone || user.email || "Active User"}</strong>
          </p>
        </div>
      </header>

      <main className="dashboard-grid">
        
        {/* NEW REPAIR SECTION */}
        <section className="dashboard-card">
          <div className="card-header"><h3>Start a New Repair</h3></div>
          <RequestForm 
            user={user} 
            onRequestSubmitted={fetchAllData} 
            prefilledItem={selectedItem} 
          />
        </section>

        {/* ACTIVE REPAIRS SECTION */}
        <section className="dashboard-card">
          <div className="card-header"><h3>Active Trackings</h3></div>
          {isDataLoading && requests.length === 0 ? (
            <p className="loading-text">Updating repair status...</p>
          ) : (
            <div className="tracking-list-wrapper">
              {requests.map((req) => (
                <div key={req.id} className="row-delete-container">
                  {/* Custom wrappers around components allow layout alignment of buttons */}
                  <RepairStatus requests={[req]} />
                  <button 
                    className="dashboard-x-btn"
                    onClick={() => handleDeleteTracking(req.id)}
                    title="Delete tracking"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* GALLERY SECTION */}
        <section className="dashboard-card gallery-section">
          <div className="card-header"><h3>My Electronic Gallery</h3></div>
          <div className="item-grid">
            {items.length === 0 && !isDataLoading ? (
              <p className="empty-msg">No items uploaded yet.</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="card-delete-container">
                  <ItemCard 
                    itemName={item.item_name} 
                    imageUrl={item.image_url} 
                  />
                  <button 
                    className="gallery-x-overlay"
                    onClick={() => handleDeleteItem(item.id, item.storage_path)}
                    title="Delete item"
                  >
                    &times;
                  </button>
                </div>
              ))
            )}
          </div>
          <ItemUpload user={user} onUploadSuccess={fetchAllData} />
        </section>

        {/* FEEDBACK/COMMUNICATION SECTION */}
        <section className="dashboard-card feedback-section">
          <div className="card-header"><h3>Support Chat</h3></div>
          <FeedbackForm user={user} onFeedbackSubmitted={fetchAllData} />
          
          <div className="feedback-history">
            <h4>Message History</h4>
            {feedbacks.length === 0 ? <p className="empty-msg">No messages.</p> : (
              <ul className="feedback-list">
                {feedbacks.map((fb) => (
                  <li key={fb.id} className="feedback-bubble-wrapper">
                    <div className="feedback-bubble">
                      <p>{fb?.feedback || ""}</p>
                      <span>{fb?.created_at ? new Date(fb.created_at).toLocaleDateString() : ""}</span>
                    </div>
                    <button 
                      className="dashboard-x-btn msg-x-btn"
                      onClick={() => handleDeleteMessage(fb.id)}
                      title="Delete message"
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}

export default Dashboard;
