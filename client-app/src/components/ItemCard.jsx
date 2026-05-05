import { useState } from "react";

export default function ItemCard({ itemName, imageUrl }) {
  const [newItemName, setNewItemName] = useState(itemName || "");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [message, setMessage] = useState("");

  async function handleUpload(e) {
    e.preventDefault();
    try {
      const res = await fetch("/.netlify/functions/uploadItem", {
        method: "POST",
        body: JSON.stringify({
          item_name: newItemName,
          image_url: newImageUrl,
        }),
      });
      const data = await res.json();
      setMessage(data.message || "Item uploaded for repair!");
      setNewImageUrl("");
    } catch (err) {
      setMessage("Error uploading item");
      console.error(err);
    }
  }

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm mb-4 text-center">
      <h4 className="mb-3 text-blue-900 font-semibold text-lg">
        {itemName || "Upload Item"}
      </h4>

      {imageUrl && (
        <img
          src={imageUrl}
          alt={itemName}
          className="max-w-full h-40 object-contain mx-auto mb-3 rounded"
        />
      )}

      <form onSubmit={handleUpload} className="space-y-3">
        <input
          type="text"
          placeholder="Item Name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          required
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Upload for Repair
        </button>
      </form>

      {message && (
        <p className="mt-3 text-green-700 font-medium">{message}</p>
      )}
    </div>
  );
}
