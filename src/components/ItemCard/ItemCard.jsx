function ItemCard({ item, onClick }) {
  return (
    <div className="item-card">
      <h2>{item.name}</h2>
      <img
        src={item.link}
        alt={item.name}
        onClick={() => onClick(item)}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}

export default ItemCard;
