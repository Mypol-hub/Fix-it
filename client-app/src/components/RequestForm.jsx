import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; 
import "./RequestForm.css"; 

export default function RequestForm({ onRequestSubmitted, user, prefilledItem }) {
  const [itemName, setItemName] = useState(prefilledItem || "");
  const [problemDescription, setProblemDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 FIX: Sync input state if prefilledItem changes from home page parameters
  useEffect(() => {
    if (prefilledItem) {
      setItemName(prefilledItem);
    }
  }, [prefilledItem]);

   const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user?.id) {
      alert("Please log in to submit a request.");
      return;
    }

    setLoading(true);

    // Normalize phone formatting before sending data rows to Supabase
    let rawPhone = user.phone || user.user_metadata?.display_phone || "";
    let cleanPhone = rawPhone.trim().replace(/\D/g, "");
    if (cleanPhone.startsWith("0")) {
      cleanPhone = "961" + cleanPhone.substring(1);
    }

    const { error } = await supabase.from("requests").insert([
      {
        customer_name: user.user_metadata?.full_name || "Valued Customer", 
        phone: cleanPhone || "No Phone Provided", // Perfectly formatted bridge key
        item_name: itemName,
        problem_description: problemDescription,
        user_id: user.id,
        status: "Pending",
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Repair request sent successfully!");
      setItemName("");
      setProblemDescription("");
      
      if (onRequestSubmitted) onRequestSubmitted(); 
    }
  };


  return (
    <form onSubmit={handleSubmit} className="request-form">
      <div className="form-group">
        <label>Item to Repair</label>
        <input
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="e.g., Samsung TV or AC Board"
          required
        />
      </div>

      <div className="form-group">
        <label>Problem Details</label>
        <textarea
          value={problemDescription}
          onChange={(e) => setProblemDescription(e.target.value)}
          placeholder="What's wrong with it?"
          rows="4"
          required
        />
      </div>

      {/* Changed class to "submit-btn" to match your premium modern CSS file */}
      <button type="submit" className="submit-btn" disabled={loading || !user}>
        {loading ? "Submitting..." : "Send Request"}
      </button>
    </form>
  );
}
