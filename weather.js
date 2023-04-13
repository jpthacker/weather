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
}

module.exports = Weather;
