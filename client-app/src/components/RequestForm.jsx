import { useState } from "react";
import { supabase } from "../supabaseClient"; // ✅ Import Supabase instead of api
import "./RequestForm.css";

export default function RequestForm({ onRequestSubmitted, user }) {
  const [itemName, setItemName] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert("You must be logged in to submit a request.");
      return;
    }

    setLoading(true);

    // ✅ Insert directly into Supabase with user_id
    const { error } = await supabase.from("requests").insert([
      {
        customer_name: user.user_metadata?.full_name || "Customer", // Pull from profile if available
        email: user.email,           // Use the logged-in user's email
        item_name: itemName,
        problem_description: problemDescription,
        user_id: user.id,            // 🔑 This links the request to the user
        status: "Pending",           // Default status
      },
    ]);

    setLoading(false);

    if (error) {
      console.error("Submission error:", error.message);
      alert("Error submitting request: " + error.message);
    } else {
      alert("Request submitted successfully!");
      setItemName("");
      setProblemDescription("");
      
      // Refresh the list on the Dashboard
      if (onRequestSubmitted) onRequestSubmitted();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="request-form">
      <h2>Submit Repair Request</h2>

      {/* Email and Name are now automatic based on the logged-in user */}
      <p className="user-info-hint">
        Submitting as: <strong>{user?.email}</strong>
      </p>

      <div className="form-group">
        <label>Item Name</label>
        <input
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="e.g., iPhone 13, Sony TV, Blender"
          required
        />
      </div>

      <div className="form-group">
        <label>Problem Description</label>
        <textarea
          value={problemDescription}
          onChange={(e) => setProblemDescription(e.target.value)}
          placeholder="What's wrong with the item?"
          rows="4"
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Request"}
      </button>
    </form>
  );
}
