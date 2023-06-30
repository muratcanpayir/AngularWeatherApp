import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  cityName: string = '';
  temperature: number = 0;
  feelsLike: number = 0;
  humidity: number = 0;
  summary: string = '';
  city: string = '';
  iconUrl: string = '';
  searchIcon=faSearch

  constructor(private weatherService: WeatherService) {}
  ngOnInit(): void {
    this.weatherService.getLatLon('London').subscribe({
      next: (response: any) => {
        this.weatherService
          .getWeather(response[0].lat, response[0].lon)
          .subscribe({
            next: (res: any) => {
              this.temperature = res.main.temp.toFixed();
              this.feelsLike = res.main.feels_like.toFixed();
              this.humidity = res.main.humidity.toFixed();
              this.summary = res.weather[0].main;
              this.city = res.name;
              this.iconUrl = `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;
            },
            error: (err) => {
              console.log(err.message);
            },
          });
      },
      error: (err) => {
        alert(
          'We can not find your destination, please change the destination and try again :)'
        );
      },
    });
  }
  showValue(): void {
    this.weatherService.getLatLon(this.cityName).subscribe({
      next: (response: any) => {
        if (response.length > 0) {
          this.weatherService
            .getWeather(response[0].lat, response[0].lon)
            .subscribe({
              next: (res: any) => {
                this.temperature = res.main.temp.toFixed();
                this.feelsLike = res.main.feels_like.toFixed();
                this.humidity = res.main.humidity.toFixed();
                this.summary = res.weather[0].main;
                this.city = res.name;
              },
              error: (err) => {
                console.log(err.message);
              },
            });
        } else {
          alert(
            'We can not find your destination, please change the destination and try again :)'
          );
        }
      },
      error: (err) => {
        alert(
          'We can not find your destination, please change the destination and try again :)'
        );
      },
    });
  }
}
