import { Directive, Renderer, ElementRef, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[autofocus]'
})
export class AutofocusDirective implements OnInit {
  @Input() manuelFocus;
  constructor(public renderer: Renderer, public elementRef: ElementRef) {}
  ngOnInit() {
    this.focus();
  }
  ngOnChanges() {
    this.focus();
  }

  focus() {
    this.renderer.invokeElementMethod(
      this.elementRef.nativeElement, 'focus', []);
  }

}
