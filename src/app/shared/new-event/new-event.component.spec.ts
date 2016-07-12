/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { NewEventComponent } from './new-event.component';

describe('Component: NewEvent', () => {
  it('should create an instance', () => {
    let component = new NewEventComponent();
    expect(component).toBeTruthy();
  });
});
