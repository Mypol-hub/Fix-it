import { useEffect, useState } from "react";
import RequestForm from "../pages/RequestForm";
import RepairStatus from "../components/RepairStatus";
import ItemCard from "../components/ItemCard";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function fetchFeedbacks() {
      try {
        const res = await fetch("/.netlify/functions/getFeedbacks");
        const data = await res.json();
        setFeedbacks(data.feedbacks || []);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
      }
    }

    async function fetchRequests() {
      try {
        const res = await fetch("/.netlify/functions/getRequests");
        const data = await res.json();
        setRequests(data.requests || []);
      } catch (err) {
        console.error("Error fetching requests:", err);
      }
    }

    fetchFeedbacks();
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Your Dashboard</h2>
      <p className="text-center text-gray-600 mb-6">
        Submit a new repair request, upload item pictures, or provide feedback below.
      </p>

      {/* Request Form */}
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
        <RequestForm />
      </div>

      {/* Repair Status Section */}
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
        <RepairStatus requests={requests} />
      </div>

      {/* Item Picture Upload Section */}
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Upload Item Pictures</h3>
        {/* Example usage of ItemCard for one item */}
        <ItemCard itemName="Washing Machine Board" />
        {/* You can render multiple ItemCards dynamically if needed */}
      </div>

      {/* Feedback Section */}
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Your Feedback</h3>
        {feedbacks.length === 0 ? (
          <p className="text-gray-500">No feedback submitted yet.</p>
        ) : (
          <ul className="space-y-3">
            {feedbacks.map((fb, idx) => (
              <li
                key={idx}
                className="border border-gray-200 rounded-md p-3 bg-gray-50"
              >
                <p className="text-sm text-gray-700">{fb.feedback}</p>
                <span className="text-xs text-gray-400 block mt-1">
                  {fb.email}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
