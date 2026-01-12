import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";

const RegisterModal = ({
  isOpened,
  onAddItem,
  onClose,
  errorText,
  isLoading,
  onSwitchModal,
}) => {
  const defaultValues = {
    Email: "",
    Password: "",
    ConfirmPassword: "",
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
      title="Sign Up"
      buttonText="Sign Up"
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
      errorText={errorText}
      isLoading={isLoading}
      secondButtonText="or Log In"
      onSecondButtonClick={onSwitchModal}
    >
      <label htmlFor="register-email" className="modal__label">
        Email*{" "}
        <input
          type="email"
          className="modal__input"
          id="register-email"
          name="Email"
          placeholder="Email"
          value={values.Email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password*{" "}
        <input
          type="password"
          className="modal__input"
          id="register-password"
          placeholder="Password"
          name="Password"
          value={values.Password}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="Name" className="modal__label">
        Name*{" "}
        <input
          type="text"
          className="modal__input"
          id="register-name"
          placeholder="Name"
          name="Name"
          value={values.Name}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="AvatarUrl" className="modal__label">
        Avatar Url*{" "}
        <input
          type="text"
          className="modal__input"
          id="register-avatar-url"
          placeholder="Avatar Url"
          name="AvatarUrl"
          value={values.AvatarUrl}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
