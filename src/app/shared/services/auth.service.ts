import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  // Credentials are not stored in local storage.
  // They are only saved in memory, and only support one user.
  public preAuthlState$
  public credentials = {
    email: null,
    password: null
  };
  public profile = {
    name: null,
    employer: null,
    job: null,
    birthday: null
  };
  // Auth state
  public authenticated:boolean = false;
  constructor() {
    this.preAuthlState$ = new BehaviorSubject( this.authenticated );
  }

  public signInUp(event):boolean {
    if (event.action === 'signup') {
      this.signUp(event);
    } else if (event.action === 'signin') {
      this.signIn(event);
    }
    return this.checkAuth();
  }

  public signOut():boolean {
    this.credentials.email = null;
    this.credentials.password = null;
    this.authenticated = false;
    return this.checkAuth();
  }

  public checkAuth():boolean {
    this.preAuthlState$.next( this.authenticated );
    return this.authenticated;
  }

  public getUserEmail() {
    return this.credentials.email;
  }

  private signIn(credentialsEntered):void {
    if (this.credentials.password !== null // Only authenticate if user was created
        && this.credentials.email === credentialsEntered.email
        && this.credentials.password === credentialsEntered.password) {
        this.authenticated = true;
    }
  }

  private signUp(formData):boolean {
    // Save credentials
    this.credentials.email = formData.email;
    this.credentials.password = formData.password;
    // Save profile info
    this.profile.name = formData.name;
    this.profile.employer = formData.employer;
    this.profile.job = formData.job;
    this.profile.birthday = formData.birthday;
    // Authenticate
    this.authenticated = true;
    return this.checkAuth();
  }

  get authState$() {
    return this.preAuthlState$.asObservable();
  }

}
