import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { DATEPICKER_DIRECTIVES } from 'ng2-bootstrap';
import {
  REACTIVE_FORM_DIRECTIVES,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'app-datepicker',
  templateUrl: 'datepicker.component.html',
  styleUrls: ['datepicker.component.css'],
  directives: [DATEPICKER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class DatepickerComponent implements OnInit {
  @Input() showDatepicker;
  @Input() id;
  @Input() control;
  @Input() dateModel;
  @Output() closed = new EventEmitter();
  @Output() selectionDone = new EventEmitter();
  
  public firstName;

  constructor(private element: ElementRef) {}

  ngOnInit() {
    document.addEventListener("click", event => this.checkOutsideClicked(event) );
    this.firstName = this.control;
  }

  public hidePopup():void {
    this.showDatepicker = false;
    this.closed.emit(true);
  }

  public onDatepickerSelection(newDate):void {
    this.selectionDone.emit(newDate);
    this.hidePopup();
  }

  private checkOutsideClicked(event):void {
    if (event.target !== this.element.nativeElement.parentElement
      && !this.element.nativeElement.parentElement.contains(event.target)) {
      if (!this.nullGrandparentBug(event)) {
        this.hidePopup();
      }
		}
	}

  private nullGrandparentBug(event):boolean {
    // Some datepicker elements have a null grandparent
    // where there should be the `app-datepicker` element
    for (let i = 0; i < event.path.length; i++) {
      if (event.path[i].localName === 'app-datepicker') {
        // Event happend within the `app-datepicker` element
        return true;
      }
    }
    // Event happend outside `app-datepicker` element
    return false;
  }

}
