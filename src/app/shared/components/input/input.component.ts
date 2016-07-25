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
  @ViewChild('inputElement') inputElement;
  @ViewChild('selectElement') selectElement;
  public inputLength: number = 0;
  public inputFocused: boolean = false;
  public eventTypes: Array<string> = [
  'Conference', 'Seminar', 'Meeting', 'Team Building',
  'Trade Show', 'Business Dinner', 'Press Conference',
  'Networking', 'Opening Ceremony', 'Product Launche',
  'Theme Party', 'VIP Event', 'Trade Fair', 'Shareholder Meeting',
  'Award Ceremony', 'Board Meeting', 'Executive Retreat',
  'Wedding', 'Birthday', 'Wedding Anniversary', 'Family Event'
  ];
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

  public ngOnInit():void {}

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
