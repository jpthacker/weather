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
}

module.exports = Weather;