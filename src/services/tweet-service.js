import {inject, bindable} from 'aurelia-framework';
import Fixtures from './fixtures';
import {EventAggregator} from 'aurelia-event-aggregator';
import AsyncHttpClient from './async-http-client';
import {TweetsLoaded, MyTweetsLoaded, LoginStatus, ValidationFailed, ImageUploadFinished} from './messages';
import { Router } from 'aurelia-router';

@inject(Fixtures, EventAggregator, AsyncHttpClient, Router)
export default class TweetService {

  tweets = [];
  tweetsOfFriends = [];

  @bindable
  mytweets = [];
  users = [];
  currentUserId;
  currentUser;

  constructor(data, ea, ac, rt) {
    this.methods = data.methods;
    this.ea = ea;
    this.ac = ac;
    this.rt = rt;
    this.getTweets();
  }

  postTweet(msg, picture) {
    const tweet = {
      message: msg,
      picture: picture
    };
    this.ac.post('/api/tweets', tweet).then(res => {
      const returnedTweet = res.content;
      this.tweets.unshift(returnedTweet);
      this.mytweets.unshift(returnedTweet);
      this.ea.publish(new TweetsLoaded(this.tweets));
      this.ea.publish(new MyTweetsLoaded(this.mytweets));
      this.rt.navigateToRoute('mytimeline');
    }).catch(err =>{
      this.ea.publish(new ValidationFailed('postTweet'));
    });
  }

  getTweets() {
    console.log('getTweets called');
    this.ac.get('/api/tweets').then(res => {
      console.log('getTweets returned: ' + res.content);
      this.tweets = res.content;
      this.ea.publish(new TweetsLoaded(this.tweets));
    });
  }

  getTweetsOfFriends() {
    this.ac.get('/api/users/followings/tweets').then(res => {
      this.tweetsOfFriends = res.content;
    });
  }

  deleteTweetLocally(id) {
    const indexOfMyDeletedTweet = this.mytweets.map(t => t._id).indexOf(id);
    if (indexOfMyDeletedTweet > -1) {
      this.mytweets.splice(indexOfMyDeletedTweet, 1);
    }

    const indexOfGlobalTweet = this.tweets.map(t => t._id).indexOf(id);
    if (indexOfGlobalTweet > -1) {
      this.tweets.splice(indexOfGlobalTweet, 1);
    }
  }

  deleteTweet(id) {
    this.ac.delete('/api/tweets/' + id).then(res => {
      if (res.statusCode === 204) {
        this.deleteTweetLocally(id);
      }
    });
  }

  deleteMyTweets() {
    this.ac.delete('/api/users/' + this.currentUserId + '/tweets').then(res => {
      if (res.statusCode === 204) {
        for (let i = 0; i < this.mytweets.length; i++) {
          const indexOfDeletedTweet = this.tweets.map(t => t._id).indexOf(this.mytweets[i]._id);
          if (indexOfDeletedTweet > -1) {
            this.tweets.splice(indexOfDeletedTweet, 1);
          }
        }
        this.mytweets = [];
      }
    });
  }

  followUser(id) {
    this.ac.post('/api/users/' + id + '/followers', '{}').then(res => {
      if (res.statusCode === 201) {
        this.getUsers();
        this.getTweetsOfFriends();
      }
    });
  }

  unfollowUser(id) {
    this.ac.delete('/api/users/' + id + '/followers').then(res => {
      if (res.statusCode === 204) {
        this.getUsers();
        this.getTweetsOfFriends();
      }
    });
  }

  getTweetsOfUser(id) {
    return this.ac.get('/api/users/' + id + '/tweets');
  }

  getMyTweets() {
    this.ac.get('/api/users/' + this.currentUserId + '/tweets').then(res => {
      this.mytweets = res.content;
    });
  }

  getUsers() {
    this.ac.get('/api/users').then(res => {
      this.users = res.content;
      const indexOfCurrentUser = this.users.map(u => u._id).indexOf(this.currentUserId);
      this.currentUser = this.users[indexOfCurrentUser];
    });
  }

  getDataForLoggedInUser() {
    this.ac.get('/api/user').then(res => {
      this.currentUserId = res.content;
      return this.ac.get('/api/users');
    }).then(res => {
      this.users = res.content;
      const indexOfCurrentUser = this.users.map(u => u._id).indexOf(this.currentUserId);
      this.currentUser = this.users[indexOfCurrentUser];
      this.getMyTweets();
    }).catch(err => {
      console.log('error occured: ' + err);
    });

    this.getTweetsOfFriends();
  }

  updateSettings(firstName, lastName, nickName, email, password, image) {
    const updatedUser = {
      firstName: firstName,
      lastName: lastName,
      nickName: nickName,
      email: email,
      password: password,
      image: image
    };

    this.ac.post('/api/users/' + this.currentUserId, updatedUser).then(res => {
      const content = res.content;
      if (image.startsWith('data:image')) {
        this.ea.publish(new ImageUploadFinished(content.imageUrl));
      }

      this.getUsers();
      this.getTweets();
      this.getMyTweets();
      if (content.success) {
        this.ac.updateTokenAndHeader(content);
      }
    });
  }

  register(firstName, lastName, nickName, email, password) {
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      nickName: nickName,
      email: email,
      password: password,
      imageUrl: './assets/images/unknown_user.jpg'
    };
    this.ac.post('/api/users', newUser).then(res => {
      this.getUsers();
    });
  }

  login(email, password) {
    const user = {
      email: email,
      password: password
    };
    this.ac.authenticate('/api/users/authenticate', user);
  }

  logout() {
    const status = {
      success: false,
      message: ''
    };
    this.ac.clearAuthentication();
    this.ea.publish(new LoginStatus(status));
  }

  isAuthenticated() {
    return this.ac.isAuthenticated();
  }

}
