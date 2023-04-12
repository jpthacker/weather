const WeatherClient = require("./weatherClient");
const Weather = require("./weather");

describe("weather class", () => {
  it("", async () => {
    const client = new WeatherClient();
    const weather = new Weather(client);
    await weather.load("London");
    expect(weather.getWeatherData()).toEqual(
      expect.objectContaining({
        name: "London",
      })
    );
  });
});
