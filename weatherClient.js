const apiKey = require("./apiKey");

class WeatherClient {
  fetchWeatherData(city) {
    const key = apiKey;
    const results = fetch(
      `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${key}`
    )
    .then(response => {return response.json()})
    return results;
  }
}

module.exports = WeatherClient;
