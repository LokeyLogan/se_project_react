import "./ItemCard.css";

function ItemCard({ item, onClick }) {
  return (
    <li className="item-card">
      <h2 className="card__name">{item.name}</h2>
      <img
        className="card__image"
        src={item.link}
        alt={item.name}
        onClick={() => onClick(item)}
        style={{ cursor: "pointer" }}
      />
    </li>
  );
}

export default ItemCard;
