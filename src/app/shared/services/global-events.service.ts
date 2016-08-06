import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class GlobalEventsService {
  public preModalState$;
  public elementsCollection = {};
  private modalState: ModalState = {
    open: false,
    modal: undefined
  };
  private throttleConfig = {
    scroll: 10,
    resize: 300
  };
  constructor() {
    this.preModalState$ = new BehaviorSubject( this.modalState );
  }

  public init() { // Called once from app.componenet
    this.observeElement(document, 'scroll');
    this.observeElement(window, 'resize');
  }

  public observeElement(element, event) {
    // Tried to addapt this (AngularJS): http://stackoverflow.com/a/23323821/5357459
    // using this (Angular 2): http://stackoverflow.com/a/34703015/5357459
    if (element === undefined) { return; }
    let name = element.localName;
    if (name === undefined || name === null) { name = ''; }
    let elementKey = name + event;
    // Only create Observable if one has not be created
    if (!(elementKey in this.elementsCollection)) {
      this.elementsCollection[elementKey] = {
        emitter$: new EventEmitter(),
        timeout: undefined
      };
      Observable.fromEvent(element, 'scroll')
        .throttleTime( this.throttleConfig.scroll )
        .subscribe(event => {
          this.elementsCollection[elementKey]['emitter$'].emit();
          clearTimeout( this.elementsCollection[elementKey]['timeout'] );
          this.elementsCollection[elementKey]['timeout'] = setTimeout( () => {
            this.elementsCollection[elementKey]['emitter$'].emit();
          }, 250);
      });
    }
  }

  public newModalState(newState) {
    this.modalState = newState;
    this.preModalState$.next( this.modalState );
  }

  get modalState$() {
    return this.preModalState$.asObservable();
  }

}

interface ModalState {
  open: boolean,
  modal: string
}