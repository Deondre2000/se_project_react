import { handleServerResponse } from "./api";

export const getWeather = async (coords = null, APIkey) => {
  let latitude;
  let longitude;

  if (coords && coords.latitude != null && coords.longitude != null) {
    ({ latitude, longitude } = coords);
  } else {
    const pos = await getCurrentPosition();
    latitude = pos.latitude;
    longitude = pos.longitude;
  }
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  );
  return handleServerResponse(res);
};

const getCurrentPosition = () =>
  new Promise((resolve, reject) => {
    if (!navigator?.geolocation) {
      reject(new Error("Geolocation not supported by this browser."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      (err) => reject(err),
      { enableHighAccuracy: false, timeout: 10000 }
    );
  });

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  result.type = getWeatherType(result.temp.F);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());
  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};

export const getWeatherCurrent = (APIkey) => {
  return getWeather(null, APIkey);
};
