import React from "react";
import avatar from "../../assets/avatar.svg";

const SideBar = () => {
  return (
    <aside className="profile__sidebar">
      <img className="profile__avatar" src={avatar} alt="User avatar" />
      <p className="profile__username">Terrence Tegegne</p>
    </aside>
  );
};

export default SideBar;
