import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, apiKey } from "../../utils/constants";
import currentTemperatureUnitContext from "../../contexts/CurrentTemperatureContext";
import { BrowserRouter } from "react-router-dom";
import { getItems } from "../../../api.js";
import { addItemInfo } from "../../../api.js";
import { deleteItem } from "../../../api.js";

function App() {
  const [clothingItems, setClothingItems] = useState([]);

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [weatherDataLoading, setWeatherDataLoading] = useState("Loading");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };
  ``;

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const onAddItem = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };
    addItemInfo(newCardData)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
      })
      .catch(console.error);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };


  const handleDeleteItem = (id) => {
    deleteItem(id)
    .then(() => {
      setClothingItems((prevItems) =>
        prevItems.filter((items) => items._id !== id)
    );
        closeActiveModal();
      })
      .catch((error) => console.error("Failed to delete item:", error));
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error("Failed to fetch weather data:", error);
      });
    getItems()
      .then((data) => {
        setClothingItems(data, clothingItems);
      })
      .catch(console.error);
  }, []);

  return (
    <BrowserRouter>
      <currentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app">
          <div className="page__content">
            <Header handleAddClick={handleAddClick} weatherData={weatherData} />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
            </Routes>
          </div>
          <AddItemModal
            isOpened={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItem={onAddItem}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDelete={handleDeleteItem}
          
          />

          <Footer />
        </div>
      </currentTemperatureUnitContext.Provider>
    </BrowserRouter>
  );
}

export default App;
