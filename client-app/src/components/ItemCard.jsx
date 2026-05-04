import { useState } from "react";

function ItemCard({ itemName, imageUrl }) {
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
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "6px",
        padding: "15px",
        backgroundColor: "#fff",
        marginBottom: "15px",
        textAlign: "center",
      }}
    >
      <h4 style={{ marginBottom: "10px", color: "#003366" }}>
        {itemName || "Upload Item"}
      </h4>

      {imageUrl && (
        <img
          src={imageUrl}
          alt={itemName}
          style={{ maxWidth: "100%", marginBottom: "10px" }}
        />
      )}

      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Item Name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 12px",
            backgroundColor: "#0055aa",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Upload for Repair
        </button>
      </form>

      {message && <p style={{ marginTop: "10px", color: "#007700" }}>{message}</p>}
    </div>
  );
}

export default ItemCard;
