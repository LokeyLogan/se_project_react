import "./ToggleSwitch.css";

export default function ToggleSwitch() {
  return (
    <label className="toggle-switch">
      <input type="checkbox" className="toggle-switch_checkbox" />
      <span className="toggle-switch_circle"></span>
      <span className="toggle-switch_text toggle-switch_text_F">F</span>
      <span className="toggle-switch_text toggle-switch_text_C">C</span>
    </label>
  );
}
