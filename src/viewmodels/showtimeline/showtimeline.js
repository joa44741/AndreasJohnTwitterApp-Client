import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';
import Formatter from '../../services/formatter';

@inject(TweetService, Formatter)
export class ShowTimeline {

  tweets = [];
  isDeletable = false;
  isMyTimeline = false;

  constructor(ts, formatter) {
    this.tweetService = ts;
    this.formatter = formatter;
  }

  activate(params) {
    const index = this.tweetService.users.map(u => u._id).indexOf(params.id);
    this.user = this.tweetService.users[index];
    this.tweetService.getTweetsOfUser(params.id).then(res => {
      this.tweets = res.content;
      this.formatter.formatTweetCreationDates(this.tweets);
    });

    this.isFollowing = this.tweetService.currentUser.followings.indexOf(params.id) > -1;
  }

  followUser() {
    this.tweetService.followUser(this.user._id);
    this.isFollowing = true;
    this.user.followers.push(this.tweetService.currentUserId);
  }

  unfollowUser() {
    this.tweetService.unfollowUser(this.user._id);
    this.isFollowing = false;

    const index = this.user.followers.indexOf(this.tweetService.currentUserId);
    if (index > -1) {
      this.user.followers.splice(index, 1);
    }
  }
}
