import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

// Mock weather data — in a future step, you'll use useEffect to fetch this from an API
function App() {
  const [weatherData, setWeatherData] = useState({
    temp: 75,
    type: "hot",
    location: "Tampa",
  });

  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (item) => {
    setSelectedCard(item);
    setIsModalOpen(true);
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header weatherData={weatherData} />
        <Main weatherData={weatherData} onCardClick={handleCardClick} />
        {/* Render modal if a card is clicked */}
        {isModalOpen && selectedCard && (
          <div className="modal">
            <h2>{selectedCard.name}</h2>
            <img src={selectedCard.link} alt={selectedCard.name} />
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        )}
        <Footer />
      </div>
      <ModalWithForm />
    </div>
  );
}

export default App;
