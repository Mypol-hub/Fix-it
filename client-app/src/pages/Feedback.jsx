import { useState } from "react";

export default function Feedback() {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/.netlify/functions/submitRequest", {
      method: "POST",
      body: JSON.stringify({ email, feedback }),
    });
    const data = await res.json();
    alert(data.message || data.error);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        placeholder="Your feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}
