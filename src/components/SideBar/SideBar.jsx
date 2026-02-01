import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const SideBar = ({ onEditProfile, onSignOut }) => {
  const currentUser = useContext(CurrentUserContext);

  const firstLetter = currentUser?.name?.[0]?.toUpperCase() || "U";
  const hasAvatar = Boolean(currentUser?.avatar);

  return (
    <aside className="profile__sidebar">
      {/* Top row */}
      <div className="profile__sidebar-header">
        {hasAvatar ? (
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="User avatar"
          />
        ) : (
          <div className="profile__avatar profile__avatar-placeholder">
            {firstLetter}
          </div>
        )}

        <p className="profile__username">{currentUser?.name || "User"}</p>
      </div>

      {/* Buttons */}
      <div className="profile__actions">
        <button
          type="button"
          className="profile__edit-btn"
          onClick={onEditProfile}
        >
          Change profile data
        </button>

        <button
          type="button"
          className="profile__signout-btn"
          onClick={onSignOut}
        >
          Log out
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
