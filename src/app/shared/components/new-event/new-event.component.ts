import { Component, OnInit, ViewChild } from '@angular/core';
import { MODAL_DIRECTVES, BS_VIEW_PROVIDERS } from 'ng2-bootstrap';
import { GlobalEventsService } from '../../services/global-events.service';
import { SignInUpComponent } from '../sign-in-up/index';

@Component({
  moduleId: module.id,
  selector: 'app-new-event',
  templateUrl: 'new-event.component.html',
  styleUrls: ['new-event.component.css'],
  directives: [MODAL_DIRECTVES, SignInUpComponent],
  viewProviders:[BS_VIEW_PROVIDERS]
})
export class NewEventComponent implements OnInit {
  @ViewChild('lgModal') public lgModal;
  public reset: boolean = true;
  public modalOpen = false;
  public currentSlide: number;
  public items = [1, 2, 3];
  constructor(private globalEventsService: GlobalEventsService) {
    globalEventsService.modalState$.subscribe(newState => {
      if (newState.modal === 'new-event' && newState.open === true) {
        this.open();
        if (this.reset) {
          this.reset = false;
          this.currentSlide = 1;
        }
      } else {
        this.close();
      }
    });
  }

  public next() {
    this.currentSlide++;
  }

  public previous() {
    --this.currentSlide;
  }

  ngOnInit() {}

  private open(): void {
    this.lgModal.show();
  }

  private close(): void {
    if (this.modalOpen === true) {
      this.lgModal.hide();
    }
  }

  private formComplete() {
    this.next();
    this.reset = true;
  }

}
