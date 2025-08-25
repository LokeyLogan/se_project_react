import { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

export default function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch_checkbox"
        onChange={handleToggleSwitchChange}
        checked={currentTemperatureUnit === "C"}
        role="switch"
        aria-label="Toggle temperature unit"
      />
      <span className="toggle-switch_circle" />
      <span
        className={`toggle-switch_text toggle-switch_text_F ${
          currentTemperatureUnit === "F" ? "toggle-switch_text_color_white" : ""
        }`}
      >
        F
      </span>
      <span
        className={`toggle-switch_text toggle-switch_text_C ${
          currentTemperatureUnit === "C" ? "toggle-switch_text_color_white" : ""
        }`}
      >
        C
      </span>
    </label>
  );
}
