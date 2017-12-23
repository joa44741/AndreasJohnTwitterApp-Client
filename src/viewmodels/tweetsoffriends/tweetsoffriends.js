import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';

@inject(TweetService)
export class TweetsOfFriends {

  tweets = [];
  isDeletable = false;

  constructor(ts) {
    this.tweetService = ts;
    this.tweets = ts.tweetsOfFriends;
  }
}
