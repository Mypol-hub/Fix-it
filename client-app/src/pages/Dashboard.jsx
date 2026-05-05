import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RequestForm from "../components/RequestForm";   // ✅ use component version
import RepairStatus from "../components/RepairStatus";
import ItemCard from "../components/ItemCard";
import Navbar from "../components/Navbar";
import { supabase } from "../supabaseClient";          // ✅ import Supabase client

function Dashboard() {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [requests, setRequests] = useState([]);
  const [items, setItems] = useState([]);
  const [feedbackEmail, setFeedbackEmail] = useState("");
  const [feedbackText, setFeedbackText] = useState("");

  // ✅ Read item + email
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedItem = params.get("item");
  const clientEmail = params.get("email") || localStorage.getItem("clientEmail");

  // ✅ Protect Dashboard: redirect if not logged in
  useEffect(() => {
    if (!clientEmail) {
      navigate("/login");
    }
  }, [clientEmail, navigate]);

  // ✅ Supabase fetch functions
  async function fetchRequests() {
    const { data, error } = await supabase.from("requests").select("*");
    if (error) console.error("Error fetching requests:", error);
    setRequests(data || []);
  }

  async function fetchFeedbacks() {
    const { data, error } = await supabase.from("feedbacks").select("*");
    if (error) console.error("Error fetching feedbacks:", error);
    setFeedbacks(data || []);
  }

  async function fetchItems() {
    const { data, error } = await supabase.from("items").select("*");
    if (error) console.error("Error fetching items:", error);
    setItems(data || []);
  }

  useEffect(() => {
    fetchFeedbacks();
    fetchRequests();
    fetchItems();
  }, []);

  async function handleUploadItem(itemName, imageUrl) {
    const { error } = await supabase
      .from("items")
      .insert([{ item_name: itemName, image_url: imageUrl }]);
    if (error) {
      console.error("Error uploading item:", error);
    } else {
      fetchItems();
    }
  }

  async function handleSubmitFeedback(e) {
    e.preventDefault();
    const { error } = await supabase
      .from("feedbacks")
      .insert([{ email: feedbackEmail || clientEmail, feedback: feedbackText }]);
    if (error) {
      alert("Error submitting feedback");
      console.error(error);
    } else {
      alert("Feedback submitted!");
      fetchFeedbacks();
      setFeedbackEmail("");
      setFeedbackText("");
    }
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5", padding: "20px" }}>
      <Navbar />
      <h2 style={{ textAlign: "center", fontSize: "26px", fontWeight: "bold", color: "#003366", marginBottom: "10px" }}>
        Your Dashboard
      </h2>
      <p style={{ textAlign: "center", color: "#555", marginBottom: "25px", fontSize: "15px" }}>
        Submit a new repair request, upload item pictures, or provide feedback below.
      </p>

      {/* Request Form with auto‑filled item + email */}
      <div style={cardStyle}>
        <RequestForm
          onRequestSubmitted={fetchRequests}
          prefilledItem={selectedItem}
          prefilledEmail={clientEmail}
        />
      </div>

      {/* Repair Status Section */}
      <div style={cardStyle}>
        <RepairStatus requests={requests} />
      </div>

      {/* Item Picture Upload Section */}
      <div style={cardStyle}>
        <h3 style={sectionTitle}>Upload Item Pictures</h3>
        {items.length === 0 ? (
          <p style={{ color: "#888", textAlign: "center" }}>No items uploaded yet.</p>
        ) : (
          items.map((item) => (
            <ItemCard key={item.id} itemName={item.item_name} imageUrl={item.image_url} />
          ))
        )}
        <button
          onClick={() => handleUploadItem("Washing Machine Board", "https://example.com/washing.jpg")}
          style={uploadButtonStyle}
        >
          Upload Example Item
        </button>
      </div>

      {/* Feedback Section */}
      <div style={cardStyle}>
        <h3 style={sectionTitle}>Your Feedback</h3>
        <form onSubmit={handleSubmitFeedback} style={{ marginBottom: "20px" }}>
          <input
            type="email"
            placeholder="Your email"
            value={feedbackEmail || clientEmail || ""}
            onChange={(e) => setFeedbackEmail(e.target.value)}
            required
            style={{ display: "block", marginBottom: "10px", width: "100%" }}
          />
          <textarea
            placeholder="Your feedback"
            value={feedbackText || (selectedItem ? `Issue with ${selectedItem}` : "")}
            onChange={(e) => setFeedbackText(e.target.value)}
            required
            style={{ display: "block", marginBottom: "10px", width: "100%" }}
          />
          <button type="submit" style={uploadButtonStyle}>
            Submit Feedback
          </button>
        </form>

        {feedbacks.length === 0 ? (
          <p style={{ color: "#888", textAlign: "center" }}>No feedback submitted yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {feedbacks.map((fb) => (
              <li key={fb.id} style={feedbackItemStyle}>
                <p style={{ fontSize: "14px", color: "#333" }}>{fb.feedback}</p>
                <span style={feedbackMetaStyle}>{fb.email}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// Shared styles
const cardStyle = {
  maxWidth: "600px",
  margin: "0 auto 25px auto",
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
};

const sectionTitle = {
  fontSize: "20px",
  fontWeight: "600",
  color: "#0055aa",
  marginBottom: "15px",
};

const uploadButtonStyle = {
  marginTop: "15px",
  padding: "10px 15px",
  backgroundColor: "#0055aa",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const feedbackItemStyle = {
  border: "1px solid #ddd",
  borderRadius: "6px",
  padding: "10px",
  backgroundColor: "#f0f8ff",
  marginBottom: "10px",
};

const feedbackMetaStyle = {
  fontSize: "12px",
  color: "#777",
  display: "block",
  marginTop: "5px",
};

export default Dashboard;
