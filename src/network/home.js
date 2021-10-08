export class HomeWeather {
  constructor(dt, name, sys, weather) {
    this.timestamp = dt
    this.name = name;
    this.country = sys.country;
    this.weather = weather[0].description;
  }
}