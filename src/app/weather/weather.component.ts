import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {faSun} from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
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
  weatherData: any;
  apiKey = environment.apiKey;
  apiUrl = environment.apiUrl;
 
  constructor(private router:Router,private http:HttpClient,private weatherService:WeatherDataService){}
  sunIcon=faSun;
  searchIcon=faSearch;
  ngOnInit(): void {
    console.log(screen.width);
    this.updateContainerWidth();
  this.load();
         
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
  weatherDetail():void{
    this.router.navigate(['detail']);
  }
  // getWeather(city: string): void {
  //   console.log('Before API call');
  //   this.weatherService.getWeatherByCity(city)
  //     .subscribe((data: any) => {
  //       console.log('Weather data:', data);
  //     });
  // }
  load(){
    console.log("qqqqqqqqqqqqqq");
    
    this.http.get(`${this.apiUrl}/weather?q=${"london"}&appid=${this.apiKey}`);
    console.log("diefjieofieof");
    
  }
 
}
