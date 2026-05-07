import { useState } from "react";
import { uploadItem } from "../api";
import "./ItemUpload.css";   // ✅ Import CSS

export default function ItemUpload() {
  const [itemName, setItemName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadItem(itemName, imageUrl);
    alert("Item uploaded!");
    setItemName("");
    setImageUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="item-upload">
      <h2>Upload New Item</h2>

      <div>
        <label>Item Name</label>
        <input
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Enter item name"
          required
        />
      </div>

      <div>
        <label>Image URL</label>
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Paste image URL"
        />
      </div>

      <button type="submit">Upload Item</button>
    </form>
  );
}
