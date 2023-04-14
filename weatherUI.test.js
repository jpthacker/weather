const WeatherUI = require("./weatherUI");

describe("WeatherUI class", () => {
  jest.setTimeout(20000);
  const mockCityData = {
    name: "London",
    main: { temp: 12, feels_like: 10, humidity: 78 },
    weather: [{ main: "clouds" }, { main: "rain" }],
  };
  const weatherUI = new WeatherUI(mockCityData);
  it("provides user-friendly breakdown of the weather for a city object in the terminal", () => {
    expect(weatherUI.displayWeatherData()).toBe(
      `
City:         London
Weather:      clouds, rain
Temperature:  12
Feels like:   10
Humidity:     78%
`
    );
  });
});
