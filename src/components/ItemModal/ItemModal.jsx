import "./ItemModal.css";
import close from "../../assets/close.png";
import whtclose from "../../assets/white-close.png";

function ItemModal({ activeModal, onClose, card, onDelete }) {
  return (
    <div
      className={`modal ${activeModal === "preview" ? "modal__opened" : ""}`}
    >
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="Close" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button
            onClick={() => onDelete(card._id)}
            type="button"
            className="modal__delete"
          >
            delete item
          </button>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
