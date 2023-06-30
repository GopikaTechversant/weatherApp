import { Component,OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
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
 
  constructor(private http:HttpClient,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.getWeatherByCity();
    this.route.queryParams.subscribe(params => {
      this.city = params['city'];
    });
  }
  
  getWeatherByCity(){
    const cities =['london','kerala','goa','dubai','berlin','rome','paris','tokyo'];
    for (const city of cities){
    this.http.get(`${environment.apiUrl}/weather?q=${city}&7&appid=${environment.apiKey}`).subscribe(
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
  toggleForecastTonight() {
    this.showForecastTonight = !this.showForecastTonight;
  }
  toggleForecastTomorrow() {
    this.showForecastTomorrow = !this.showForecastTomorrow;
  }
  
  convertToCelsius(temp: number): number {
    return Math.round(temp - 273.15);
  }
}
