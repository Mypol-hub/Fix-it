import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

// ✅ All modular components integrated
import RequestForm from "../components/RequestForm";
import RepairStatus from "../components/RepairStatus";
import ItemCard from "../components/ItemCard";
import ItemUpload from "../components/ItemUpload";
import FeedbackForm from "../components/FeedbackForm";

import "./dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [items, setItems] = useState([]);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedItem = params.get("item");

  useEffect(() => {
    // 1. Verify Authentication
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/login");
      } else {
        setUser(user);
      }
    };
    checkUser();
  }, [navigate]);

  // 2. Fetch all user-specific data once user is identified
  useEffect(() => {
    if (user) {
      fetchAllData();
    }
  }, [user]);

  async function fetchAllData() {
    // RLS (auth.uid() = user_id) ensures privacy on the DB level
    const { data: reqData } = await supabase.from("requests").select("*");
    setRequests(reqData || []);

    const { data: fbData } = await supabase.from("feedbacks").select("*");
    setFeedbacks(fbData || []);

    const { data: itemData } = await supabase.from("items").select("*");
    setItems(itemData || []);
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Customer Portal</h1>
          <p>Logged in as: <span className="user-email">{user?.email}</span></p>
        </div>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      <main className="dashboard-grid">
        
        {/* SECTION 1: SUBMIT NEW REPAIR */}
        <section className="dashboard-card">
          <div className="card-header">
            <h3>New Repair Request</h3>
          </div>
          <RequestForm 
            user={user} 
            onRequestSubmitted={fetchAllData} 
            prefilledItem={selectedItem} 
          />
        </section>

        {/* SECTION 2: REPAIR STATUS TRACKING */}
        <section className="dashboard-card">
          <div className="card-header">
            <h3>My Active Repairs</h3>
          </div>
          <RepairStatus requests={requests} />
        </section>

        {/* SECTION 3: ITEM GALLERY & IMAGE UPLOADS */}
        <section className="dashboard-card gallery-section">
          <div className="card-header">
            <h3>My Item Gallery</h3>
          </div>
          <div className="item-grid">
            {items.map((item) => (
              <ItemCard 
                key={item.id} 
                itemName={item.item_name} 
                imageUrl={item.image_url} 
              />
            ))}
          </div>
          <div className="upload-container">
            <ItemUpload user={user} onUploadSuccess={fetchAllData} />
          </div>
        </section>

        {/* SECTION 4: ADMIN COMMUNICATION (FEEDBACK) */}
        <section className="dashboard-card feedback-section">
          <div className="card-header">
            <h3>Communication with Admin</h3>
            <p className="card-subtitle">Report complaints or check item availability</p>
          </div>
          <FeedbackForm user={user} onFeedbackSubmitted={fetchAllData} />
          
          <div className="feedback-history">
            <h4>History</h4>
            {feedbacks.length === 0 ? <p className="empty-msg">No messages yet.</p> : (
              <ul className="feedback-list">
                {feedbacks.map((fb) => (
                  <li key={fb.id} className="feedback-bubble">
                    <p className="feedback-text">{fb.feedback}</p>
                    <span className="feedback-date">
                      {new Date(fb.created_at).toLocaleDateString()}
                    </span>
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
