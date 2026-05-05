import { useState } from "react";

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
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">
          Submit Your Feedback
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Feedback
            </label>
            <textarea
              placeholder="Your feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              rows="4"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send Feedback
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
