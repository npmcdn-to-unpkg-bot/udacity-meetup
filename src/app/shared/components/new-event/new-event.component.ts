import { Component, OnInit, ViewChild } from '@angular/core';
import { MODAL_DIRECTVES, BS_VIEW_PROVIDERS } from 'ng2-bootstrap';
import { GlobalEventsService } from '../../services/global-events.service';
import { SignInUpComponent } from '../sign-in-up';
import { InputComponent } from '../input';

@Component({
  moduleId: module.id,
  selector: 'app-new-event',
  templateUrl: 'new-event.component.html',
  styleUrls: ['new-event.component.css'],
  directives: [MODAL_DIRECTVES, SignInUpComponent, InputComponent],
  viewProviders:[BS_VIEW_PROVIDERS]
})
export class NewEventComponent implements OnInit {
  @ViewChild('lgModal') public lgModal;
  @ViewChild('form1') public form1;
  @ViewChild('form2') public form2;
  @ViewChild('form3') public form3;
  public reset: boolean = true;
  public modalOpen = false;
  public currentSlide: number;
  public slideTitle: string;
  public items = [];
  public itemsInfo = [
    {
      title: 'Account'
    },
    {
      title: 'Form 1'
    },
    {
      title: 'Form 2'
    },
    {
      title: 'Confirmation'
    }
  ];
  constructor(private globalEventsService: GlobalEventsService) {}

  public next(): void {
    this.currentSlide++;
    this.onSlideChange();
  }

  public previous(): void {
    --this.currentSlide;
    this.onSlideChange();
  }

  public ngOnInit(): void {
    this.globalEventsService.modalState$.subscribe(newState => {
      if (newState.modal === 'new-event' && newState.open === true) {
        this.open();
        if (this.reset) {
          this.reset = false;
          this.formInit();
        }
      } else {
        this.close();
      }
    });
    let formPages: number = this.itemsInfo.length - 1;
    for (let i = 0; i < formPages; i++) {
      this.items.push(i+1);
    }
  }

  private onSlideChange(): void {
    this.slideTitle = this.itemsInfo[this.currentSlide-1].title;
    if (this.currentSlide < 4) {
      this['form' + this.currentSlide].setFocus();
    }
  }

  private open(): void {
    this.lgModal.show();
  }

  private close(): void {
    if (this.modalOpen === true) {
      this.lgModal.hide();
    }
  }

  private formInit(): void {
    this.currentSlide = 1;
    this.onSlideChange();
  }

  private formComplete(): void {
    this.next();
    this.reset = true;
  }

}
