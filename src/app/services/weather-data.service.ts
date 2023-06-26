import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class WeatherDataService {
  apiKey = environment.apiKey;
  apiUrl = environment.apiUrl;
 
  constructor(private http: HttpClient) { }
    load():Observable<any>{
      console.log("qqqqqqqqqqqqqq");
      
      return this.http.get(`${this.apiUrl}/weather?q=${"london"}&appid=${this.apiKey}`);
      console.log("diefjieofieof");
      
    }
  
}

