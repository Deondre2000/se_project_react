import "./ModalWithForm.css";
import close from "../../assets/close.png";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpened,
  onClose,
  onSubmit,
  errorText,
}) {
  return (
    <div className={`modal ${isOpened ? "modal__opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="Close" />
        </button>
        <form onSubmit={onSubmit} action="" className="modal__form">
          {children}
          {errorText && <p className="modal__error">{errorText}</p>}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
