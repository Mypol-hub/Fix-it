import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Feedback() {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("/.netlify/functions/submitFeedback", {
        method: "POST",
        body: JSON.stringify({ email, feedback }),
      });
      const data = await res.json();
      setMessage(data.message || data.error);
      setEmail("");
      setFeedback("");
    } catch (err) {
      setMessage("Error submitting feedback");
      console.error(err);
    }
  }

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Your feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
