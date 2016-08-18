import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import * as moment from 'moment';

@Injectable()
export class EasterEggService {

  constructor(private apiService: ApiService) {}

  public init(): void {
    let eventInfo = this.getInfo();
    setTimeout( () => {
      this.apiService.addEvent( eventInfo );
    }, 15000);
  }

  private getInfo() {
    let date = this.getDate();
    let generatedId = this.apiService.getlocalEventId();
    // Event data
    return {
      createdLocally: true,
      local: {
        event: {
          type: 'Family Event',
          host: 'Andy Dwyer',
          capacity: 'More than 1000 People',
          guestList: 'Leslie Knope, April Ludgate, Tom Haverford, Ron Swanson, Ben Wyatt,'
            + ' Jerry Gergich, Chris Traeger, Ann Perkins',
          guestMessage: " We'd like to encourage everyone to buy our merchandise. All the proceeds"
            + ' will go towards Li\'l Sebastian\'s favorite charity, the Afghan Institute of'
            + ' Learning.'
        },
        profile: {
          name: 'Leslie Knope',
          employer: 'Parks and Recreation Department of Pawnee',
          job: 'Deputy Director',
          birthday: 'September 16, 1971'
        }
      },
      description: {
        html: '<p>He was an animal, a legend, a friend. He was our beacon of light. He was '
          + 'Pawnee\'s horse. In what is surely the most monumental news to come out of Pawnee '
          + 'since the eradication of smallpox in 1993, it is with sorrow that we report Li\'l '
          + 'Sebastian is dead. But he will never leave our hearts and our memories.</p>'
          + '<p>Sebastian may have been li\'l, but his impact on this town, and the Parks '
          + 'Department, was anything but li\'l. When his owners, Michael and Elizabeth Stone,'
          + ' first discovered him, Elizabeth says it was "like seeing an angel and being punched'
          + ' in the gut at the same time - because as perfect as he was, we knew we\'d never see'
          + ' anything that perfect again." Michael goes on to say, "I love my wife, I do. But I '
          + 'LOVED Li\'l Sebastian."</p><br><br><iframe width="560" height="315" '
          + 'src="https://www.youtube.com/embed/h-PUW6y4F6c?list=RDh-PUW6y4F6c" frameborder="0" '
          + 'allowfullscreen></iframe>'
      },
      details: {
        media: {
          url: 'app/assets/sebastian.jpg'
        },
        venue: {
          latitude: '39.7797003',
          longitude: '-87.2533633',
          address: {
            city: 'Pawnee',
            region: 'Indiana',
            country: 'US',
            address_1: 'Harvest Festival Headquarters'
          }
        }
      },
      end: date.end,
      id: generatedId,
      logo: {
        url: 'app/assets/sebastian.jpg'
      },
      name: {
        text: 'Good bye Li\'l Sebastian'
      },
      organizer_id: generatedId,
      start: date.start,
      url : 'http://parksandrecreation.wikia.com/wiki/Li\'l_Sebastian'
    };
  }
  private getDate() {
    // Dynamic start date
    let baseMoment = moment().day(10); // next Wednesday
    let format = 'YYYY-MM-DDTHH:mm:ss';
    let startMoment = moment( baseMoment.format('YYYY-MM-DD') + 'T19:30:00', format );
    let endMoment = moment( baseMoment.format('YYYY-MM-DD') + 'T21:00:00', format );
    return {
      start: {
        local: startMoment.format(format),
        utc: startMoment.valueOf()
      },
      end: {
        local: endMoment.format(format),
        utc: endMoment.valueOf()
      }
    };
  }

}
