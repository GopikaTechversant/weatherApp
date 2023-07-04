import { Component,OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {faSun} from '@fortawesome/free-solid-svg-icons';
import {faMoon} from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {faCloudRain} from '@fortawesome/free-solid-svg-icons';
import {faCloud} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.css']
})
export class WeatherDetailComponent implements OnInit{
  weatherData:any;
  weatherDataResponse: any;
  weatherDataArray: any[] = [];
  city: string='';
  showForecastTonight = false;
  showForecastTomorrow = false;
  forecasts = ['Today', 'Tonight', 'Tomorrow'];
  currentSlide = 0;
  rainIcon =faCloudRain;
  sunIcon=faSun;
  moonIcon = faMoon;
  searchIcon=faSearch;
  cloudIcon=faCloud;
  constructor(private http:HttpClient,private route:ActivatedRoute){}
 
  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      this.city = params['city'];
    });
    this.getWeatherByCity();
  }
  
  getWeatherByCity(){
      this.http.get(`${environment.apiUrl}/weather?q=${this.city}&7&appid=${environment.apiKey}`).subscribe(
      (results:any) => {
        this.weatherData = results;
       
        console.log("results",results);
        this.weatherDataArray.push(results);
        
        console.log("weatherDataArray",this.weatherDataArray);
        let sunSetTime = new Date(this.weatherData.sys.sunset * 1000);
        this.weatherData.sunset_time = sunSetTime.toLocaleTimeString();
        let currentDate = new Date();
        this.weatherData.isDay = true;
      }
    )
  }
  convertToCelsius(temp: number): number {
    return Math.round(temp - 273.15);
  }
 
}
