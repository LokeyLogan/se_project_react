import "./ClothesSection.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ItemCard from "../ItemCard/ItemCard";

const ClothesSection = ({
  items = [],
  onAddClick,
  onItemClick,
  onCardLike,
  isLoggedIn,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const myItems =
    currentUser?._id && Array.isArray(items)
      ? items.filter((item) => item.owner === currentUser._id)
      : [];

  return (
    <section className="profile__clothes">
      <div className="profile__clothes-header">
        <h2>Your items</h2>
        <button type="button" className="profile__add-btn" onClick={onAddClick}>
          + Add Item
        </button>
      </div>

      {/* Reuse ItemCard so Profile matches Home */}
      <ul className="cards__list">
        {myItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onClick={onItemClick}
            onCardLike={onCardLike}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </ul>
    </section>
  );
};

export default ClothesSection;
