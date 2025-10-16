import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../Sidebar/Sidebar";
import "./Profile.css";

export default function Profile({ clothingItems, onCardClick }) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection onCardClick={onCardClick} clothingItems={clothingItems} />
    </section>
  );
}
