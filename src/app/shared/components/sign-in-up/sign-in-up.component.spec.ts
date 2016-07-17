/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { SignInUpComponent } from './sign-in-up.component';

describe('Component: SignInUp', () => {
  it('should create an instance', () => {
    let component = new SignInUpComponent();
    expect(component).toBeTruthy();
  });
});
