import React from 'react';
import {observer} from 'mobx-react';
import {Popover, Button, NavBar, Icon, WhiteSpace, Tabs, List, Toast, Switch} from 'antd-mobile';
const TabPane = Tabs.TabPane;
const Item = Popover.Item;
import {createForm} from 'rc-form';
import {hashHistory} from 'react-router';
import {get, set} from '../utils/local';
import {format, toTime, getTime} from '../utils/date'
@observer
class L extends React.Component {
  constructor(props) {
    super(props);
    this.store = props.store;
    this.state = {
      num: 0,
      localIndex: get('slNum') || [0] //如果是别人分享的，就让他保存一条记录吧！
      , date: ''
    };
    this.changeType = this.changeType.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentWillMount() {
    this.store.getLine(this.props.params.id);
  }

  componentDidMount() {
    this.date = setInterval(() => {
      this.setState({date: format(toTime(), 'YYYY-MM-DD HH:mm:ss')});
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.date);
  }

  //切换上下行 type
  changeType(type) {
    this.store.getList(type);
  }

  //切换上车点 station
  goClick(item, e) {
    this.setState({id: item.id});
    this.store.goOn(item.id);
  }

  goBack() {
    this.props.router.push('/search');
  }

  handleChange(checked) {
    this.setState({refresh: checked});

    //
    // this.downLoadList(url, params, function (file_name) {
    //   const fetchUrl = () => {
    //     _this.eachDownLoadList(file_name, (downUrl, type) => {
    //       if (type) {
    //         setTimeout(fetchUrl, 1000);
    //       } else {
    //         window.location.href = downUrl;
    //         _this.setState({downLoading: false});
    //       }
    //     });
    //   };
    //   fetchUrl();
    //
    // });


    if (checked) {
      const fetch = () => {
        this.store.goOn(this.state.id).then((type) => {
          if (type) {
            this.setState({num: this.state.num + 1});
            this.timeout = setTimeout(fetch, 1000);
          }
        });

      };
      fetch();
    } else {
      clearTimeout(this.timeout);
    }
  }
  componentWillUnmount(){
    clearTimeout(this.timeout);
  }

  render() {
    return (
      <div >
        <NavBar rightContent={
          <div>
            {/*首页*/}
          </div>
        } leftContent="返回" onLeftClick={this.goBack}
        >
          公交实时信息
        </NavBar>
        <div>
          {this.store.list.length < 2 ? '' :
            <Tabs defaultActiveKey={this.store.list[0].id} type="capsule" onChange={this.changeType}>
              {this.store.list.map((item, index) =>
                <TabPane tab={item.type} key={item.id}></TabPane>
              )}
            </Tabs>
          }
        </div>
        <p>
          {this.store.listLineBase.road} {this.store.listLineBase.roadName}
        </p>
        <p>
          {this.state.date}
        </p>
        <p style={{height: 80}}>
          {this.store.listLineBase.roadMsg}
        </p>
        {this.state.id && <p>
          <List.Item
            extra={<Switch
              onChange={(checked) => this.handleChange(checked)}
              checked={this.state.refresh}
            />}
          >自动刷新（{this.state.num}）</List.Item>
        </p>}
        <List>
          {this.store.listLine.map((item, index) =>
            <List.Item key={index} extra={type(item).name} arrow={type(item).type}
                       onClick={this.goClick.bind(this, item)}>
              {item.id} {item.name}{item.metre}
            </List.Item>
          )}
        </List>

      </div>
    );
  }
}

function type(item) {
  let d = {};
  if (item.active == 'active') {
    d = {
      type: 'up',
      name: d.name || '' + '等车站牌'
    };
  }
  if (item.metre > 0) {
    d = {
      type: 'down',
      name: d.name || '' + '进入下一站'
    };
  }
  if (item.isDZ) {
    d = {
      type: 'horizontal',
      name: d.name || '' + '已经到站'
    };
  }
  return d;
}

L.defaultProps = {};
L = createForm()(L);

export default L;
