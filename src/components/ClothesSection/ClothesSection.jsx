import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({ clothingItems, onCardClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes__text">Your Items</p>
        <button className="clothes-add__button">+ Add new</button>
      </div>
      <ul className="Clothes-section__list">
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item.id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}
