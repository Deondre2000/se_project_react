import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import {
  getWeatherCurrent,
  filterWeatherData,
} from "../../utils/weatherApi.js";
import { apiKey } from "../../utils/constants.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureContext.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import { getItems } from "../../utils/api.js";
import { addItemInfo } from "../../utils/api.js";
import { deleteItem } from "../../utils/api.js";
import { addCardLike, removeCardLike } from "../../utils/api.js";
import {
  getUserInfo,
  updateUserInfo,
  signup,
  signin,
} from "../../utils/auth.js";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/" />;
};

function App() {
  const navigate = useNavigate();
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: "", C: "" },
    city: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [authError, setAuthError] = useState("");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleLoginClick = () => {
    setAuthError("");
    setActiveModal("login");
  };

  const handleRegisterClick = () => {
    setAuthError("");
    setActiveModal("register");
  };

  const handleEditProfileClick = () => {
    setAuthError("");
    setActiveModal("edit-profile");
  };

  const onAddItem = (inputValues) => {
    const token = localStorage.getItem("jwt");
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };

    setIsLoading(true);

    addItemInfo(newCardData, token)
      .then((data) => {
        setClothingItems((prevItems) => [data.data, ...prevItems]);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setAuthError("");
  };

  const handleDeleteConformation = () => {
    setActiveModal("Delete");
  };

  const handleDeleteItem = (id) => {
    const token = localStorage.getItem("jwt");
    setIsLoading(true);
    deleteItem(id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to delete item:", error);
        setAuthError("Failed to delete item.");
      })
      .finally(() => setIsLoading(false));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    closeActiveModal();
    navigate("/");
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.error("Cannot toggle like without a token");
      return;
    }

    const likeAction = !isLiked ? addCardLike : removeCardLike;

    likeAction(id, token)
      .then((updatedCard) => {
        const cardData = updatedCard.data || updatedCard;
        setClothingItems((cards) =>
          cards.map((item) => (item._id === cardData._id ? cardData : item))
        );
      })
      .catch((err) => console.error("Failed to toggle like:", err));
  };

  const handleRegister = (formValues) => {
    setAuthError("");
    setIsLoading(true);
    const registrationData = {
      name: formValues.Name,
      avatar: formValues.AvatarUrl,
      email: formValues.Email,
      password: formValues.Password,
    };

    signup(registrationData)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        getUserInfo(res.token)
          .then((user) => {
            setCurrentUser(user);
            return getItems();
          })
          .then((items) => {
            setClothingItems(items);
            setIsLoggedIn(true);
            closeActiveModal();
            navigate("/");
            console.log("Registration successful:", res);
          })
          .catch((err) => {
            console.error("Failed to load user/items after register:", err);
            setIsLoggedIn(true);
            closeActiveModal();
            navigate("/");
          })
          .finally(() => setIsLoading(false));
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        setAuthError("Registration failed. Please check your details.");
        setIsLoading(false);
      });
  };

  const handleLogin = (formValues) => {
    setAuthError("");
    setIsLoading(true);
    const loginData = {
      email: formValues.Email,
      password: formValues.Password,
    };

    signin(loginData)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        getUserInfo(res.token)
          .then((user) => {
            setCurrentUser(user);
            return getItems();
          })
          .then((items) => {
            setClothingItems(items);
            setIsLoggedIn(true);
            closeActiveModal();
            navigate("/");
            console.log("Login successful:", res);
          })
          .catch((err) => {
            console.error("Failed to load user/items after login:", err);
            setIsLoggedIn(true);
            closeActiveModal();
            navigate("/");
          })
          .finally(() => setIsLoading(false));
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setAuthError("Login failed. Incorrect email or password.");
        setIsLoading(false);
      });
  };

  const handleUpdateProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.error("Cannot update profile without a token");
      return;
    }

    setIsLoading(true);
    updateUserInfo({ name, avatar }, token)
      .then((updatedUser) => {
        const userData = updatedUser.data || updatedUser;
        setCurrentUser(userData);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Profile update failed:", error);
        setAuthError("Failed to update profile.");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserInfo(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
          console.log("Token validated, user logged in:", user);
        })
        .catch((error) => {
          console.error("Token validation failed:", error);
          localStorage.removeItem("jwt");
        });
    }

    getWeatherCurrent(apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
        setIsLoadingWeather(false);
      })
      .catch((error) => {
        console.error("Failed to fetch weather data:", error);
        setIsLoadingWeather(false);
      });
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="app">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              onLoginClick={handleLoginClick}
              onRegisterClick={handleRegisterClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleCardLike={handleCardLike}
                    isLoadingWeather={isLoadingWeather}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onAddClick={handleAddClick}
                      handleCardLike={handleCardLike}
                      onSignOut={handleSignOut}
                      onEditProfile={handleEditProfileClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <AddItemModal
            isOpened={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItem={onAddItem}
            isLoading={isLoading}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteConfirm={handleDeleteConformation}
            onDelete={handleDeleteItem}
            isLoading={isLoading}
          />
          <LoginModal
            isOpened={activeModal === "login"}
            onClose={closeActiveModal}
            onAddItem={handleLogin}
            errorText={authError}
            isLoading={isLoading}
            onSwitchModal={handleRegisterClick}
          />
          <RegisterModal
            isOpened={activeModal === "register"}
            onClose={closeActiveModal}
            onAddItem={handleRegister}
            errorText={authError}
            isLoading={isLoading}
            onSwitchModal={handleLoginClick}
          />
          <EditProfileModal
            isOpened={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onSubmit={handleUpdateProfile}
            isLoading={isLoading}
          />
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
