import { useState } from "react";
import { submitFeedback } from "../api";

export default function FeedbackForm() {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitFeedback(email, feedback);
    alert("Feedback submitted!");
    setEmail("");
    setFeedback("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Your email"
        required
      />
      <textarea
        value={feedback}
        onChange={e => setFeedback(e.target.value)}
        placeholder="Your feedback"
        required
      />
      <button type="submit">Send Feedback</button>
    </form>
  );
}
