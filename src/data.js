import Clear from "./assets/icon/clear.png";
import Clouds from "./assets/icon/clouds.png";
import Drizzle from "./assets/icon/drizzle.png";
import Humidity from "./assets/icon/humidity.png";
import Mist from "./assets/icon/mist.png";
import Rain from "./assets/icon/rain.png";
import Snow from "./assets/icon/snow.png";
import Wind from "./assets/icon/wind.png";
import Smoke from "./assets/icon/smoke.png";

import DayClear from "./assets/background/Webp/day-clear.webp";
import DayClouds from "./assets/background/Webp/day-cloudy.webp";
import DayRain from "./assets/background/Webp/day-rain.webp";
import DayDrizzle from "./assets/background/Webp/day-drizzle.webp";
import DaySnow from "./assets/background/Webp/day-snow.webp";
import DayHumidity from "./assets/background/Webp/day-humidity.webp";
import DayWind from "./assets/background/Webp/day-wind.webp";
import DaySmoke from "./assets/background/Webp/day-smoke.webp";

import NightClear from "./assets/background/Webp/night-clear.webp";
import NightClouds from "./assets/background/Webp/night-cloudy.webp";
import NightDrizzle from "./assets/background/Webp/night-drizzle.webp";
import NightRain from "./assets/background/Webp/night-rain.webp";
import NightSnow from "./assets/background/Webp/night-snow.webp";
import NightHumidity from "./assets/background/Webp/night-humidity.webp";
import NightWind from "./assets/background/Webp/night-wind.webp";
import NightSmoke from "./assets/background/Webp/night-smoke.webp";

export const icons = {
  Clear,
  Clouds,
  Drizzle,
  Humidity,
  Mist,
  Rain,
  Snow,
  Wind,
  Smoke,
};

export const bgImages = {
  day: {
    Clear: DayClear,
    Clouds: DayClouds,
    Drizzle: DayDrizzle,
    Humidity: DayHumidity,
    Rain: DayRain,
    Mist: DaySmoke,
    Snow: DaySnow,
    Wind: DayWind,
    Smoke: DaySmoke,
    Haze: DaySmoke,
  },
  night: {
    Clear: NightClear,
    Clouds: NightClouds,
    Drizzle: NightDrizzle,
    Humidity: NightHumidity,
    Rain: NightRain,
    Mist: NightSmoke,
    Snow: NightSnow,
    Wind: NightWind,
    Smoke: NightSmoke,
    Haze: NightSmoke,
  },
};

export const regions = [
  "Andijan",
  "Bukhara",
  "Jizzakh",
  "Navoi",
  "Namangan",
  "Qashqadaryo",
  "Samarkand",
  "Sirdaryo",
  "Termez",
  "Tashkent",
  "Fergana",
  "Khiva",
];
