const apiKey = require("./apiKey");

class WeatherClient {
  async fetchWeatherData(city) {
    const key = apiKey;
    const results = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${key}`
    );
    return results;
  }
}

module.exports = WeatherClient;
