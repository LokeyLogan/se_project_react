import { useContext } from "react";
import "./ToggleSwitch.css";
import currentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";

export default function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    currentTemperatureUnitContext
  );
  return (
    <label className="toggle-switch">
      <input
        onChange={handleToggleSwitchChange}
        type="checkbox"
        className="toggle-switch_checkbox"
      />
      <span className="toggle-switch_circle"></span>
      <span
        className={`toggle-switch_text toggle-switch_text_F ${
          currentTemperatureUnit === "F" ? `toggle-switch_text_color_white` : ""
        }`}
      >
        F
      </span>
      <span
        className={`toggle-switch_text toggle-switch_text_C ${
          currentTemperatureUnit === "C" ? `toggle-switch_text_color_white` : ""
        }`}
      >
        C
      </span>
    </label>
  );
}
