import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ImageUploadFinished} from '../../services/messages';

@inject(TweetService, EventAggregator)
export class Settings {

  firstName = '';
  lastName = '';
  nickName = '';
  email = '';
  password = '';
  imageUrl = '';
  picture = [];
  loading = false;

  constructor(ts, ea) {
    this.tweetService = ts;
    this.ea = ea;
    this.firstName = this.tweetService.currentUser.firstName;
    this.lastName = this.tweetService.currentUser.lastName;
    this.nickName = this.tweetService.currentUser.nickName;
    this.email = this.tweetService.currentUser.email;
    this.password = this.tweetService.currentUser.password;
    this.imageUrl = this.tweetService.currentUser.imageUrl;
  }

  updateSettings() {
    this.loading = true;
    const reader = new window.FileReader();
    reader.onload = () => {
      let file = reader.result;
      this.tweetService.updateSettings(this.firstName, this.lastName, this.nickName, this.email, this.password, file);
    };

    if (this.picture[0]) {
      reader.readAsDataURL(this.picture[0]);
    } else {
      this.tweetService.updateSettings(this.firstName, this.lastName, this.nickName, this.email, this.password, this.imageUrl);
      this.loading = false;
    }
  }

  attached() {
    this.tweetsLoadedSubscription = this.ea.subscribe(ImageUploadFinished, msg => {
      this.imageUrl = msg.imageUrl;
      this.loading = false;
    });
  }

  detached() {
    if (this.tweetsLoadedSubscription) {
      this.tweetsLoadedSubscription.dispose();
    }
  }

}
