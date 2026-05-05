import { useState } from "react";
import { submitRequest } from "../api";

export default function RequestForm() {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [itemName, setItemName] = useState("");
  const [problemDescription, setProblemDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitRequest(customerName, email, itemName, problemDescription);
    alert("Request submitted!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Name" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={itemName} onChange={e => setItemName(e.target.value)} placeholder="Item" />
      <textarea value={problemDescription} onChange={e => setProblemDescription(e.target.value)} placeholder="Problem" />
      <button type="submit">Submit</button>
    </form>
  );
}
