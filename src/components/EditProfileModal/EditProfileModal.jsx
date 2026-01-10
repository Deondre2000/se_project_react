import { useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useForm } from "../../hooks/useForm";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function EditProfileModal({ isOpened, onClose, onSubmit }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (isOpened) {
      setValues({
        name: currentUser?.name || "",
        avatar: currentUser?.avatar || "",
      });
    }
  }, [isOpened, currentUser, setValues]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit({ name: values.name, avatar: values.avatar });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save"
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name*{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL*{" "}
        <input
          type="url"
          className="modal__input"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
