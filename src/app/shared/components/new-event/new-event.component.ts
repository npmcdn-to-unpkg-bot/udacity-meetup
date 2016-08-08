import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MODAL_DIRECTIVES, BS_VIEW_PROVIDERS } from 'ng2-bootstrap';
import { GlobalEventsService } from '../../services/global-events.service';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { SignInUpComponent } from '../sign-in-up';
import { FormComponent } from '../form';
import {
  REACTIVE_FORM_DIRECTIVES,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'app-new-event',
  templateUrl: 'new-event.component.html',
  styleUrls: ['new-event.component.css'],
  directives: [MODAL_DIRECTIVES, SignInUpComponent, FormComponent],
  viewProviders:[BS_VIEW_PROVIDERS]
})
export class NewEventComponent implements OnInit {
  @ViewChild('lgModal') lgModal;
  @ViewChild('form1') form1;
  @ViewChild('form2') form2;
  @ViewChild('form3') form3;
  public reset:boolean = true;
  public modalOpen = false;
  public currentSlide:number;
  public slideTitle:string;
  public updateSlideNumberOnOpen:boolean = false;
  public form2Data = {};
  public items = [];
  public showSignup:boolean;
  public offset:number = 1;
  public itemsInfo = [
    {
      title: 'Sign up'
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
      title: 'Event info',
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
          type: 'instructions',
          message: 'Location',
          classes: 'group-label'
        },
        {
          name: 'Street',
          type: 'input',
          inputType: 'text',
          addListener: 'location'
        },
        {
          name: 'City',
          type: 'input',
          inputType: 'text',
          control: ['', Validators.required]
        },
        {
          name: 'Zip',
          type: 'input',
          inputType: 'text',
          control: ['']
        },
        {
          name: 'Country',
          type: 'input',
          inputType: 'text',
          control: ['', Validators.required]
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
      title: 'Event details',
      instructions: 'Fill out your event details here.',
      fields: [
        {
          name: 'Event host',
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
          text: 'Create Event!'
        }
      ]
    }
  };

  constructor(
    private globalEventsService: GlobalEventsService,
    private element: ElementRef,
    private apiService: ApiService,
    private authService: AuthService) {}

  public ngOnInit():void {
    this.authService.authState$.subscribe(authenticated => {
      if (authenticated === true) {
        this.updateSlideNumberOnOpen = true;
      } else {
        this.updateSlideNumberOnOpen = true;
      }
    });
    this.globalEventsService.modalState$.subscribe(newState => {
      if (newState.modal === 'new-event' && newState.open === true) {
        this.open();
        if (this.reset) {
          this.reset = false;
          this.formInit();
        }
        if (this.updateSlideNumberOnOpen) {
          // Update number of slides
          this.updateNumberOfSlides();
        }
      } else {
        this.close();
      }
    });
    this.updateNumberOfSlides();
  }

  public updateNumberOfSlides() {
    let formPages:number = this.itemsInfo.length - 1;
    if (this.authService.checkAuth() === true) { // If signed in
      formPages -= 1;
      this.showSignup = false;
      this.currentSlide = 2;
      this.slideTitle = this.itemsInfo[1].title;
      this.offset = 2;
    } else { // If signed out
      this.showSignup = true;
      this.slideTitle = this.itemsInfo[0].title;
      this.currentSlide = 1;
      this.offset = 1;
    }
    this.items = [];
    for (let i = 0; i < formPages; i++) {
      this.items.push(i+1);
    }
    this.updateSlideNumberOnOpen = false;
  }

  public tabIndex(slideNumber): number {
    if (slideNumber !== this.currentSlide) {
      return -1;
    }
  }

  public next():void {
    this.currentSlide++;
    this.onSlideChange();
  }

  public saveForm2(formInfo) {
    // Save initial data
    this.form2Data = formInfo;
    this.form2Data['venue'] = {
      latitude: '',
      longitude: '',
      address: {
        city: formInfo.city,
        region: '',
        country: formInfo.country,
        address_1: formInfo.street
      }
    };
    // Move to next form page
    this.next();
    // Address string
    let address = formInfo.street + ', ' + formInfo.city + ' ' + formInfo.zip;
    // Get cordinates
    this.apiService.getCordinates(address).subscribe(data => {
      this.form2Data['venue']['latitude'] = data.results[0].geometry.location.lat;
      this.form2Data['venue']['longitude'] = data.results[0].geometry.location.lng;
      for (let i = 0; i < data.results[0].address_components.length; i++) {
        if (data.results[0].address_components[i].types[0] === 'administrative_area_level_1') {
          this.form2Data['venue']['address']['region'] = data.results[0].address_components[i].long_name;
        }
      }
    });
  }

  public onShown():void {
    this.onSlideChange(0);
  }

  public previous():void {
    --this.currentSlide;
    this.onSlideChange();
  }


  private parseFormatDate(dateInput, timeInput):string {
    return moment( dateInput +  ' ' + timeInput, 'MMMM D, YYYY h:mma' ).format('YYYY-MM-DDTHH:mm:ss');
  }

  private onSlideChange(delay?: number):void {
    if (delay === undefined) { delay = 1000 }
    if (this.currentSlide !== 1) { // Let sign-in-up control title
      this.slideTitle = this.itemsInfo[this.currentSlide-1].title;
    }
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
    this.updateNumberOfSlides();
    if (this.showSignup) {
      this.form1.reset();
    }
    this.form2.reset();
    this.form3.reset();
  }

  private allFormsComplete(formInfo):void {
    let rawEventData = Object.assign(this.form2Data, formInfo);

    let eventData = {
      createdLocally: true, // created in the browser and not through an api
      local: {
        event: {
          type: rawEventData.eventType,
          host: rawEventData.eventHost,
          guestList: rawEventData.guestList,
          guestMessage: rawEventData.optionalMessageToGuests
        },
        profile: this.authService.getProfileInfo()
      },
      description: {
        html: rawEventData.eventDescription
      },
      details: {
        media: {
          url: rawEventData.eventImage
        },
        venue: rawEventData.venue
      },
      end: {
        local: this.parseFormatDate(rawEventData.date1, rawEventData.time2)
      },
      id: 'local-1',
      logo: {
        url: rawEventData.eventImage
      },
      name: {
        text: rawEventData.eventName
      },
      start: {
        local: this.parseFormatDate(rawEventData.date, rawEventData.time)
      },
      url : 'mailto:' + this.authService.getUserEmail() + '?Subject=Sign%20me%20up!'
    };
    console.log(eventData);
    this.apiService.addEvent(eventData);
    this.next();
    this.reset = true;
  }

}
