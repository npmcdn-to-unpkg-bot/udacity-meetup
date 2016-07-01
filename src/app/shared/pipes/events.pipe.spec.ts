/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { EventsPipe } from './events.pipe';

describe('Pipe: Events', () => {
  it('create an instance', () => {
    let pipe = new EventsPipe();
    expect(pipe).toBeTruthy();
  });
});
