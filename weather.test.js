const Weather = require("./weather");
const WeatherUI = require("./weatherUI");

const displayWeatherDataMock = jest.spyOn(
  WeatherUI.prototype,
  "displayWeatherData"
);

describe("weather class", () => {
  jest.setTimeout(20000);
  const mockClient = {
    fetchWeatherData: jest.fn(),
  };
  const mockIo = {
    createInterface: jest.fn().mockReturnValue({
      setPrompt: jest.fn(),
      prompt: jest.fn(),
      on: jest.fn(),
      close: jest.fn(),
    }),
  };
  const weather = new Weather(mockClient, WeatherUI, mockIo);

  beforeEach(async () => {
    mockClient.fetchWeatherData.mockResolvedValueOnce({
      name: "London",
      main: { temp: 12, feels_like: 10, humidity: 78 },
      weather: [{ main: "clouds" }, { main: "rain" }],
    });
    await weather.load("London");
    jest.spyOn(console, "log");
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
    weather.displayWeather();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(displayWeatherDataMock).toHaveBeenCalledTimes(1);
  });

  it("uses a CLI to ask the user for a city name, then diplays the weather for that city", async () => {
    await weather.run();
    expect(mockIo.createInterface).toHaveBeenCalled();
    // expect(displayWeatherDataMock).toHaveBeenCalledTimes(2);
    // expect(console.log).toHaveBeenCalledTimes(2);
  });
});
