import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {UsersDeleted, UsersLoaded} from '../../services/messages';

@inject(TweetService, EventAggregator)
export class Statistics {

  usersWithMostFollowers = [];
  usersWithMostTweets = [];
  userCount;

  constructor(ts) {
    this.tweetService = ts;
    this.usersWithMostFollowers = this.tweetService.users.slice(0);
    this.usersWithMostFollowers.sort((a, b)=> b.followers.length - a.followers.length);
    this.usersWithMostFollowers = this.usersWithMostFollowers.slice(0, 3);

    this.usersWithMostTweets = this.tweetService.users.slice(0);
    for(let i in this.usersWithMostTweets){
      this.usersWithMostTweets[i].tweetsCount = 0;
    }

    for(let tweet of this.tweetService.tweets){
        let index = this.usersWithMostTweets.map(user => user._id).indexOf(tweet.author._id);
        if(index > -1){
          this.usersWithMostTweets[index].tweetsCount++;
        }
    }

    this.usersWithMostTweets.sort((a, b)=> b.tweetsCount - a.tweetsCount);
    this.usersWithMostTweets = this.usersWithMostTweets.slice(0, 3);

    // minus 1 because of the admin account which doesn't count
    this.userCount = this.tweetService.users.length;
    this.tweetCount = this.tweetService.tweets.length;
  }

}
