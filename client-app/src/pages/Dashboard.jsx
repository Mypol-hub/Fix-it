import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RequestForm from "../components/RequestForm";
import RepairStatus from "../components/RepairStatus";
import ItemCard from "../components/ItemCard";
import { supabase } from "../supabaseClient";

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

  // ✅ Redirect if not logged in
  useEffect(() => {
    const email = localStorage.getItem("clientEmail");
    if (!email) navigate("/login");
  }, [navigate]);

  // ✅ Logout
  function handleLogout() {
    localStorage.removeItem("clientEmail");
    navigate("/");
  }

  // ✅ Fetch data
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

  // ✅ Upload item
  async function handleUploadItem(e) {
    const file = e.target.files[0];
    if (!file || !itemName) {
      setUploadMessage("Please enter an item name and select a file.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.storage.from("item-images").upload(`items/${file.name}`, file);
    if (error) {
      setUploadMessage("Upload failed.");
      setLoading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("item-images").getPublicUrl(`items/${file.name}`);
    const publicURL = urlData?.publicUrl;
    await supabase.from("items").insert([{ item_name: itemName, image_url: publicURL }]);
    setUploadMessage("Item uploaded successfully!");
    fetchItems();
    setItemName("");
    setLoading(false);
  }

  // ✅ Submit feedback
  async function handleSubmitFeedback(e) {
    e.preventDefault();
    await supabase.from("feedbacks").insert([{ email: feedbackEmail || clientEmail, feedback: feedbackText }]);
    setUploadMessage("Feedback submitted!");
    fetchFeedbacks();
    setFeedbackEmail("");
    setFeedbackText("");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-5xl mx-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Your Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
        <p className="text-gray-600 mb-10">
          Welcome, <span className="font-semibold">{clientEmail}</span>
        </p>

        {/* Repair Request */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-blue-700 mb-4">Repair Request</h3>
          <RequestForm
            onRequestSubmitted={fetchRequests}
            prefilledItem={selectedItem}
            prefilledEmail={clientEmail}
          />
        </div>

        {/* Repair Status */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition mb-6">
          <h3 className="text-xl font-semibold text-blue-700 mb-4">Repair Status</h3>
          <RepairStatus requests={requests} />
        </div>

        {/* Item Upload */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition mb-6">
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
          <div className="mt-4 space-y-3">
            <input
              type="text"
              placeholder="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleUploadItem}
              className="w-full border rounded-lg p-2 cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {loading && <p className="text-blue-600 text-sm">Uploading...</p>}
            {uploadMessage && <p className="text-green-600 text-sm">{uploadMessage}</p>}
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-blue-700 mb-4">Your Feedback</h3>
          <form onSubmit={handleSubmitFeedback} className="space-y-4">
            <input
              type="email"
              placeholder="Your email"
              value={feedbackEmail || clientEmail || ""}
              onChange={(e) => setFeedbackEmail(e.target.value)}
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder={selectedItem ? `Issue with ${selectedItem}` : "Your feedback"}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              rows="3"
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Submit Feedback
            </button>
          </form>

          {feedbacks.length === 0 ? (
            <p className="text-gray-500 text-center mt-4">No feedback submitted yet.</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {feedbacks.map((fb) => (
                <li key={fb.id} className="border rounded-lg p-2 bg-blue-50 shadow-sm">
                  <p className="text-sm text-gray-800">{fb.feedback}</p>
                  <span className="text-xs text-gray-500">{fb.email}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
