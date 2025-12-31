import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked =
    isLoggedIn && currentUser?._id
      ? item.likes?.some((id) => id === currentUser._id)
      : false;

  const handleLike = (e) => {
    e.stopPropagation();
    if (!onCardLike) return;
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li
      className="item-card"
      onClick={() => onClick(item)}
      style={{ cursor: "pointer" }}
    >
      <h2 className="card__name">{item.name}</h2>

      <img className="card__image" src={item.link} alt={item.name} />

      {isLoggedIn && (
        <button
          type="button"
          className={`card__like-button ${
            isLiked ? "card__like-button_active" : ""
          }`}
          onClick={handleLike}
          aria-label="Like"
        />
      )}
    </li>
  );
}

export default ItemCard;
