import { Injectable } from '@angular/core';

@Injectable()
export class BrowserSupportService {
  public dateInput: boolean; // If native date input type

  public detect(): void {
    this.browserSupportsDateInput();
  }

  /**
   * http://stackoverflow.com/a/17929316/5357459
   */
  private browserSupportsDateInput(): void {
    let i = document.createElement('input');
    i.setAttribute('type', 'date');
    this.dateInput = i.type !== 'text';
  }

}
