import { useState } from "react";
import { supabase } from "../supabaseClient";
import "./ItemUpload.css";

export default function ItemUpload({ user, onUploadSuccess }) {
  const [itemName, setItemName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !itemName || !user) {
      alert("Please provide both a name and an image.");
      return;
    }

    setLoading(true);

    try {
      // 1. Create a unique path for the image
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // 2. Upload the file to the 'item-images' bucket
      const { error: uploadError } = await supabase.storage
        .from("item-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 3. Get the public URL for the image
      const { data: { publicUrl } } = supabase.storage
        .from("item-images")
        .getPublicUrl(filePath);

      // 4. Save the item details to the 'items' table
      const { error: insertError } = await supabase.from("items").insert([
        {
          item_name: itemName,
          image_url: publicUrl,
          user_id: user.id, // Securely tag it to the user
        },
      ]);

      if (insertError) throw insertError;

      alert("Item uploaded successfully!");
      setItemName("");
      setFile(null);
      
      // Refresh the gallery on the dashboard
      if (onUploadSuccess) onUploadSuccess();
      
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="item-upload">
      <div className="form-group">
        <label>Item Name</label>
        <input
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="e.g. My Sony TV"
          required
        />
      </div>

      <div className="form-group">
        <label>Select Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Upload Item"}
      </button>
    </form>
  );
}
