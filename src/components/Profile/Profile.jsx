import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../Sidebar/Sidebar";
import "./Profile.css";

export default function Profile({ clothingItems, onCardClick, onAddClick, handleCardLike, onSignOut, onEditProfile }) {
  return (
    <section className="profile">
      <SideBar onSignOut={onSignOut} onEditProfile={onEditProfile} />
      <ClothesSection
        onCardClick={onCardClick}
        clothingItems={clothingItems}
        onAddClick={onAddClick}
        handleCardLike={handleCardLike}
      />
    </section>
  );
}
