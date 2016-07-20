import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-sign-in-up',
  templateUrl: 'sign-in-up.component.html',
  styleUrls: ['sign-in-up.component.css']
})
export class SignInUpComponent implements OnInit {
  @Input() signupMode: boolean;
  @Input() action: string;
  @Output() update = new EventEmitter();
  public mode: Object;
  public test: boolean = false;
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

  ngOnInit() {
    this.updateMode();
    //this.modeOptions.signup.action = this.action; 
  }

  updateMode() {
    if (this.signupMode === true) {
      this.mode = this.modeOptions.signup;
    } else {
      this.mode = this.modeOptions.signin;
    }
  }

  toggleSignupMode() {
    this.signupMode = !this.signupMode;
    this.updateMode();
  }

  submit() {
    this.update.emit( true );
  }

}
