import TweetService from '../../services/tweet-service';
import {inject} from 'aurelia-framework';

@inject(TweetService)
export class Logout {

  constructor(tweetService) {
    this.tweetService = tweetService;
  }

  logout() {
    console.log('logging out');
    this.tweetService.logout();
  }
}
