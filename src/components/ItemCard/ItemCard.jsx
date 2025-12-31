import "../ItemCard/ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import likeIcon from "../../assets/Like button.png";

export function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isAuthorized = Boolean(currentUser?._id);
  const isLiked = Array.isArray(item.likes)
    ? item.likes.some((id) => id === currentUser?._id)
    : false;
  const likesCount = Array.isArray(item.likes) ? item.likes.length : 0;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLikeClick = () => {
    if (!onCardLike) return;
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      {isAuthorized && (
        <button
          type="button"
          className={`card__like ${isLiked ? "card__like--active" : ""}`}
          onClick={handleLikeClick}
          aria-pressed={isLiked}
          aria-label={isLiked ? "Unlike item" : "Like item"}
        >
          <img
            src={likeIcon}
            alt={isLiked ? "Unlike" : "Like"}
            className="card__like-img"
          />
        </button>
      )}
    </li>
  );
}

export default ItemCard;
