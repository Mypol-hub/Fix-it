import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RequestForm from "../components/RequestForm";
import RepairStatus from "../components/RepairStatus";
import ItemCard from "../components/ItemCard";
import { supabase } from "../supabaseClient";
import "./dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [requests, setRequests] = useState([]);
  const [items, setItems] = useState([]);
  const [feedbackText, setFeedbackText] = useState("");
  const [itemName, setItemName] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedItem = params.get("item");

  useEffect(() => {
    // Check for real Supabase session instead of localStorage
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/login");
      } else {
        setUser(user);
        fetchAllData();
      }
    };
    checkUser();
  }, [navigate]);

  async function fetchAllData() {
    // 1. Fetch Requests
    const { data: reqData } = await supabase.from("requests").select("*");
    setRequests(reqData || []);

    // 2. Fetch Feedbacks
    const { data: fbData } = await supabase.from("feedbacks").select("*");
    setFeedbacks(fbData || []);

    // 3. Fetch Items
    const { data: itemData } = await supabase.from("items").select("*");
    setItems(itemData || []);
  }

  async function handleUploadItem(e) {
    const file = e.target.files[0];
    if (!file || !itemName) {
      setUploadMessage("Please enter an item name and select a file.");
      return;
    }
    setLoading(true);

    const filePath = `items/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("item-images")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      setUploadMessage("Upload failed.");
      setLoading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("item-images").getPublicUrl(filePath);
    const publicURL = urlData?.publicUrl;

    // Save with user_id so it shows up for you
    await supabase.from("items").insert([
      { item_name: itemName, image_url: publicURL, user_id: user.id }
    ]);

    setUploadMessage("Item uploaded successfully!");
    fetchAllData();
    setItemName("");
    setLoading(false);
  }

  async function handleSubmitFeedback(e) {
    e.preventDefault();
    await supabase.from("feedbacks").insert([
      { email: user.email, feedback: feedbackText, user_id: user.id }
    ]);
    setUploadMessage("Feedback submitted!");
    setFeedbackText("");
    fetchAllData();
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Repair Dashboard</h1>
        <p className="welcome-text">
          Logged in as: <span className="highlight">{user?.email}</span>
        </p>
      </div>

      {/* Repair Request Section */}
      <div className="card">
        <h3>Submit a Repair Request</h3>
        <RequestForm 
          onRequestSubmitted={fetchAllData} 
          prefilledItem={selectedItem} 
          prefilledEmail={user?.email}
        />
      </div>

      {/* Repair Status Section */}
      <div className="card">
        <h3>Your Active Repairs</h3>
        <RepairStatus requests={requests} />
      </div>

      {/* Item Upload Gallery */}
      <div className="card">
        <h3>Upload Item Pictures</h3>
        <div className="item-grid">
          {items.map((item) => (
            <ItemCard key={item.id} itemName={item.item_name} imageUrl={item.image_url} />
          ))}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <input type="file" accept="image/*" onChange={handleUploadItem} />
          {loading && <p className="info">Uploading...</p>}
          {uploadMessage && <p className="success">{uploadMessage}</p>}
        </div>
      </div>

      {/* Feedback Section */}
      <div className="card">
        <h3>Feedback History</h3>
        <form onSubmit={handleSubmitFeedback} className="form-group">
          <textarea
            placeholder="Tell us what you think..."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            rows="3"
            required
          />
          <button type="submit" className="button">Submit Feedback</button>
        </form>
        <ul className="feedback-list">
          {feedbacks.map((fb) => (
            <li key={fb.id} className="feedback-item">
              <p>{fb.feedback}</p>
              <span>{fb.email}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
