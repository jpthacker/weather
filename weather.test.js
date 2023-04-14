const Weather = require("./weather");
const WeatherUI = require("./weatherUI");

const displayWeatherDataMock = jest.spyOn(
  WeatherUI.prototype,
  "displayWeatherData"
);

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
  });

  it("returns the weather data for the loaded city", () => {
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
    jest.spyOn(console, "log");
    weather.displayWeather();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(displayWeatherDataMock).toHaveBeenCalled();
  });

  xit("uses a CLI to ask the user a city name, then diplays the weather for that city", async () => {
    jest.spyOn(console, "log");
    await weather.run();
    expect(console.log).toHaveBeenCalledWith('Enter your city: ');
    // expect(console.log).toHaveBeenCalledWith('The weather in ${age} is: ');
  });
});