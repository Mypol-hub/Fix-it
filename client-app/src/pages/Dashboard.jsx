import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RequestForm from "../pages/RequestForm";
import RepairStatus from "../components/RepairStatus";
import ItemCard from "../components/ItemCard";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [requests, setRequests] = useState([]);
  const [items, setItems] = useState([]);
  const [feedbackEmail, setFeedbackEmail] = useState("");
  const [feedbackText, setFeedbackText] = useState("");

  // ✅ Read item param from URL
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedItem = params.get("item"); // e.g. "Washing Board"

  async function fetchRequests() {
    try {
      const res = await fetch("/.netlify/functions/getRequests");
      const data = await res.json();
      setRequests(data.requests || []);
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  }

  async function fetchFeedbacks() {
    try {
      const res = await fetch("/.netlify/functions/getFeedbacks");
      const data = await res.json();
      setFeedbacks(data.feedbacks || []);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  }

  async function fetchItems() {
    try {
      const res = await fetch("/.netlify/functions/getItems");
      const data = await res.json();
      setItems(data.items || []);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  }

  useEffect(() => {
    fetchFeedbacks();
    fetchRequests();
    fetchItems();
  }, []);

  async function handleUploadItem(itemName, imageUrl) {
    try {
      const res = await fetch("/.netlify/functions/uploadItem", {
        method: "POST",
        body: JSON.stringify({ item_name: itemName, image_url: imageUrl }),
      });
      const data = await res.json();
      console.log("Upload result:", data);
      fetchItems();
    } catch (err) {
      console.error("Error uploading item:", err);
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

      {/* Request Form with auto‑filled item */}
      <div style={cardStyle}>
        <RequestForm onRequestSubmitted={fetchRequests} prefilledItem={selectedItem} />
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
          style={{
            marginTop: "15px",
            padding: "10px 15px",
            backgroundColor: "#0055aa",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Upload Example Item
        </button>
      </div>

      {/* Feedback Section */}
      <div style={cardStyle}>
        <h3 style={sectionTitle}>Your Feedback</h3>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const res = await fetch("/.netlify/functions/submitFeedback", {
                method: "POST",
                body: JSON.stringify({ email: feedbackEmail, feedback: feedbackText }),
              });
              const data = await res.json();
              alert(data.message || data.error);

              // Refresh feedbacks after submission
              fetchFeedbacks();

              setFeedbackEmail("");
              setFeedbackText("");
            } catch (err) {
              console.error("Error submitting feedback:", err);
            }
          }}
          style={{ marginBottom: "20px" }}
        >
          <input
            type="email"
            placeholder="Your email"
            value={feedbackEmail}
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
          <button
            type="submit"
            style={{
              padding: "10px 15px",
              backgroundColor: "#0055aa",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Submit Feedback
          </button>
        </form>

        {feedbacks.length === 0 ? (
          <p style={{ color: "#888", textAlign: "center" }}>No feedback submitted yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {feedbacks.map((fb, idx) => (
              <li key={idx} style={feedbackItemStyle}>
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
