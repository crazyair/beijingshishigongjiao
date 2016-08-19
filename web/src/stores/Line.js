import {observable, computed, action} from  'mobx';
import {get, set} from '../utils/local';
import http from '../api/axios';

class Line {
  name = 'Line';

  @observable ckData = [];

  @action getCk() {
    const _this = this;
    if (!get('ck')) {
      http.get('getCk').then(function (data) {
        set('ck', data.data);
        _this.ckData = data.data;
      })
    }
    this.ckData = get('ck');
  }

  @action getLine(type,lineNum) {
    http.get('/getLine', {act: 'getLineDirOption', selBLine: lineNum}).then(function (data) {
      console.log('data', data);
    });
  }
}


export default Line;
