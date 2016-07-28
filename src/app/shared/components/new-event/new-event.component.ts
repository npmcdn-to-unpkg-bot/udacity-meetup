import { Component, OnInit, ViewChild } from '@angular/core';
import { MODAL_DIRECTIVES, BS_VIEW_PROVIDERS, DATEPICKER_DIRECTIVES } from 'ng2-bootstrap';
import { GlobalEventsService } from '../../services/global-events.service';
import { SignInUpComponent } from '../sign-in-up';
import { InputComponent } from '../input';



@Component({
  moduleId: module.id,
  selector: 'app-new-event',
  templateUrl: 'new-event.component.html',
  styleUrls: ['new-event.component.css'],
  directives: [MODAL_DIRECTIVES, SignInUpComponent, InputComponent, DATEPICKER_DIRECTIVES],
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
      title: 'Even info'
    },
    {
      title: 'Event details'
    },
    {
      title: 'Confirmation'
    }
  ];
  public eventTypes: Array<string> = [
  'Conference', 'Seminar', 'Meeting', 'Team Building',
  'Trade Show', 'Business Dinner', 'Press Conference',
  'Networking', 'Opening Ceremony', 'Product Launche',
  'Theme Party', 'VIP Event', 'Trade Fair', 'Shareholder Meeting',
  'Award Ceremony', 'Board Meeting', 'Executive Retreat',
  'Wedding', 'Birthday', 'Wedding Anniversary', 'Family Event'
  ];
  public times: Array<string> = [
    '12:00am', '12:30am', '1:00am', '1:30am', '2:00am', '2:30am',
    '3:00am', '3:30am', '4:00am', '4:30am', '5:00am', '5:30am',
    '6:00am', '6:30am', '7:00am', '7:30am', '8:00am', '8:30am',
    '9:00am', '9:30pm', '10:00am', '10:30pm', '11:00am', '11:30pm',
    '12:00pm', '12:30pm', '1:00pm', '1:30pm', '2:00pm', '2:30pm',
    '3:00pm', '3:30pm', '4:00pm', '4:30pm', '5:00pm', '5:30pm',
    '6:00pm', '6:30pm', '7:00pm', '7:30pm', '8:00pm', '8:30pm',
    '9:00pm', '9:30pm', '10:00pm', '10:30pm', '11:00pm', '11:30pm'
  ];


  public minDate:Date = void 0;
  public dt:Date = new Date();



  constructor(private globalEventsService: GlobalEventsService) {}

  public tabIndex(slideNumber): number {
    if (slideNumber !== this.currentSlide) {
      return -1;
    }
  }

  public next(): void {
    this.currentSlide++;
    this.onSlideChange();
  }

  public onShown(): void {
    this.onSlideChange(0);
  }

  public previous(): void {
    --this.currentSlide;
    this.onSlideChange();
  }

  public ngOnInit(): void {
    (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
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

  private onSlideChange(delay?: number): void {
    if (delay === undefined) { delay = 1000 }
    this.slideTitle = this.itemsInfo[this.currentSlide-1].title;
    if (this.currentSlide < 4) {
      this['form' + this.currentSlide].setFocus(delay);
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
    this.form1.reset();
  }

  private formComplete(): void {
    this.next();
    this.reset = true;
  }

}
