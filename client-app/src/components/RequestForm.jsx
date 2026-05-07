import { useState } from "react";
import { submitRequest } from "../api";
import "./RequestForm.css";   // ✅ Import CSS

export default function RequestForm({ onRequestSubmitted }) {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [itemName, setItemName] = useState("");
  const [problemDescription, setProblemDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitRequest(customerName, email, itemName, problemDescription);
    alert("Request submitted!");
    setCustomerName("");
    setEmail("");
    setItemName("");
    setProblemDescription("");
    if (onRequestSubmitted) onRequestSubmitted(); // refresh requests
  };

  return (
    <form onSubmit={handleSubmit} className="request-form">
      <h2>Submit Repair Request</h2>

      <div>
        <label>Name</label>
        <input
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Your name"
          required
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required
        />
      </div>

      <div>
        <label>Item</label>
        <input
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Item name"
          required
        />
      </div>

      <div>
        <label>Problem Description</label>
        <textarea
          value={problemDescription}
          onChange={(e) => setProblemDescription(e.target.value)}
          placeholder="Describe the problem"
          rows="4"
        />
      </div>

      <button type="submit">Submit Request</button>
    </form>
  );
}
