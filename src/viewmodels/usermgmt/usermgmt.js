import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {UsersDeleted, UsersLoaded, ValidationFailed} from '../../services/messages';

@inject(TweetService, EventAggregator)
export class UserMgmt {

  filteredUsers = [];
  users = [];
  filter = '';
  selectedUsers = [];

  firstName = '';
  lastName = '';
  nickName = '';
  email = '';
  password = '';

  constructor(ts, ea) {
    this.tweetService = ts;
    this.ea = ea;
    this.tweetService.getUsers();
    this.getUsersList();

    this.ea.subscribe(ValidationFailed, msg => {
      if (msg.validationType === 'signup') {
        this.errorMessage = 'Registration process failed. Maybe the email address is already in use.';
      } else if (msg.status.success) {
        this.errorMessage = null;
      }
    });
  }

  getUsersList() {
    this.users = this.tweetService.users;
    const indexOfCurrentUser = this.users.map(u => u._id).indexOf(this.tweetService.currentUserId);
    if (indexOfCurrentUser > -1) {
      this.users.splice(indexOfCurrentUser, 1);
    }
    this.filteredUsers = this.users;
  }

  filterChanged() {
    if (this.filter === '') {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = [];
      for (let user of this.users) {
        if (user.firstName.toUpperCase().includes(this.filter.toUpperCase()) ||
          user.lastName.toUpperCase().includes(this.filter.toUpperCase()) ||
          user.nickName.toUpperCase().includes(this.filter.toUpperCase()) ||
          user.email.toUpperCase().includes(this.filter.toUpperCase())) {
          this.filteredUsers.push(user);
        }
      }
    }
  }

  deleteSelectedUsers() {
    for (let userId of this.selectedUsers) {
      this.tweetService.deleteUser(userId);
    }
  }

  deleteAllUsers() {
    this.tweetService.deleteAllUsers();
  }

  register(e) {
    this.errorMessage = null;
    this.tweetService.register(this.firstName, this.lastName, this.nickName, this.email, this.password, false);
  }

  attached() {
    console.log('attached');
    this.usersLoadedSubscription = this.ea.subscribe(UsersLoaded, msg => {
      this.getUsersList();
    });
    this.tweetsLoadedSubscription = this.ea.subscribe(UsersDeleted, msg => {
      this.selectedUsers = [];
      this.getUsersList();
    });
  }

  detached() {
    if (this.tweetsLoadedSubscription) {
      this.tweetsLoadedSubscription.dispose();
    }
    if (this.usersLoadedSubscription) {
      this.usersLoadedSubscription.dispose();
    }
  }
}
