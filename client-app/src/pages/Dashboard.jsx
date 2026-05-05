import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RequestForm from "../components/RequestForm";   // ✅ use component version
import RepairStatus from "../components/RepairStatus";
import ItemCard from "../components/ItemCard";
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
    <div className="min-h-screen bg-gray-100">
  <Navbar />

  <div className="max-w-4xl mx-auto p-6">
    <h2 className="text-center text-3xl font-bold text-blue-900 mb-2">
      Your Dashboard
    </h2>
    <p className="text-center text-gray-600 mb-8">
      Submit a new repair request, upload item pictures, or provide feedback below.
    </p>

    {/* Request Form */}
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h3 className="text-xl font-semibold text-blue-700 mb-4">Repair Request</h3>
      <RequestForm
        onRequestSubmitted={fetchRequests}
        prefilledItem={selectedItem}
        prefilledEmail={clientEmail}
      />
    </div>

    {/* Repair Status */}
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h3 className="text-xl font-semibold text-blue-700 mb-4">Repair Status</h3>
      <RepairStatus requests={requests} />
    </div>

    {/* Item Upload */}
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h3 className="text-xl font-semibold text-blue-700 mb-4">Upload Item Pictures</h3>
      {items.length === 0 ? (
        <p className="text-gray-500 text-center">No items uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <ItemCard key={item.id} itemName={item.item_name} imageUrl={item.image_url} />
          ))}
        </div>
      )}
      <button
        onClick={() =>
          handleUploadItem("Washing Machine Board", "https://example.com/washing.jpg")
        }
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Upload Example Item
      </button>
    </div>

    {/* Feedback */}
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold text-blue-700 mb-4">Your Feedback</h3>
      <form onSubmit={handleSubmitFeedback} className="space-y-4 mb-6">
        <input
          type="email"
          placeholder="Your email"
          value={feedbackEmail || clientEmail || ""}
          onChange={(e) => setFeedbackEmail(e.target.value)}
          required
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <textarea
          placeholder="Your feedback"
          value={feedbackText || (selectedItem ? `Issue with ${selectedItem}` : "")}
          onChange={(e) => setFeedbackText(e.target.value)}
          required
          rows="4"
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Feedback
        </button>
      </form>

      {feedbacks.length === 0 ? (
        <p className="text-gray-500 text-center">No feedback submitted yet.</p>
      ) : (
        <ul className="space-y-3">
          {feedbacks.map((fb) => (
            <li key={fb.id} className="border rounded-lg p-3 bg-blue-50 shadow-sm">
              <p className="text-sm text-gray-800">{fb.feedback}</p>
              <span className="text-xs text-gray-500 block mt-1">{fb.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
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
