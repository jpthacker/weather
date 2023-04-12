// const WeatherClient = require("./weatherClient");
const Weather = require("./weather");

describe("weather class", () => {
  it("", async () => {
    // const client = new WeatherClient();
    const mockClient = {
      fetchWeatherData: jest.fn(),
    };
    mockClient.fetchWeatherData.mockResolvedValueOnce({"name": "London"});
    const weather = new Weather(mockClient);
    await weather.load("London");
    expect(weather.getWeatherData()).toEqual(
      expect.objectContaining({
        name: "London",
      })
    );
  });
});
