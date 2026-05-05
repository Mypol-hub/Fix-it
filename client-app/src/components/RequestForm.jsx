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
  setCustomerName("");
  setEmail("");
  setItemName("");
  setProblemDescription("");
  if (onRequestSubmitted) onRequestSubmitted(); // refresh requests
};

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-4"
    >
      <h2 className="text-xl font-bold text-blue-900 mb-2 text-center">
        Submit Repair Request
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Your name"
          required
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Item
        </label>
        <input
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Item name"
          required
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Problem Description
        </label>
        <textarea
          value={problemDescription}
          onChange={(e) => setProblemDescription(e.target.value)}
          placeholder="Describe the problem"
          rows="4"
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Submit Request
      </button>
    </form>
  );
}
