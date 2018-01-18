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
          console.log(status);
          if (msg.status.isAdmin) {
            au.setRoot('admin');
          } else {
            au.setRoot('home');
            this.tweetService.getDataForLoggedInUser();
          }
        } else {
          au.setRoot('app');
        }
      }
    });
  }

  configureRouter(config, router) {
    config.map([
      { route: '', name: 'firehose', moduleId: 'viewmodels/firehose/firehose', nav: true, title: 'Global Tweets' },
      { route: 'signup', name: 'signup', moduleId: 'viewmodels/signup/signup', nav: true, title: 'Signup' },
      { route: 'login', name: 'login', moduleId: 'viewmodels/login/login', nav: true, title: 'Login' }
    ]);
    this.router = router;
  }

  attached() {
    if (this.tweetService.isAuthenticated()) {
      this.tweetService.getLoggedInUserPromise().then(res => {
        const userId = res.content.currentUserId;
        return this.tweetService.getUserPromise(userId);
      }).then(res => {
        const user = res.content;
        if (user.isAdmin) {
          this.au.setRoot('admin').then(() => {
            this.router.navigateToRoute('usermgmt');
          });
        } else {
          this.tweetService.getDataForLoggedInUser();
          this.au.setRoot('home').then(() => {
            this.router.navigateToRoute('firehose');
          });
        }
      });
    }
  }
}
