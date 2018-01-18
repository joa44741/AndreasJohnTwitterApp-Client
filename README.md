# TwitterApp
Client Side (Aurelia) of the Twitter App - Assignment for the DMAS (Building Modern Web Applications &amp; Services using Node.js) course 2017/2018

Student name: Andreas John<br/>
Student id: 3004517

Description: My twitter webapp has several features:
- If the user isn't logged in there are three navigation links in the navbar: Global Tweets, Signup, Login
  - Global Tweets: the landing page when a user opens the webapp in the browser. It represents the firehose feature, which means that all tweets of all users are shown in this view.
  - Signup: the view where a new user has to enter his data in order to registrate for the twitter system.
  - Login: the dialog where the user has to enter his credentials to login to the twitter app. 
- If the user is logged in as 'Administrator' by using the email 'admin@johntwitter.com' and password 'admin' for the login fields, there are four different navigation links visible:
  - User management: users can be added and/or deleted in this view.
  - Tweet management: tweets can be deleted here. All tweets of all users, all tweets of a specific user or specifically selected tweets can be removed by using the buttons.
  - Statistics: some statistics are shown
  - Logout: the current user (in this case the administrator) is logged out
- If the user is logged in as normal user there are seven links in the navbar:
  - Global Tweets: the same page like for users that aren't logged in. The only difference is that a logged in user can click on the name of the author of a tweet and show his timeline.
  - Tweets of friends: shows all tweets of the persons you are following
  - Search for users: functionality to search for users via a filter and then show the timeline of a specific user
  - My Timeline: shows the timeline of the logged in user including the possibility to delete all tweets or just a selection
  - New Tweet!: the user can post a new tweet that contains maximally 140 characters and one picture (optional)
  - Settings: the logged in user can change his data here. Also the password and email can be changed.
  - Logout: the current user is logged out

Github Repo client: https://github.com/joa44741/AndreasJohnTwitterApp-Client <br/>
Github Repo server: https://github.com/joa44741/AndreasJohnTwitterApp

Deployed client: https://joa44741.github.io/AndreasJohnTwitterApp-Client/ <br/>
Deployed webapp (server): https://damp-fjord-87496.herokuapp.com/
