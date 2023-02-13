import moment from 'moment';

export const formatDate = (timestamp: string) => {
  return moment(timestamp).fromNow();
};

export const getSecondsDifferenceBetweenDates = (timestamp: string) => {
  const now = moment(new Date()); //todays date
  const end = moment(+timestamp); // another date
  const duration = moment.duration(now.diff(end));
  const seconds = duration.asSeconds();
  return seconds;
};
