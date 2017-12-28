import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';

@inject(TweetService)
export class SearchForUsers {

  filteredUsers = [];
  users = [];
  filter = '';

  constructor(ts) {
    this.tweetService = ts;
    this.users = ts.users;
    const indexOfCurrentUser = this.users.map(u => u._id).indexOf(ts.currentUserId);
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
}
