export const formatDate = (s: string) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const d = new Date(+s);
  const year = d.getFullYear();
  const month = monthNames[d.getMonth()];
  const date = d.getDate();
  const hour = d.getHours();
  const min = d.getMinutes();
  const currentYear = new Date().getFullYear();
  return `${date} ${month}${currentYear - year >= 1 ? ` ${year}` : ''}, ${hour}:${min}`;
};
