// ItemModal.jsx  (replace your current file with this)
import "./ItemModal.css";
import closeIcon from "../../assets/Dark_Close-btn.svg";

export default function ItemModal({
  activeModal,
  card,
  handleCloseClick,
  onDelete,
}) {
  const isOpen = activeModal === "preview";
  if (!isOpen || !card) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal")) handleCloseClick();
  };

  return (
    <div className="modal modal_opened" onClick={handleOverlayClick}>
      <div className="modal__content">
        <button
          type="button"
          className="modal__close"
          onClick={handleCloseClick}
        >
          <img
            src={closeIcon}
            alt="Close modal"
            className="modal__close-icon"
          />
        </button>

        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__caption">
          <h2 className="modal__title">{card.name}</h2>
          <p className="modal__subtitle">Weather: {card.weather}</p>
        </div>

        {/* REQUIRED: delete button (immediate removal) */}
        <button
          type="button"
          className="modal__delete"
          onClick={() => onDelete(card)}
        >
          Delete Item
        </button>
      </div>
    </div>
  );
}
