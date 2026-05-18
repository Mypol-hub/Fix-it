import { useState } from "react";
import { supabase } from "../supabaseClient";
import "./ItemUpload.css";

export default function ItemUpload({ user, onUploadSuccess }) {
  const [itemName, setItemName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Fallback if the parent component hasn't passed the user state yet
    if (!user?.id) {
      alert("Session lost or loading. Please wait or log in again.");
      return;
    }

    if (!file || !itemName) {
      alert("Please provide both a name and an image.");
      return;
    }

    setLoading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      
      // Use a hyphen to flatten the path and avoid subfolder RLS restrictions
      const filePath = `${user.id}-${fileName}`;

      // 1. Uploading to lowercase item-images
      const { error: uploadError } = await supabase.storage
        .from("item-images") 
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Fetching public URL from lowercase item-images
      const { data: { publicUrl } } = supabase.storage
        .from("item-images")
        .getPublicUrl(filePath);

      // 🔍 EXTRA SAFE PHONE PARSING & CLEANING
      let rawPhone = user.phone || user.user_metadata?.phone || user.user_metadata?.display_phone || "";
      let cleanPhone = rawPhone.trim().replace(/\D/g, "");
      if (cleanPhone.startsWith("0")) {
        cleanPhone = "961" + cleanPhone.substring(1);
      }

      // 3. Insert metadata record into public.items table
      const { error: insertError } = await supabase.from("items").insert([
        {
          item_name: itemName,
          image_url: publicUrl,
          user_id: user.id, 
          phone: cleanPhone || "No Phone Provided" // 🚨 FIXED: Normalized to match your admin dashboard links!
        },
      ]);

      if (insertError) throw insertError;

      alert("Item added to your gallery successfully!");
      setItemName("");
      setFile(null);
      
      if (onUploadSuccess) onUploadSuccess();
      
    } catch (error) {
      alert("Upload failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="item-upload">
      <h4>Add to Gallery</h4>
      <div className="form-group">
        <label>Device Name</label>
        <input
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="e.g. Vintage Marshall Radio"
          required
        />
      </div>

      <div className="form-group">
        <label className="file-label">
          <span>{file ? "✅ Photo Selected" : "📸 Select Photo"}</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
            required
          />
        </label>
        {file && <p className="file-name-preview">{file.name}</p>}
      </div>

      <button type="submit" className="upload-btn" disabled={loading || !user}>
        {loading ? "Uploading..." : "Add Item"}
      </button>
    </form>
  );
}
