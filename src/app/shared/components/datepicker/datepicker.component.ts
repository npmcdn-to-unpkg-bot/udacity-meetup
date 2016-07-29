import { Component, OnInit } from '@angular/core';
import { DATEPICKER_DIRECTIVES } from 'ng2-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'app-datepicker',
  templateUrl: 'datepicker.component.html',
  styleUrls: ['datepicker.component.css'],
  directives: [DATEPICKER_DIRECTIVES]
})
export class DatepickerComponent implements OnInit {
  public dt:Date = new Date();
  private showDatepicker: boolean = false;
  constructor() {}

  ngOnInit() {
  }

  showPopup() {
    this.showDatepicker = true;
  }

  hidePopup(event) {
    this.showDatepicker = false;
    //this.dateModel = event;
    //this.dateModelChange.emit(event)
  }

}
