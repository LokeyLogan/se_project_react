import { useContext } from "react";
import "./ClothesSection.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ClothesSection = ({ items = [], onAddClick, onItemClick }) => {
  const currentUser = useContext(CurrentUserContext);

  const myItems = currentUser?._id
    ? items.filter((item) => item.owner === currentUser._id)
    : [];

  return (
    <section className="profile__clothes">
      <div className="profile__clothes-header">
        <h2>My Items</h2>
        <button type="button" className="profile__add-btn" onClick={onAddClick}>
          + Add Item
        </button>
      </div>

      <ul className="profile__list">
        {myItems.map((item) => (
          <li
            key={item._id}
            className="profile__card"
            onClick={() => onItemClick(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onItemClick(item);
              }
            }}
          >
            <p className="profile__card-name">{item.name}</p>
            <img
              src={item.link}
              alt={item.name}
              className="profile__card-image"
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ClothesSection;
