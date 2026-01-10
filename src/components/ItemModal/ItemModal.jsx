import "./ItemModal.css";
import close from "../../assets/close.png";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function ItemModal({ activeModal, onClose, card, onDelete, onDeleteConfirm  }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card?.owner === currentUser?._id;
  return (
    <div
      className={`modal ${
        activeModal === "preview" || activeModal === "Delete"
          ? "modal__opened"
          : ""
      }`}
    >
      {activeModal === "preview" && (
        <div className="modal__content modal__content_type_image">
          <button onClick={onClose} type="button" className="modal__close">
            <img src={close} alt="Close" />
          </button>
          <img src={card.imageUrl} alt={card.name} className="modal__image" />
          <div className="modal__footer">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
            {isOwn && (
              <button
                onClick={() => onDeleteConfirm(card._id)}
                type="button"
                className="modal__delete"
              >
                delete item
              </button>
            )}
          </div>
        </div>
      )}
      {activeModal === "Delete" && (
        <div className="modal__delete-preview">
          <p className="modal__delete-text">
            Are you sure you want to delete this item? This action is
            irreversible.
          </p>
          <button
            className="modal__delete-btn"
            onClick={() => onDelete(card._id)}
            type="button"
          >
            Yes, delete item
          </button>
          <button
            className="modal__cancel-btn"
            onClick={() => onClose()}
            type="button"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
export default ItemModal;
