import { useState } from "react";

function RequestForm() {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [itemName, setItemName] = useState("");
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
      // Clear form
      setCustomerName("");
      setEmail("");
      setItemName("");
      setProblemDescription("");
    } catch (err) {
      setMessage("Error submitting request");
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        required
      />
      <textarea
        placeholder="Problem Description"
        value={problemDescription}
        onChange={(e) => setProblemDescription(e.target.value)}
      />
      <button type="submit">Submit Request</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default RequestForm;
