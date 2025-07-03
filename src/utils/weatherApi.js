export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 86) {
    return "warm";
  } else {
    return "cold";
  }
};

const isDay = ({ sunrise, sunset }) => {
  const now = Math.floor(Date.now() / 1000); // current time in seconds
  return now >= sunrise && now < sunset;
};

export const filterWeatherData = (data) => {
  return {
    location: data.name,
    temp: Math.round(data.main.temp),
    type: getWeatherType(Math.round(data.main.temp)),
    condition: data.weather[0].main.toLowerCase(),
    isDay: isDay(data.sys),
  };
};
