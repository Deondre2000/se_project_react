import "../Sidebar/Sidebar.css";
import avatarDefault from "../../assets/avatar.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

export default function SideBar({ onSignOut, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const username = currentUser?.name || "Guest";
  const avatar = currentUser?.avatar || avatarDefault;

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <p className="sidebar__user-name">{username}</p>
        <img src={avatar} alt="Terrence Tegegen" className="sidebar__avatar" />
      </div>
      <button type="button" className="sidebar__edit" onClick={onEditProfile}>
        Change profile data
      </button>
      <button type="button" className="sidebar__signout" onClick={onSignOut}>
        Sign out
      </button>
    </aside>
  );
}
