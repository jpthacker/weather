const WeatherUI = require("./weatherUI");
const WeatherClient = require("./weatherClient");
const readline = require("readline");

class Weather {
  constructor(client, weatherUI, io) {
    this.client = client;
    this.weatherUI = weatherUI;
    this.io = io;
    this.data = null;
  }

  async load(city) {
    this.data = await this.client.fetchWeatherData(city);
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

  async run() {
    let rl = this.io.createInterface(process.stdin, process.stdout);
    rl.setPrompt(`Enter a city: `);
    rl.prompt();
    await rl.on("line", async (input) => {
      await this.load(input);
      this.displayWeather();
      rl.close();
    });
    return 'Hello';
  }
}

const weatherClient = new WeatherClient();
const weather = new Weather(weatherClient, WeatherUI, readline);
weather.run();

module.exports = Weather;
