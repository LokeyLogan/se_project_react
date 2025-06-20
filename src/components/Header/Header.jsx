import "./Header.css";
import logo from "../../assets/logo.svg";
import avater from "../../assets/avatar.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} />
      <p className="header__date-location">DATE, LOCATION</p>
      <button className="header__add-clothes-btn">+ Add Clothes</button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avater} alt="Terrence" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
