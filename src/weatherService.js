const axios = require("axios");
const API_KEY  = '383d75b87ed7abe5dcbb8943b4d49fef'


const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const searchCity = async (ciudad, units = "metric") => {
  const url = (`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=${units}`);
  const response = await axios.get(url)
  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = response.data;

  const { description, icon } = weather[0];
  return {
    name,
    country,
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    speed,
    description,
    icon: makeIconURL(icon),

  };

}

module.exports = { searchCity }