import { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  handleCloseClick,
}) {
  const isOpen = activeModal === "add-garment";

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

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal")) {
      handleCloseClick();
    }
  };

  return isOpen ? (
    <div className="modal modal__opened" onClick={handleOverlayClick}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
          CLOSE
        </button>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  ) : null;
}

export default ModalWithForm;
