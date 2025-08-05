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
  if (temperature >= 30) {
    return "hot";
  } else if (temperature >= 19 && temperature < 30) {
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
