class weatherUI {
  constructor(city) {
    this.city = city;
  }

  displayWeather() {
    return (`
City:         ${this.city.name}
Weather:      ${this.city.weather
      .map((weather) => {
        return weather.main;
      })
      .join(", ")}
Temperature:  ${this.city.main.temp}
Feels like:   ${this.city.main.feels_like}
Humidity:     ${this.city.main.humidity}%
    `);
  }
}

module.exports = weatherUI;
