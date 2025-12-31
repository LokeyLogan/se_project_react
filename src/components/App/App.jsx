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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

import {
  getItems,
  addItem,
  deleteItem,
  updateProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api";

import { register, authorize, checkToken } from "../../utils/auth";

function App() {
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

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const openRegister = () => setActiveModal("register");
  const openLogin = () => setActiveModal("login");
  const openEditProfile = () => setActiveModal("edit-profile");

  const handleAddClick = () => setActiveModal("add-garment");

  const handleItemModalClick = (card) => {
    setItemModalCard(card);
    setActiveModal("preview");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setItemModalCard(null);
  };

  // ESC close
  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => e.key === "Escape" && closeActiveModal();
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

  // Weather
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((res) => setWeatherData(filterWeatherData(res)))
      .catch(console.error);
  }, []);

  // Items (always load on page load, even logged out)
  useEffect(() => {
    getItems()
      .then((items) => setClothingItems(items))
      .catch((err) => {
        console.error(err);
        setClothingItems(defaultClothingItems);
      });
  }, []);

  // Token check on mount
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
        setCurrentUser(null);
      });
  }, []);

  // Register -> then login -> store token -> set user
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
      });
  };

  // Login
  const handleLogin = ({ email, password }) => {
    return authorize({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      });
  };

  // Sign out
  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    closeActiveModal();
  };

  // Add item (token required)
  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    return addItem({ name, imageUrl, weather }, token)
      .then((created) => setClothingItems((prev) => [created, ...prev]))
      .then(closeActiveModal)
      .catch((err) => console.error(err));
  };

  // Delete item (token required)
  const handleDeleteCard = (item) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    const id = item._id ?? item.id;
    deleteItem(id, token)
      .then(() =>
        setClothingItems((prev) =>
          prev.filter((it) => (it._id ?? it.id) !== id)
        )
      )
      .then(closeActiveModal)
      .catch((err) => {
        console.error(err);
        closeActiveModal();
      });
  };

  // Edit profile (token required)
  const handleUpdateProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    return updateProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
      })
      .catch((err) => console.error(err));
  };

  // Likes
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <BrowserRouter>
          <div className="page">
            <div className="page__content">
              <Header
                weatherData={weatherData}
                handleAddClick={handleAddClick}
                isLoggedIn={isLoggedIn}
                onLoginClick={openLogin}
                onRegisterClick={openRegister}
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
                        onEditProfile={openEditProfile}
                        onSignOut={handleSignOut}
                      />
                    </ProtectedRoute>
                  }
                />
              </Routes>

              <Footer />
            </div>

            <RegisterModal
              activeModal={activeModal}
              closeActiveModal={closeActiveModal}
              onRegister={handleRegister}
            />

            <LoginModal
              activeModal={activeModal}
              closeActiveModal={closeActiveModal}
              onLogin={handleLogin}
            />

            <EditProfileModal
              activeModal={activeModal}
              closeActiveModal={closeActiveModal}
              onUpdateProfile={handleUpdateProfile}
            />

            <AddItemModal
              activeModal={activeModal}
              closeActiveModal={closeActiveModal}
              onAddItemModalSubmit={handleAddItemModalSubmit}
            />

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
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
