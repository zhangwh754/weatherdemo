export class HomeWeather {
  constructor(dt, name, sys, main, weather) {
    this.timestamp = dt
    this.name = name;
    this.country = sys.country;
    this.temp = main.temp
    this.weather = weather[0].description;
  }
}