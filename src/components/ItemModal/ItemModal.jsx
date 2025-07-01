import { useEffect } from "react";
import "./ItemModal.css";

function ItemModal({ activeModal, handleCloseClick, card }) {
  const isOpen = activeModal === "preview";

  // ESC key close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        handleCloseClick();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, handleCloseClick]);

  // Overlay click close
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal")) {
      handleCloseClick();
    }
  };

  return isOpen ? (
    <div className="modal modal__opened" onClick={handleOverlayClick}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
          CLOSE
        </button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  ) : null;
}

export default ItemModal;
