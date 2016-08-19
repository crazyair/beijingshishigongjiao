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
    http.get('/getLine', {act: 'getDirStationOption', selBLine: selBLine, selBDir: selBDir}).then(function (data) {
      const d = [];
      data.data.map((item, index)=> {
        d.push({
          id: item.id,
          name: item.name
        })
      });
      _this.listLine = d;
    });
  }

  @action goOn(data, selBLine) {
    const _this = this;
    const d = [];
    this.listLine.map((item, index)=> {
      d.push({
        id: item.id,
        name: item.name
      });
      if (data.id == item.id) {
        d[index].msg = '上车站';
        _this.selBStop = item.id;
      }
    });
    this.listLine = d;
    //查询公交实时信息
    // act=busTime&selBLine=1&selBDir=5276138694316562750&selBStop=1
    // act:busTime
    // selBLine:1
    // selBDir:5276138694316562750
    // selBStop:1

    http.get('/getLine', {
      act: 'busTime',
      selBLine: selBLine,
      selBDir: this.selBDir,
      selBStop: this.selBStop
    }).then(function (data) {
      const d = [];
      data.data.map((item, index)=> {
        d.push({
          id: item.id,
          name: item.name
        })
      });
      _this.listLine = d;
    });
  }


  @action getAll(data) {
    return http.get('/getLine', data);
  }
}


export default Line;
