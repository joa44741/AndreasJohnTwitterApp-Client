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
      { route: ['', 'usermgmt'], name: 'usermgmt', moduleId: 'viewmodels/usermgmt/usermgmt', nav: true, title: 'User management' },
      { route: 'tweetmgmt', name: 'tweetmgmt', moduleId: 'viewmodels/tweetmgmt/tweetmgmt', nav: true, title: 'Tweet management' },
      { route: 'statistics', name: 'statistics', moduleId: 'viewmodels/statistics/statistics', nav: true, title: 'Statistics' },
      { route: 'logout', name: 'logout', moduleId: 'viewmodels/logout/logout', nav: true, title: 'Logout' }
    ]);
    this.router = router;

    config.mapUnknownRoutes(instruction => {
      return 'admin';
    });
  }
}
