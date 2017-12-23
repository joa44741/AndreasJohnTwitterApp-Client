import {inject, Aurelia} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {LoginStatus} from './services/messages';
import TweetService from './services/tweet-service';

@inject(TweetService, Aurelia, EventAggregator)
export class App {

  constructor(ts, au, ea) {
    this.au = au;
    this.tweetService = ts;

    ea.subscribe(LoginStatus, msg => {
      console.log(msg.status.wrongLoginData);
      if (!msg.status.wrongLoginData) {
        this.router.navigate('/', { replace: true, trigger: false });
        this.router.reset();
        if (msg.status.success === true) {
          this.tweetService.getDataForLoggedInUser();
          au.setRoot('home');
        } else {
          au.setRoot('app');
        }
      }
    });
  }

  configureRouter(config, router) {
    config.map([
      { route: '', name: 'firehose', moduleId: 'viewmodels/firehose/firehose', nav: true, title: 'Global' },
      { route: 'signup', name: 'signup', moduleId: 'viewmodels/signup/signup', nav: true, title: 'Signup' },
      { route: 'login', name: 'login', moduleId: 'viewmodels/login/login', nav: true, title: 'Login' }
    ]);
    this.router = router;
  }

  attached() {
    if (this.tweetService.isAuthenticated()) {
      this.tweetService.getDataForLoggedInUser();
      this.au.setRoot('home').then(() => {
        this.router.navigateToRoute('firehose');
      });
    }
  }
}
