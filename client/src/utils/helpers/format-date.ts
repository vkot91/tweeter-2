import moment from 'moment';

export const formatDate = (timestamp: string) => {
  moment.locale('en', {
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: '1s',
      ss: '%ss',
      m: '1m',
      mm: '%dm',
      h: '1h',
      hh: '%dh',
      d: '1d',
      dd: '%dd',
      M: '1M',
      MM: '%dM',
      y: '1Y',
      yy: '%dY',
    },
  });
  return moment(+timestamp).fromNow();
};

export const getSecondsDifferenceBetweenDates = (timestamp: string) => {
  const now = moment(new Date()); //todays date
  const end = moment(+timestamp); // another date
  const duration = moment.duration(now.diff(end));
  const seconds = duration.asSeconds();
  return seconds;
};
