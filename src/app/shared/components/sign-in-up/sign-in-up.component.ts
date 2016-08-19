import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { Validators } from '@angular/forms';
import { FormComponent } from '../form';
import { ValidationService } from '../../services/validation.service';
import { AuthService } from '../../services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'app-sign-in-up',
  templateUrl: 'sign-in-up.component.html',
  styleUrls: ['sign-in-up.component.scss'],
  directives: [FormComponent]
})
export class SignInUpComponent {
  @Input() tabIndex;
  @Input() modeInit;
  @Output() authComplete = new EventEmitter();
  @Output() modeUpdate = new EventEmitter();
  @ViewChild('signForm') appForm;
  public formErrorMessage: string = null;
  public formInfo: any = {
    signup: {
      title: 'Sign up',
      instructions: 'Creating an account will allow you to create events.',
      fields: [
        {
          name: 'Name',
          type: 'input',
          inputType: 'text',
          control: ['', Validators.required],
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
          control: ['', [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(120),
            ValidationService.oneLowercase,
            ValidationService.oneUppercase,
            ValidationService.oneNumber,
            ValidationService.oneSpecial,
          ]]
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
          message: 'Optional Profile Info - Shown With Your Events',
          group: 'optional'
        },
        {
          name: 'Employer',
          type: 'input',
          inputType: 'text',
          control: [''],
          group: 'optional'
        },
        {
          name: 'Job title',
          type: 'input',
          inputType: 'text',
          control: [''],
          group: 'optional'
        },
        {
          name: 'Birthday',
          type: 'input',
          inputType: 'date',
          control: ['', ValidationService.validDate],
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
      title: 'Sign in',
      instructions: 'To sign in, enter your info',
      fields: [
        {
          name: 'Email',
          type: 'input',
          inputType: 'email',
          control: ['', Validators.required]
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
          name: 'Need an account? Sign up',
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

  public setFocus(delay: number): void {
    this.appForm.setFocus(delay);
  }

  public reset(): void {
    this.formErrorMessage = null;
    this.appForm.reset();
  }

  public onSubmit(event): void {
    if (this.authService.signInUp(event)) {
      this.authComplete.emit(true);
    } else {
      this.formErrorMessage = 'Unable to sign in';
    }
  }
}
