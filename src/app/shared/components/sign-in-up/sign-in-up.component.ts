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
  @Output() update = new EventEmitter();
  @ViewChild('nameElement') nameElement;
  @ViewChild('emailElement') emailElement;
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
    this.showingProfileFields = false;
    //this.modeOptions.signup.action = this.action; 
  }

  public toggleSignupMode(): void {
    this.signupMode = !this.signupMode;
    this.updateMode();
    this.setFocus();
  }

  public submit(): void {
    this.update.emit( true );
  }

  public showProfileFields(): void {
    this.showingProfileFields = true;
  }

  public setFocus(): void {
    console.log('about to set focus');
    setTimeout( () => { // fix this soon # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
      if (this.signupMode === true) {
        this.nameElement.setFocus();
      } else {
        this.emailElement.setFocus();
      }
    }, 100);
    
  }

  private updateMode(): void {
    if (this.signupMode === true) {
      this.mode = this.modeOptions.signup;
    } else {
      this.mode = this.modeOptions.signin;
    }
  }

}
