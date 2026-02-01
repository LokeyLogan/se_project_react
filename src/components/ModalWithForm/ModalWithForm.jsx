import { useEffect } from "react";
import "./ModalWithForm.css";
import closeIcon from "../../assets/Dark_Close-btn.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  handleCloseClick,
  onSubmit,
  contentClassName = "",
}) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleCloseClick();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [handleCloseClick]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal")) handleCloseClick();
  };

  return (
    <div className="modal modal_opened" onClick={handleOverlayClick}>
      <div
        className={`modal__content modal__content_type_form ${contentClassName}`}
      >
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
  );
}

export default ModalWithForm;
