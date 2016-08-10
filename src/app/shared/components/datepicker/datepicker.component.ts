import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { DATEPICKER_DIRECTIVES } from 'ng2-bootstrap';
import {
  REACTIVE_FORM_DIRECTIVES,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'app-datepicker',
  templateUrl: 'datepicker.component.html',
  styleUrls: ['datepicker.component.css'],
  directives: [DATEPICKER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class DatepickerComponent implements OnInit {
  @Input() field;
  @Input() control;
  @Input() tabIndex;
  @Output() fieldChange = new EventEmitter();
  @Output() controlChange = new EventEmitter();
  @ViewChild('datepickerElement') datepickerElement;
  public dateModel;
  public showDatepicker:boolean = false;
  public updateNextBlur:boolean = false;

  constructor(private element: ElementRef) {}

  public ngOnInit():void {
    document.addEventListener('click', event => this.checkOutsideClicked(event) );
    this.element.nativeElement.firstElementChild
      .addEventListener('keydown', event => this.onkeydown(event) );
  }

  public hidePopup():void {
    this.showDatepicker = false;
  }

  public onkeydown(event) {
    if (event.keyCode === 9) { // onTab
      setTimeout( () => this.hidePopup(), 0);
    }
  }

  public onInput(event):void {
    let newValue = event.target.value;
    if (moment( new Date(newValue) ).isValid() ) {
      this.dateModel = newValue;
      this.updateField('length', newValue.length);
      this.updateNextBlur = true;
    }
  }

  // Sets the input value related to the datepicker
  public onDatepickerSelection(newDate, id):void {
    let newValue:string = moment( new Date(newDate) ).format('MMMM D, YYYY');
    this.element.nativeElement.firstElementChild.value = newValue;
    this.updateField('length', newValue.length);
    this.updateControl(newValue);
    this.hidePopup();
  }

  public updateField(key, value):void {
    this.field[key] = value;
    this.fieldChange.emit(this.field);
  }

  public onBlur():void {
    this.updateField('focused', false);
    if (this.updateNextBlur === true) {
      // Update control
      let newValue = this.element.nativeElement.firstElementChild.value;
      this.updateControl(newValue);
    }
  }

  private updateControl(newValue) {
    this.control.updateValue(newValue);
    this.controlChange.emit(this.control);
    this.updateNextBlur = false;
  }

  private checkOutsideClicked(event):void {
    if (event.target !== this.element.nativeElement.parentElement
      && !this.element.nativeElement.parentElement.contains(event.target)) {
      if (!this.nullGrandparentBug(event)) {
        this.hidePopup();
      }
		}
	}

  /**
   * Some datepicker elements have a null grandparent
   * where there should be an `app-datepicker` element.
   * 
   * This checks if the click happens outside the bounds of the
   * `datepicker` element.
   */
  private nullGrandparentBug(event):boolean {
    if (this.datepickerElement !== undefined) {  
      let rec = this.element.nativeElement.lastElementChild.getBoundingClientRect();
      if (event.pageX >= rec.left && event.pageX <= rec.right && event.pageY >= rec.top && event.pageY <= rec.bottom) {
        return true;
      }
    }
  }

}
