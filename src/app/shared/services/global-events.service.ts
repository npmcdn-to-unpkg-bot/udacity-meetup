import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class GlobalEventsService {
  public scroll$;
  public resize$;
  public preModalState$;
  private modalState: ModalState = {
    open: false,
    modal: undefined
  };
  private throttleConfig = {
    scroll: 10,
    resize: 300
  };
  constructor() {
    this.scroll$ = new EventEmitter();
    this.resize$ = new EventEmitter();
    this.preModalState$ = new BehaviorSubject( this.modalState );
  }

  init() {
    // Tried to addapt this (AngularJS): http://stackoverflow.com/a/23323821/5357459
    // using this (Angular 2): http://stackoverflow.com/a/34703015/5357459
    let scrollStop;
    const scrollEventStream = Observable.fromEvent(document, 'scroll')
      .throttleTime( this.throttleConfig.scroll );
    scrollEventStream.subscribe(event => {
      this.scroll$.emit();
      clearTimeout(scrollStop);
      scrollStop = setTimeout( () => {
        this.scroll$.emit();
      }, 250);
    });
    const resizeEventStream = Observable.fromEvent(window, 'resize')
      .throttleTime( this.throttleConfig.resize );
    resizeEventStream.subscribe(event => {
      this.resize$.emit(event);
    });
  }

  newModalState(newState) {
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