import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";

const LoginModal = ({ isOpened, onAddItem, onClose, errorText, isLoading, onSwitchModal }) => {
  const defaultValues = {
    Email: "",
    Password: "",
  };

  const { values, handleChange, setValues } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values);
  }

  useEffect(() => {
    if (isOpened) {
      setValues(defaultValues);
    }
  }, [isOpened]);

  return (
    <ModalWithForm
      title="New Log In"
      buttonText="Log In"
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
      errorText={errorText}
      isLoading={isLoading}
      secondButtonText="or Sign Up"
      onSecondButtonClick={onSwitchModal}
    >
      {" "}
      <label htmlFor="login-email" className="modal__label">
        Email*{" "}
        <input
          type="email"
          className="modal__input"
          id="login-email"
          name="Email"
          placeholder="Email"
          value={values.Email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password*{" "}
        <input
          type="password"
          className="modal__input"
          id="login-password"
          placeholder="Password"
          name="Password"
          value={values.Password}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
