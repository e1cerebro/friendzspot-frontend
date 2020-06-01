import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

export const GetTimeAgo = (date, style) => {
  var local = new Date(date);
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en-US');
  if (style !== 'short') {
    return timeAgo.format(local);
  }
  return timeAgo.format(local, 'twitter');
};
