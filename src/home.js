import { inject, Aurelia } from 'aurelia-framework';

@inject(Aurelia)
export class Home {

  constructor(au) {
    this.aurelia = au;
  }

  configureRouter(config, router) {
    config.map([
      { route: ['', 'home'], name: 'firehose', moduleId: 'viewmodels/firehose/firehose', nav: true, title: 'Global Tweets' },
      { route: 'tweetsoffriends', name: 'tweetsoffriends', moduleId: 'viewmodels/tweetsoffriends/tweetsoffriends', nav: true, title: 'Tweets of friends' },
      { route: 'searchusers', name: 'searchusers', moduleId: 'viewmodels/searchusers/searchusers', nav: true, title: 'Search for users' },
      { route: 'mytimeline', name: 'mytimeline', moduleId: 'viewmodels/mytimeline/mytimeline', nav: true, title: 'My Timeline' },
      { route: 'tweet', name: 'tweet', moduleId: 'viewmodels/tweet/tweet', nav: true, title: 'New Tweet!' },
      { route: 'logout', name: 'logout', moduleId: 'viewmodels/logout/logout', nav: true, title: 'Logout' }
    ]);
    this.router = router;

    config.mapUnknownRoutes(instruction => {
      return 'home';
    });
  }
}
