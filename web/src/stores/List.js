import {observable, computed, action} from  'mobx';
// import http from '../api';
import http from '../api/axios';

class List {
  name = '啦啦啦';

  @observable list = [];

  @action getCookie() {
    http.get('get').then(function (data) {
      console.log('data', data);
    })
  }

  @action getList() {
    http.get('/test').then(function (data) {
      console.log('data', data);
    });
    // console.log('11', http.get('/test'));

  }
}


export default  List;
