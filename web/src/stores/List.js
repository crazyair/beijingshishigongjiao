import {observable, computed, action} from  'mobx';
// import http from '../api';
import {get, set} from '../utils/local';
import http from '../api/axios';

class List {
  name = '啦啦啦';

  @observable list = [];

  @action getCk() {
    http.get('getCk').then(function (data) {
      console.log('data', data);
      set('ck', data.data.ck);
    })
  }

  @action getList() {
    http.get('/getLine', { act: 'getLineDirOption', selBLine: 1 }).then(function (data) {
      console.log('data', data);
    });
    // console.log('11', http.get('/test'));

  }
}


export default List;
