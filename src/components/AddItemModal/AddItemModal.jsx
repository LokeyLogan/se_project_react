import { useState, useEffect } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function AddItemModal({
  activeModal,
  closeActiveModal,
  onAddItemModalSubmit,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clear the form when the modal closes (or on first open if needed)
  useEffect(() => {
    if (!activeModal) {
      setName("");
      setImageUrl("");
      setWeather("");
      setIsSubmitting(false);
    }
  }, [activeModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onAddItemModalSubmit({ name, imageUrl, weather });
      // Modal close will trigger useEffect to reset the form
      if (closeActiveModal) closeActiveModal();
    } catch (err) {
      console.error(err);
      // Keep user input on error so they can adjust and resubmit
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText={isSubmitting ? "Adding..." : "Add garment"}
      activeModal={activeModal}
      modalName="add-garment"
      handleCloseClick={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isSubmitting}
        />
      </label>

      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          required
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          disabled={isSubmitting}
        />
      </label>

      <fieldset className="modal__radio-buttons" disabled={isSubmitting}>
        <legend className="modal__legend">Select the weather type:</legend>

        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            name="weather"
            type="radio"
            value="hot"
            className="modal__radio-input"
            checked={weather === "hot"}
            onChange={(e) => setWeather(e.target.value)}
            required
          />
          Hot
        </label>

        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            name="weather"
            type="radio"
            value="warm"
            className="modal__radio-input"
            checked={weather === "warm"}
            onChange={(e) => setWeather(e.target.value)}
          />
          Warm
        </label>

        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            name="weather"
            type="radio"
            value="cold"
            className="modal__radio-input"
            checked={weather === "cold"}
            onChange={(e) => setWeather(e.target.value)}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
