/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { CleanDatesPipe } from './clean-dates.pipe';

describe('Pipe: CleanDates', () => {
  it('create an instance', () => {
    let pipe = new CleanDatesPipe();
    expect(pipe).toBeTruthy();
  });
});
