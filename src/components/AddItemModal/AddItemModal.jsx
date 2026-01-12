import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";

const AddItemModal = ({ isOpened, onAddItem, onClose, isLoading }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weatherType: "",
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
      title="New Garment"
      buttonText="Add Garment"
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      {" "}
      <label htmlFor="add-item-name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="add-item-name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="add-item-imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="add-item-imageUrl"
          placeholder="Image URL"
          name="imageUrl"
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the Weather Type:</legend>
        <label htmlFor="add-item-hot" className="modal__label modal__label_type_radio">
          <input
            checked={values.weatherType === "hot"}
            value="hot"
            id="add-item-hot"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            onChange={handleChange}
          />{" "}
          Hot
        </label>
        <label htmlFor="add-item-warm" className="modal__label modal__label_type_radio">
          <input
            checked={values.weatherType === "warm"}
            value="warm"
            id="add-item-warm"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            onChange={handleChange}
          />{" "}
          Warm
        </label>
        <label htmlFor="add-item-cold" className="modal__label modal__label_type_radio">
          <input
            checked={values.weatherType === "cold"}
            value="cold"
            id="add-item-cold"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            onChange={handleChange}
          />{" "}
          Cold
        </label>
      </fieldset>{" "}
    </ModalWithForm>
  );
};

export default AddItemModal;
