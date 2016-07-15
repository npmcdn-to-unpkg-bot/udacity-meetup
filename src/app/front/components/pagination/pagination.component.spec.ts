/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

describe('Component: Pagination', () => {
  it('should create an instance', () => {
    let component = new PaginationComponent();
    expect(component).toBeTruthy();
  });
});
