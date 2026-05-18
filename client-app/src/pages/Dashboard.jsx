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
        {/* 🚨 SIGN OUT BUTTON REMOVED FROM HERE - DELEGATED TO NAVBAR */}
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
            <RepairStatus requests={requests} />
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
                <ItemCard 
                  key={item.id} 
                  itemName={item.item_name} 
                  imageUrl={item.image_url} 
                />
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
                  <li key={fb.id} className="feedback-bubble">
                    <p>{fb?.feedback || ""}</p>
                    <span>{fb?.created_at ? new Date(fb.created_at).toLocaleDateString() : ""}</span>
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
