const Weather = require("./weather");

describe("weather class", () => {
  // beforeEach(() => {
  //   fetch.resetMocks();
  // });
  it("", async () => {
    const mockClient = {
      fetchWeatherData: jest.fn(),
    };
    mockClient.fetchWeatherData.mockResolvedValueOnce({ name: "London" });
    const weather = new Weather(mockClient);
    await weather.load("London");
    expect(weather.getWeatherData()).toEqual(
      expect.objectContaining({
        name: "London",
      })
    );
  });
  it("compares the weather in two cities and returns the warmest one", async () => {
    const mockClient = {
      fetchWeatherData: jest.fn(),
    };
    mockClient.fetchWeatherData.mockResolvedValueOnce({
      name: "London",
      main: { temp: 12 },
    });
    const weather = new Weather(mockClient);
    await weather.load("London");
    mockClient.fetchWeatherData.mockResolvedValueOnce({
      name: "Sheffield",
      main: { temp: 15 },
    });
    expect(await weather.compareWith("Sheffield")).toBe(
      "The temperature in London is 12; the temperature in Sheffield is 15: Sheffield is warmer."
    );
  });
});
