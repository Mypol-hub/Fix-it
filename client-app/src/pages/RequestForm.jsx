import { useState } from "react";

function RequestForm({ onRequestSubmitted, prefilledItem, prefilledEmail }) {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState(prefilledEmail || "");
  const [itemName, setItemName] = useState(prefilledItem || "");
  const [problemDescription, setProblemDescription] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("/.netlify/functions/submitRequest", {
        method: "POST",
        body: JSON.stringify({
          customer_name: customerName,
          email,
          item_name: itemName,
          problem_description: problemDescription,
        }),
      });
      const data = await res.json();
      setMessage(data.message || "Request submitted!");

      // Clear only name + description, keep email/item
      setCustomerName("");
      setProblemDescription("");
    } catch (err) {
      setMessage("Error submitting request");
      console.error(err);
    }

    if (onRequestSubmitted) {
      onRequestSubmitted();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="Item Name"
        required
      />
      <textarea
        value={problemDescription}
        onChange={(e) => setProblemDescription(e.target.value)}
        placeholder="Problem Description"
      />
      <button type="submit">Submit Request</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default RequestForm;
