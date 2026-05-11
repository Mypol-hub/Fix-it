import { useState } from "react";
import { supabase } from "../supabaseClient"; 
import "./RequestForm.css";

export default function RequestForm({ onRequestSubmitted, user, prefilledItem }) {
  // Use the prefilledItem if the user clicked "Repair" from the Home page
  const [itemName, setItemName] = useState(prefilledItem || "");
  const [problemDescription, setProblemDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert("Please log in to submit a request.");
      return;
    }

    setLoading(true);

    // Insert into Supabase using the user's real ID
    const { error } = await supabase.from("requests").insert([
      {
        customer_name: user.email.split('@')[0], // Simple way to get a name from email
        email: user.email,
        item_name: itemName,
        problem_description: problemDescription,
        user_id: user.id, // THE IMPORTANT PART
        status: "Pending",
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Repair request sent!");
      setItemName("");
      setProblemDescription("");
      if (onRequestSubmitted) onRequestSubmitted(); // This refreshes the Dashboard list
    }
  };

  return (
    <form onSubmit={handleSubmit} className="request-form">
      <p>Logged in as: <strong>{user?.email}</strong></p>

      <div className="form-group">
        <label>Item Name</label>
        <input
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="What needs fixing?"
          required
        />
      </div>

      <div className="form-group">
        <label>Problem Description</label>
        <textarea
          value={problemDescription}
          onChange={(e) => setProblemDescription(e.target.value)}
          placeholder="Tell us what's wrong..."
          rows="4"
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Submit Repair Request"}
      </button>
    </form>
  );
}
