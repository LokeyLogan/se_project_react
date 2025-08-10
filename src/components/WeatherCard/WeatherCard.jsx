import "./WeatherCard.css";
import sunny from "../../assets/sunny.svg";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";

function WeatherCard({ tempF, tempC, weatherType }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const displayedTemp =
    currentTemperatureUnit === "F" ? `${tempF}°F` : `${tempC}°C`;

  return (
    <section className="weather__card">
      <p className="weather__card-temp">{displayedTemp}</p>
      <img src={sunny} alt={weatherType} className="weather__card-image" />
    </section>
  );
}

export default WeatherCard;
