import { Directive,ElementRef,HostListener  } from '@angular/core';

@Directive({
  selector: '[appPrevious]'
})
export class PreviousDirective {

  constructor(private el:ElementRef) { }
  @HostListener('click')
  prevFunc(){
    const elm = this.el.nativeElement.parentElement.parentElement.children[0];
    const item = elm.getElementsByClassName("item");
    // console.log("item",item);
    elm.prepend(item[item.length-1]);
    
  }
}
