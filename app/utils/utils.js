export function formatDate(date) {

  const monthNames = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December'
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

export function trunc(n, str) {
  return str.substr(0, n - 1) + (str.length > n ? '...' : '');
}

export function lower(str) {
  return str.toLowerCase();
}
