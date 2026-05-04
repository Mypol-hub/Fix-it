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
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px"
      }}
    >
      <Navbar />
      <h2
        style={{
          textAlign: "center",
          fontSize: "26px",
          fontWeight: "bold",
          color: "#003366",
          marginBottom: "10px"
        }}
      >
        Your Dashboard
      </h2>
      <p
        style={{
          textAlign: "center",
          color: "#555",
          marginBottom: "25px",
          fontSize: "15px"
        }}
      >
        Submit a new repair request, upload item pictures, or provide feedback below.
      </p>

      {/* Request Form */}
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto 25px auto",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "2px 2px 10px rgba(0,0,0,0.1)"
        }}
      >
        <RequestForm />
      </div>

      {/* Repair Status Section */}
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto 25px auto",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "2px 2px 10px rgba(0,0,0,0.1)"
        }}
      >
        <RepairStatus requests={requests} />
      </div>

      {/* Item Picture Upload Section */}
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto 25px auto",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "2px 2px 10px rgba(0,0,0,0.1)"
        }}
      >
        <h3
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#0055aa",
            marginBottom: "15px"
          }}
        >
          Upload Item Pictures
        </h3>
        <ItemCard itemName="Washing Machine Board" />
      </div>

      {/* Feedback Section */}
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "2px 2px 10px rgba(0,0,0,0.1)"
        }}
      >
        <h3
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#0055aa",
            marginBottom: "15px"
          }}
        >
          Your Feedback
        </h3>
        {feedbacks.length === 0 ? (
          <p style={{ color: "#888", textAlign: "center" }}>No feedback submitted yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {feedbacks.map((fb, idx) => (
              <li
                key={idx}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "10px",
                  backgroundColor: "#f0f8ff",
                  marginBottom: "10px"
                }}
              >
                <p style={{ fontSize: "14px", color: "#333" }}>{fb.feedback}</p>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#777",
                    display: "block",
                    marginTop: "5px"
                  }}
                >
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
