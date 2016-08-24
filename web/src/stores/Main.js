import {observable, computed, action} from  'mobx';
import {get, set} from '../utils/local';
import http from '../api/axios';
import  config from  'config';
console.log('config', config);
class Main {
  name = 'Main';


  @observable ckData = [];

  @action getCk() {
    const _this = this;
    if (!get('ck')) {
      http.get('ck').then(function (data) {
        if (data.data.ck) {
          set('ck', data.data.ck);
          set('ckLine', data.data.line);
          _this.ckData = data.data;
        }
      })
    }
    this.ckData = {
      ck: get('ck'),
      line: get('ckLine')
    }
  }
}


export default Main;
