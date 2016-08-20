import {observable, computed, action} from  'mobx';
import {get, set} from '../utils/local';
import http from '../api/axios';

class Main {
  name = 'Main';

  @observable ckData = [];

  @action getCk() {
    const _this = this;
    if (!get('ck')) {
      http.get('getCk').then(function (data) {
        set('ck', data.data.ck);
        set('ckLine', data.data.line);
        _this.ckData = data.data;
      })
    }
    this.ckData = {
      ck: get('ck'),
      line: get('ckLine')
    }
  }

  // @action getLine(type, lineNum) {
  //   http.get('/getLine', {act: 'getLineDirOption', selBLine: lineNum}).then(function (data) {
  //     console.log('data', data);
  //   });
  // }
}


export default Main;
