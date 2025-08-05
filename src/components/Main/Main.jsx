import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants";
import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import currentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";

function Main({ weatherData, onItemClick }) {
  const { currentTemperatureUnit } = useContext(currentTemperatureUnitContext);

  return (
    <main>
      <WeatherCard
        tempF={weatherData.tempF}
        tempC={weatherData.tempC}
        weatherType={weatherData.type}
      />
      <section className="Cards">
        <p className="cards__text">
          Today is{" "}
          {currentTemperatureUnit === "F"
            ? `${weatherData.tempF}°F`
            : `${weatherData.tempC}°C`}{" "}
          / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => item.weather === weatherData.type)
            .map((item) => (
              <ItemCard key={item._id} item={item} onClick={onItemClick} />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
