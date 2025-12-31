import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

export default function Profile({
  items = [],
  onAddClick,
  onItemClick,
  onEditProfile,
  onSignOut,
}) {
  return (
    <div className="profile">
      <SideBar onEditProfile={onEditProfile} onSignOut={onSignOut} />
      <ClothesSection
        items={items}
        onAddClick={onAddClick}
        onItemClick={onItemClick}
      />
    </div>
  );
}
