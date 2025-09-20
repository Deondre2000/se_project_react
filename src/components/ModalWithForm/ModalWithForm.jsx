import "./ModalWithForm.css";
import close from "../../assets/close.png";

function ModalWithForm({ children, buttonText, title, isOpened, onClose }) {
  return (
    <div className={`modal ${isOpened ? "modal__opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="Close" />
        </button>
        <form action="" className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
