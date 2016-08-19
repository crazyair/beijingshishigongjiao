import {observable, computed, action} from  'mobx';
import {get, set} from '../utils/local';
import http from '../api/axios';

class Line {
  name = 'Line';
  //上下行名字
  @observable list = [];

  @observable listLine = [];

  @observable selBDir = 0;
  @observable selBStop = 0;

  // @action getCk() {
  //   const _this = this;
  //   if (!get('ck')) {
  //     http.get('getCk').then(function (data) {
  //       set('ck', data.data);
  //       _this.ckData = data.data;
  //     })
  //   }
  //   this.ckData = get('ck');
  // }

  @action getLine(selBLine) {
    const _this = this;
    http.get('/getLine', {act: 'getLineDirOption', selBLine: selBLine}).then(function (data) {
      const d = [];
      data.data.map((item, index)=> {
        d.push({
          id: item.id,
          name: item.name
        })
      });
      _this.list = d;
      _this.getList(selBLine, data.data[0].id);
    });
  }

  @action getList(selBLine, selBDir) {
    this.selBDir = selBDir;
    const _this = this;
    // http.get('/getLine', {act: 'getDirStationOption', selBLine: selBLine, selBDir: selBDir}).then(function (data) {
    //   const d = [];
    //   data.data.map((item, index)=> {
    //     d.push({
    //       id: item.id,
    //       name: item.name
    //     })
    //   });
    //   _this.listLine = d;
    //   console.log('d', d.length);

    // });
    _this.goOn(selBLine,10);
  }

    //查询公交实时信息
  @action goOn(selBLine,selBStop) {
    const _this = this;
    _this.selBStop = selBStop;

    http.get('/getLine', {
      act: 'busTime', selBLine: selBLine, selBDir: this.selBDir, selBStop: this.selBStop
    }).then(function (data) {
      const d = [];
      data.data.list.map((item, index)=> {
        d.push({
          id: item.id,
          name: item.name,
          active: item.active,
          isDZ: item.isDZ,
          metre: item.metre
        })
      });
      _this.listLine = d;
    });
  }

}


export default Line;
