import { Directive,ElementRef,HostListener } from '@angular/core';

@Directive({
  selector: '[appNext]'
})
export class NextDirective {

  constructor(private el:ElementRef) { }
  @HostListener('click')
    nextFunc(){
      const elm = this.el.nativeElement.parentElement.parentElement.children[0];
      console.log("elm",elm);
      
      const item = elm.getElementsByClassName("item");
      console.log("item",item);
      elm.append(item[0]);
      
    }

}
