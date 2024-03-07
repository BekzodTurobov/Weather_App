import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { IoIosSearch } from "react-icons/io";
import { icons, bgImages, regions } from "../data";
import { nanoid } from "nanoid";
import "../sass/main.scss";

const MainPage = () => {
  const [weatherDetails, setWeatherDetails] = useState({});
  const [currentCity, setCurrentCity] = useState("");
  const [timezone, setTimezone] = useState(new Date());
  const enteredCity = useRef();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude } = position.coords;
      const { longitude } = position.coords;

      const fetchCountry = async function (city) {
        const byCoords = `lat=${latitude}&lon=${longitude}`;
        const byCity = `q=${city}`;
        const param = city ? byCity : byCoords;

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?${param}&appid=aa47bc4dd6faa742921b4d33fa26596d&units=metric&lang=en`
        );
        const data = await response.json();
        const obj = {
          city: data.name,
          temp: Math.round(data.main.temp),
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          wind: data.wind.speed,
          weather: data.weather[0].main,
          timezone: data.timezone,
        };

        setWeatherDetails(obj);
        setIsLoading(false);
      };

      fetchCountry(currentCity);
    });
  }, [currentCity]);

  useEffect(() => {
    const calcTime = function (offset) {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const curDate = new Date(utc + 1000 * offset);

      setTimezone(curDate);
    };

    weatherDetails.timezone && calcTime(weatherDetails.timezone);
  }, [weatherDetails]);

  // useEffect(() => {
  //   const fetchTime = async function (lat, lon) {
  //     if (lat & lon) {
  //       let response = await fetch(
  //         `http://api.timezonedb.com/v2.1/get-time-zone?key=0O4JWHTQOWX7&format=json&by=position&lat=${lat}&lng=${lon}`
  //       );
  //       const data = await response.json();
  //       setTimezone(data.formatted);
  //     }
  //   };
  //   fetchTime(weatherDetails.lat, weatherDetails.lon);
  // }, []);

  function submitHandler(e) {
    e.preventDefault();

    setCurrentCity(enteredCity.current.value);
    enteredCity.current.value = "";
  }

  function selectRegion(region) {
    setCurrentCity(region);
  }

  let bgImage;
  let date = timezone;

  const dayTime = format(date, "HH");
  const dateTime = format(date, "HH:mm - EEEE MMM d");

  if (dayTime >= 6 && dayTime < 18) {
    bgImage = bgImages.day[weatherDetails.weather];
  } else {
    bgImage = bgImages.night[weatherDetails.weather];
  }

  if (isLoading) {
    return <p className="loader"></p>;
  }

  return (
    <div className="weather-app" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="container">
        <h3>The weather</h3>
        <div>
          <h1>{weatherDetails.temp}°C</h1>
          <div className="city-time">
            <h1>{weatherDetails.city}</h1>
            <small>
              <span>{dateTime}</span>
            </small>
          </div>
          <div className="weather">
            <img
              src={icons[weatherDetails.weather]}
              alt="icon"
              width={75}
              height={75}
            />
            <span>{weatherDetails.weather}</span>
          </div>
        </div>
      </div>
      <div className="panel">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            ref={enteredCity}
            placeholder="enter the city..."
          />
          <button type="submit">
            <IoIosSearch />
          </button>
        </form>
        <ul className="regions">
          {regions.map((region) => (
            <li
              key={nanoid()}
              onClick={() => selectRegion(region)}
              className="city"
            >
              {region}
            </li>
          ))}
        </ul>
        <ul className="weather-details">
          <h4>Weather details</h4>
          <li>
            <span>Pressure</span>
            <span>{weatherDetails.pressure} Pa</span>
          </li>
          <li>
            <span>Humidity</span>
            <span>{weatherDetails.humidity}%</span>
          </li>
          <li>
            <span>Wind</span>
            <span>{weatherDetails.wind}km/h</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MainPage;
