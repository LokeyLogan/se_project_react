import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { useEffect, useState } from "react";
import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";

function App() {
  const [weatherData, setWeatherData] = useState({
    tempF: 75,
    tempC: 24,
    type: "warm",
    location: "Tampa",
  });
  const [activeModal, setActiveModal] = useState("");
  const [itemModalCard, setItemModalCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleItemModalClick = (card) => {
    setItemModalCard(card);
    setActiveModal("preview");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setItemModalCard(null);
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
                  />
                }
              />
              <Route path="/profile" element={<Profile items={[]} />} />
            </Routes>

            <Footer />
          </div>

          {activeModal === "add-garment" && (
            <ModalWithForm
              title="New garment"
              buttonText="Add garment"
              activeModal={activeModal}
              handleCloseClick={closeActiveModal}
            >
              <label htmlFor="name" className="modal__label">
                Name
                <input
                  type="text"
                  className="modal__input"
                  id="name"
                  name="name"
                  placeholder="Name"
                  required
                />
              </label>

              <label htmlFor="imageUrl" className="modal__label">
                Image
                <input
                  type="url"
                  className="modal__input"
                  id="imageUrl"
                  name="imageUrl"
                  placeholder="Image URL"
                  required
                />
              </label>

              <fieldset className="modal__radio-buttons">
                <legend className="modal__legend">
                  Select the weather type:
                </legend>

                <label
                  htmlFor="hot"
                  className="modal__label modal__label_type_radio"
                >
                  <input
                    id="hot"
                    name="weather"
                    type="radio"
                    value="hot"
                    className="modal__radio-input"
                  />
                  Hot
                </label>

                <label
                  htmlFor="warm"
                  className="modal__label modal__label_type_radio"
                >
                  <input
                    id="warm"
                    name="weather"
                    type="radio"
                    value="warm"
                    className="modal__radio-input"
                  />
                  Warm
                </label>

                <label
                  htmlFor="cold"
                  className="modal__label modal__label_type_radio"
                >
                  <input
                    id="cold"
                    name="weather"
                    type="radio"
                    value="cold"
                    className="modal__radio-input"
                  />
                  Cold
                </label>
              </fieldset>
            </ModalWithForm>
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
