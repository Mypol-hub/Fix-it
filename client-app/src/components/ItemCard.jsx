import "./ItemCard.css";

export default function ItemCard({ itemName, imageUrl }) {
  // Simple function to handle image click (optional)
  const handleImageClick = () => {
    if (imageUrl) {
      window.open(imageUrl, "_blank");
    }
  };

  return (
    <div className="item-card">
      <div className="image-container" onClick={handleImageClick} style={{ cursor: 'pointer' }}>
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={itemName} 
            loading="lazy" 
            title="Click to view full size"
          />
        ) : (
          <div className="no-image">
            <span>📷</span>
            <p>No Image Available</p>
          </div>
        )}
      </div>
      <div className="item-details">
        {/* Use a title attribute so the full name shows on hover if it's truncated */}
        <h4 title={itemName}>{itemName}</h4>
      </div>
    </div>
  );
}
