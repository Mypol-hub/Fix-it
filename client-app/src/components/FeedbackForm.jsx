import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function FeedbackForm({ user, onFeedbackSubmitted }) {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    const { error } = await supabase.from("feedbacks").insert([
      { 
        email: user.email, 
        feedback: feedback,
        user_id: user.id 
      }
    ]);
    setLoading(false);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Feedback sent to Khalil Electronics!");
      setFeedback("");
      if (onFeedbackSubmitted) onFeedbackSubmitted(); // Refreshes the list in Dashboard
    }
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form-component">
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Did the repair work? Let us know if you have any complaints."
        rows="3"
        required
      />
      <button type="submit" className="button" disabled={loading}>
        {loading ? "Sending..." : "Submit Feedback"}
      </button>
    </form>
  );
}
