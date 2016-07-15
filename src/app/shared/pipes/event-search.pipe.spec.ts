/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { EventSearchPipe } from './event-search.pipe';

describe('Pipe: EventSearch', () => {
  it('create an instance', () => {
    let pipe = new EventSearchPipe();
    expect(pipe).toBeTruthy();
  });
});
