/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { EasterEggService } from './easter-egg.service';

describe('EasterEgg Service', () => {
  beforeEachProviders(() => [EasterEggService]);

  it('should ...',
      inject([EasterEggService], (service: EasterEggService) => {
    expect(service).toBeTruthy();
  }));
});
