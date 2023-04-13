class Weather {
  constructor(client, weatherUI) {
    this.client = client;
    this.weatherUI = weatherUI;
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
    const highest =
      this.data.main.temp > givenCity.main.temp ? this.data : givenCity;
    const resultStr = `The temperature in ${this.data.name} is ${this.data.main.temp}; the temperature in ${givenCity.name} is ${givenCity.main.temp}: ${highest.name} is warmer.`;
    return resultStr;
  }
  displayWeather() {
    const weatherUI = new this.weatherUI(this.data);
    console.log(weatherUI.displayWeatherData());
  }
}

module.exports = Weather;
