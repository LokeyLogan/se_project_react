import sunny from "../../assets/sunny.svg";
import "./WeatherCard.css";

function WeatherCard({ temp, weatherType }) {
  return (
    <section className="weather__card">
      <p className="weather__card-temp">{temp}°F</p>
      <img src={sunny} alt={weatherType} className="weather__card-image" />
    </section>
  );
}

export default WeatherCard;
