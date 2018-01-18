import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {LoginStatus} from '../../services/messages';

@inject(TweetService, EventAggregator)
export class Login {

  errorMessage = null;
  email = '';
  password = '';
  counter = 0;

  constructor(ts, ea) {
    this.tweetService = ts;
    ea.subscribe(LoginStatus, msg => {
      if (msg.status.wrongLoginData) {
        this.counter++;
        this.errorMessage = 'wrong login data (' + this.counter + ' tries already)';
        console.log(this.errorMessage);
      } else if (msg.status.success) {
        this.counter = 0;
        this.errorMessage = null;
      }
    });
  }

  login(e) {
    console.log(`Trying to log in ${this.email}`);
    this.tweetService.login(this.email, this.password);
  }
}
