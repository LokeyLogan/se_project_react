import { useEffect } from "react";
import "./ModalWithForm.css";
import closeIcon from "../../assets/Dark_Close-btn.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  modalName,
  handleCloseClick,
  onSubmit,
}) {
  const isOpen = activeModal === modalName;

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
    <div className="modal modal_opened" onClick={handleOverlayClick}>
      <div className="modal__content modal__content_type_form">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
          <img
            src={closeIcon}
            alt="Close modal"
            className="modal__close-icon"
          />
        </button>
        <form
          onSubmit={onSubmit}
          className="modal__form modal__form_type_layout"
        >
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
