import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants";
import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherData, onCardClick }) {
  return (
    <main>
      <WeatherCard temp={weatherData.temp} weatherType={weatherData.type} />
      <section className="Cards">
        <p className="cards__text">
          Today is {weatherData.temp}°F / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => item.weather === weatherData.type)
            .map((item) => (
              <ItemCard key={item._id} item={item} onClick={onCardClick} />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
