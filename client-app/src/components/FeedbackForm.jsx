import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function FeedbackForm({ user, onFeedbackSubmitted }) {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Safety check for user.id
    if (!user?.id) {
      alert("Please log in to send a message.");
      return;
    }

    setLoading(true);

    // 🔍 EXTRA SAFE PHONE PARSING & CLEANING
    let rawPhone = user.phone || user.user_metadata?.phone || user.user_metadata?.display_phone || "";
    let cleanPhone = rawPhone.trim().replace(/\D/g, "");
    if (cleanPhone.startsWith("0")) {
      cleanPhone = "961" + cleanPhone.substring(1);
    }

    const { error } = await supabase.from("feedbacks").insert([
      { 
        feedback: feedback,
        user_id: user.id,
        phone: cleanPhone || "No Phone Provided" // 🚨 FIXED: Links the feedback text straight to your phone number bridge!
      }
    ]);
    
    setLoading(false);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Message sent to Khalil Electronics!");
      setFeedback("");
      
      if (onFeedbackSubmitted) {
        onFeedbackSubmitted(); 
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form-component">
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value || "")}
        placeholder="Questions about a repair? Or just want to say hi? Type here..."
        rows="3"
        required
      />
      <button type="submit" className="button" disabled={loading || !user}>
        {loading ? "Sending..." : "Submit Message"}
      </button>
    </form>
  );
}
