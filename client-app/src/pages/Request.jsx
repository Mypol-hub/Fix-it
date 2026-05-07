import { useState } from "react";
import { supabase } from "../supabaseClient";

function Request() {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [itemName, setItemName] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase.from("requests").insert([
      { customer_name: customerName, email, item_name: itemName, problem_description: problemDescription }
    ]);
    if (error) {
      setMessage("Failed to submit request.");
      console.error(error);
    } else {
      setMessage("Request submitted successfully!");
      setCustomerName("");
      setEmail("");
      setItemName("");
      setProblemDescription("");
    }
  }

  return (
    <div className="page">
      <h2>Submit a Repair Request</h2>
      <form onSubmit={handleSubmit} className="form-group">
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
          placeholder="Describe the problem"
          value={problemDescription}
          onChange={(e) => setProblemDescription(e.target.value)}
          rows="3"
          required
        />
        <button type="submit" className="button">Submit Request</button>
      </form>
      {message && <p className="info">{message}</p>}
    </div>
  );
}

export default Request;
