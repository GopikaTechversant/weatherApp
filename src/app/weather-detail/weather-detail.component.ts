import { Component,OnInit ,HostListener} from '@angular/core';
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

import {
  trigger,
  transition,
  query,
  style,
  animate,
  group,
  state
} from '@angular/animations';

const left = [
  query(':enter, :leave', style({ position: 'fixed', width: '200px' }), {
    optional: true,
  }),
  group([
    query(
      ':enter',
      [
        style({ transform: 'translateX(-200px)' }),
        animate('.3s ease-out', style({ transform: 'translateX(0%)' })),
      ],
      {
        optional: true,
      }
    ),
    query(
      ':leave',
      [
        style({ transform: 'translateX(0%)' }),
        animate('.3s ease-out', style({ transform: 'translateX(200px)' })),
      ],
      {
        optional: true,
      }
    ),
  ]),
];

const right = [
  query(':enter, :leave', style({ position: 'fixed', width: '200px' }), {
    optional: true,
  }),
  group([
    query(
      ':enter',
      [
        style({ transform: 'translateX(200px)' }),
        animate('.3s ease-out', style({ transform: 'translateX(0%)' })),
      ],
      {
        optional: true,
      }
    ),
    query(
      ':leave',
      [
        style({ transform: 'translateX(0%)' }),
        animate('.3s ease-out', style({ transform: 'translateX(-200px)' })),
      ],
      {
        optional: true,
      }
    ),
  ]),
];
@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.css'],
  animations: [
    trigger('slideAnimation', [
      transition(':increment', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('500ms ease-in-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('500ms ease-in-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
 
})

export class WeatherDetailComponent implements OnInit{
  containerWidth: any;
  containerWidt: any;
  // screenWidth: number=0;
  searchWidth:any;
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
  images=[
    "https://i.gifer.com/1ZvY.gif",
    "https://i.gifer.com/Ozx.gif",
    "https://i.gifer.com/1F1V.gif",
    "https://i.gifer.com/SnWR.gif",
    "https://i.gifer.com/1k2j.gifs"
  ]
  constructor(private http:HttpClient,private route:ActivatedRoute){}
 
  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      this.city = params['lat'];
    });
    this.getWeatherByCity();
    this.updateContainerWidth();
  }
 
  getWeatherByCity(){
    this.http.get(`/forecast?lat=${this.lat}&lon=${this.lon}&cnt=5`).subscribe(
      (results:any) => {
        this.weatherData = results;
        console.log("results",results);
        this.weatherDataArray.push(results);
        this.weatherFiveDays=results.list;
        console.log("weatherFiveDays",this.weatherFiveDays);
        console.log("len",this.weatherFiveDays.length);
      }
    )
  }

  currentIndex: number = 0;
  counter:number=0;

 
onNext() {
    if (this.counter + 1 <= this.images.length - 3) {
      this.counter += 1;
    }
  }
onPrevious() {
    if (this.counter > 0) {
      this.counter--;
    }
  }
private updateContainerWidth(): void {
    const screenWidth = screen.width;
    console.log("screenWidth", screenWidth);
  
    if (screenWidth >= 900) {
      this.containerWidth = 3; 
    } else if (screenWidth > 500) {
      this.containerWidth = 2; 
    } else {
      this.containerWidth = 1; 
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