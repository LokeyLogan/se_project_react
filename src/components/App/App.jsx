import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants"; // <-- add defaultClothingItems here
import { useEffect, useState } from "react";
import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    tempF: 75,
    tempC: 24,
    type: "warm",
    location: "Tampa",
  });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems); // now defined
  const [activeModal, setActiveModal] = useState("");
  const [itemModalCard, setItemModalCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const handleAddClick = () => setActiveModal("add-garment");

  const handleItemModalClick = (card) => {
    setItemModalCard(card);
    setActiveModal("preview");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setItemModalCard(null);
  };

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => e.key === "Escape" && closeActiveModal();
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((res) => setWeatherData(filterWeatherData(res)))
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <BrowserRouter>
        <div className="page">
          <div className="page__content">
            <Header weatherData={weatherData} handleAddClick={handleAddClick} />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onItemClick={handleItemModalClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route path="/profile" element={<Profile items={[]} />} />
            </Routes>

            <Footer />
          </div>

          {activeModal === "add-garment" && (
            <AddItemModal
              activeModal={activeModal}
              closeActiveModal={closeActiveModal}
            />
          )}

          {activeModal === "preview" && itemModalCard && (
            <ItemModal
              activeModal={activeModal}
              card={itemModalCard}
              handleCloseClick={closeActiveModal}
            />
          )}
        </div>
      </BrowserRouter>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
