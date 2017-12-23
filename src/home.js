import { inject, Aurelia } from 'aurelia-framework';
import TweetService from './services/tweet-service';

@inject(TweetService, Aurelia)
export class Home {

  constructor(ts, au) {
    this.tweetService = ts;
    this.aurelia = au;
    this.tweetService.getDataForLoggedInUser();
  }

  configureRouter(config, router) {
    config.map([
      { route: ['', 'home'], name: 'firehose', moduleId: 'viewmodels/firehose/firehose', nav: true, title: 'Global Tweets' },
      { route: 'tweetsoffriends', name: 'tweetsoffriends', moduleId: 'viewmodels/tweetsoffriends/tweetsoffriends', nav: true, title: 'Tweets of friends' },
      { route: 'searchusers', name: 'searchusers', moduleId: 'viewmodels/searchusers/searchusers', nav: true, title: 'Search for users' },
      { route: 'mytimeline', name: 'mytimeline', moduleId: 'viewmodels/mytimeline/mytimeline', nav: true, title: 'My Timeline' },
      { route: 'showtimeline/:id', name: 'showtimeline', moduleId: 'viewmodels/showtimeline/showtimeline', nav: false, title: 'Show Timeline' },
      { route: 'tweet', name: 'tweet', moduleId: 'viewmodels/tweet/tweet', nav: true, title: 'New Tweet!' },
      { route: 'settings', name: 'settings', moduleId: 'viewmodels/settings/settings', nav: true, title: 'Settings' },
      { route: 'logout', name: 'logout', moduleId: 'viewmodels/logout/logout', nav: true, title: 'Logout' }
    ]);
    this.router = router;

    config.mapUnknownRoutes(instruction => {
      return 'home';
    });
  }
}
