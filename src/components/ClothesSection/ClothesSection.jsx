import React, { useContext } from "react";
import "./ClothesSection.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ClothesSection = ({ items = [], onAddClick, onItemClick }) => {
  const currentUser = useContext(CurrentUserContext);

  const myItems = currentUser?._id
    ? items.filter((it) => it.owner === currentUser._id)
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
        {myItems.map((it) => (
          <li
            key={it._id}
            className="profile__card"
            onClick={() => onItemClick && onItemClick(it)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && onItemClick) {
                onItemClick(it);
              }
            }}
            style={{ cursor: "pointer" }}
          >
            <p className="profile__card-name">{it.name}</p>
            <img src={it.link} alt={it.name} className="profile__card-image" />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ClothesSection;
