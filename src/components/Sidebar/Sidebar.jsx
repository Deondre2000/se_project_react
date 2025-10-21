import "../Sidebar/sidebar.css";
import avatarDefault from "../../assets/avatar.svg";

export default function SideBar() {
  const username = "Terrence Tegegne";
  const avatar = avatarDefault;

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <p className="sidebar__user-name">{username}</p>
        <img
          src={avatarDefault}
          alt="Terrence Tegegen"
          className="sidebar__avatar"
        />
      </div>
    </aside>
  );
}
