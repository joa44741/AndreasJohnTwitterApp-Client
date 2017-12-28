import {inject} from 'aurelia-framework';
import Fixtures from './fixtures';
import {EventAggregator} from 'aurelia-event-aggregator';
import AsyncHttpClient from './async-http-client';
import Formatter from './formatter';

import {
  TweetsLoaded, MyTweetsLoaded, LoginStatus, ValidationFailed, ImageUploadFinished,
  UsersDeleted, UsersLoaded, FriendTweetsLoaded
} from './messages';
import { Router } from 'aurelia-router';

@inject(Fixtures, EventAggregator, AsyncHttpClient, Router, Formatter)
export default class TweetService {

  tweets = [];
  tweetsOfFriends = [];
  mytweets = [];
  users = [];
  currentUserId;
  currentUser;

  constructor(data, ea, ac, rt, formatter) {
    this.methods = data.methods;
    this.ea = ea;
    this.ac = ac;
    this.rt = rt;
    this.formatter = formatter;
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
      this.formatter.formatTweetCreationDates(this.tweets);
      this.formatter.formatTweetCreationDates(this.mytweets);
      this.ea.publish(new TweetsLoaded(this.tweets));
      this.ea.publish(new MyTweetsLoaded(this.mytweets));
      this.rt.navigateToRoute('mytimeline');
    }).catch(err =>{
      this.ea.publish(new ValidationFailed('postTweet'));
    });
  }

  getTweets() {
    this.ac.get('/api/tweets').then(res => {
      this.tweets = res.content;
      this.formatter.formatTweetCreationDates(this.tweets);
      this.ea.publish(new TweetsLoaded(this.tweets));
    });
  }

  getTweetsOfFriends() {
    this.ac.get('/api/users/followings/tweets').then(res => {
      this.tweetsOfFriends = res.content;
      this.formatter.formatTweetCreationDates(this.tweetsOfFriends);
      this.ea.publish(new FriendTweetsLoaded(this.tweets));
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
    }).catch(err => {
      console.log('error occured: ' + err);
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

  deleteAllTweets() {
    this.ac.delete('/api/tweets').then(res => {
      if (res.statusCode === 204) {
        this.getTweets();
      }
    });
  }


  getLoggedInUserPromise() {
    return this.ac.get('/api/user');
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

  getUserPromise(id) {
    return this.ac.get('/api/users/' + id);
  }


  getTweetsOfUser(id) {
    return this.ac.get('/api/users/' + id + '/tweets');
  }

  getMyTweets() {
    this.ac.get('/api/users/' + this.currentUserId + '/tweets').then(res => {
      this.mytweets = res.content;
      this.formatter.formatTweetCreationDates(this.mytweets);
    });
  }

  getUsers() {
    this.ac.get('/api/users').then(res => {
      this.users = res.content;
      const indexOfCurrentUser = this.users.map(u => u._id).indexOf(this.currentUserId);
      this.currentUser = this.users[indexOfCurrentUser];
      this.ea.publish(new UsersLoaded());
    });
  }

  getDataForLoggedInUser() {
    this.ac.get('/api/user').then(res => {
      this.currentUserId = res.content.currentUserId;
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
      imageUrl: 'http://res.cloudinary.com/joa44741/image/upload/v1513337357/unknown_user_axspin.jpg',
      isAdmin: false
    };
    this.ac.post('/api/users', newUser).then(res => {
      this.getUsers();
      this.rt.navigateToRoute('login');
    }).catch(err => {
      this.ea.publish(new ValidationFailed('signup'));
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

  deleteAllUsers() {
    this.ac.delete('/api/users').then(res => {
      if (res.statusCode === 204) {
        this.users = [];
        this.ea.publish(new UsersDeleted());
        this.getTweets();
      }
    });
  }

  deleteUser(id) {
    this.ac.delete('/api/users/' + id).then(res => {
      if (res.statusCode === 204) {
        this.deleteUserLocally(id);
        this.getTweets();
      }
    });
  }

  deleteUserLocally(id) {
    const indexOfMyDeletedUser = this.users.map(t => t._id).indexOf(id);
    if (indexOfMyDeletedUser > -1) {
      this.users.splice(indexOfMyDeletedUser, 1);
    }
    this.ea.publish(new UsersDeleted());
  }

}
