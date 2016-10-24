import React from 'react';
import {observer} from 'mobx-react';
import {FloatMenu, Button, NavBar, Icon, WhiteSpace, Tabs, List, Toast} from 'antd-mobile';
const TabPane = Tabs.TabPane;
const Item = FloatMenu.Item;
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
      localIndex: get('slNum') || [0] //如果是别人分享的，就让他保存一条记录吧！
      , date: ''
    };
    this.changeType = this.changeType.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentWillMount() {
    this.store.getLine(this.props.params.id);
    // let date = ;

  }

  componentDidMount() {

    this.date = setInterval(()=> {
      this.setState({date: format(toTime(), 'YYYY-MM-DD hh:mm:ss')});
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
    this.store.goOn(item.id);
  }

  goBack() {
    this.props.router.push('/search');
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
              {this.store.list.map((item, index)=>
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

        <List>
          <List.Body>
            {this.store.listLine.map((item, index) =>
              <List.Item key={index} extra={type(item).name} arrow={type(item).type}
                         onClick={this.goClick.bind(this, item)}>
                {item.id} {item.name}{item.metre}
              </List.Item>
            )}
          </List.Body>
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
