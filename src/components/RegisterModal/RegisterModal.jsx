import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";

const RegisterModal = ({ isOpened, onAddItem, onClose, errorText }) => {
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
      title="New Registration"
      buttonText="Register"
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
      errorText={errorText}
    >
      <label htmlFor="Email" className="modal__label">
        Email*{" "}
        <input
          type="email"
          className="modal__input"
          id="Email"
          name="Email"
          placeholder="Email"
          value={values.Email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="Password" className="modal__label">
        Password*{" "}
        <input
          type="password"
          className="modal__input"
          id="Password"
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
          type="Name"
          className="modal__input"
          id="Name"
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
          id="AvatarUrl"
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
