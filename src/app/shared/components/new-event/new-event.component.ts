import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MODAL_DIRECTIVES, BS_VIEW_PROVIDERS } from 'ng2-bootstrap';
import { GlobalEventsService } from '../../services/global-events.service';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { SignInUpComponent } from '../sign-in-up';
import { FormComponent } from '../form';
import {
  Validators
} from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'app-new-event',
  templateUrl: 'new-event.component.html',
  styleUrls: ['new-event.component.scss'],
  directives: [
    MODAL_DIRECTIVES,
    SignInUpComponent,
    FormComponent,
    ROUTER_DIRECTIVES
  ],
  viewProviders: [BS_VIEW_PROVIDERS]
})
export class NewEventComponent implements OnInit {
  @ViewChild('lgModal') lgModal;
  @ViewChild('form1') form1;
  @ViewChild('form2') form2;
  @ViewChild('form3') form3;
  public reset: boolean = true;
  public modalOpen = false;
  public currentSlide: number;
  public slideTitle: string;
  public updateSlideNumberOnOpen: boolean = false;
  public form2Data;
  public items = [];
  public domain: string;
  public generatedId: string;
  public showSignup: boolean;
  public offset: number = 1;
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
  public form2Info: any = {
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
          selectData: this.eventTypes,
          control: ['', Validators.required]
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
          type: 'input',
          inputType: 'date',
          classes: 'left-input',
          ariaLabel: 'This is the start date input for your event.',
          dateGroup: 'd1',
          control: [
            '',
            [
              Validators.required,
              ValidationService.validDate,
              ValidationService.futureDate
            ]
          ]
        },
        {
          name: 'time',
          type: 'select',
          selectType: 'time',
          classes: 'right-input',
          ariaLabel: 'This is the start time input for your event.',
          dateGroup: 't1',
          control: ['', Validators.required]
        },
        {
          type: 'instructions',
          message: 'End',
          classes: 'group-label'
        },
        {
          name: 'date',
          type: 'input',
          inputType: 'date',
          classes: 'left-input',
          ariaLabel: 'This is the end date input for your event.',
          dateGroup: 'd2',
          control: [
            '',
            [
              Validators.required,
              ValidationService.validDate,
              ValidationService.futureDate
            ]
          ]
        },
        {
          name: 'time',
          type: 'select',
          selectType: 'time',
          classes: 'right-input',
          ariaLabel: 'This is the end time input for your event.',
          dateGroup: 't2',
          control: ['', Validators.required]
        },
        {
          type: 'submit',
          text: 'Next'
        }
      ]
    }
  };
  public form3Info: any = {
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
          name: 'Event capacity',
          type: 'select',
          selectType: 'default',
          selectData: [
            '1-10 People', '11-30 People', '31-50 People', '51-100 People',
            '100-150 People', '151-300 People', '301-500 People', '501-750 People',
            '751-1000 People', 'More than 1000 People'
          ],
          control: ['', Validators.required]
        },
        {
          name: 'Guest list',
          type: 'input',
          inputType: 'text',
          control: ['']
        },
        {
          name: 'Optional message to guests',
          type: 'textarea',
          control: ['']
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
    private authService: AuthService,
    private router: Router) {}

  public ngOnInit(): void {
    this.domain = location.protocol + '//'
      + location.hostname
      + (location.port ? ':' + location.port : '');
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

  public updateNumberOfSlides(): void {
    let formPages: number = this.itemsInfo.length - 1;
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
      this.items.push(i + 1);
    }
    this.updateSlideNumberOnOpen = false;
  }

  public tabIndex(slideNumber): number {
    if (slideNumber !== this.currentSlide) {
      return -1;
    } else {
      return 1;
    }
  }

  public next(): void {
    this.currentSlide++;
    this.onSlideChange();
  }

  public saveForm2(formInfo): void {
    // Save initial data
    this.form2Data = formInfo;
    this.form2Data.venue = {
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
      if (data.results[0] !== undefined) {
        this.form2Data.venue.latitude = data.results[0].geometry.location.lat;
        this.form2Data.venue.longitude = data.results[0].geometry.location.lng;
        if ('address_components' in data.results[0]
          && data.results[0].address_components !== undefined) {
          for (let i = 0; i < data.results[0].address_components.length; i++) {
            if (data.results[0].address_components[i].types[0] === 'administrative_area_level_1') {
              let region = data.results[0].address_components[i].long_name;
              this.form2Data.venue.address.region = region;
            }
          }
        }
      } else {
        console.warn('It looks like something is wrong with the Google Maps Api.', data);
      }
    });
  }

  public onShown(): void {
    this.onSlideChange(0);
  }

  public previous(): void {
    --this.currentSlide;
    this.onSlideChange();
  }

  public goToEvent(eventId): void {
    this.router.navigate(['/event', eventId]);
    this.lgModal.hide();
  }

  public allFormsComplete(formInfo): void {
    let rawEventData = Object.assign(this.form2Data, formInfo);
    this.generatedId = this.apiService.getlocalEventId();
    let eventData = {
      createdLocally: true, // created in the browser and not through an api
      local: {
        event: {
          type: rawEventData.eventType,
          host: rawEventData.eventHost,
          guestList: rawEventData.guestList,
          guestMessage: rawEventData.optionalMessageToGuests,
          capacity: rawEventData.eventCapacity
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
      end: this.parseFormatDate(rawEventData.date1, rawEventData.time2),
      id: this.generatedId,
      logo: {
        url: rawEventData.eventImage
      },
      name: {
        text: rawEventData.eventName
      },
      organizer_id: this.generatedId,
      start: this.parseFormatDate(rawEventData.date1, rawEventData.time2),
      url : 'mailto:' + this.authService.getUserEmail() + '?Subject=Sign%20me%20up!'
    };
    this.apiService.addEvent(eventData);
    this.next();
    this.reset = true;
  }

  private parseFormatDate(dateInput, timeInput) {
    let thisMoment;
    if (moment( dateInput, 'M/D/YYYY' ).isValid()) {
      thisMoment = moment( dateInput, 'M/D/YYYY' );
    } else if (moment( dateInput, 'YYYY-MM-DD' ).isValid()) {
      thisMoment = moment( dateInput, 'YYYY-MM-DD' );
    }
    return {
      local: thisMoment.format('YYYY-MM-DDTHH:mm:ss'),
      utc: thisMoment.valueOf()
    };
  }

  private onSlideChange(delay?: number): void {
    if (delay === undefined) { delay = 1000; }
    if (this.currentSlide !== 1) { // Let sign-in-up control title
      this.slideTitle = this.itemsInfo[this.currentSlide - 1].title;
    }
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
    this.updateNumberOfSlides();
    if (this.showSignup) {
      this.form1.reset();
    }
    this.form2.reset();
    this.form3.reset();
    this.generatedId = undefined;
  }

}
