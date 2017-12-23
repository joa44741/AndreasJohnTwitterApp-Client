import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';

@inject(TweetService)
export class SearchForUsers {

  filteredUsers = [];
  users = [];
  filter = '';

  constructor(ts, rt) {
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
        if (user.firstName.includes(this.filter) || user.lastName.includes(this.filter) || user.nickName.includes(this.filter) || user.email.includes(this.filter)) {
          this.filteredUsers.push(user);
        }
      }
    }
  }
}
