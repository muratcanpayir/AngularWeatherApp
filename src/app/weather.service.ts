import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const API_KEY = '782b96701f7d4edf587af30a7a494d2c';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  getLatLon(city: string) {
    return this.httpClient.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`
    );
  }

  getWeather(lat: any, lon: any) {
    return this.httpClient.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
  }
}
