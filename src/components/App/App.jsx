// App.jsx

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
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {
  getItems,
  addItem,
  deleteItem,
  updateProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { register, authorize, checkToken } from "../../utils/auth";

function AppContent() {
  const navigate = useNavigate();

  const [weatherData, setWeatherData] = useState({
    tempF: 75,
    tempC: 24,
    type: "warm",
    location: "Tampa",
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [itemModalCard, setItemModalCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const handleAddClick = () => setActiveModal("add-garment");
  const handleRegisterClick = () => setActiveModal("register");
  const handleLoginClick = () => setActiveModal("login");
  const handleEditProfileClick = () => setActiveModal("edit-profile");

  const handleItemModalClick = (card) => {
    setItemModalCard(card);
    setActiveModal("preview");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setItemModalCard(null);
  };

  // Register -> then login -> store token -> set user -> redirect "/"
  const handleRegister = ({ name, avatar, email, password }) => {
    return register({ name, avatar, email, password })
      .then(() => authorize({ email, password }))
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
        navigate("/");
      });
  };

  // Login -> store token -> set user -> redirect "/"
  const handleLogin = ({ email, password }) => {
    return authorize({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
        navigate("/");
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate("/");
  };

  // Edit profile (token required)
  const handleEditProfileSubmit = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    if (!token) return Promise.reject("No token");

    return updateProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  };

  // Add item (token required)
  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    if (!token) return Promise.reject("No token");

    return addItem({ name, imageUrl, weather }, token)
      .then((created) => setClothingItems((prev) => [created, ...prev]))
      .then(closeActiveModal)
      .catch((err) => {
        console.error(err);
        throw err;
      });
  };

  // Delete item (token required)
  const handleDeleteCard = (item) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    const id = item._id ?? item.id;

    deleteItem(id, token)
      .then(() =>
        setClothingItems((prev) =>
          prev.filter(
            (clothingItem) => (clothingItem._id ?? clothingItem.id) !== id,
          ),
        ),
      )
      .then(closeActiveModal)
      .catch((err) => {
        console.error(err);
      });
  };

  // Like / unlike (token required)
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    const request = !isLiked
      ? addCardLike(id, token)
      : removeCardLike(id, token);

    request
      .then((updatedCard) => {
        setClothingItems((prevItems) =>
          prevItems.map((item) => (item._id === id ? updatedCard : item)),
        );
      })
      .catch((err) => console.log(err));
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

  // Fetch items on mount (allowed for unauthorized)
  useEffect(() => {
    getItems()
      .then((items) => setClothingItems(items))
      .catch((err) => {
        console.error(err);
        setClothingItems(defaultClothingItems);
      });
  }, []);

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setCurrentUser({});
      });
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
            <Header
              weatherData={weatherData}
              handleAddClick={handleAddClick}
              onRegisterClick={handleRegisterClick}
              onLoginClick={handleLoginClick}
              isLoggedIn={isLoggedIn}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onItemClick={handleItemModalClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      items={clothingItems}
                      onAddClick={handleAddClick}
                      onItemClick={handleItemModalClick}
                      onEditProfileClick={handleEditProfileClick}
                      onSignOut={handleSignOut}
                      onCardLike={handleCardLike}
                      isLoggedIn={isLoggedIn}
                    />
                  </ProtectedRoute>
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

          {activeModal === "edit-profile" && (
            <EditProfileModal
              activeModal={activeModal}
              closeActiveModal={closeActiveModal}
              onSubmit={handleEditProfileSubmit}
            />
          )}

          {activeModal === "register" && (
            <RegisterModal
              activeModal={activeModal}
              closeActiveModal={closeActiveModal}
              onRegister={handleRegister}
              onSwitchToLogin={() => setActiveModal("login")}
            />
          )}

          {activeModal === "login" && (
            <LoginModal
              activeModal={activeModal}
              closeActiveModal={closeActiveModal}
              onLogin={handleLogin}
              onSwitchToRegister={() => setActiveModal("register")}
            />
          )}

          {activeModal === "preview" && itemModalCard && (
            <ItemModal
              activeModal={activeModal}
              card={itemModalCard}
              handleCloseClick={closeActiveModal}
              onDelete={handleDeleteCard}
              onCardLike={handleCardLike}
              isLoggedIn={isLoggedIn}
            />
          )}
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
