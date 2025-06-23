import sunny from "../../assets/sunny.svg";
import "./WeatherCard.css";

function WeatherCard() {
  return (
    <section className="weather__card">
      <p className="weather__card-temp">75 &deg; F</p>
      <img src={sunny} alt="sunny" className="weather__card-image" />
    </section>
  );
}

export default WeatherCard;
