import { UdacityMeetupPage } from './app.po';

describe('udacity-meetup App', function() {
  let page: UdacityMeetupPage;

  beforeEach(() => {
    page = new UdacityMeetupPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
