const axios = require("axios");
const { API_KEY } = require('./api')
//Creas una cuenta en OPEN WEATHER MAP - 'https://openweathermap.org/api/'
// Si ya tienes una cuenta - ingresas a la cuenta y obtienes un API KEY
// y reemplazas la API_KEY por la que tienes.

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