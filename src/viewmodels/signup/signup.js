import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ValidationFailed} from '../../services/messages';

@inject(TweetService, EventAggregator)
export class Signup {

  firstName = 'Adam';
  lastName = 'Bien';
  nickName = 'JavaEE-Guru'
  email = 'adam@bien.com';
  password = 'secret';
  errorMessage = null;

  constructor(ts, ea) {
    this.tweetService = ts;
    ea.subscribe(ValidationFailed, msg => {
      if (msg.validationType === 'signup') {
        this.errorMessage = 'Signup process failed. Maybe the email address is already in use.';
        console.log(this.errorMessage);
      } else if (msg.status.success) {
        this.counter = 0;
        this.errorMessage = null;
      }
    });
  }

  register(e) {
    this.tweetService.register(this.firstName, this.lastName, this.nickName, this.email, this.password);
  }
}