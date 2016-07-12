import { Component, OnInit, ViewChild } from '@angular/core';
import { MODAL_DIRECTVES, BS_VIEW_PROVIDERS } from 'ng2-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'app-new-event',
  templateUrl: 'new-event.component.html',
  styleUrls: ['new-event.component.css'],
  directives: [MODAL_DIRECTVES],
  viewProviders:[BS_VIEW_PROVIDERS]
})
export class NewEventComponent implements OnInit {
  @ViewChild('lgModal') lgModal;
  public modalOpen = false;
  constructor() {}

  ngOnInit() {
  }

}
