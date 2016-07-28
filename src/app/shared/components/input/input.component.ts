import { Component, OnInit, Input, ViewChild, ElementRef, Renderer } from '@angular/core';
import { SELECT_DIRECTIVES } from '../../forks/ng2-select/select';

@Component({
  moduleId: module.id,
  selector: 'app-input',
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.css'],
  directives: [SELECT_DIRECTIVES]
})
export class InputComponent implements OnInit {
  @Input() tabIndex:number;
  @Input() type:string;
  @Input() name:string;
  @Input() data;
  @ViewChild('inputElement') inputElement;
  @ViewChild('selectElement') selectElement;
  public inputLength: number = 0;
  public inputFocused: boolean = false;
  public inputId: string;
  constructor(private element: ElementRef,  private renderer: Renderer) {}

  public setFocus(delay:number):void {
    if (this.type === 'select') {
      this.selectElement.setFocus(delay);
    } else {
      setTimeout( () => { // wait for animation if needed
        this.renderer.invokeElementMethod(
          this.inputElement.nativeElement, 'focus', []);
      }, delay);
    }
    
  }

  public ngOnInit():void {
    this.inputId = this.name + Math.floor((Math.random() * 100000) + 1);
  }

  private onFocus():void {
    this.inputFocused = true;
  }

  private onBlur():void {
    this.inputFocused = false;
  }

  private onInput(newInput:string):void {
    this.inputLength = newInput.length;
  }

}
