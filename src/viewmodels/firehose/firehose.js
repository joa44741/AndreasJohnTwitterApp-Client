import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {TweetsLoaded} from '../../services/messages';
import TweetService from '../../services/tweet-service';

@inject(TweetService, EventAggregator)
export class Firehose {

  tweets = [];
  isDeletable = false;

  constructor(ts, ea) {
    this.tweetService = ts;
    this.tweets = this.tweetService.tweets;
    this.markOwnTweets();
    this.ea = ea;

    if (this.tweetsLoadedSubscription) {
      this.tweetsLoadedSubscription.dispose();
    }
    this.tweetsLoadedSubscription = this.ea.subscribe(TweetsLoaded, msg => {
      this.tweets = msg.loadedTweets;
      this.markOwnTweets();
    });
  }

  markOwnTweets() {
    for (let i = 0; i < this.tweets.length; i++) {
      const tweet = this.tweets[i];
      if (tweet.author._id === this.tweetService.currentUserId) {
        tweet.isTweetOfCurrentUser = true;
        this.tweets[i] = tweet;
      }
    }
  }
}
