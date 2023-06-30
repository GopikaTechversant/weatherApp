import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class WeatherDataService {
  weatherDataArray: any[] = [];

  constructor(private http: HttpClient) { }

  getWeatherByCity() {
    const cities = ['london', 'kerala', 'goa', 'dubai', 'berlin', 'rome', 'paris', 'tokyo'];
    for (const city of cities) {
      this.http.get(`${environment.apiUrl}/weather?q=${city}&appid=${environment.apiKey}`).subscribe(
        (results: any) => {
          let weatherData = results;
          let sunSetTime = new Date(weatherData.sys.sunset * 1000);
          weatherData.sunset_time = sunSetTime.toLocaleTimeString();
          let currentDate = new Date();
          weatherData.isDay = currentDate.getTime() < sunSetTime.getTime();

          this.weatherDataArray.push(weatherData);
        }
      );
    }
  }
  
}

