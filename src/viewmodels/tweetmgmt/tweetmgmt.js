import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {TweetsLoaded} from '../../services/messages';

@inject(TweetService, EventAggregator)
export class TweetMgmt {

  users = [];
  filteredUsers = [];
  tweets = [];
  filter = '';
  selectedTweets = [];
  selectedUserId;
  selectedUser = null;
  userAll = {
    _id: -1,
    imageUrl: 'http://res.cloudinary.com/joa44741/image/upload/v1513337357/unknown_user_axspin.jpg',
    nickName: 'All users'
  }

  constructor(ts, ea) {
    this.tweetService = ts;
    this.ea = ea;
    this.tweets = this.tweetService.tweets;
    this.getUsersList();
  }

  selectUser(user) {
    this.selectedUserId = user;
    if (this.selectedUserId === this.userAll._id) {
      this.tweets = this.tweetService.tweets;
      this.selectedUser = null;
    } else {
      this.tweets = this.tweetService.tweets.filter(tweet => tweet.author._id === this.selectedUserId);
      this.selectedUser = this.users.filter(u => u._id === this.selectedUserId)[0];
    }
  }

  getUsersList() {
    this.users = [];

    this.users.push(this.userAll);

    for (let tweet of this.tweets) {
      const indexOfUser = this.users.map(u => u._id).indexOf(tweet.author._id);
      if (indexOfUser === -1) {
        this.users.push(tweet.author);
      }
    }
    this.filteredUsers = this.users;
    const indexOfUser = this.filteredUsers.map(u => u._id).indexOf(this.selectedUserId);
    if (indexOfUser === -1) {
      this.selectedUserId = null;
      this.selectedUser = null;
    }
  }

  filterChanged() {
    if (this.filter === '') {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = [];
      this.filteredUsers.push(this.userAll);
      for (let user of this.users) {
        if (user === this.userAll) {
          continue;
        }
        if (user.firstName.toUpperCase().includes(this.filter.toUpperCase()) ||
          user.lastName.toUpperCase().includes(this.filter.toUpperCase()) ||
          user.nickName.toUpperCase().includes(this.filter.toUpperCase()) ||
          user.email.toUpperCase().includes(this.filter.toUpperCase())) {
          this.filteredUsers.push(user);
        }
      }
      const index = this.filteredUsers.map(u => u._id).indexOf(this.selectedUserId);
      if (index === -1) {
        this.selectedUserId = null;
        this.selectedUser = null;
      }
    }
  }

  deleteSelectedTweets() {
    for (let tweetId of this.selectedTweets) {
      this.tweetService.deleteTweet(tweetId);
    }
  }

  deleteAllTweetsOfSelectedUser() {
    this.tweetService.deleteAllTweetsOfUser(this.selectedUserId);
  }

  deleteAllTweets() {
    this.tweetService.deleteAllTweets();
  }

  attached() {
    this.tweetsLoadedSubscription = this.ea.subscribe(TweetsLoaded, msg => {
      this.selectedTweets = [];
      this.tweets = msg.loadedTweets;
      this.getUsersList();
    });
  }

  detached() {
    if (this.tweetsLoadedSubscription) {
      this.tweetsLoadedSubscription.dispose();
    }
  }

}
