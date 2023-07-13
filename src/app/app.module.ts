import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { WeatherDetailComponent } from './weather-detail/weather-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { NextDirective } from './directives/next.directive';
import { PreviousDirective } from './directives/previous.directive';
import {FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { WeatherInterceptorInterceptor } from './weather-interceptor.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    WeatherDetailComponent,
    NextDirective,
    PreviousDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WeatherInterceptorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
