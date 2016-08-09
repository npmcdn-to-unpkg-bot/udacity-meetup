import { Injectable } from '@angular/core';
import {
  REACTIVE_FORM_DIRECTIVES,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Injectable()
export class ValidationService {

  public test;

  constructor() {}

  static errorMessages = {
    required: 'This field is required',
    invalidEmailAddress: 'It doesn\'t look like that\'s a valid email',
    notEquivalent: 'Passwords should match',
    minlength: 'This should be longer',
    needsLowercase: 'Should have a lower case letter',
    needsUppercase: 'Should have a upper case letter',
    needsNumber: 'Should have a number',
    needsSpecial: 'Should have one of these special characters: ! % $ & ^ * ( )'
  };

  // Thanks!: http://mlitzinger.com/articles/password-validator-js/ 

  static oneLowercase(control) {
    let regex = /^(?=.*[a-z]).+$/;
    if ( regex.test(control.value) ) {
      return null;
    } else {
      return { 'needsLowercase': true };
    }
  }

  static oneUppercase(control) {
    let regex = /^(?=.*[A-Z]).+$/;
    if ( regex.test(control.value) ) {
      return null;
    } else {
      return { 'needsUppercase': true };
    }
  }

  static oneNumber(control) {
    let regex = /\d/;
    if ( regex.test(control.value) ) {
      return null;
    } else {
      return { 'needsNumber': true };
    }
  }

  static oneSpecial(control) {
    let regex = /[`!%$&^*()]+/;
    if ( regex.test(control.value) ) {
      return null;
    } else {
      return { 'needsSpecial': true };
    }
  }

  static matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group) => {
      let passwordInput = group.controls[passwordKey];
      let passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      }
    }
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

}