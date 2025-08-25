import { handle } from "./api";

export const getWeather = ({ latitude, longitude }, APIkey) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`;
  return fetch(url).then(handle);
};

const getWeatherType = (temperatureC) => {
  if (temperatureC >= 30) return "hot";
  if (temperatureC >= 19 && temperatureC < 30) return "warm";
  return "cold";
};

const isDay = ({ sunrise, sunset }) => {
  const now = Math.floor(Date.now() / 1000);
  return now >= sunrise && now < sunset;
};

export const filterWeatherData = (data) => {
  const tempF = Math.round(data.main.temp);
  const tempC = Math.round(((tempF - 32) * 5) / 9);
  return {
    location: data.name,
    tempF,
    tempC,
    type: getWeatherType(tempC),
    condition: data.weather[0].main.toLowerCase(),
    isDay: isDay(data.sys),
  };
};
