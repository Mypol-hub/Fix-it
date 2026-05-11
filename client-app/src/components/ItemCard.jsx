import "./ItemCard.css";

export default function ItemCard({ itemName, imageUrl }) {
  return (
    <div className="item-card">
      <div className="image-container">
        {imageUrl ? (
          <img src={imageUrl} alt={itemName} loading="lazy" />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </div>
      <div className="item-details">
        <h4>{itemName}</h4>
      </div>
    </div>
  );
}
