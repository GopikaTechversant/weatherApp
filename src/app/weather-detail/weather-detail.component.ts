import { Component,OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {faSun} from '@fortawesome/free-solid-svg-icons';
import {faMoon} from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {faCloudRain} from '@fortawesome/free-solid-svg-icons';
import {faCloud} from '@fortawesome/free-solid-svg-icons';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {faCloudShowersHeavy} from '@fortawesome/free-solid-svg-icons';
// <i class="fa-thin fa-cloud-showers-heavy" style="color: #195fd7;"></i>
@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.css']
})
export class WeatherDetailComponent implements OnInit{
  weatherData:any;
  weatherDataResponse: any;
  weatherDataArray: any[] = [];
  weatherDetailsArray:any[]=[];
  city: string='';
  lat:number=0;
  lon:number=0;
  showForecastTonight = false;
  showForecastTomorrow = false;
  forecasts = ['Today', 'Tonight', 'Tomorrow'];
  currentSlide = 0;
  rainIcon =faCloudShowersHeavy;
  sunIcon=faSun;
  moonIcon = faMoon;
  searchIcon=faSearch;
  cloudIcon=faCloud;
  arrowRight=faArrowRight;
  arrowLeft=faArrowLeft;
  weatherFiveDays:any[]=[];
  constructor(private http:HttpClient,private route:ActivatedRoute){}
 
  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      this.city = params['lat'];
    });
    this.getWeatherByCity();
  }
  
  getWeatherByCity(){
      this.http.get(`${environment.apiUrl}/forecast?lat=${this.lat}&lon=${this.lon}&cnt=5&appid=${environment.apiKey}`).subscribe(
      (results:any) => {
        this.weatherData = results;
       
        console.log("results",results);
        this.weatherDataArray.push(results);
        this.weatherFiveDays=results.list;
        console.log("weatherFiveDays",this.weatherFiveDays);
        console.log("len",this.weatherFiveDays.length);
        
        // console.log("weatherDataArray",this.weatherDataArray);
       
      }
    )
  }

  currentIndex: number = 0;

  displayNext() {
    if (this.currentIndex < this.weatherFiveDays.length - 1) {
      this.currentIndex++; 
    }
  }
  displayPrevious() {
    if (this.currentIndex > 0) {
      this.currentIndex--; 
    }
  }

  convertToDate(date:string){
    let sunTime = new Date(this.weatherData.city.sunset * 1000);
    this.weatherData.sunset_time = sunTime.toLocaleTimeString();
  }

formatTime(timestamp: number): string {
  const sunriseDate = new Date(timestamp * 1000);
  const hours = sunriseDate.getHours();
  const minutes = sunriseDate.getMinutes();
  const seconds = sunriseDate.getSeconds();

  
  const formattedTime = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;

  return formattedTime;
}

padZero(num: number): string {
  return num < 10 ? `0${num}` : num.toString();
}

}
