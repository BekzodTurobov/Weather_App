import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { IoIosSearch } from "react-icons/io";
import { images } from "../data";
import { regions } from "../data";
import { nanoid } from "nanoid";
import "../sass/main.scss";

const MainPage = () => {
  const [currentCity, setCurrentCity] = useState("");
  const [enteredCity, setEnteredCity] = useState("");
  const [timezone, setTimezone] = useState("");
  const [weatherDetails, setWeatherDetails] = useState({});

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
          name: data.name,
          temp: Math.round(data.main.temp),
          feels: data.main.feels,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          wind: data.wind.speed,
          weather: data.weather[0].main,
          lat: data.coord.lat,
          lon: data.coord.lon,
        };

        setWeatherDetails(obj);
      };
      fetchCountry(currentCity);
    });
  }, [currentCity]);

  useEffect(() => {
    const fetchTime = async function (lat, lon) {
      if (lat & lon) {
        let response = await fetch(
          `http://api.timezonedb.com/v2.1/get-time-zone?key=0O4JWHTQOWX7&format=json&by=position&lat=${lat}&lng=${lon}`
        );
        const data = await response.json();

        setTimezone(data.formatted);
      }
    };
    fetchTime(weatherDetails.lat, weatherDetails.lon);
    // console.log(timezone);
  }, [weatherDetails]);

  function getEnteredCity(e) {
    setEnteredCity(e.target.value);
  }

  function submitHandler(e) {
    e.preventDefault();

    setCurrentCity(enteredCity);
    setEnteredCity("");
  }

  function selectRegion(region) {
    setCurrentCity(region);
  }

  let date = timezone ? timezone : new Date();
  const dayTime = format(date, "HH:mm");
  const dateTime = format(date, "HH:mm - EEEE MMM d");

  let time;
  let imgIcon;
  let bgImage;

  if (dayTime >= "6:00" && dayTime < "18:00") {
    time = "day";
  } else if (dayTime < "6:00" && dayTime >= "18:00 PM") {
    time = "night";
  }

  if (weatherDetails.weather === "Clear") {
    bgImage = time === "day" ? images[8] : images[15];
    imgIcon = images[0];
  } else if (weatherDetails.weather === "Clouds") {
    bgImage = time === "day" ? images[9] : images[16];
    imgIcon = images[1];
  } else if (weatherDetails.weather === "Drizzle") {
    bgImage = time === "day" ? images[10] : images[17];
    imgIcon = images[2];
  } else if (weatherDetails.weather === "Humidity") {
    bgImage = time === "day" ? images[11] : images[18];
    imgIcon = images[3];
  } else if (weatherDetails.weather === "Mist") {
    bgImage = time === "day" ? images[11] : images[18];
    imgIcon = images[4];
  } else if (weatherDetails.weather === "Rain") {
    bgImage = time === "day" ? images[13] : images[20];
    imgIcon = images[5];
  } else if (weatherDetails.weather === "Snow") {
    bgImage = time === "day" ? images[13] : images[20];
    imgIcon = images[6];
  } else if (weatherDetails.weather === "Wind") {
    bgImage = time === "day" ? images[14] : images[21];
    imgIcon = images[7];
  } else if (weatherDetails.weather === "Smoke") {
    bgImage = time === "day" ? images[22] : images[23];
    imgIcon = images[24];
  }

  return (
    <div className="weather-app" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="container">
        <h3>The weather</h3>
        <div>
          <h1>{weatherDetails.temp}°C</h1>
          <div className="city-time">
            <h1>{weatherDetails.name}</h1>
            <small>
              <span>{dateTime}</span>
            </small>
          </div>
          <div className="weather">
            <img src={imgIcon} alt="icon" width={50} height={50} />
            <span>{weatherDetails.weather}</span>
          </div>
        </div>
      </div>
      <div className="panel">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            onChange={getEnteredCity}
            value={enteredCity}
            placeholder="enter the city..."
          />
          <button type="submit">
            <IoIosSearch />
          </button>
        </form>
        <ul>
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
        <ul>
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
