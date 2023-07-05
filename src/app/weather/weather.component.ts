import { Component, OnInit,Output, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';
import {faSun} from '@fortawesome/free-solid-svg-icons';
import {faMoon} from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {faCloudRain} from '@fortawesome/free-solid-svg-icons';
import {faCloud} from '@fortawesome/free-solid-svg-icons';
// import {faSunDust} from '@fortawesome/free-solid-svg-icons';
import { WeatherDataService } from '../services/weather-data.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})

export class WeatherComponent implements OnInit{
  containerWidth: any;
  searchWidth:any;
  searchedCity: string = '';
  weatherData:any;
  weatherDataResponse: any;
  weatherDataArray: any[] = [];
  constructor(private router:Router,private http:HttpClient,private weatherService:WeatherDataService){
    
  }
  // <i class="fal fa-sun-dust"></i>
  rainIcon =faCloudRain;
  sunIcon=faSun;
  moonIcon = faMoon;
  searchIcon=faSearch;
  cloudIcon=faCloud;
  
  ngOnInit(): void {
    console.log(screen.width);
    this.updateContainerWidth();
    this.getWeatherByCity();
         
  }
 
  private updateContainerWidth(): void {
    const screenWidth = screen.width;
  
    console.log(this.containerWidth);

  if(screenWidth >= 1200){
    const cardWidth = Math.floor(screenWidth / 5);
    this.containerWidth = cardWidth - 10; 
  }else if(screenWidth <1200 && screenWidth > 768 ){
    const cardWidth = Math.floor(screenWidth / 4);
    this.containerWidth = cardWidth - 10; 
    this.searchWidth = Math.floor(screenWidth / 4);
  }
 
  
  }
  weatherDetail(city:string):void{
    this.router.navigate(['detail'],{ queryParams: { city } });
  }
  getWeatherByCity(){
    const cities =['london','nagercoil','kolkata','kottayam','berlin','rome','paris','tokyo'];
    for (const city of cities){
    this.http.get(`${environment.apiUrl}/weather?q=${city}&appid=${environment.apiKey}`).subscribe(
      (results:any) => {
        this.weatherData = results;
       
        // console.log("results",results);
        this.weatherDataArray.push(results);
       
        console.log("weatherDataArray",this.weatherDataArray);
        let sunSetTime = new Date(this.weatherData.sys.sunset * 1000);
        this.weatherData.sunset_time = sunSetTime.toLocaleTimeString();
        let currentDate = new Date();
        this.weatherData.isDay = true;
      }
    )
  }
  }
  convertToCelsius(temp: number): number {
    return Math.round(temp - 273.15);
  }
  searchWeatherByCity(city: string) {
    this.http.get(`${environment.apiUrl}/weather?q=${city}&appid=${environment.apiKey}`).subscribe(
      (results: any) => {
        this.weatherData = results;
        this.weatherDataArray.push(results);
       
      }
    );
  }
  
  searchWeather() {
    if (this.searchedCity.trim() !== '') {
      this.weatherDataArray = []; 
      this.searchWeatherByCity(this.searchedCity.toLowerCase());
    }
  }
  
}
