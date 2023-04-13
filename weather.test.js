const Weather = require("./weather");

describe("weather class", () => {
  const mockClient = {
    fetchWeatherData: jest.fn(),
  };
  const weather = new Weather(mockClient);
  beforeEach(async () => {
    mockClient.fetchWeatherData.mockResolvedValueOnce({
      name: "London",
      main: { temp: 12 },
    });
    await weather.load("London");
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
  it("provides user-friendly breakdown of the weather in the terminal", () => {});
});
