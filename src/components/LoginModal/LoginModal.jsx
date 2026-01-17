import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

export default function LoginModal({
  closeActiveModal,
  onLogin,
  onSwitchToRegister,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setEmail("");
    setPassword("");
    setIsSubmitting(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    Promise.resolve(onLogin({ email, password }))
      .catch(console.error)
      .finally(() => setIsSubmitting(false));
  };

  return (
    <ModalWithForm
      title="Log in"
      buttonText={isSubmitting ? "Logging in..." : "Log in"}
      handleCloseClick={closeActiveModal}
      onSubmit={handleSubmit}
    >
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

      {/* REQUIRED second button */}
      <button
        type="button"
        className="modal__switch"
        onClick={onSwitchToRegister}
        disabled={isSubmitting}
      >
        or Sign up
      </button>
    </ModalWithForm>
  );
}
