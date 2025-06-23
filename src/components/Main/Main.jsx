import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants";
import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherData }) {
  return (
    <main>
      <WeatherCard />
      <section className="Cards">
        <p className="cards__text">Today is 75° F / You may want to wear:</p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => item.weather === weatherData.type)
            .map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
