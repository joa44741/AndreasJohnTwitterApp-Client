import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ValidationFailed} from '../../services/messages';

@inject(TweetService, EventAggregator)
@inject(TweetService)
export class Tweet {
  message = '';
  picture = [];
  errorMessage = null;
  loading = false;

  constructor(ts, ea) {
    this.tweetService = ts;
    this.users = ts.users;
    this.ea = ea;
    const indexOfCurrentUser = this.users.map(u => u._id).indexOf(ts.currentUserId);
    if (indexOfCurrentUser > -1) {
      this.users.splice(indexOfCurrentUser, 1);
    }
  }

  attached() {
    this.tweetsLoadedSubscription = this.ea.subscribe(ValidationFailed, msg => {
      if (msg.validationType === 'postTweet') {
        this.errorMessage = 'The validation failed. Message must not be empty and file must not be too large';
      }
    });
  }

  detached() {
    if (this.tweetsLoadedSubscription) {
      this.tweetsLoadedSubscription.dispose();
    }
  }

  postTweet() {
    this.loading = true;
    const reader = new window.FileReader();
    reader.onload = () => {
      let file = reader.result;
      this.tweetService.postTweet(this.message, file);
    };

    if (this.picture[0]) {
      reader.readAsDataURL(this.picture[0]);
    } else {
      this.tweetService.postTweet(this.message, null);
    }
  }

}
