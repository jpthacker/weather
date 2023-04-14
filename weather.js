const WeatherUI = require("./weatherUI");
const WeatherClient = require("./weatherClient");
const readline = require("readline");

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

  run() {
    let rl = readline.createInterface(process.stdin, process.stdout);
    rl.setPrompt(`Enter a city: `);
    rl.prompt();
    rl.on("line", async (city) => {
      await this.load(city);
      this.displayWeather();
      rl.close();
    });
  }
}

const weatherClient = new WeatherClient();
const weather = new Weather(weatherClient, WeatherUI);
weather.run();

module.exports = Weather;
