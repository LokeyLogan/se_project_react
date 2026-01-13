import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

export default function Profile({
  items = [],
  onAddClick,
  onItemClick,
  onEditProfileClick,
  onSignOut,
  onCardLike,
  isLoggedIn,
}) {
  return (
    <div className="profile">
      <SideBar onEditProfile={onEditProfileClick} onSignOut={onSignOut} />
      <ClothesSection
        items={items}
        onAddClick={onAddClick}
        onItemClick={onItemClick}
        onCardLike={onCardLike}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}
