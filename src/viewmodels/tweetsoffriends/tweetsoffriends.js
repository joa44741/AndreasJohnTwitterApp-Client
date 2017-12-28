import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {FriendTweetsLoaded} from '../../services/messages';

@inject(TweetService, EventAggregator)
export class TweetsOfFriends {

  tweets = [];
  isDeletable = false;

  constructor(ts, ea) {
    this.ea = ea;
    this.tweetService = ts;
    this.tweets = ts.tweetsOfFriends;
  }

  attached() {
    this.tweetsLoadedSubscription = this.ea.subscribe(FriendTweetsLoaded, msg => {
      this.tweets = msg.loadedTweets;
    });
  }

  detached() {
    if (this.tweetsLoadedSubscription) {
      this.tweetsLoadedSubscription.dispose();
    }
  }
}
