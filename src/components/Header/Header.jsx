import "./Header.css";
import logo from "../../assets/logo.svg";
import avatarDefault from "../../assets/avatar.svg";
import ToggleSwitch from "../ItemCard/ToggleSwitch/ToggleSwitch";
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function Header({ handleAddClick, weatherData, isLoggedIn, onLoginClick, onRegisterClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const currentUser = useContext(CurrentUserContext);
  const username = currentUser?.name || "Guest";
  const avatar = currentUser?.avatar || avatarDefault;
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isProfilePage = location.pathname === "/profile";

  return (
    <header className="header">
      <NavLink className="header__nav-link" to="/">
        <img to="/" className="header__logo" src={logo} alt="WTWR" />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch />
      {isProfilePage && isLoggedIn && (
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
      )}
      {isHomePage && !isLoggedIn ? (
        <div className="header__auth-buttons">
          <button
            onClick={onRegisterClick}
            type="button"
            className="header__register-btn"
          >
            Sign Up
          </button>
          <button
            onClick={onLoginClick}
            type="button"
            className="header__login-btn"
          >
            Log In
          </button>
        </div>
      ) : (
        <NavLink className="header__nav-link" to="/profile">
          <div className="header__user-container">
            <p className="header__user-name">{username}</p>
            <img src={avatar} alt="Terrence Tegegen" className="header__avatar" />
          </div>
        </NavLink>
      )}
    </header>
  );
}

export default Header;
