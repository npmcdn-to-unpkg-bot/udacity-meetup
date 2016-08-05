/* 
 * This componenet takes an object of
 * form information and creates a form.
 */
import {
  Component,
  ViewEncapsulation,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  Renderer
} from '@angular/core';
import {
  REACTIVE_FORM_DIRECTIVES,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { DatepickerComponent } from '../datepicker';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { ValidationService } from '../../services/validation.service';
import { SELECT_DIRECTIVES } from '../../forks/ng2-select/select';
import { TextboxComponent } from '../textbox';
import * as moment from 'moment';
declare var google: any;

@Component({
  moduleId: module.id,
  encapsulation: ViewEncapsulation.None,
  selector: 'app-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css'],
  directives: [
    REACTIVE_FORM_DIRECTIVES,
    DatepickerComponent,
    SELECT_DIRECTIVES,
    TextboxComponent
  ]
})
export class FormComponent implements OnInit {
  @Input() modeInit;
  @Input() allFormInfo;
  @Input() tabIndex;
  @Input() formComponentId:string;
  @Output() special = new EventEmitter();
  public mode;
  public formInfo;
  public active:boolean = true;
  public registerForm:FormGroup;
  public focusTimeout;
  public dateModel;
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
    this.setFormComponenetId();
    this.mode = this.modeInit;
    this.formInfo = this.allFormInfo[this.mode];
    this.sortInput();
  }

  public reset():Promise<string> {
    // Angular 2 workaround (as of 2.0.0-rc.4)
    // https://angular.io/docs/ts/latest/guide/forms.html
    this.active = false;
    this.sortInput();
    return new Promise( resolve => {
      setTimeout( () => {
        this.active = true;
        // Wait for digest cycle to apply active
        setTimeout(resolve, 0);
      }, 0);
    });
  }

  public onSpecial(event) {
    if (event.action === 'switch') {
      this.switchModes(event.newForm);
    } else {
      this.special.emit(event);
    }
  }

  private switchModes(newForm) {
    this.mode = newForm;
    this.formInfo = this.allFormInfo[this.mode];
    this.reset().then(() => this.setFocus(0));
  }

  // This helps insure that there are unique input Ids
  // when there are multiple form components.
  private setFormComponenetId() {
    if (this.formComponentId === undefined) {
      this.formComponentId = 'form-' + Math.floor( Math.random() * 10000);
    }
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
      }
    }
    this.setFocus(0);
  }

  private sortInput():void {
    let inputId = 0;
    let fbGroup = {}; // Form builder group object
    let passwordId, confirmPasswordId;
    let allowedTypes = [
      'input', 'datepicker', 'select', 
      'textarea', 'instructions',
      'option', 'submit', 'special'
    ];
    for (let i = 0; i < this.formInfo.fields.length; i++) {
      // Check type
      if (allowedTypes.indexOf(this.formInfo.fields[i].type) !== -1) {
        // Create unique id
        inputId++;
        let idString = this.formComponentId + '-id-' + inputId;
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
        // Add to form builder group object
        fbGroup[idString] = this.formInfo.fields[i].control;
      } else {
        // Warn if invalid type
        console.warn('Skipping invalid form field type "' + this.formInfo.fields[i].type + '"');
      }
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

  // Datepicker => Sets the input value related to the datepicker
  public onDatepickerSelection(newDate, id):number {
    console.log(newDate);
    let input:any = document.getElementById(id);
    input.value = moment( new Date(newDate) ).format('MMMM D, YYYY');
    return input.value.length;
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

}
