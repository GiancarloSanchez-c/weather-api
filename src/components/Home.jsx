import { useEffect, useState } from "react";
import "../assets/css/Home.css";
import hotBg from "../assets/hot.jpg";
import coldBg from "../assets/cold.jpg";
import { searchCity } from "../weatherService";
import Card from "./Card";

const Home = () => {
  const [city, setCity] = useState("Lima");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg);

  useEffect(() => {
    const getWeatherData = async () => {
      const data = await searchCity(city, units);
      setWeather(data);

      const thresHold = units === "metric" ? 16 : 60;
      if (data.temp <= thresHold) {
        setBg(coldBg);
      } else {
        setBg(hotBg);
      }
    };
    getWeatherData();
  }, [city, units]);

  const handleUnitsClick = (e) => {
    e.preventDefault();
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="home" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__input">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name={city}
                placeholder="Enter City"
              />
              <button onClick={(e) => handleUnitsClick(e)}>Search</button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.icon} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }  `}</h1>
              </div>
            </div>
            <Card weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
