import { Component, OnInit, ViewChild } from '@angular/core';
import { MODAL_DIRECTIVES, BS_VIEW_PROVIDERS } from 'ng2-bootstrap';
import { GlobalEventsService } from '../../services/global-events.service';
import { SignInUpComponent } from '../sign-in-up/index';

@Component({
  moduleId: module.id,
  selector: 'app-auth-container',
  templateUrl: 'auth-container.component.html',
  styleUrls: ['auth-container.component.css'],
  directives: [MODAL_DIRECTIVES, SignInUpComponent],
  viewProviders:[BS_VIEW_PROVIDERS]
})
export class AuthContainerComponent implements OnInit {
  @ViewChild('lgModal') public lgModal;
  @ViewChild('form') form;
  public slideTitle:string = 'Sign in';
  public modalOpen:boolean = false;
  public reset:boolean = true;
  constructor(private globalEventsService: GlobalEventsService) {
    globalEventsService.modalState$.subscribe(newState => {
      if (newState.modal === 'auth' && newState.open === true) {
        this.open();
        if (this.reset) {
          this.reset = false;
          this.formInit();
        }
      } else {
        this.close();
      }
    });
  }

  ngOnInit() {}
  public done():void {
    this.reset = true;
    this.lgModal.hide();
  }

  private formInit():void {
    this.form.reset();
  }

  private open(): void {
    this.lgModal.show();
  }

  private close(): void {
    if (this.modalOpen === true) {
      this.lgModal.hide();
    }
  }
}
