import { Directive,ElementRef,HostListener } from '@angular/core';

@Directive({
  selector: '[appNext]'
})
export class NextDirective {

  constructor(private el:ElementRef) { }
  @HostListener('click')
    nextFunc(){
      const elm = this.el.nativeElement.parentElement.parentElement.children[0];
      const item = elm.getElementsByClassName("slider-main");
      console.log("item",item);
      
    }

}
