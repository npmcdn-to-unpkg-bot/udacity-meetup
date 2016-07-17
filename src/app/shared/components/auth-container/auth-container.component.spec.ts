/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { AuthContainerComponent } from './auth-container.component';

describe('Component: AuthContainer', () => {
  it('should create an instance', () => {
    let component = new AuthContainerComponent();
    expect(component).toBeTruthy();
  });
});
