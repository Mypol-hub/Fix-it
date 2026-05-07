import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

function Feedback() {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  async function fetchFeedbacks() {
    const { data, error } = await supabase.from("feedbacks").select("*");
    if (!error) setFeedbacks(data || []);
  }

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase.from("feedbacks").insert([{ email, feedback }]);
    if (error) {
      setMessage("Failed to submit feedback.");
      console.error(error);
    } else {
      setMessage("Feedback submitted successfully!");
      setEmail("");
      setFeedback("");
      fetchFeedbacks();
    }
  }

  return (
    <div className="page">
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Your feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows="3"
          required
        />
        <button type="submit" className="button">Submit Feedback</button>
      </form>
      {message && <p className="info">{message}</p>}

      <h3>Previous Feedback</h3>
      {feedbacks.length === 0 ? (
        <p className="muted">No feedback yet.</p>
      ) : (
        <ul className="feedback-list">
          {feedbacks.map((fb) => (
            <li key={fb.id} className="feedback-item">
              <p>{fb.feedback}</p>
              <span>{fb.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Feedback;
