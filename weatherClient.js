const apiKey = require("./apiKey");

class WeatherClient {
  fetchWeatherData(city) {
    return fetch(
      `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`
    );
  }
}

module.exports = WeatherClient;
