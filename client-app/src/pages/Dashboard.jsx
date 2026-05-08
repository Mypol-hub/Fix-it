import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RequestForm from "../components/RequestForm";
import RepairStatus from "../components/RepairStatus";
import ItemCard from "../components/ItemCard";
import { supabase } from "../supabaseClient";

// ✅ Import your CSS file
import "./dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [requests, setRequests] = useState([]);
  const [items, setItems] = useState([]);
  const [feedbackEmail, setFeedbackEmail] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [itemName, setItemName] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedItem = params.get("item");
  const clientEmail = params.get("email") || localStorage.getItem("clientEmail");

  useEffect(() => {
    const email = localStorage.getItem("clientEmail");
    if (!email) navigate("/");
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("clientEmail");
    navigate("/");
  }

  async function fetchRequests() {
    const { data } = await supabase.from("requests").select("*");
    setRequests(data || []);
  }
  async function fetchFeedbacks() {
    const { data } = await supabase.from("feedbacks").select("*");
    setFeedbacks(data || []);
  }
  async function fetchItems() {
    const { data } = await supabase.from("items").select("*");
    setItems(data || []);
  }

  useEffect(() => {
    fetchFeedbacks();
    fetchRequests();
    fetchItems();
  }, []);

async function handleUploadItem(e) {
  const file = e.target.files[0];
  if (!file || !itemName) {
    setUploadMessage("Please enter an item name and select a file.");
    return;
  }
  setLoading(true);

  // ✅ Upload with unique filename and upsert enabled
  const filePath = `items/${Date.now()}-${file.name}`;
  const { error } = await supabase.storage
    .from("item-images")
    .upload(filePath, file, { upsert: true });

  if (error) {
    setUploadMessage("Upload failed.");
    setLoading(false);
    return;
  }

  // ✅ Get public URL for the uploaded file
  const { data: urlData } = supabase.storage
    .from("item-images")
    .getPublicUrl(filePath);

  const publicURL = urlData?.publicUrl;

  // ✅ Save record in items table
  await supabase.from("items").insert([{ item_name: itemName, image_url: publicURL }]);

  setUploadMessage("Item uploaded successfully!");
  fetchItems();
  setItemName("");
  setLoading(false);
}

  async function handleSubmitFeedback(e) {
    e.preventDefault();
    await supabase.from("feedbacks").insert([{ email: feedbackEmail || clientEmail, feedback: feedbackText }]);
    setUploadMessage("Feedback submitted!");
    fetchFeedbacks();
    setFeedbackEmail("");
    setFeedbackText("");
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Your Dashboard works!</h1>
        <button onClick={handleLogout} className="button logout">
          Logout
        </button>
      </div>
      <p className="welcome-text">
        Welcome, <span className="highlight">{clientEmail}</span>
      </p>

      {/* Repair Request */}
      <div className="card">
        <h3>Repair Request</h3>
        <RequestForm
          onRequestSubmitted={fetchRequests}
          prefilledItem={selectedItem}
          prefilledEmail={clientEmail}
        />
      </div>

      {/* Repair Status */}
      <div className="card">
        <h3>Repair Status</h3>
        <RepairStatus requests={requests} />
      </div>

      {/* Item Upload */}
      <div className="card">
        <h3>Upload Item Pictures</h3>
        {items.length === 0 ? (
          <p className="muted">No items uploaded yet.</p>
        ) : (
          <div className="item-grid">
            {items.map((item) => (
              <ItemCard key={item.id} itemName={item.item_name} imageUrl={item.image_url} />
            ))}
          </div>
        )}
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

      {/* Feedback */}
      <div className="card">
        <h3>Your Feedback</h3>
        <form onSubmit={handleSubmitFeedback} className="form-group">
          <input
            type="email"
            placeholder="Your email"
            value={feedbackEmail || clientEmail || ""}
            onChange={(e) => setFeedbackEmail(e.target.value)}
            required
          />
          <textarea
            placeholder={selectedItem ? `Issue with ${selectedItem}` : "Your feedback"}
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            rows="3"
            required
          />
          <button type="submit" className="button">
            Submit Feedback
          </button>
        </form>

        {feedbacks.length === 0 ? (
          <p className="muted">No feedback submitted yet.</p>
        ) : (
          <ul className="feedback-list">
            {feedbacks.map((fb) => (
              <li key={fb.id} className="feedback-item">
                <p>{fb.feedback}</p>
                <span>{fb.email}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
