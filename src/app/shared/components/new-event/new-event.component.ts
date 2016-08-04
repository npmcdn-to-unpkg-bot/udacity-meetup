import { Component, OnInit, ViewChild } from '@angular/core';
import { MODAL_DIRECTIVES, BS_VIEW_PROVIDERS } from 'ng2-bootstrap';
import { GlobalEventsService } from '../../services/global-events.service';
import { SignInUpComponent } from '../sign-in-up';
import { FormComponent } from '../form';
import {
  REACTIVE_FORM_DIRECTIVES,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ValidationService } from '../../services/validation.service';

@Component({
  moduleId: module.id,
  selector: 'app-new-event',
  templateUrl: 'new-event.component.html',
  styleUrls: ['new-event.component.css'],
  directives: [MODAL_DIRECTIVES, SignInUpComponent, FormComponent],
  viewProviders:[BS_VIEW_PROVIDERS]
})
export class NewEventComponent implements OnInit {
  @ViewChild('lgModal') public lgModal;
  @ViewChild('form1') public form1;
  @ViewChild('form2') public form2;
  @ViewChild('form3') public form3;
  public reset:boolean = true;
  public modalOpen = false;
  public currentSlide:number;
  public slideTitle:string;
  public items = [];
  public itemsInfo = [
    {
      title: 'Account'
    },
    {
      title: 'Event info'
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
  public form2Info:any = {
    form2: {
      description: 'Event info',
      instructions: 'Fill out your event info here.',
      fields: [
        {
          name: 'Event name',
          type: 'input',
          inputType: 'text',
          control: ['', Validators.required]
        },
        {
          name: 'Event description',
          type: 'textarea',
          control: ['', Validators.required]
        },
        {
          name: 'Event type',
          type: 'select',
          selectType: 'default',
          selectData: this.eventTypes
        },
        {
          name: 'Location',
          type: 'text',
          addListener: 'location'
        },
        {
          type: 'instructions',
          message: 'Start',
          classes: 'group-label'
        },
        {
          name: 'date',
          type: 'datepicker',
          classes: 'left-input'
        },
        {
          name: 'time',
          type: 'select',
          selectType: 'time',
          classes: 'right-input'
        },
        {
          type: 'instructions',
          message: 'End',
          classes: 'group-label'
        },
        {
          name: 'date',
          type: 'datepicker',
          classes: 'left-input'
        },
        {
          name: 'time',
          type: 'select',
          selectType: 'time',
          classes: 'right-input'
        },
        {
          type: 'submit',
          text: 'Next'
        }
      ]
    }
  };
  public form3Info:any = {
    form3: {
      description: 'Event details',
      instructions: 'Fill out your event details here.',
      fields: [
        {
          name: 'Event Host',
          type: 'input',
          inputType: 'text',
          control: ['', Validators.required]
        },
        {
          name: 'Event image',
          type: 'input',
          inputType: 'file',
          control: ['', Validators.required]
        },
        {
          name: 'Guest list',
          type: 'input',
          inputType: 'text',
          control: ['', Validators.required]
        },
        {
          name: 'Optional message to guests',
          type: 'textarea',
          control: ['', Validators.required]
        },
        {
          type: 'submit',
          text: 'Send'
        }
      ]
    }
  };

  constructor(private globalEventsService: GlobalEventsService) {}

  public tabIndex(slideNumber): number {
    if (slideNumber !== this.currentSlide) {
      return -1;
    }
  }

  public next():void {
    this.currentSlide++;
    this.onSlideChange();
  }

  public onShown():void {
    this.onSlideChange(0);
  }

  public previous():void {
    --this.currentSlide;
    this.onSlideChange();
  }

  public ngOnInit():void {

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
    let formPages:number = this.itemsInfo.length - 1;
    for (let i = 0; i < formPages; i++) {
      this.items.push(i+1);
    }
  }

  private onSlideChange(delay?: number):void {
    if (delay === undefined) { delay = 1000 }
    this.slideTitle = this.itemsInfo[this.currentSlide-1].title;
    if (this.currentSlide < 4) {
      this['form' + this.currentSlide].setFocus(delay);
    }
  }

  private open():void {
    this.lgModal.show();
  }

  private close():void {
    if (this.modalOpen === true) {
      this.lgModal.hide();
    }
  }

  private formInit():void {
    this.currentSlide = 1;
    this.form1.reset();
    this.form2.reset();
    this.form3.reset();
  }

  private formComplete():void {
    this.next();
    this.reset = true;
  }

}
