import { Component, OnInit } from '@angular/core';
import {faSun} from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit{
  containerWidth: any;
  
  
  constructor(){}
  sunIcon=faSun;
  ngOnInit(): void {
    console.log(screen.width);
    this.updateContainerWidth();
  }
  // containerWidth = (screen.width) / 4; 
  // container = document.getElementsByClassName('container');
  private updateContainerWidth(): void {
    const screenWidth = screen.width;
    // if(screenWidth < 1200){
    // const cardWidth = Math.floor(screenWidth / 4); 
    // this.containerWidth = cardWidth - 10; 
    // }
    console.log(this.containerWidth);
  //   if(screenWidth <= 768 && screenWidth > 480){
  //     const cardWidth = Math.floor(screenWidth / 4); 
  //     this.containerWidth = cardWidth - 10; 
  //   }
  //   else if(screenWidth < 1200 && screenWidth >768){
  //     const cardWidth = Math.floor(screenWidth / 5); 
  //     this.containerWidth = cardWidth - 10; 
  //   }
  //   else if(screenWidth >1200){
  //     const cardWidth = Math.floor(screenWidth/5); 
  //     this.containerWidth = cardWidth - 10; 
  //   }else if(screenWidth <= 480){
  //     const cardWidth = Math.floor(screenWidth/3); 
  //     this.containerWidth = cardWidth - 10; 
  //   }
  if(screenWidth >= 1200){
    const cardWidth = Math.floor(screenWidth / 5);
    this.containerWidth = cardWidth - 10; 
  }else if(screenWidth <1200 && screenWidth > 768){
    const cardWidth = Math.floor(screenWidth / 5);
    this.containerWidth = cardWidth - 10; 
  }

  }
  
}
