class Weather {
  constructor(client) {
    this.client = client
    this.data = null;
  }
  async load(city) {
    const result = await this.client.fetchWeatherData(city);
    this.data = result;
  }
  getWeatherData() {
    return this.data;
  }
  async compareWith(city) {
    const givenCity = await this.client.fetchWeatherData(city);
    const highest = this.data.main.temp > givenCity.main.temp ? this.data : givenCity;
    const resultStr = `The temperature in ${this.data.name} is ${this.data.main.temp}; the temperature in ${givenCity.name} is ${givenCity.main.temp}: ${highest.name} is warmer.`
    return resultStr;
  }
  displayWeather() {
    console.log(`
City:         ${this.data.name}
Weather:      ${this.data.weather.map((weather) => {return weather.main}).join(', ')}
Temperature:  ${this.data.main.temp}
Feels like:   ${this.data.main.feels_like}
Humidity:     ${this.data.main.humidity}%
    `);
  }
}

module.exports = Weather;
