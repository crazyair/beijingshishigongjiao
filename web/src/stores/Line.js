import {observable, computed, action} from  'mobx';
import {get, set} from '../utils/local';
import http from '../api/axios';

class Line {
  name = 'Line';
  //上下行名字
  @observable list = []; //公交上下行名字
  @observable listLine = [];//公交站牌List

  //参数
  @observable selBLine = 0;//公交线路
  @observable selBDir = 0;//上下行的Id
  @observable selBStop = 0;//上车的站牌Id

  //获取公交上下行数据
  @action getLine(selBLine) {
    this.selBLine = selBLine;
    const _this = this;
    http.get('/getLine', {act: 'getLineDirOption', selBLine: _this.selBLine}).then(function (data) {
      _this.list = data.data;
      _this.selBDir = data.data[0].id;
      _this.getList(_this.selBDir);
      // _this.goOn(5);
    });
  }

  //获取上下行Id
  @action getList(selBDir) {
    const _this = this;
    this.selBDir = selBDir;

    http.get('/getLine', {
      act: 'getDirStationOption', selBLine: _this.selBLine, selBDir: this.selBDir
    }).then(function (data) {
      _this.goOn(data.data.length);
    });
  }

  //查询公交实时信息
  @action goOn(selBStop) {
    const _this = this;
    _this.selBStop = selBStop;
    http.get('/getLine', {
      act: 'busTime', selBLine: _this.selBLine, selBDir: this.selBDir, selBStop: this.selBStop
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
