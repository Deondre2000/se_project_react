import "./Header.css";
import logo from "../../assets/logo.svg";
import avatarDefault from "../../assets/avatar.svg";
import ToggleSwitch from "../ItemCard/ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const username = "Terrence Tegegne";
  const avatar = avatarDefault;

  return (
    <header className="header">
      <NavLink className="header__nav-link" to="/home">
        <img className="header__logo" src={logo} alt="WTWR" />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add Clothes
      </button>
      <NavLink className="header__nav-link" to="/profile">
        <div className="header__user-container">
          <p className="header__user-name">{username}</p>
          <img src={avatar} alt="Terrence Tegegen" className="header__avatar" />
        </div>
      </NavLink>
    </header>
  );
}

export default Header;
