import moment from 'moment';

export default class Formatter {

  formatTweetCreationDates(tweets) {
    for (let index in tweets) {
      if (moment(tweets[index].creationDate).fromNow() !== 'Invalid date') {
        tweets[index].creationDate = moment(tweets[index].creationDate).format('DD.MM.YYYY HH:mm:ss');
        tweets[index].formattedDate = moment(tweets[index].creationDate, 'DD.MM.YYYY HH:mm:ss').fromNow();
      }
    }
  }

}
