import { useState } from "react";
import { uploadItem } from "../api";

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
    <form onSubmit={handleSubmit}>
      <input
        value={itemName}
        onChange={e => setItemName(e.target.value)}
        placeholder="Item name"
        required
      />
      <input
        value={imageUrl}
        onChange={e => setImageUrl(e.target.value)}
        placeholder="Image URL"
      />
      <button type="submit">Upload Item</button>
    </form>
  );
}
