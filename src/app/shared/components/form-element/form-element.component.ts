import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Renderer } from '@angular/core';
import {
  REACTIVE_FORM_DIRECTIVES,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { SELECT_DIRECTIVES } from '../../forks/ng2-select/select';
import { DatepickerComponent } from '../datepicker';
import * as moment from 'moment';
import { MapsAPILoader } from 'angular2-google-maps/core';
declare var google: any;

@Component({
  moduleId: module.id,
  selector: 'app-form-element',
  templateUrl: 'form-element.component.html',
  styleUrls: ['form-element.component.css'],
  directives: [REACTIVE_FORM_DIRECTIVES, DatepickerComponent, SELECT_DIRECTIVES]
})
export class FormElementComponent implements OnInit {
  @Input() formInfo;
  @Input() tabIndex;
  @Output() feSpecial = new EventEmitter(); // form element special
  @Output() submit = new EventEmitter();
  public registerForm:FormGroup;
  public focusTimeout;
  public dateModel;
  public test:boolean = true;
  public addListenerQueue = {};
  public selectData = {
    time: [
      '12:00am', '12:30am', '1:00am', '1:30am', '2:00am', '2:30am',
      '3:00am', '3:30am', '4:00am', '4:30am', '5:00am', '5:30am',
      '6:00am', '6:30am', '7:00am', '7:30am', '8:00am', '8:30am',
      '9:00am', '9:30pm', '10:00am', '10:30pm', '11:00am', '11:30pm',
      '12:00pm', '12:30pm', '1:00pm', '1:30pm', '2:00pm', '2:30pm',
      '3:00pm', '3:30pm', '4:00pm', '4:30pm', '5:00pm', '5:30pm',
      '6:00pm', '6:30pm', '7:00pm', '7:30pm', '8:00pm', '8:30pm',
      '9:00pm', '9:30pm', '10:00pm', '10:30pm', '11:00pm', '11:30pm'
    ]
  };

  constructor(private renderer: Renderer, private formBuilder: FormBuilder, private _loader: MapsAPILoader) {}

  public ngOnInit():void {
    this.sortInput();
  }

  public setFocus(delay: number): void {
    let throutleDelay = 500;
    if (delay < throutleDelay) { delay = throutleDelay; }
    clearTimeout(this.focusTimeout);
    this.focusTimeout = setTimeout( () => { // wait for animation if needed
      let focused = false;
      for (let i = 0; i < this.formInfo.fields.length; i++) {
        let thisId = this.formInfo.fields[i].id;
        if (
          // make sure focused wasn't called earlier in the loop
          !focused &&
          // check if the input is currently visible
          this.formInfo.fields[i].show &&
          // check if the input is empty
          this.formInfo.fields[i].length === 0 &&
          // make sure the input exists
          document.getElementById( thisId ) !== null) {
          // call focus using Angular 2's renderer
          this.renderer.invokeElementMethod(
            document.getElementById( thisId ), 'focus', []);
          focused = true;
        }
      }
    }, delay); 
  }

  public showGroup(groupName):void {
    for (let i = 0; i < this.formInfo.fields.length; i++) {
      if (this.formInfo.fields[i].group === groupName) {
        this.formInfo.fields[i].show = true;
        this.checkListeners(this.formInfo.fields[i]);
      }
    }
    this.setFocus(0);
  }

  public emitSpecial(value):void {
    this.feSpecial.emit(value);
  }

  public usesTextbox(type):boolean {
    let inputTypes = ['text', 'email', 'password'];
    if (inputTypes.indexOf(type) !== -1) {
      return true;
    }
  }

  public showPopup(type):boolean { // Datepicker
    if (type === 'datepicker') {
      return true;
    }
  }

  private sortInput():void {
    let inputId = 0;
    let fbGroup = {}; // Form builder group object
    let passwordId, confirmPasswordId;
    for (let i = 0; i < this.formInfo.fields.length; i++) {
      // Create unique id
      inputId++;
      let idString = 'id' + inputId;
      // Get group
      let group = null;
      if ('group' in this.formInfo.fields[i]) { group = this.formInfo.fields[i].group; }
      // Get default show
      let show = true;
      if (group !== null &&  this.formInfo.fields[i].type !== 'option') { show = false; }
      // Set field info
      this.formInfo.fields[i]['id'] = idString;
      this.formInfo.fields[i]['show'] = show;
      this.formInfo.fields[i]['length'] = 0;
      // Save password info
      if ('passwordType' in this.formInfo.fields[i]) {
        if (this.formInfo.fields[i].passwordType === 'password') { passwordId = idString; }
        if (this.formInfo.fields[i].passwordType === 'confirm') { confirmPasswordId = idString; }
      }
      // Add event listeners
      this.checkListeners(this.formInfo.fields[i]);
      // Add to form builder group object
      fbGroup[idString] = this.formInfo.fields[i].control;
    }
    // Add confirm password validation
    if (confirmPasswordId !== undefined) {
      // Form builder
      this.registerForm = this.formBuilder.group(fbGroup, {validator: ValidationService.matchingPasswords(passwordId, confirmPasswordId)});
    } else {
      // Form builder
      this.registerForm = this.formBuilder.group(fbGroup);
    }
  }

  private onInput(event, type):number {
    if (type === 'select') {
      return event.length;
    } else {
      return event.target.value.length;
    } 
  }

  private onSubmit():void {
    let submitValue = {value: 'test value'};
    this.submit.emit(submitValue);
  }

  public onDatepickerSelection(newDate, id):number { // Datepicker
    console.log(newDate);
    let input:any = document.getElementById(id);
    input.value = moment( new Date(newDate) ).format('MMMM D, YYYY');
    return input.value.length;
  }

  updateDate(event, type, oldValue) { // Datepicker
    let newInput = event.target.value;
    if (type === 'datepicker' && moment( new Date(newInput) ).isValid() ) {
      return newInput;
    } else {
      return oldValue;
    }
  }

  getSelectData(selectType):Array<string> { // ng-select
    if (selectType in this.selectData) {
      return this.selectData[selectType];
    }
  }

  private getBase64(id):void { // File input
    let inputElement:any = document.getElementById(id);
    let filesSelected = inputElement.files;
    if (filesSelected.length > 0) {
      let fileToLoad = filesSelected[0];
      let fileReader = new FileReader();
      fileReader.onload = (fileLoadedEvent) => {
          let item = fileLoadedEvent.target;
          let base64 = item['result'];
          console.log(item);
      }
      fileReader.readAsDataURL(fileToLoad);
    }
  }

  private checkListeners(field) {
    if ('addListener' in field) {
      if (field.addListener === 'location' && field.show === true) {
        this.autocomplete(field.id);
      }
    }
  }

  private autocomplete(id):void {
    setTimeout( () => { // Wait for field.show to apply
      let inputElement:any = document.getElementById(id);
      this._loader.load().then(() => {
        let autocomplete = new google.maps.places.Autocomplete( inputElement, {});
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            let place = autocomplete.getPlace();
            console.log(place);
        });
      });
    }, 0);
  }

}
