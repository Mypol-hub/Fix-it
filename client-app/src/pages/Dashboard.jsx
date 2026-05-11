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

  // Fetch data only after the user state is set
  useEffect(() => {
    if (user) {
      fetchAllData();
    }
  }, [user]);

  async function fetchAllData() {
    // RLS policies (auth.uid() = user_id) will handle the filtering automatically
    const { data: reqData } = await supabase.from("requests").select("*");
    setRequests(reqData || []);

    const { data: fbData } = await supabase.from("feedbacks").select("*");
    setFeedbacks(fbData || []);

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

    const filePath = `items/${user.id}/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("item-images")
      .upload(filePath, file);

    if (uploadError) {
      setUploadMessage("Upload failed.");
      setLoading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("item-images").getPublicUrl(filePath);
    
    await supabase.from("items").insert([
      { 
        item_name: itemName, 
        image_url: urlData.publicUrl, 
        user_id: user.id 
      }
    ]);

    setUploadMessage("Item uploaded successfully!");
    fetchAllData();
    setItemName("");
    setLoading(false);
  }

  async function handleSubmitFeedback(e) {
    e.preventDefault();
    const { error } = await supabase.from("feedbacks").insert([
      { 
        email: user.email, 
        feedback: feedbackText, 
        user_id: user.id 
      }
    ]);

    if (!error) {
      setUploadMessage("Feedback submitted!");
      setFeedbackText("");
      fetchAllData();
    }
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Control Panel</h1>
        <p className="welcome-text">
          Logged in as: <span className="highlight">{user?.email}</span>
        </p>
      </div>

      <div className="card">
        <h3>New Repair Request</h3>
        {/* Pass the user object to the form so it can save the user_id */}
        <RequestForm 
          onRequestSubmitted={fetchAllData} 
          prefilledItem={selectedItem} 
          user={user} 
        />
      </div>

      <div className="card">
        <h3>My Repair Status</h3>
        <RepairStatus requests={requests} />
      </div>

      <div className="card">
        <h3>My Uploaded Items</h3>
        <div className="item-grid">
          {items.map((item) => (
            <ItemCard key={item.id} itemName={item.item_name} imageUrl={item.image_url} />
          ))}
        </div>
        <div className="form-group upload-section">
          <input
            type="text"
            placeholder="Item Name (e.g. Sony TV)"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <input type="file" accept="image/*" onChange={handleUploadItem} />
          {loading && <p>Uploading...</p>}
          {uploadMessage && <p className="status-msg">{uploadMessage}</p>}
        </div>
      </div>

      <div className="card">
        <h3>My Feedback</h3>
        <form onSubmit={handleSubmitFeedback} className="form-group">
          <textarea
            placeholder="Leave a comment about our service..."
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
              <small>{new Date(fb.created_at).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
