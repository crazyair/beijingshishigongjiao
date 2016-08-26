import {observable, computed, action} from  'mobx';
import {get, set} from '../utils/local';
import http from '../api/axios';
import  config from  'config';
// console.log('config', config);
class Main {
  name = 'Main';
  @observable ckData = [];
  @observable searchList = [];

  @action getCk() {
    this.searchList = [];
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

  @action search(value) {
    this.searchList = [];
    if (value) {
      const data = _.filter(this.ckData.line, function (n) {
        if (eval('/.*?(' + value + ').*?/g').test(n.name)) {
          return n;
        }
      });
      this.searchList = _.take(data, 10);
      //保存历史

    }
  }
}


export default Main;
