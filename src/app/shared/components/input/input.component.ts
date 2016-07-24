import { Component, OnInit, Input, ViewChild, ElementRef, Renderer } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-input',
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.css']
})
export class InputComponent implements OnInit {
  @Input() type: string;
  @Input() name: string;
  @ViewChild('inputElement') inputElement;
  public inputLength: number = 0;
  public inputFocused: boolean = false;
  constructor(private renderer: Renderer) {}

  public setFocus(): void {
    setTimeout( () => { // wait for animation
      this.renderer.invokeElementMethod(
      this.inputElement.nativeElement, 'focus', []);
    }, 1000);
  }

  public ngOnInit(): void {}

  private onFocus(): void {
    this.inputFocused = true;
  }

  private onBlur(): void {
    this.inputFocused = false;
  }

  private onInput(newInput: string): void {
    this.inputLength = newInput.length;
  }

}
