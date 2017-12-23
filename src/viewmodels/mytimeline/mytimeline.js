import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {MyTweetsLoaded} from '../../services/messages';

@inject(TweetService, EventAggregator)
export class MyTimeline {

  tweets = [];
  isDeletable = true;
  isMyTimeline = true;

  selectedTweets = [];

  constructor(ts, ea) {
    this.tweetService = ts;
    this.ea = ea;
    this.tweets = ts.mytweets;
    this.user = ts.currentUser;
  }

  deleteSelectedTweets() {
    this.selectedTweets.forEach(t => this.tweetService.deleteTweet(t));
    this.tweets = this.tweetService.mytweets;
    this.selectedTweets = [];
  }

  deleteAllTweets() {
    this.tweetService.deleteMyTweets();
    this.tweets = [];
    this.selectedTweets = [];
  }

  attached() {
    this.subscription = this.ea.subscribe(MyTweetsLoaded, msg => {
      this.tweets = msg.loadedTweets;
      for (let i = 0; i < this.tweets.length; i++) {
        const tweet = this.tweets[i];
        tweet.isTweetOfCurrentUser = true;
        this.tweets[i] = tweet;
      }
    });
  }

  detached() {
    if (this.subscription) {
      this.subscription.dispose();
    }
  }
}
