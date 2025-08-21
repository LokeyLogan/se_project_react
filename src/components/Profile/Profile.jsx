import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

export default function Profile({ items = [], onAddClick, onItemClick }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        items={items}
        onAddClick={onAddClick}
        onItemClick={onItemClick}
      />
    </div>
  );
}
