define('admin',['exports', 'aurelia-framework', './services/tweet-service'], function (exports, _aureliaFramework, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default, _aureliaFramework.Aurelia), _dec(_class = function () {
    function Home(ts, au) {
      _classCallCheck(this, Home);

      this.tweetService = ts;
      this.aurelia = au;
      this.tweetService.getDataForLoggedInUser();
    }

    Home.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: ['', 'usermgmt'], name: 'usermgmt', moduleId: 'viewmodels/usermgmt/usermgmt', nav: true, title: 'User management' }, { route: 'tweetmgmt', name: 'tweetmgmt', moduleId: 'viewmodels/tweetmgmt/tweetmgmt', nav: true, title: 'Tweet management' }, { route: 'statistics', name: 'statistics', moduleId: 'viewmodels/statistics/statistics', nav: true, title: 'Statistics' }, { route: 'logout', name: 'logout', moduleId: 'viewmodels/logout/logout', nav: true, title: 'Logout' }]);
      this.router = router;

      config.mapUnknownRoutes(function (instruction) {
        return 'admin';
      });
    };

    return Home;
  }()) || _class);
});
define('app',['exports', 'aurelia-framework', 'aurelia-event-aggregator', './services/messages', './services/tweet-service'], function (exports, _aureliaFramework, _aureliaEventAggregator, _messages, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default, _aureliaFramework.Aurelia, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function App(ts, au, ea) {
      var _this = this;

      _classCallCheck(this, App);

      this.au = au;
      this.tweetService = ts;

      ea.subscribe(_messages.LoginStatus, function (msg) {
        console.log(msg.status.wrongLoginData);
        if (!msg.status.wrongLoginData) {
          _this.router.navigate('/', { replace: true, trigger: false });
          _this.router.reset();
          if (msg.status.success === true) {
            console.log(status);
            if (msg.status.isAdmin) {
              au.setRoot('admin');
            } else {
              au.setRoot('home');
              _this.tweetService.getDataForLoggedInUser();
            }
          } else {
            au.setRoot('app');
          }
        }
      });
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: '', name: 'firehose', moduleId: 'viewmodels/firehose/firehose', nav: true, title: 'Global' }, { route: 'signup', name: 'signup', moduleId: 'viewmodels/signup/signup', nav: true, title: 'Signup' }, { route: 'login', name: 'login', moduleId: 'viewmodels/login/login', nav: true, title: 'Login' }]);
      this.router = router;
    };

    App.prototype.attached = function attached() {
      var _this2 = this;

      if (this.tweetService.isAuthenticated()) {
        this.tweetService.getLoggedInUserPromise().then(function (res) {
          var userId = res.content.currentUserId;
          return _this2.tweetService.getUserPromise(userId);
        }).then(function (res) {
          var user = res.content;
          if (user.isAdmin) {
            _this2.au.setRoot('admin').then(function () {
              _this2.router.navigateToRoute('usermgmt');
            });
          } else {
            _this2.tweetService.getDataForLoggedInUser();
            _this2.au.setRoot('home').then(function () {
              _this2.router.navigateToRoute('firehose');
            });
          }
        });
      }
    };

    return App;
  }()) || _class);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('home',['exports', 'aurelia-framework', './services/tweet-service'], function (exports, _aureliaFramework, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default, _aureliaFramework.Aurelia), _dec(_class = function () {
    function Home(ts, au) {
      _classCallCheck(this, Home);

      this.tweetService = ts;
      this.aurelia = au;
      this.tweetService.getDataForLoggedInUser();
    }

    Home.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: ['', 'home'], name: 'firehose', moduleId: 'viewmodels/firehose/firehose', nav: true, title: 'Global Tweets' }, { route: 'tweetsoffriends', name: 'tweetsoffriends', moduleId: 'viewmodels/tweetsoffriends/tweetsoffriends', nav: true, title: 'Tweets of friends' }, { route: 'searchusers', name: 'searchusers', moduleId: 'viewmodels/searchusers/searchusers', nav: true, title: 'Search for users' }, { route: 'mytimeline', name: 'mytimeline', moduleId: 'viewmodels/mytimeline/mytimeline', nav: true, title: 'My Timeline' }, { route: 'showtimeline/:id', name: 'showtimeline', moduleId: 'viewmodels/showtimeline/showtimeline', nav: false, title: 'Show Timeline' }, { route: 'tweet', name: 'tweet', moduleId: 'viewmodels/tweet/tweet', nav: true, title: 'New Tweet!' }, { route: 'settings', name: 'settings', moduleId: 'viewmodels/settings/settings', nav: true, title: 'Settings' }, { route: 'logout', name: 'logout', moduleId: 'viewmodels/logout/logout', nav: true, title: 'Logout' }]);
      this.router = router;

      config.mapUnknownRoutes(function (instruction) {
        return 'home';
      });
    };

    return Home;
  }()) || _class);
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('services/async-http-client',['exports', 'aurelia-framework', 'aurelia-http-client', './fixtures', 'aurelia-event-aggregator', './messages'], function (exports, _aureliaFramework, _aureliaHttpClient, _fixtures, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _fixtures2 = _interopRequireDefault(_fixtures);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var AsyncHttpClient = (_dec = (0, _aureliaFramework.inject)(_aureliaHttpClient.HttpClient, _fixtures2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function AsyncHttpClient(httpClient, fixtures, ea) {
      _classCallCheck(this, AsyncHttpClient);

      this.http = httpClient;
      this.http.configure(function (http) {
        http.withBaseUrl(fixtures.baseUrl);
      });
      this.ea = ea;
    }

    AsyncHttpClient.prototype.authenticate = function authenticate(url, user) {
      var _this = this;

      this.http.post(url, user).then(function (response) {
        var status = response.content;
        if (status.success) {
          _this.updateTokenAndHeader(status);
        } else {
          status.wrongLoginData = true;
        }
        _this.ea.publish(new _messages.LoginStatus(status));
      }).catch(function (error) {
        var status = {
          success: false,
          message: 'service not available'
        };
        _this.ea.publish(new _messages.LoginStatus(status));
      });
    };

    AsyncHttpClient.prototype.updateTokenAndHeader = function updateTokenAndHeader(status) {
      localStorage.twitter = JSON.stringify(status);
      this.http.configure(function (configuration) {
        configuration.withHeader('Authorization', 'bearer ' + status.token);
      });
    };

    AsyncHttpClient.prototype.isAuthenticated = function isAuthenticated() {
      var authenticated = false;
      if (localStorage.twitter !== null) {
        authenticated = true;
        this.http.configure(function (http) {
          var auth = JSON.parse(localStorage.twitter);
          http.withHeader('Authorization', 'bearer ' + auth.token);
        });
      }
      return authenticated;
    };

    AsyncHttpClient.prototype.clearAuthentication = function clearAuthentication() {
      localStorage.twitter = null;
      this.http.configure(function (configuration) {
        configuration.withHeader('Authorization', '');
      });
    };

    AsyncHttpClient.prototype.get = function get(url) {
      return this.http.get(url);
    };

    AsyncHttpClient.prototype.post = function post(url, obj) {
      return this.http.post(url, obj);
    };

    AsyncHttpClient.prototype.delete = function _delete(url) {
      return this.http.delete(url);
    };

    return AsyncHttpClient;
  }()) || _class);
  exports.default = AsyncHttpClient;
});
define('services/fixtures',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Fixtures = function Fixtures() {
    _classCallCheck(this, Fixtures);

    this.baseUrl = 'https://damp-fjord-87496.herokuapp.com/';
  };

  exports.default = Fixtures;
});
define('services/formatter',['exports', 'moment'], function (exports, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _moment2 = _interopRequireDefault(_moment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Formatter = function () {
    function Formatter() {
      _classCallCheck(this, Formatter);
    }

    Formatter.prototype.formatTweetCreationDates = function formatTweetCreationDates(tweets) {
      for (var index in tweets) {
        if ((0, _moment2.default)(tweets[index].creationDate).fromNow() !== 'Invalid date') {
          tweets[index].creationDate = (0, _moment2.default)(tweets[index].creationDate).format('DD.MM.YYYY HH:mm:ss');
          tweets[index].formattedDate = (0, _moment2.default)(tweets[index].creationDate).fromNow();
        }
      }
    };

    return Formatter;
  }();

  exports.default = Formatter;
});
define('services/messages',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var LoginStatus = exports.LoginStatus = function LoginStatus(status) {
    _classCallCheck(this, LoginStatus);

    this.status = status;
  };

  var TweetsLoaded = exports.TweetsLoaded = function TweetsLoaded(tweets) {
    _classCallCheck(this, TweetsLoaded);

    this.loadedTweets = tweets;
  };

  var MyTweetsLoaded = exports.MyTweetsLoaded = function MyTweetsLoaded(tweets) {
    _classCallCheck(this, MyTweetsLoaded);

    this.loadedTweets = tweets;
  };

  var FriendTweetsLoaded = exports.FriendTweetsLoaded = function FriendTweetsLoaded(tweets) {
    _classCallCheck(this, FriendTweetsLoaded);

    this.loadedTweets = tweets;
  };

  var ValidationFailed = exports.ValidationFailed = function ValidationFailed(validationType) {
    _classCallCheck(this, ValidationFailed);

    this.validationType = validationType;
  };

  var ImageUploadFinished = exports.ImageUploadFinished = function ImageUploadFinished(imageUrl) {
    _classCallCheck(this, ImageUploadFinished);

    this.imageUrl = imageUrl;
  };

  var UsersDeleted = exports.UsersDeleted = function UsersDeleted() {
    _classCallCheck(this, UsersDeleted);
  };

  var UsersLoaded = exports.UsersLoaded = function UsersLoaded() {
    _classCallCheck(this, UsersLoaded);
  };
});
define('services/tweet-service',['exports', 'aurelia-framework', './fixtures', 'aurelia-event-aggregator', './async-http-client', './formatter', './messages', 'aurelia-router'], function (exports, _aureliaFramework, _fixtures, _aureliaEventAggregator, _asyncHttpClient, _formatter, _messages, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _fixtures2 = _interopRequireDefault(_fixtures);

  var _asyncHttpClient2 = _interopRequireDefault(_asyncHttpClient);

  var _formatter2 = _interopRequireDefault(_formatter);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var TweetService = (_dec = (0, _aureliaFramework.inject)(_fixtures2.default, _aureliaEventAggregator.EventAggregator, _asyncHttpClient2.default, _aureliaRouter.Router, _formatter2.default), _dec(_class = function () {
    function TweetService(data, ea, ac, rt, formatter) {
      _classCallCheck(this, TweetService);

      this.tweets = [];
      this.tweetsOfFriends = [];
      this.mytweets = [];
      this.users = [];

      this.methods = data.methods;
      this.ea = ea;
      this.ac = ac;
      this.rt = rt;
      this.formatter = formatter;
      this.getTweets();
    }

    TweetService.prototype.postTweet = function postTweet(msg, picture) {
      var _this = this;

      var tweet = {
        message: msg,
        picture: picture
      };
      this.ac.post('/api/tweets', tweet).then(function (res) {
        var returnedTweet = res.content;
        _this.tweets.unshift(returnedTweet);
        _this.mytweets.unshift(returnedTweet);
        _this.formatter.formatTweetCreationDates(_this.tweets);
        _this.formatter.formatTweetCreationDates(_this.mytweets);
        _this.ea.publish(new _messages.TweetsLoaded(_this.tweets));
        _this.ea.publish(new _messages.MyTweetsLoaded(_this.mytweets));
        _this.rt.navigateToRoute('mytimeline');
      }).catch(function (err) {
        _this.ea.publish(new _messages.ValidationFailed('postTweet'));
      });
    };

    TweetService.prototype.getTweets = function getTweets() {
      var _this2 = this;

      this.ac.get('/api/tweets').then(function (res) {
        _this2.tweets = res.content;
        _this2.formatter.formatTweetCreationDates(_this2.tweets);
        _this2.ea.publish(new _messages.TweetsLoaded(_this2.tweets));
      });
    };

    TweetService.prototype.getTweetsOfFriends = function getTweetsOfFriends() {
      var _this3 = this;

      this.ac.get('/api/users/followings/tweets').then(function (res) {
        _this3.tweetsOfFriends = res.content;
        _this3.formatter.formatTweetCreationDates(_this3.tweetsOfFriends);
        _this3.ea.publish(new _messages.FriendTweetsLoaded(_this3.tweets));
      });
    };

    TweetService.prototype.deleteTweetLocally = function deleteTweetLocally(id) {
      var indexOfMyDeletedTweet = this.mytweets.map(function (t) {
        return t._id;
      }).indexOf(id);
      if (indexOfMyDeletedTweet > -1) {
        this.mytweets.splice(indexOfMyDeletedTweet, 1);
      }

      var indexOfGlobalTweet = this.tweets.map(function (t) {
        return t._id;
      }).indexOf(id);
      if (indexOfGlobalTweet > -1) {
        this.tweets.splice(indexOfGlobalTweet, 1);
      }
    };

    TweetService.prototype.deleteTweet = function deleteTweet(id) {
      var _this4 = this;

      this.ac.delete('/api/tweets/' + id).then(function (res) {
        if (res.statusCode === 204) {
          _this4.deleteTweetLocally(id);
        }
      }).catch(function (err) {
        console.log('error occured: ' + err);
      });
    };

    TweetService.prototype.deleteMyTweets = function deleteMyTweets() {
      var _this5 = this;

      this.ac.delete('/api/users/' + this.currentUserId + '/tweets').then(function (res) {
        if (res.statusCode === 204) {
          for (var i = 0; i < _this5.mytweets.length; i++) {
            var indexOfDeletedTweet = _this5.tweets.map(function (t) {
              return t._id;
            }).indexOf(_this5.mytweets[i]._id);
            if (indexOfDeletedTweet > -1) {
              _this5.tweets.splice(indexOfDeletedTweet, 1);
            }
          }
          _this5.mytweets = [];
        }
      });
    };

    TweetService.prototype.deleteAllTweetsOfUser = function deleteAllTweetsOfUser(userId) {
      var _this6 = this;

      this.ac.delete('/api/users/' + userId + '/tweets').then(function (res) {
        if (res.statusCode === 204) {
          _this6.getTweets();
        }
      });
    };

    TweetService.prototype.deleteAllTweets = function deleteAllTweets() {
      var _this7 = this;

      this.ac.delete('/api/tweets').then(function (res) {
        if (res.statusCode === 204) {
          _this7.getTweets();
        }
      });
    };

    TweetService.prototype.getLoggedInUserPromise = function getLoggedInUserPromise() {
      return this.ac.get('/api/user');
    };

    TweetService.prototype.followUser = function followUser(id) {
      var _this8 = this;

      this.ac.post('/api/users/' + id + '/followers', '{}').then(function (res) {
        if (res.statusCode === 201) {
          _this8.getUsers();
          _this8.getTweetsOfFriends();
        }
      });
    };

    TweetService.prototype.unfollowUser = function unfollowUser(id) {
      var _this9 = this;

      this.ac.delete('/api/users/' + id + '/followers').then(function (res) {
        if (res.statusCode === 204) {
          _this9.getUsers();
          _this9.getTweetsOfFriends();
        }
      });
    };

    TweetService.prototype.getUserPromise = function getUserPromise(id) {
      return this.ac.get('/api/users/' + id);
    };

    TweetService.prototype.getTweetsOfUser = function getTweetsOfUser(id) {
      return this.ac.get('/api/users/' + id + '/tweets');
    };

    TweetService.prototype.getMyTweets = function getMyTweets() {
      var _this10 = this;

      this.ac.get('/api/users/' + this.currentUserId + '/tweets').then(function (res) {
        _this10.mytweets = res.content;
        _this10.formatter.formatTweetCreationDates(_this10.mytweets);
      });
    };

    TweetService.prototype.getUsers = function getUsers() {
      var _this11 = this;

      this.ac.get('/api/users').then(function (res) {
        _this11.users = res.content;
        var indexOfCurrentUser = _this11.users.map(function (u) {
          return u._id;
        }).indexOf(_this11.currentUserId);
        _this11.currentUser = _this11.users[indexOfCurrentUser];
        _this11.ea.publish(new _messages.UsersLoaded());
      });
    };

    TweetService.prototype.getDataForLoggedInUser = function getDataForLoggedInUser() {
      var _this12 = this;

      this.ac.get('/api/user').then(function (res) {
        _this12.currentUserId = res.content.currentUserId;
        return _this12.ac.get('/api/users');
      }).then(function (res) {
        _this12.users = res.content;
        var indexOfCurrentUser = _this12.users.map(function (u) {
          return u._id;
        }).indexOf(_this12.currentUserId);
        _this12.currentUser = _this12.users[indexOfCurrentUser];
        _this12.getMyTweets();
      }).catch(function (err) {
        console.log('error occured: ' + err);
      });

      this.getTweetsOfFriends();
    };

    TweetService.prototype.updateSettings = function updateSettings(firstName, lastName, nickName, email, password, image) {
      var _this13 = this;

      var updatedUser = {
        firstName: firstName,
        lastName: lastName,
        nickName: nickName,
        email: email,
        password: password,
        image: image
      };

      this.ac.post('/api/users/' + this.currentUserId, updatedUser).then(function (res) {
        var content = res.content;
        if (image.startsWith('data:image')) {
          _this13.ea.publish(new _messages.ImageUploadFinished(content.imageUrl));
        }

        _this13.getUsers();
        _this13.getTweets();
        _this13.getMyTweets();
        if (content.success) {
          _this13.ac.updateTokenAndHeader(content);
        }
      });
    };

    TweetService.prototype.register = function register(firstName, lastName, nickName, email, password, forwardToLogin) {
      var _this14 = this;

      var newUser = {
        firstName: firstName,
        lastName: lastName,
        nickName: nickName,
        email: email,
        password: password,
        imageUrl: 'http://res.cloudinary.com/joa44741/image/upload/v1513337357/unknown_user_axspin.jpg',
        isAdmin: false
      };
      this.ac.post('/api/users', newUser).then(function (res) {
        _this14.getUsers();
        if (forwardToLogin) {
          _this14.rt.navigateToRoute('login');
        }
      }).catch(function (err) {
        _this14.ea.publish(new _messages.ValidationFailed('signup'));
      });
    };

    TweetService.prototype.login = function login(email, password) {
      var user = {
        email: email,
        password: password
      };
      this.ac.authenticate('/api/users/authenticate', user);
    };

    TweetService.prototype.logout = function logout() {
      var status = {
        success: false,
        message: ''
      };
      this.ac.clearAuthentication();
      this.ea.publish(new _messages.LoginStatus(status));
    };

    TweetService.prototype.isAuthenticated = function isAuthenticated() {
      return this.ac.isAuthenticated();
    };

    TweetService.prototype.deleteAllUsers = function deleteAllUsers() {
      var _this15 = this;

      this.ac.delete('/api/users').then(function (res) {
        if (res.statusCode === 204) {
          _this15.users = [];
          _this15.ea.publish(new _messages.UsersDeleted());
          _this15.getTweets();
        }
      });
    };

    TweetService.prototype.deleteUser = function deleteUser(id) {
      var _this16 = this;

      this.ac.delete('/api/users/' + id).then(function (res) {
        if (res.statusCode === 204) {
          _this16.deleteUserLocally(id);
          _this16.getTweets();
        }
      });
    };

    TweetService.prototype.deleteUserLocally = function deleteUserLocally(id) {
      var indexOfMyDeletedUser = this.users.map(function (t) {
        return t._id;
      }).indexOf(id);
      if (indexOfMyDeletedUser > -1) {
        this.users.splice(indexOfMyDeletedUser, 1);
      }
      this.ea.publish(new _messages.UsersDeleted());
    };

    return TweetService;
  }()) || _class);
  exports.default = TweetService;
});
define('viewmodels/firehose/firehose',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../../services/messages', '../../services/tweet-service'], function (exports, _aureliaFramework, _aureliaEventAggregator, _messages, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Firehose = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Firehose = exports.Firehose = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function Firehose(ts, ea) {
      var _this = this;

      _classCallCheck(this, Firehose);

      this.tweets = [];
      this.isDeletable = false;

      this.tweetService = ts;
      this.tweets = this.tweetService.tweets;
      this.markOwnTweets();
      this.ea = ea;

      if (this.tweetsLoadedSubscription) {
        this.tweetsLoadedSubscription.dispose();
      }
      this.tweetsLoadedSubscription = this.ea.subscribe(_messages.TweetsLoaded, function (msg) {
        _this.tweets = msg.loadedTweets;
        _this.markOwnTweets();
      });
    }

    Firehose.prototype.markOwnTweets = function markOwnTweets() {
      for (var i = 0; i < this.tweets.length; i++) {
        var tweet = this.tweets[i];
        if (tweet.author._id === this.tweetService.currentUserId) {
          tweet.isTweetOfCurrentUser = true;
          this.tweets[i] = tweet;
        }
      }
    };

    return Firehose;
  }()) || _class);
});
define('viewmodels/login/login',['exports', 'aurelia-framework', '../../services/tweet-service', 'aurelia-event-aggregator', '../../services/messages'], function (exports, _aureliaFramework, _tweetService, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Login = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Login = exports.Login = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function Login(ts, ea) {
      var _this = this;

      _classCallCheck(this, Login);

      this.errorMessage = null;
      this.email = 'admin@johntwitter.com';
      this.password = 'admin';
      this.counter = 0;

      this.tweetService = ts;
      ea.subscribe(_messages.LoginStatus, function (msg) {
        if (msg.status.wrongLoginData) {
          _this.counter++;
          _this.errorMessage = 'wrong login data (' + _this.counter + ' tries already)';
          console.log(_this.errorMessage);
        } else if (msg.status.success) {
          _this.counter = 0;
          _this.errorMessage = null;
        }
      });
    }

    Login.prototype.login = function login(e) {
      console.log('Trying to log in ' + this.email);
      this.tweetService.login(this.email, this.password);
    };

    return Login;
  }()) || _class);
});
define('viewmodels/logout/logout',['exports', '../../services/tweet-service', 'aurelia-framework'], function (exports, _tweetService, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Logout = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Logout = exports.Logout = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function () {
    function Logout(tweetService) {
      _classCallCheck(this, Logout);

      this.tweetService = tweetService;
    }

    Logout.prototype.logout = function logout() {
      console.log('logging out');
      this.tweetService.logout();
    };

    return Logout;
  }()) || _class);
});
define('viewmodels/mytimeline/mytimeline',['exports', 'aurelia-framework', '../../services/tweet-service', 'aurelia-event-aggregator', '../../services/messages'], function (exports, _aureliaFramework, _tweetService, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MyTimeline = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var MyTimeline = exports.MyTimeline = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function MyTimeline(ts, ea) {
      _classCallCheck(this, MyTimeline);

      this.tweets = [];
      this.isDeletable = true;
      this.isMyTimeline = true;
      this.selectedTweets = [];

      this.tweetService = ts;
      this.ea = ea;
      this.tweets = ts.mytweets;
      this.user = ts.currentUser;
    }

    MyTimeline.prototype.deleteSelectedTweets = function deleteSelectedTweets() {
      var _this = this;

      this.selectedTweets.forEach(function (t) {
        return _this.tweetService.deleteTweet(t);
      });
      this.tweets = this.tweetService.mytweets;
      this.selectedTweets = [];
    };

    MyTimeline.prototype.deleteAllTweets = function deleteAllTweets() {
      this.tweetService.deleteMyTweets();
      this.tweets = [];
      this.selectedTweets = [];
    };

    MyTimeline.prototype.attached = function attached() {
      var _this2 = this;

      this.tweetsLoadedSubscription = this.ea.subscribe(_messages.MyTweetsLoaded, function (msg) {
        _this2.tweets = msg.loadedTweets;
        for (var i = 0; i < _this2.tweets.length; i++) {
          var tweet = _this2.tweets[i];
          tweet.isTweetOfCurrentUser = true;
          _this2.tweets[i] = tweet;
        }
      });
    };

    MyTimeline.prototype.detached = function detached() {
      if (this.tweetsLoadedSubscription) {
        this.tweetsLoadedSubscription.dispose();
      }
    };

    return MyTimeline;
  }()) || _class);
});
define('viewmodels/searchusers/searchusers',['exports', 'aurelia-framework', '../../services/tweet-service'], function (exports, _aureliaFramework, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SearchForUsers = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var SearchForUsers = exports.SearchForUsers = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function () {
    function SearchForUsers(ts) {
      _classCallCheck(this, SearchForUsers);

      this.filteredUsers = [];
      this.users = [];
      this.filter = '';

      this.tweetService = ts;
      this.users = ts.users;
      var indexOfCurrentUser = this.users.map(function (u) {
        return u._id;
      }).indexOf(ts.currentUserId);
      if (indexOfCurrentUser > -1) {
        this.users.splice(indexOfCurrentUser, 1);
      }
      this.filteredUsers = this.users;
    }

    SearchForUsers.prototype.filterChanged = function filterChanged() {
      if (this.filter === '') {
        this.filteredUsers = this.users;
      } else {
        this.filteredUsers = [];
        for (var _iterator = this.users, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var user = _ref;

          if (user.firstName.toUpperCase().includes(this.filter.toUpperCase()) || user.lastName.toUpperCase().includes(this.filter.toUpperCase()) || user.nickName.toUpperCase().includes(this.filter.toUpperCase()) || user.email.toUpperCase().includes(this.filter.toUpperCase())) {
            this.filteredUsers.push(user);
          }
        }
      }
    };

    return SearchForUsers;
  }()) || _class);
});
define('viewmodels/settings/settings',['exports', 'aurelia-framework', '../../services/tweet-service', 'aurelia-event-aggregator', '../../services/messages'], function (exports, _aureliaFramework, _tweetService, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Settings = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Settings = exports.Settings = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function Settings(ts, ea) {
      _classCallCheck(this, Settings);

      this.firstName = '';
      this.lastName = '';
      this.nickName = '';
      this.email = '';
      this.password = '';
      this.imageUrl = '';
      this.picture = [];
      this.loading = false;

      this.tweetService = ts;
      this.ea = ea;
      this.firstName = this.tweetService.currentUser.firstName;
      this.lastName = this.tweetService.currentUser.lastName;
      this.nickName = this.tweetService.currentUser.nickName;
      this.email = this.tweetService.currentUser.email;
      this.password = this.tweetService.currentUser.password;
      this.imageUrl = this.tweetService.currentUser.imageUrl;
    }

    Settings.prototype.updateSettings = function updateSettings() {
      var _this = this;

      this.loading = true;
      var reader = new window.FileReader();
      reader.onload = function () {
        var file = reader.result;
        _this.tweetService.updateSettings(_this.firstName, _this.lastName, _this.nickName, _this.email, _this.password, file);
      };

      if (this.picture[0]) {
        reader.readAsDataURL(this.picture[0]);
      } else {
        this.tweetService.updateSettings(this.firstName, this.lastName, this.nickName, this.email, this.password, this.imageUrl);
        this.loading = false;
      }
    };

    Settings.prototype.attached = function attached() {
      var _this2 = this;

      this.tweetsLoadedSubscription = this.ea.subscribe(_messages.ImageUploadFinished, function (msg) {
        _this2.imageUrl = msg.imageUrl;
        _this2.loading = false;
      });
    };

    Settings.prototype.detached = function detached() {
      if (this.tweetsLoadedSubscription) {
        this.tweetsLoadedSubscription.dispose();
      }
    };

    return Settings;
  }()) || _class);
});
define('viewmodels/showtimeline/showtimeline',['exports', 'aurelia-framework', '../../services/tweet-service', '../../services/formatter'], function (exports, _aureliaFramework, _tweetService, _formatter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ShowTimeline = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  var _formatter2 = _interopRequireDefault(_formatter);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var ShowTimeline = exports.ShowTimeline = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default, _formatter2.default), _dec(_class = function () {
    function ShowTimeline(ts, formatter) {
      _classCallCheck(this, ShowTimeline);

      this.tweets = [];
      this.isDeletable = false;
      this.isMyTimeline = false;

      this.tweetService = ts;
      this.formatter = formatter;
    }

    ShowTimeline.prototype.activate = function activate(params) {
      var _this = this;

      var index = this.tweetService.users.map(function (u) {
        return u._id;
      }).indexOf(params.id);
      this.user = this.tweetService.users[index];
      this.tweetService.getTweetsOfUser(params.id).then(function (res) {
        return _this.tweets = res.content;
      });
      this.formatter.formatTweetCreationDates(this.tweets);
      this.isFollowing = this.tweetService.currentUser.followings.indexOf(params.id) > -1;
    };

    ShowTimeline.prototype.followUser = function followUser() {
      this.tweetService.followUser(this.user._id);
      this.isFollowing = true;
      this.user.followers.push(this.tweetService.currentUserId);
    };

    ShowTimeline.prototype.unfollowUser = function unfollowUser() {
      this.tweetService.unfollowUser(this.user._id);
      this.isFollowing = false;

      var index = this.user.followers.indexOf(this.tweetService.currentUserId);
      if (index > -1) {
        this.user.followers.splice(index, 1);
      }
    };

    return ShowTimeline;
  }()) || _class);
});
define('viewmodels/signup/signup',['exports', 'aurelia-framework', '../../services/tweet-service', 'aurelia-event-aggregator', '../../services/messages'], function (exports, _aureliaFramework, _tweetService, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Signup = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Signup = exports.Signup = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function Signup(ts, ea) {
      var _this = this;

      _classCallCheck(this, Signup);

      this.firstName = 'Adam';
      this.lastName = 'Bien';
      this.nickName = 'JavaEE-Guru';
      this.email = 'adam@bien.com';
      this.password = 'secret';
      this.errorMessage = null;

      this.tweetService = ts;
      ea.subscribe(_messages.ValidationFailed, function (msg) {
        if (msg.validationType === 'signup') {
          _this.errorMessage = 'Signup process failed. Maybe the email address is already in use.';
          console.log(_this.errorMessage);
        } else if (msg.status.success) {
          _this.errorMessage = null;
        }
      });
    }

    Signup.prototype.register = function register(e) {
      this.tweetService.register(this.firstName, this.lastName, this.nickName, this.email, this.password, true);
    };

    return Signup;
  }()) || _class);
});
define('viewmodels/statistics/statistics',['exports', 'aurelia-framework', '../../services/tweet-service', 'aurelia-event-aggregator', '../../services/messages'], function (exports, _aureliaFramework, _tweetService, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Statistics = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Statistics = exports.Statistics = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function Statistics(ts) {
    _classCallCheck(this, Statistics);

    this.usersWithMostFollowers = [];
    this.usersWithMostTweets = [];

    this.tweetService = ts;
    this.usersWithMostFollowers = this.tweetService.users.slice(0);
    this.usersWithMostFollowers.sort(function (a, b) {
      return b.followers.length - a.followers.length;
    });
    this.usersWithMostFollowers = this.usersWithMostFollowers.slice(0, 3);

    this.usersWithMostTweets = this.tweetService.users.slice(0);
    for (var i in this.usersWithMostTweets) {
      this.usersWithMostTweets[i].tweetsCount = 0;
    }

    for (var _iterator = this.tweetService.tweets, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var tweet = _ref;

      var index = this.usersWithMostTweets.map(function (user) {
        return user._id;
      }).indexOf(tweet.author._id);
      if (index > -1) {
        this.usersWithMostTweets[index].tweetsCount++;
      }
    }

    this.usersWithMostTweets.sort(function (a, b) {
      return b.tweetsCount - a.tweetsCount;
    });
    this.usersWithMostTweets = this.usersWithMostTweets.slice(0, 3);

    this.userCount = this.tweetService.users.length;
    this.tweetCount = this.tweetService.tweets.length;
  }) || _class);
});
define('viewmodels/tweet/tweet',['exports', 'aurelia-framework', '../../services/tweet-service', 'aurelia-event-aggregator', '../../services/messages'], function (exports, _aureliaFramework, _tweetService, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Tweet = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _dec2, _class;

  var Tweet = exports.Tweet = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default, _aureliaEventAggregator.EventAggregator), _dec2 = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = _dec2(_class = function () {
    function Tweet(ts, ea) {
      _classCallCheck(this, Tweet);

      this.message = '';
      this.picture = [];
      this.errorMessage = null;
      this.loading = false;

      this.tweetService = ts;
      this.users = ts.users;
      this.ea = ea;
      var indexOfCurrentUser = this.users.map(function (u) {
        return u._id;
      }).indexOf(ts.currentUserId);
      if (indexOfCurrentUser > -1) {
        this.users.splice(indexOfCurrentUser, 1);
      }
    }

    Tweet.prototype.attached = function attached() {
      var _this = this;

      this.tweetsLoadedSubscription = this.ea.subscribe(_messages.ValidationFailed, function (msg) {
        if (msg.validationType === 'postTweet') {
          _this.errorMessage = 'The validation failed. Message must not be empty and file must not be too large';
        }
      });
    };

    Tweet.prototype.detached = function detached() {
      if (this.tweetsLoadedSubscription) {
        this.tweetsLoadedSubscription.dispose();
      }
    };

    Tweet.prototype.postTweet = function postTweet() {
      var _this2 = this;

      this.loading = true;
      var reader = new window.FileReader();
      reader.onload = function () {
        var file = reader.result;
        _this2.tweetService.postTweet(_this2.message, file);
      };

      if (this.picture[0]) {
        reader.readAsDataURL(this.picture[0]);
      } else {
        this.tweetService.postTweet(this.message, null);
      }
    };

    return Tweet;
  }()) || _class) || _class);
});
define('viewmodels/tweetmgmt/tweetmgmt',['exports', 'aurelia-framework', '../../services/tweet-service', 'aurelia-event-aggregator', '../../services/messages'], function (exports, _aureliaFramework, _tweetService, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TweetMgmt = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var TweetMgmt = exports.TweetMgmt = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function TweetMgmt(ts, ea) {
      _classCallCheck(this, TweetMgmt);

      this.users = [];
      this.filteredUsers = [];
      this.tweets = [];
      this.filter = '';
      this.selectedTweets = [];
      this.selectedUser = null;
      this.userAll = {
        _id: -1,
        imageUrl: 'http://res.cloudinary.com/joa44741/image/upload/v1513337357/unknown_user_axspin.jpg',
        nickName: 'All users'
      };

      this.tweetService = ts;
      this.ea = ea;
      this.tweets = this.tweetService.tweets;
      this.getUsersList();
    }

    TweetMgmt.prototype.selectUser = function selectUser(user) {
      var _this = this;

      this.selectedUserId = user;
      if (this.selectedUserId === this.userAll._id) {
        this.tweets = this.tweetService.tweets;
        this.selectedUser = null;
      } else {
        this.tweets = this.tweetService.tweets.filter(function (tweet) {
          return tweet.author._id === _this.selectedUserId;
        });
        this.selectedUser = this.users.filter(function (u) {
          return u._id === _this.selectedUserId;
        })[0];
      }
    };

    TweetMgmt.prototype.getUsersList = function getUsersList() {
      this.users = [];

      this.users.push(this.userAll);

      for (var _iterator = this.tweets, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var tweet = _ref;

        var _indexOfUser = this.users.map(function (u) {
          return u._id;
        }).indexOf(tweet.author._id);
        if (_indexOfUser === -1) {
          this.users.push(tweet.author);
        }
      }
      this.filteredUsers = this.users;
      var indexOfUser = this.filteredUsers.map(function (u) {
        return u._id;
      }).indexOf(this.selectedUserId);
      if (indexOfUser === -1) {
        this.selectedUserId = null;
        this.selectedUser = null;
      }
    };

    TweetMgmt.prototype.filterChanged = function filterChanged() {
      if (this.filter === '') {
        this.filteredUsers = this.users;
      } else {
        this.filteredUsers = [];
        this.filteredUsers.push(this.userAll);
        for (var _iterator2 = this.users, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
          var _ref2;

          if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref2 = _iterator2[_i2++];
          } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref2 = _i2.value;
          }

          var user = _ref2;

          if (user === this.userAll) {
            continue;
          }
          if (user.firstName.toUpperCase().includes(this.filter.toUpperCase()) || user.lastName.toUpperCase().includes(this.filter.toUpperCase()) || user.nickName.toUpperCase().includes(this.filter.toUpperCase()) || user.email.toUpperCase().includes(this.filter.toUpperCase())) {
            this.filteredUsers.push(user);
          }
        }
        var index = this.filteredUsers.map(function (u) {
          return u._id;
        }).indexOf(this.selectedUserId);
        if (index === -1) {
          this.selectedUserId = null;
          this.selectedUser = null;
        }
      }
    };

    TweetMgmt.prototype.deleteSelectedTweets = function deleteSelectedTweets() {
      for (var _iterator3 = this.selectedTweets, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref3 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref3 = _i3.value;
        }

        var tweetId = _ref3;

        this.tweetService.deleteTweet(tweetId);
      }
    };

    TweetMgmt.prototype.deleteAllTweetsOfSelectedUser = function deleteAllTweetsOfSelectedUser() {
      this.tweetService.deleteAllTweetsOfUser(this.selectedUserId);
    };

    TweetMgmt.prototype.deleteAllTweets = function deleteAllTweets() {
      this.tweetService.deleteAllTweets();
    };

    TweetMgmt.prototype.attached = function attached() {
      var _this2 = this;

      this.tweetsLoadedSubscription = this.ea.subscribe(_messages.TweetsLoaded, function (msg) {
        _this2.selectedTweets = [];
        _this2.tweets = msg.loadedTweets;
        _this2.getUsersList();
      });
    };

    TweetMgmt.prototype.detached = function detached() {
      if (this.tweetsLoadedSubscription) {
        this.tweetsLoadedSubscription.dispose();
      }
    };

    return TweetMgmt;
  }()) || _class);
});
define('viewmodels/tweetsoffriends/tweetsoffriends',['exports', 'aurelia-framework', '../../services/tweet-service', 'aurelia-event-aggregator', '../../services/messages'], function (exports, _aureliaFramework, _tweetService, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TweetsOfFriends = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var TweetsOfFriends = exports.TweetsOfFriends = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function TweetsOfFriends(ts, ea) {
      _classCallCheck(this, TweetsOfFriends);

      this.tweets = [];
      this.isDeletable = false;

      this.ea = ea;
      this.tweetService = ts;
      this.tweets = ts.tweetsOfFriends;
    }

    TweetsOfFriends.prototype.attached = function attached() {
      var _this = this;

      this.tweetsLoadedSubscription = this.ea.subscribe(_messages.FriendTweetsLoaded, function (msg) {
        _this.tweets = msg.loadedTweets;
      });
    };

    TweetsOfFriends.prototype.detached = function detached() {
      if (this.tweetsLoadedSubscription) {
        this.tweetsLoadedSubscription.dispose();
      }
    };

    return TweetsOfFriends;
  }()) || _class);
});
define('viewmodels/usermgmt/usermgmt',['exports', 'aurelia-framework', '../../services/tweet-service', 'aurelia-event-aggregator', '../../services/messages'], function (exports, _aureliaFramework, _tweetService, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UserMgmt = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var UserMgmt = exports.UserMgmt = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function UserMgmt(ts, ea) {
      var _this = this;

      _classCallCheck(this, UserMgmt);

      this.filteredUsers = [];
      this.users = [];
      this.filter = '';
      this.selectedUsers = [];
      this.firstName = '';
      this.lastName = '';
      this.nickName = '';
      this.email = '';
      this.password = '';

      this.tweetService = ts;
      this.ea = ea;
      this.tweetService.getUsers();
      this.getUsersList();

      this.ea.subscribe(_messages.ValidationFailed, function (msg) {
        if (msg.validationType === 'signup') {
          _this.errorMessage = 'Registration process failed. Maybe the email address is already in use.';
        } else if (msg.status.success) {
          _this.errorMessage = null;
        }
      });
    }

    UserMgmt.prototype.getUsersList = function getUsersList() {
      this.users = this.tweetService.users;
      var indexOfCurrentUser = this.users.map(function (u) {
        return u._id;
      }).indexOf(this.tweetService.currentUserId);
      if (indexOfCurrentUser > -1) {
        this.users.splice(indexOfCurrentUser, 1);
      }
      this.filteredUsers = this.users;
    };

    UserMgmt.prototype.filterChanged = function filterChanged() {
      if (this.filter === '') {
        this.filteredUsers = this.users;
      } else {
        this.filteredUsers = [];
        for (var _iterator = this.users, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var user = _ref;

          if (user.firstName.toUpperCase().includes(this.filter.toUpperCase()) || user.lastName.toUpperCase().includes(this.filter.toUpperCase()) || user.nickName.toUpperCase().includes(this.filter.toUpperCase()) || user.email.toUpperCase().includes(this.filter.toUpperCase())) {
            this.filteredUsers.push(user);
          }
        }
      }
    };

    UserMgmt.prototype.deleteSelectedUsers = function deleteSelectedUsers() {
      for (var _iterator2 = this.selectedUsers, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var userId = _ref2;

        this.tweetService.deleteUser(userId);
      }
    };

    UserMgmt.prototype.deleteAllUsers = function deleteAllUsers() {
      this.tweetService.deleteAllUsers();
    };

    UserMgmt.prototype.register = function register(e) {
      this.errorMessage = null;
      this.tweetService.register(this.firstName, this.lastName, this.nickName, this.email, this.password, false);
    };

    UserMgmt.prototype.attached = function attached() {
      var _this2 = this;

      console.log('attached');
      this.usersLoadedSubscription = this.ea.subscribe(_messages.UsersLoaded, function (msg) {
        _this2.getUsersList();
      });
      this.tweetsLoadedSubscription = this.ea.subscribe(_messages.UsersDeleted, function (msg) {
        _this2.selectedUsers = [];
        _this2.getUsersList();
      });
    };

    UserMgmt.prototype.detached = function detached() {
      if (this.tweetsLoadedSubscription) {
        this.tweetsLoadedSubscription.dispose();
      }
      if (this.usersLoadedSubscription) {
        this.usersLoadedSubscription.dispose();
      }
    };

    return UserMgmt;
  }()) || _class);
});
define('text!admin.html', ['module'], function(module) { module.exports = "<template><require from=\"nav-bar.html\"></require><div class=\"ui container page-host\"><nav-bar router.bind=\"router\"></nav-bar><router-view></router-view></div></template>"; });
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"nav-bar.html\"></require><div class=\"ui container page-host\"><nav-bar router.bind=\"router\"></nav-bar><router-view></router-view></div></template>"; });
define('text!home.html', ['module'], function(module) { module.exports = "<template><require from=\"nav-bar.html\"></require><div class=\"ui container page-host\"><nav-bar router.bind=\"router\"></nav-bar><router-view></router-view></div></template>"; });
define('text!nav-bar.html', ['module'], function(module) { module.exports = "<template bindable=\"router\"><nav class=\"ui inverted menu\"><div class=\"left menu\"><div repeat.for=\"row of router.navigation\"><a if.bind=\"row.config.name != 'login' && row.config.name != 'signup' && row.config.name != 'logout' && row.config.name != 'settings'\" class=\"${row.isActive ? 'active' : ''} item\" href.bind=\"row.href\">${row.title} </a></div></div><div class=\"right menu\"><div repeat.for=\"row of router.navigation\"><a if.bind=\"row.config.name == 'login' || row.config.name == 'signup' || row.config.name == 'logout' || row.config.name == 'settings'\" class=\"${row.isActive ? 'active' : ''} item\" href.bind=\"row.href\">${row.title} </a></div></div></nav></template>"; });
define('text!viewmodels/firehose/firehose.html', ['module'], function(module) { module.exports = "<template><article class=\"ui raised segment\"><h1 class=\"ui header\">Global Timeline</h1><compose view=\"./../partials/tweetlist.html\"></compose></article></template>"; });
define('text!viewmodels/login/login.html', ['module'], function(module) { module.exports = "<template><form submit.delegate=\"login($event)\" class=\"ui stacked segment form\"><h3 class=\"ui header\">Log-in</h3><div if.bind=\"errorMessage\" class=\"ui negative message transition\"><div class=\"header\"> ${errorMessage} </div></div><div class=\"field\"><label>Email</label><input placeholder=\"Email\" value.bind=\"email\"></div><div class=\"field\"><label>Password</label><input type=\"password\" value.bind=\"password\"></div><button class=\"ui blue submit button\">Login</button></form></template>"; });
define('text!viewmodels/logout/logout.html', ['module'], function(module) { module.exports = "<template><form submit.delegate=\"logout($event)\" class=\"ui stacked segment form\"><h3 class=\"ui header\">Are you sure you want to log out?</h3><button class=\"ui blue submit button\">Logout</button></form></template>"; });
define('text!viewmodels/mytimeline/mytimeline.html', ['module'], function(module) { module.exports = "<template><article class=\"ui raised segment\"><compose view=\"./../partials/userinformation.html\"></compose><div class=\"ui divider\"></div><compose view=\"./../partials/tweetlist.html\"></compose></article></template>"; });
define('text!viewmodels/partials/signupForm.html', ['module'], function(module) { module.exports = "<template><form submit.delegate=\"register($event)\" class=\"ui stacked segment form\"><h3 class=\"ui header\">Register</h3><div if.bind=\"errorMessage\" class=\"ui negative message transition\"><div class=\"header\"> ${errorMessage} </div></div><div class=\"two fields\"><div class=\"field\"><label>First Name</label><input placeholder=\"First Name\" type=\"text\" value.bind=\"firstName\"></div><div class=\"field\"><label>Last Name</label><input placeholder=\"Last Name\" type=\"text\" value.bind=\"lastName\"></div></div><div class=\"field\"><label>Nick Name</label><input placeholder=\"Nick Name\" type=\"text\" value.bind=\"nickName\"></div><div class=\"field\"><label>Email</label><input placeholder=\"Email\" type=\"text\" value.bind=\"email\"></div><div class=\"field\"><label>Password</label><input type=\"password\" value.bind=\"password\"></div><button class=\"ui blue submit button\">Register</button></form></template>"; });
define('text!viewmodels/partials/tweetlist.html', ['module'], function(module) { module.exports = "<template><form class=\"ui form\"><div class=\"ui feed\"><div class=\"event\" repeat.for=\"tweet of tweets\"><div class=\"label\"><img src=\"${tweet.author.imageUrl}\"></div><div class=\"content\"><div class=\"inline fields\"><div class=\"fifteen wide field\"><div class=\"summary\"><a if.bind=\"tweet.isTweetOfCurrentUser || isMyTimeline\" class=\"user\" route-href=\"route: mytimeline\"> ${tweet.author.nickName} </a><a if.bind=\"!tweet.isTweetOfCurrentUser && !isMyTimeline\" class=\"user\" route-href=\"route: showtimeline; params.bind: {id:tweet.author._id}\"> ${tweet.author.nickName} </a><div class=\"date\">${tweet.formattedDate} (${tweet.creationDate})</div></div></div><div class=\"one wide field\"><div if.bind=\"isDeletable\" class=\"ui checkbox\"><input type=\"checkbox\" value=\"${tweet._id}\" name=\"tweetToDelete\" model.bind=\"tweet._id\" checked.bind=\"selectedTweets\"><label>select</label></div></div></div><div class=\"extra text\"> ${tweet.message} </div><div if.bind=\"tweet.imageUrl\" class=\"extra images\"><img src=\"${tweet.imageUrl}\"></div><div class=\"meta\"></div></div></div></div><div if.bind=\"isDeletable\"><div class=\"ui divider\"></div><div class=\"two inline fields\"><div class=\"three wide field\"><button class=\"ui blue submit button\" click.delegate=\"deleteSelectedTweets()\">Delete selection</button></div><div class=\"three wide field\"><button class=\"ui blue submit button\" click.delegate=\"deleteAllTweets()\">Delete all tweets</button></div></div></div></form></template>"; });
define('text!viewmodels/partials/userinformation.html', ['module'], function(module) { module.exports = "<template><div class=\"ui grid\"><div class=\"fifteen wide column\"><h1 if.bind=\"isMyTimeline\" class=\"ui header\">My Timeline</h1><h1 if.bind=\"!isMyTimeline\" class=\"ui header\">Timeline of User: ${user.nickName}</h1></div><div if.bind=\"!isMyTimeline\" class=\"one wide column\"><button if.bind=\"isFollowing\" class=\"ui blue submit button right floated\" click.delegate=\"unfollowUser()\">Unfollow</button> <button if.bind=\"!isFollowing\" class=\"ui blue submit button right floated\" click.delegate=\"followUser()\">Follow</button></div><div class=\"sixteen wide column\"><img class=\"small ui image\" src=\"${user.imageUrl}\"><h3 class=\"sub header\">Name: ${user.firstName} ${user.lastName}<br>Email: ${user.email} </h3></div><div class=\"two wide column\"><i class=\"users icon\"></i> ${user.followers.length} Followers</div><div class=\"two wide column\"><i class=\"users icon\"></i> ${user.followings.length} Followings</div></div></template>"; });
define('text!viewmodels/searchusers/searchusers.html', ['module'], function(module) { module.exports = "<template><article class=\"ui raised segment\"><h1 class=\"ui header\">Search for users</h1><form class=\"ui form\"><div class=\"inline field\"><div class=\"ui left icon input\"><input value.bind=\"filter\" input.delegate=\"filterChanged()\" type=\"text\" placeholder=\"Search users...\"> <i class=\"users icon\"></i></div></div></form><div class=\"ui divider\"></div><div class=\"ui cards\"><div class=\"card\" repeat.for=\"user of filteredUsers\"><div class=\"content\"><img class=\"right floated mini ui image\" src=\"${user.imageUrl}\"> <a class=\"header\">${user.nickName}</a><div class=\"meta\"> ${user.firstName} ${user.lastName}<br> ${user.email} </div></div><div class=\"extra content\"><a class=\"ui blue submit button right floated\" route-href=\"route: showtimeline; params.bind: {id:user._id}\">Show Timeline </a><i class=\"users icon\"></i> ${user.followers.length} Followers</div></div></div></article></template>"; });
define('text!viewmodels/settings/settings.html', ['module'], function(module) { module.exports = "<template><article class=\"ui raised segment\"><div class=\"ui grid\"><div class=\"ui sixteen wide column\"><div class=\"ui stacked fluid form segment\"><form submit.trigger=\"updateSettings()\" enctype=\"multipart/form-data\"><h3 class=\"ui header\">Settings</h3><div class=\"field\"><label>First Name</label><input value.bind=\"firstName\" type=\"text\" name=\"firstName\"></div><div class=\"field\"><label>Last Name</label><input value.bind=\"lastName\" type=\"text\" name=\"lastName\"></div><div class=\"field\"><label>Nick Name</label><input value.bind=\"nickName\" type=\"text\" name=\"nickName\"></div><div class=\"field\"><label>Email</label><input value.bind=\"email\" type=\"text\" name=\"email\"></div><div class=\"field\"><label>Password</label><input value.bind=\"password\" type=\"password\" name=\"password\"></div><div class=\"field\"><img class=\"small ui image\" src=\"${imageUrl}\"><label>New image</label><input type=\"file\" accept=\"image/*\" files.bind=\"picture\"></div><button class.bind=\"loading ? 'loading' : ''\" class=\"ui blue submit button\">Submit</button></form></div></div></div></article></template>"; });
define('text!viewmodels/showtimeline/showtimeline.html', ['module'], function(module) { module.exports = "<template><article class=\"ui raised segment\"><compose view=\"./../partials/userinformation.html\"></compose><div class=\"ui divider\"></div><compose view=\"./../partials/tweetlist.html\"></compose></article></template>"; });
define('text!viewmodels/signup/signup.html', ['module'], function(module) { module.exports = "<template><compose view=\"./../partials/signupForm.html\"></compose></template>"; });
define('text!viewmodels/statistics/statistics.html', ['module'], function(module) { module.exports = "<template><article class=\"ui raised segment\"><h1 class=\"ui header\">Statistics</h1><div class=\"ui raised segment\"><h1 class=\"ui center aligned header\"><i class=\"users icon\"></i> Users with most followers</h1><div class=\"ui three statistics\"><div class=\"statistic\" repeat.for=\"user of usersWithMostFollowers\"><div style=\"text-align:center\"><div class=\"ui label\">${user.nickName}</div></div><div class=\"value\"><img src=\"${user.imageUrl}\" class=\"ui circular inline image\"> ${user.followers.length} </div><div class=\"label\">Followers</div></div></div></div><div class=\"ui raised segment\"><h1 class=\"ui center aligned header\"><i class=\"comments icon\"></i> Users with most tweets</h1><div class=\"ui three statistics\"><div class=\"statistic\" repeat.for=\"user of usersWithMostTweets\"><div style=\"text-align:center\"><div class=\"ui label\">${user.nickName}</div></div><div class=\"value\"><img src=\"${user.imageUrl}\" class=\"ui circular inline image\"> ${user.tweetsCount} </div><div class=\"label\">Tweets</div></div></div></div><div class=\"ui raised segment\"><h1 class=\"ui center aligned header\"><i class=\"trophy icon\"></i> General statistics</h1><div class=\"ui two statistics\"><div class=\"statistic\"><div class=\"value\"><i class=\"users icon\"></i> ${userCount} </div><div class=\"label\">Users</div></div><div class=\"statistic\"><div class=\"value\"><i class=\"comments icon\"></i> ${tweetCount} </div><div class=\"label\">Tweets</div></div></div></div></article></template>"; });
define('text!viewmodels/tweet/tweet.html', ['module'], function(module) { module.exports = "<template><article class=\"ui raised segment\"><h1 class=\"ui header\">Tweet your thoughts</h1><div class=\"ui divider\"></div><div class=\"ui grid\"><div class=\"ui sixteen wide column fluid form\"><div class=\"ui stacked segment\"><form submit.trigger=\"postTweet()\" enctype=\"multipart/form-data\"><div if.bind=\"errorMessage\" class=\"ui negative message transition\"><div class=\"header\"> ${errorMessage} </div></div><div class=\"field\"><label>Message</label><textarea onkeyup=\"textCounter(this,140)\" maxlength=\"140\" placeholder=\"Message\" type=\"text\" value.bind=\"message\"></textarea><input disabled=\"disabled\" maxlength=\"3\" size=\"3\" value=\"140\" id=\"counter\"></div><div class=\"field\"><label>Image</label><input type=\"file\" accept=\"image/*\" files.bind=\"picture\"></div><button class.bind=\"loading ? 'loading' : ''\" class=\"ui blue submit button\">Send!</button></form></div></div></div></article></template>"; });
define('text!viewmodels/tweetmgmt/tweetmgmt.html', ['module'], function(module) { module.exports = "<template><article class=\"ui raised segment\"><h1 class=\"ui header\">Tweet management</h1><section class=\"ui raised segment\"><form class=\"ui form\"><h3 class=\"ui header\">Filter users</h3><div class=\"inline field\"><div class=\"ui left icon input\"><input value.bind=\"filter\" input.delegate=\"filterChanged()\" type=\"text\" placeholder=\"Filter users...\"> <i class=\"users icon\"></i></div></div></form><div class=\"ui grid raised segment\"><div class=\"four wide column\"><div class=\"ui link items\"><button class=\"ui inverted grey button item\" repeat.for=\"user of filteredUsers\" click.delegate=\"selectUser(user._id)\"><div class=\"ui tiny image\"><img src=\"${user.imageUrl}\"></div><div class=\"middle aligned content userItemText\"> ${user.nickName} </div></button></div></div><div class=\"twelve wide column\"><form class=\"ui form\"><div class=\"ui feed\"><div class=\"event\" repeat.for=\"tweet of tweets\"><div class=\"label\"><img src=\"${tweet.author.imageUrl}\"></div><div class=\"content\"><div class=\"inline fields\"><div class=\"fourteen wide field\"><div class=\"summary\"><a class=\"user\"> ${tweet.author.nickName} </a><div class=\"date\">${tweet.formattedDate} (${tweet.creationDate})</div></div></div><div class=\"two wide field\"><div class=\"ui checkbox\"><input type=\"checkbox\" value=\"${tweet._id}\" name=\"tweetToDelete\" model.bind=\"tweet._id\" checked.bind=\"selectedTweets\"><label>select</label></div></div></div><div class=\"extra text\"> ${tweet.message} </div><div if.bind=\"tweet.imageUrl\" class=\"extra images\"><img src=\"${tweet.imageUrl}\"></div><div class=\"meta\"></div></div></div></div></form></div></div><button class=\"ui large blue submit button\" click.delegate=\"deleteSelectedTweets()\">Delete selected tweets (${selectedTweets.length})</button> <button class.bind=\"selectedUser == null ? 'disabled' : ''\" class=\"ui large blue submit button\" click.delegate=\"deleteAllTweetsOfSelectedUser()\">Delete all tweets of ${selectedUser.nickName} </button> <button class=\"ui large blue submit button\" click.delegate=\"deleteAllTweets()\">Delete all tweets</button></section></article></template>"; });
define('text!viewmodels/tweetsoffriends/tweetsoffriends.html', ['module'], function(module) { module.exports = "<template><article class=\"ui raised segment\"><h1 class=\"ui header\">Tweets of Friends</h1><compose view=\"./../partials/tweetlist.html\"></compose></article></template>"; });
define('text!viewmodels/usermgmt/usermgmt.html', ['module'], function(module) { module.exports = "<template><article class=\"ui raised segment\"><h1 class=\"ui header\">User management</h1><section class=\"ui raised segment\"><h2 class=\"ui header\">Delete users</h2><div class=\"ui divider\"></div><form class=\"ui form\"><h3 class=\"ui header\">Filter users</h3><div class=\"inline field\"><div class=\"ui left icon input\"><input value.bind=\"filter\" input.delegate=\"filterChanged()\" type=\"text\" placeholder=\"Filter users...\"> <i class=\"users icon\"></i></div></div></form><div class=\"ui raised segment\"><div class=\"ui cards\"><div class=\"card\" repeat.for=\"user of filteredUsers\"><div class=\"content\"><img class=\"right floated mini ui image\" src=\"${user.imageUrl}\"> <a class=\"header\">${user.nickName}</a><div class=\"meta\"> ${user.firstName} ${user.lastName}<br> ${user.email} </div></div><div class=\"extra content\"><div class=\"ui checkbox right floated\"><input type=\"checkbox\" value=\"${user._id}\" name=\"userToDelete\" model.bind=\"user._id\" checked.bind=\"selectedUsers\"><label>select</label></div><i class=\"users icon\"></i> ${user.followers.length} Followers</div></div></div></div><button class=\"ui large blue submit button\" click.delegate=\"deleteSelectedUsers()\">Delete selected users (${selectedUsers.length})</button> <button class=\"ui large blue submit button\" click.delegate=\"deleteAllUsers()\">Delete all users</button></section><section class=\"ui raised segment\"><h2 class=\"ui header\">Add users</h2><div class=\"ui divider\"></div><compose view=\"./../partials/signupForm.html\"></compose></section></article></template>"; });
//# sourceMappingURL=app-bundle.js.map