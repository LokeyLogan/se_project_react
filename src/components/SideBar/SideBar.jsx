import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const SideBar = ({ onEditProfile, onSignOut }) => {
  const currentUser = useContext(CurrentUserContext);

  const firstLetter = currentUser?.name?.[0]?.toUpperCase() || "U";
  const hasAvatar = Boolean(currentUser?.avatar);

  return (
    <aside className="profile__sidebar">
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

      <button
        type="button"
        className="profile__edit-btn"
        onClick={onEditProfile}
      >
        Edit profile
      </button>

      <button
        type="button"
        className="profile__signout-btn"
        onClick={onSignOut}
      >
        Sign out
      </button>
    </aside>
  );
};

export default SideBar;
