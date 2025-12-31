import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

export default function ClothesSection({
  clothingItems,
  onCardClick,
  onAddClick,
  handleCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  const userId = currentUser?._id;
  const userItems = clothingItems.filter((item) => item.owner === userId);

  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes__text">Your Items</p>
        <button onClick={onAddClick} className="clothes-add__button">
          + Add new
        </button>
      </div>
      <ul className="Clothes-section__list">
        {userItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={handleCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}
