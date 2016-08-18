import Storage from  'react-storage';
import {browserHistory} from 'react-router'

export function set(name, data) {
  Storage.set(name, JSON.stringify(data));
}
export function get(name) {
  let data = undefined;
  if (Storage.get(name) && Storage.get(name) !== '') {
    data = JSON.parse(Storage.get(name)) || undefined;
  }
  return data;
}

export function getParameter() {
  var url = location.search; //获取url中"?"符后的字串
  var theRequest = [];
  if (url.indexOf('?') != -1) {
    var str = url.substr(1),
      strs = str.split('&');
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
    }
  }
  return theRequest;
}
