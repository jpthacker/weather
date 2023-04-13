const Weather = require("./weather");
const WeatherUI = require("./weatherUI");

const displayWeatherDataMock = jest
  .spyOn(WeatherUI.prototype, "displayWeatherData")
  .mockImplementation(() => {});

describe("weather class", () => {
  const mockClient = {
    fetchWeatherData: jest.fn(),
  };
  const weather = new Weather(mockClient, WeatherUI);
  beforeEach(async () => {
    mockClient.fetchWeatherData.mockResolvedValueOnce({
      name: "London",
      main: { temp: 12, feels_like: 10, humidity: 78 },
      weather: [{ main: "clouds" }, { main: "rain" }],
    });
    await weather.load("London");
    jest.spyOn(console, "log");
  });
  it("", async () => {
    expect(weather.getWeatherData()).toEqual(
      expect.objectContaining({
        name: "London",
      })
    );
  });
  it("compares the weather in two cities and returns the warmest one", async () => {
    mockClient.fetchWeatherData.mockResolvedValueOnce({
      name: "Sheffield",
      main: { temp: 15 },
    });
    expect(await weather.compareWith("Sheffield")).toBe(
      "The temperature in London is 12; the temperature in Sheffield is 15: Sheffield is warmer."
    );
  });
  it("provides user-friendly breakdown of the weather in the terminal", () => {
    weather.displayWeather();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(displayWeatherDataMock).toHaveBeenCalled();
  });
});
