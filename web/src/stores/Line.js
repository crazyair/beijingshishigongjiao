import {observable, computed, action} from  'mobx';
import {get, set} from '../utils/local';
import http from '../api/axios';
import {Toast} from 'antd-mobile';
import {History, hashHistory} from 'react-router'
class Line {
  name = 'Line';
  //上下行名字
  @observable list = []; //公交上下行名字
  @observable listLine = [];//公交站牌List
  @observable listLineBase = {};//公交站牌Base

  //参数
  @observable selBLine = 0;//公交线路
  @observable selBDir = 0;//上下行的Id
  @observable selBStop = 0;//上车的站牌Id

  //获取公交上下行数据
  @action getLine(selBLine) {
    this.selBLine = selBLine;
    const _this = this;

    http.get('/lines', {act: 'getLineDirOption', selBLine: _this.selBLine}).then(function (data) {
      if (!data) {
        http.get('ck').then(function (data) {
          if (data.data.ck) {
            set('ck', data.data.ck);
            set('ckLine', data.data.line);
            _this.getLine(_this.selBLine);
          }
        });
        return;
      }
      // if (!data)return;
      const d = [];
      data.data.map((item, index)=> {
        d.push({
          id: item.id,
          name: item.name,
          type: index == 0 ? '上行' : '下行'
        });
      });
      _this.list = d;
      console.log('data', d);

      _this.selBDir = data.data[0].id;
      _this.getList(_this.selBDir);
      // _this.goOn(5);
    });
  }

  //获取上下行Id
  @action getList(selBDir) {
    const _this = this;
    this.selBDir = selBDir;

    http.get('/lines', {
      act: 'getDirStationOption', selBLine: _this.selBLine, selBDir: this.selBDir
    }).then(function (data) {
      if (!data)return;
      _this.goOn(data.data.length);
      Toast.loading('加载中...', 0.5, () => {

      });
    });
  }

  //查询公交实时信息
  @action goOn(selBStop) {
    const _this = this;
    _this.selBStop = selBStop;
    http.get('/lines', {
      act: 'busTime', selBLine: _this.selBLine, selBDir: this.selBDir, selBStop: this.selBStop
    }).then(function (data) {
      if (!data)return;
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
      _this.listLineBase = data.data;
      _this.listLine = d;
    });
  }

}


export default Line;
