import { useState } from "react";

function ItemCard({ itemName, imageUrl }) {
  const [newItemName, setNewItemName] = useState("");
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
      setMessage(data.message || "Item uploaded!");
      setNewItemName("");
      setNewImageUrl("");
    } catch (err) {
      setMessage("Error uploading item");
      console.error(err);
    }
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      {itemName && (
        <div style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "6px" }}>
          <h4>{itemName}</h4>
          {imageUrl && <img src={imageUrl} alt={itemName} style={{ maxWidth: "100%" }} />}
        </div>
      )}

      {/* Upload form */}
      <form onSubmit={handleUpload} style={{ marginTop: "15px" }}>
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
        <button type="submit">Upload Item</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ItemCard;
