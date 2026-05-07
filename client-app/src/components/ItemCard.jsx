import { useState } from "react";
import "./ItemCard.css";   // ✅ Import CSS

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
    <div className="item-card">
      <h4>{itemName || "Upload Item"}</h4>

      {imageUrl && (
        <img src={imageUrl} alt={itemName} />
      )}

      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Item Name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
        />
        <button type="submit">Upload for Repair</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
