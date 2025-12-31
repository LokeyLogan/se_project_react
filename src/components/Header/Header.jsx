import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  onLoginClick,
  onRegisterClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const firstLetter = currentUser?.name?.[0]?.toUpperCase() || "U";
  const hasAvatar = Boolean(currentUser?.avatar);

  return (
    <header className="header">
      <Link to="/" className="header__logo-link">
        <img className="header__logo" src={logo} alt="Logo" />
      </Link>

      <p className="header__date-location">
        {currentDate}, {weatherData.location}
      </p>

      <div className="header__actions">
        <ToggleSwitch />

        {isLoggedIn && (
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add Clothes
          </button>
        )}

        {!isLoggedIn && (
          <>
            <button
              type="button"
              className="header__add-clothes-btn"
              onClick={onRegisterClick}
            >
              Sign up
            </button>
            <button
              type="button"
              className="header__add-clothes-btn"
              onClick={onLoginClick}
            >
              Log in
            </button>
          </>
        )}
      </div>

      {isLoggedIn && (
        <Link to="/profile" className="header__user-container">
          <p className="header__username">{currentUser?.name || "User"}</p>

          {hasAvatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser?.name || "User"}
              className="header__avatar"
            />
          ) : (
            <div
              className="header__avatar"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                fontWeight: 700,
              }}
              aria-label="User avatar placeholder"
            >
              {firstLetter}
            </div>
          )}
        </Link>
      )}
    </header>
  );
}

export default Header;
