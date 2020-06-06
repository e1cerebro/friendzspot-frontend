import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import moment from 'moment';

export const GetTimeAgo = (date, style) => {
  var local = new Date(date);
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en-US');
  if (style === 'short') {
    return timeAgo.format(local, 'twitter');
  } else if (style === 'long') {
    return moment(date).format('LT');
  } else {
    return moment(date).format('LL');
  }
};
