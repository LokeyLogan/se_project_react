import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked =
    currentUser?._id && item.likes
      ? item.likes.some((id) => id === currentUser._id)
      : false;

  const handleLike = (e) => {
    e.stopPropagation();

    if (!isLoggedIn) return;

    onCardLike({
      id: item._id,
      isLiked,
    });
  };

  const likeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  return (
    <li className="item-card" onClick={() => onClick(item)}>
      <div className="card__info">
        <h2 className="card__name">{item.name}</h2>

        <button
          type="button"
          className={likeButtonClassName}
          onClick={handleLike}
          aria-label="Like item"
        />
      </div>

      <img className="card__image" src={item.link} alt={item.name} />
    </li>
  );
}

export default ItemCard;
