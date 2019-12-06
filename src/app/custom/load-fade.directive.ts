import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLoadFade]'
})
export class LoadFadeDirective {

  constructor(private elementRef: ElementRef,
    private renderer2: Renderer2) { }

    ngOnInit() {
    setTimeout(() => {
      this.renderer2.addClass(this.elementRef.nativeElement, 'show');
      }, 1);
    }

}
