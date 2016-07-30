import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { InputComponent } from '../input';

@Component({
  moduleId: module.id,
  selector: 'app-sign-in-up',
  templateUrl: 'sign-in-up.component.html',
  styleUrls: ['sign-in-up.component.css'],
  directives: [InputComponent]
})
export class SignInUpComponent implements OnInit {
  @Input() signupMode: boolean;
  @Input() action: string;
  @Input() tabIndex: number;
  @Output() update = new EventEmitter();
  @ViewChild('nameElement') nameElement;
  @ViewChild('emailElement') emailElement;
  @ViewChild('firstProfileField') firstProfileField;
  public mode: Object;
  public showingProfileFields: boolean;
  private modeOptions = {
    signup: {
      title: 'Sign up',
      change: 'Already have an account? Sign in',
      action : 'Next'
    },
    signin: {
      title: 'Sign in',
      change: 'Need an account? Sign up',
      action: 'Next'
    }
  };
  constructor() {}

  public ngOnInit(): void {
    this.updateMode();
    this.reset(); 
  }

  public toggleSignupMode(): void {
    this.signupMode = !this.signupMode;
    this.updateMode();
    this.setFocus(0);
  }

  public onSubmit(): void {
    this.update.emit( true );
  }

  public showProfileFields(): void {
    this.showingProfileFields = true;
    this.firstProfileField.setFocus(0);
  }

  public setFocus(delay: number): void {
    if (this.signupMode === true) {
      this.nameElement.setFocus(delay);
    } else {
      this.emailElement.setFocus(delay);
    }
    
  }

  public reset(): void {
    this.showingProfileFields = false;
    // It should also set fields values to null 
  }

  private updateMode(): void {
    if (this.signupMode === true) {
      this.mode = this.modeOptions.signup;
    } else {
      this.mode = this.modeOptions.signin;
    }
  }

}
