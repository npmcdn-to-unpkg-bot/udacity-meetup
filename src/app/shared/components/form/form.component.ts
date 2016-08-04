import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import {
  REACTIVE_FORM_DIRECTIVES,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { FormElementComponent } from '../form-element';

@Component({
  moduleId: module.id,
  selector: 'app-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css'],
  directives: [FormElementComponent]
})
export class FormComponent implements OnInit {
  @Input() modeInit;
  @Input() formInfo;
  @Input() tabIndex;
  @Output() special = new EventEmitter();
  @ViewChild('appForm') appForm;
  public mode;
  public currentForm;
  public active:boolean = true;

  public ngOnInit():void {
    this.mode = this.modeInit;
    this.currentForm = this.formInfo[this.mode];
  }

  public reset():Promise<string> {
    // Angular 2 workaround (as of 2.0.0-rc.4)
    // https://angular.io/docs/ts/latest/guide/forms.html
    this.active = false;
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

  public setFocus(delay:number):void {
    this.appForm.setFocus(delay);
  }

  private switchModes(newForm) {
    this.mode = newForm;
    this.currentForm = this.formInfo[this.mode];
    this.reset()
      .then( () => this.setFocus(0) );
  }

}
