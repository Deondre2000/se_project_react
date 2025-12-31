import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { useContext } from "react";
import currentTemperatureUnitContext from "../../contexts/CurrentTemperatureContext";

function Main({ weatherData, handleCardClick, clothingItems, handleCardLike }) {
  const { currentTemperatureUnit } = useContext(currentTemperatureUnitContext);
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is
          {currentTemperatureUnit === "F"
            ? weatherData.temp[currentTemperatureUnit]
            : weatherData.temp.C}
          °{currentTemperatureUnit}
          You may want to wear
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}
export default Main;
