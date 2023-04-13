const WeatherUI = require("./weatherUI");

describe("WeatherUI class", () => {
  it("provides user-friendly breakdown of the weather for a city object in the terminal", () => {
    // jest.spyOn(console, "log");
    const mockCityData = {
      name: "London",
      main: { temp: 12, feels_like: 10, humidity: 78 },
      weather: [{ main: "clouds" }, { main: "rain" }],
    };
    const weatherUI = new WeatherUI(mockCityData);
    expect(weatherUI.displayWeather()).toBe(
      `
City:         London
Weather:      clouds, rain
Temperature:  12
Feels like:   10
Humidity:     78%
    `
    );
//     expect(console.log).toHaveBeenCalledWith(`
// City:         London
// Weather:      clouds, rain
// Temperature:  12
// Feels like:   10
// Humidity:     78%
//     `);
  });
});
