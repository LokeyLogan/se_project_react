import { useContext, useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfileModal({
  activeModal,
  closeActiveModal,
  onUpdateProfile,
}) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (activeModal === "edit-profile" && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
      setIsSubmitting(false);
    }
  }, [activeModal, currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onUpdateProfile({ name, avatar });
      closeActiveModal();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          className="modal__input"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="https://..."
          disabled={isSubmitting}
        />
      </label>
    </ModalWithForm>
  );
}
