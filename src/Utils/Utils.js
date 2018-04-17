export function formatDate(date) {

  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

export function trunc(n,str){
  return str.substr(0,n-1)+(str.length>n?'...':'');
}

export function lower(str){
  return str.toLowerCase();
}
