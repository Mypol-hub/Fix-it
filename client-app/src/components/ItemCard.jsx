import { useState } from "react";

export default function ItemCard({ itemName }) {
  const [file, setFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return;

    // Example: send file to backend
    const formData = new FormData();
    formData.append("file", file);
    formData.append("itemName", itemName);

    const res = await fetch("/.netlify/functions/uploadItemImage", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setUploadedUrl(data.url); // backend should return the stored image URL
  }

  return (
    <div className="border rounded-lg shadow-sm p-4 bg-white text-center">
      <h3 className="text-lg font-semibold mb-2">{itemName}</h3>

      <form onSubmit={handleUpload} className="space-y-3">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Upload Item Picture
        </button>
      </form>

      {uploadedUrl && (
        <div className="mt-4">
          <img
            src={uploadedUrl}
            alt={itemName}
            className="mx-auto h-32 w-32 object-contain mb-2"
          />
          <a
            href={uploadedUrl}
            download
            className="text-blue-600 underline text-sm"
          >
            Download Picture
          </a>
        </div>
      )}
    </div>
  );
}
