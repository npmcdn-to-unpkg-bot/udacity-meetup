import { Component, OnInit, ViewChild } from '@angular/core';
import { MODAL_DIRECTVES, BS_VIEW_PROVIDERS } from 'ng2-bootstrap';
import { GlobalEventsService } from '../../services/global-events.service';

@Component({
  moduleId: module.id,
  selector: 'app-auth-container',
  templateUrl: 'auth-container.component.html',
  styleUrls: ['auth-container.component.css'],
  directives: [MODAL_DIRECTVES],
  viewProviders:[BS_VIEW_PROVIDERS]
})
export class AuthContainerComponent implements OnInit {
  @ViewChild('lgModal') public lgModal;
  public modalOpen = false;
  constructor(private globalEventsService: GlobalEventsService) {
    globalEventsService.modalState$.subscribe(newState => {
      if (newState.modal === 'auth' && newState.open === true) {
        this.open();
      } else {
        this.close();
      }
    });
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
}
