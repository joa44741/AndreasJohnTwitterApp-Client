export class LoginStatus {
  constructor(status) {
    this.status = status;
  }
}

export class TweetsLoaded {
  constructor(tweets) {
    this.loadedTweets = tweets;
  }
}

export class MyTweetsLoaded {
  constructor(tweets) {
    this.loadedTweets = tweets;
  }
}

export class FriendTweetsLoaded {
  constructor(tweets) {
    this.loadedTweets = tweets;
  }
}

export class ValidationFailed {
  constructor(validationType) {
    this.validationType = validationType;
  }
}

export class ImageUploadFinished {
  constructor(imageUrl) {
    this.imageUrl = imageUrl;
  }
}

export class UsersDeleted {
}

export class UsersLoaded {
}
