/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { FrontComponent } from './front.component';

describe('Component: Front', () => {
  it('should create an instance', () => {
    let component = new FrontComponent();
    expect(component).toBeTruthy();
  });
});
