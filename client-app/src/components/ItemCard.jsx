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
    <div>
      {itemName && (
        <div>
          <h4>{itemName}</h4>
          {imageUrl && <img src={imageUrl} alt={itemName} style={{ maxWidth: "100%" }} />}
        </div>
      )}
      <form onSubmit={handleUpload}>
        <input value={newItemName} onChange={(e) => setNewItemName(e.target.value)} placeholder="Item Name" required />
        <input value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} placeholder="Image URL" />
        <button type="submit">Upload Item</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ItemCard;
