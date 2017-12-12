import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';

@inject(TweetService)
export class Firehose {

  tweets = [];
  isDeletable = false;

  constructor(ts) {
    this.tweetService = ts;
    this.tweets = ts.tweets;
  }
}
