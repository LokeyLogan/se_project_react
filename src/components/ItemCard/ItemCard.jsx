import "./ItemCard.css";
import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const backendIsLiked =
    isLoggedIn && currentUser?._id && Array.isArray(item.likes)
      ? item.likes.some((id) => id === currentUser._id)
      : false;

  const [isLiked, setIsLiked] = useState(backendIsLiked);

  useEffect(() => {
    setIsLiked(backendIsLiked);
  }, [backendIsLiked]);

  const handleLike = (e) => {
    e.stopPropagation();

    if (!isLoggedIn) return;

    setIsLiked((prev) => !prev);

    onCardLike({
      id: item._id,
      isLiked: backendIsLiked,
    });
  };

  return (
    <li className="item-card" onClick={() => onClick(item)}>
      <div className="card__info">
        <h2 className="card__name">{item.name}</h2>

        {/* ✅ ONLY show heart when logged in */}
        {isLoggedIn && (
          <button
            type="button"
            className={`card__like-button ${
              isLiked ? "card__like-button_active" : ""
            }`}
            onClick={handleLike}
            aria-label="Like item"
          />
        )}
      </div>

      <img className="card__image" src={item.link} alt={item.name} />
    </li>
  );
}

export default ItemCard;
