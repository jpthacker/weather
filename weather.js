class Weather {
  constructor(client) {
    this.client = client
    this.data = null;
  }
  async load(city) {
    const result = await this.client.fetchWeatherData(city);
    const resultObj = await result.json();
    this.data = resultObj;
  }
  getWeatherData() {
    return this.data;
  }
}

module.exports = Weather;