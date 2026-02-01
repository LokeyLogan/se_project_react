import "./RegisterModal.css";
import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function RegisterModal({
  closeActiveModal,
  onRegister,
  onSwitchToLogin,
}) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setName("");
    setAvatar("");
    setEmail("");
    setPassword("");
    setIsSubmitting(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    Promise.resolve(onRegister({ name, avatar, email, password }))
      .catch(console.error)
      .finally(() => setIsSubmitting(false));
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText={isSubmitting ? "Signing up..." : "Sign up"}
      handleCloseClick={closeActiveModal}
      onSubmit={handleSubmit}
      contentClassName="modal_type_register"
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength="2"
          maxLength="30"
          required
          disabled={isSubmitting}
        />
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          className="modal__input"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </label>

      <label className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </label>

      <button
        type="button"
        className="modal__switch"
        onClick={onSwitchToLogin}
        disabled={isSubmitting}
      >
        or Log in
      </button>
    </ModalWithForm>
  );
}
