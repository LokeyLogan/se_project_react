// src/components/App/App.jsx
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
} from "../../utils/constants";
import { useEffect, useState } from "react";
import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems, addItem, deleteItem } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    tempF: 75,
    tempC: 24,
    type: "warm",
    location: "Tampa",
  });

  // Start empty; fill from server. If server fails, we'll fall back to defaults.
  const [clothingItems, setClothingItems] = useState([]);
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

  // Add item -> POST to server, then prepend to state
  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    addItem({ name, imageUrl, weather })
      .then((created) => setClothingItems((prev) => [created, ...prev]))
      .then(closeActiveModal)
      .catch((err) => {
        console.error(err);
        // Fallback (optional): add locally if server fails
        const fallback = {
          _id: Date.now().toString(),
          name,
          link: imageUrl,
          weather,
        };
        setClothingItems((prev) => [fallback, ...prev]);
        closeActiveModal();
      });
  };

  // Delete item -> DELETE from server, then remove from state
  const handleDeleteCard = (item) => {
    const id = item._id ?? item.id;
    deleteItem(id)
      .then(() =>
        setClothingItems((prev) =>
          prev.filter((it) => (it._id ?? it.id) !== id)
        )
      )
      .then(closeActiveModal)
      .catch((err) => {
        console.error(err);
        // Even if server fails, still close modal; you can choose to keep the card.
        closeActiveModal();
      });
  };

  // Close modal on Escape
  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => e.key === "Escape" && closeActiveModal();
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

  // Fetch weather once on mount
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((res) => setWeatherData(filterWeatherData(res)))
      .catch(console.error);
  }, []);

  // Fetch items from json-server on mount
  useEffect(() => {
    getItems()
      .then((items) => setClothingItems(items))
      .catch((err) => {
        console.error(err);
        // Fallback to local defaults if server not running
        setClothingItems(defaultClothingItems);
      });
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
              <Route
                path="/profile"
                element={
                  <Profile
                    items={clothingItems}
                    onAddClick={handleAddClick}
                    onItemClick={handleItemModalClick}
                  />
                }
              />
            </Routes>

            <Footer />
          </div>

          {activeModal === "add-garment" && (
            <AddItemModal
              activeModal={activeModal}
              closeActiveModal={closeActiveModal}
              onAddItemModalSubmit={handleAddItemModalSubmit}
            />
          )}

          {activeModal === "preview" && itemModalCard && (
            <ItemModal
              activeModal={activeModal}
              card={itemModalCard}
              handleCloseClick={closeActiveModal}
              onDelete={handleDeleteCard}
            />
          )}
        </div>
      </BrowserRouter>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
