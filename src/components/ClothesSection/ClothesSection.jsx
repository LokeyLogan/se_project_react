import React from "react";

const ClothesSection = ({ items = [], onAddClick, onItemClick }) => {
  return (
    <section className="profile__clothes">
      <div className="profile__clothes-header">
        <h2>My Items</h2>
        <button type="button" className="profile__add-btn" onClick={onAddClick}>
          + Add Item
        </button>
      </div>

      <ul className="profile__list">
        {items.map((it) => (
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
            {/* Your data shape uses `link` for the image URL (matches your CSS). */}
            <img src={it.link} alt={it.name} className="profile__card-image" />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ClothesSection;
