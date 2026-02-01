import { useContext, useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";

export default function EditProfileModal({
  activeModal,
  closeActiveModal,
  onSubmit, // ✅ matches App.jsx: onSubmit={handleEditProfileSubmit}
}) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (activeModal === "edit-profile") {
      setName(currentUser?.name || "");
      setAvatar(currentUser?.avatar || "");
      setIsSubmitting(false);
    }
  }, [activeModal, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    Promise.resolve(onSubmit({ name, avatar }))
      .catch(console.error)
      .finally(() => setIsSubmitting(false));
  };

  return (
    <ModalWithForm
      title="Edit profile"
      buttonText={isSubmitting ? "Saving..." : "Save"}
      activeModal={activeModal}
      modalName="edit-profile"
      handleCloseClick={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength="2"
          maxLength="30"
          disabled={isSubmitting}
        />
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          className="modal__input"
          name="avatar"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="https://..."
          disabled={isSubmitting}
        />
      </label>
    </ModalWithForm>
  );
}
