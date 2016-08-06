import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import {
  REACTIVE_FORM_DIRECTIVES,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { FormComponent } from '../form';
import { ValidationService } from '../../services/validation.service';
import { AuthService } from '../../services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'app-sign-in-up',
  templateUrl: 'sign-in-up.component.html',
  styleUrls: ['sign-in-up.component.css'],
  directives: [FormComponent]
})
export class SignInUpComponent implements OnInit {
  @Input() tabIndex;
  @Output() authComplete = new EventEmitter();
  @ViewChild('signForm') appForm;
  public formInfo:any = {
    signup: {
      description: 'Sign up - primary',
      instructions: 'To create an event create an account.',
      fields: [
        {
          name: 'Name',
          type: 'input',
          inputType: 'text',
          control: ['', [Validators.required, ValidationService.passwordValidator]],
          mode: 'signup'
        },
        {
          name: 'Email',
          type: 'input',
          inputType: 'email',
          control: ['', [Validators.required, ValidationService.emailValidator]]
        },
        {
          name: 'Password',
          type: 'input',
          inputType: 'password',
          passwordType: 'password',
          control: ['', Validators.required]
        },
        {
          name: 'Confirm password',
          type: 'input',
          inputType: 'password',
          passwordType: 'confirm',
          control: ['', Validators.required],
          mode: 'signup'
        },
        {
          type: 'instructions',
          message: 'Optional Profile Info',
          group: 'optional'
        },
        {
          name: 'Employer',
          type: 'input',
          inputType: 'text',
          control: ['', Validators.required],
          group: 'optional'
        },
        {
          name: 'Job title',
          type: 'input',
          inputType: 'text',
          control: ['', Validators.required],
          group: 'optional'
        },
        {
          name: 'Birthday',
          type: 'datepicker',
          control: ['', Validators.required],
          group: 'optional'
        },
        {
          name: '+Profile info',
          type: 'option',
          group: 'optional'
        },
        {
          type: 'submit',
          text: 'Next'
        },
        {
          name: 'Already have an account? Sign in',
          type: 'special',
          value: {
            action: 'switch',
            newForm: 'signin'
          }
        }
      ]
    },
    signin: {
      description: 'Sign in',
      instructions: 'To sign in.',
      fields: [
        {
          name: 'Email',
          type: 'input',
          inputType: 'email',
          control: ['', Validators.required, ValidationService.emailValidator]
        },
        {
          name: 'Password',
          type: 'input',
          inputType: 'password',
          control: ['', Validators.required]
        },
        {
          type: 'submit',
          text: 'Next'
        },
        {
          name: 'Already have an account? Sign in',
          type: 'special',
          value: {
            action: 'switch',
            newForm: 'signup'
          }
        }
      ]
    }
  };
  constructor(private authService: AuthService) {}

  public ngOnInit():void {}

  public setFocus(delay: number):void {
    this.appForm.setFocus(delay);
  }

  public reset():void {
    this.appForm.reset();
  }

  public onSubmit(event) {
    if (this.authService.signInUp(event)) {
      this.authComplete.emit(true);
    }
  }
}
