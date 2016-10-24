//如果用import  就要用 default 来转换时间
// import * as moments from 'moment';
// import {default as moment} from 'moment';
//('moment', moments.default(data).toDate().getTime());
const moment = require('moment');
export function toTime(data) {
  if (data == '') {
    data = new Date();
  }
  return moment(data).toDate().getTime();
}
export function get_unix_time(dateStr){
    var newstr = dateStr.replace(/-/g,'/');
    var date =  new Date(newstr);
    var time_str = date.getTime().toString();
    return time_str.substr(0, 10)*1000;
}
export function getTime(data) {
  if (data == '' || data == undefined) {
    return '';
  } else {
    return moment(data).toDate().getTime();
  }
}
export function format(data,format='YYYY-MM-DD') {
  return moment(data).format(format);

}
