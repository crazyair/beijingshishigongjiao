import React from 'react';
import {observer} from 'mobx-react';
import {FloatMenu, Button, NavBar, Icon, WhiteSpace, Tabs, List, Toast} from 'antd-mobile';
const TabPane = Tabs.TabPane;
const Item = FloatMenu.Item;
import {createForm} from 'rc-form';
import {hashHistory} from 'react-router'
@observer
class L extends React.Component {
  constructor(props) {
    super(props);
    this.store = props.store;
    this.state = {
      list: [],//公交上下行
      listLine: [] // 上下行车站
    };
    this.callback = this.callback.bind(this);
    this.ogBack = this.ogBack.bind(this);
  }

  componentWillMount() {
    this.store.getLine(this.props.params.id);
  }

  callback(e) {
    this.store.getList(e);
  }

  goClick(item, e) {
    this.store.goOn(item.id);
  }

  ogBack() {
    // console.log('t', this);
    // hashHistory.push('/');
    this.props.router.push('/search');
  }

  render() {

    return (
      <div >
        <NavBar rightContent={
          <div>
            {/*首页*/}
          </div>
        } leftContent="返回" onLeftClick={this.ogBack}
        >
          公交实时信息
        </NavBar>
        <div>
          {this.store.list.length < 2 ? '' :
            <Tabs defaultActiveKey={this.store.list[0].id} type="capsule" onChange={this.callback}>
              {this.store.list.map((item, index)=>
                <TabPane tab={item.type} key={item.id}></TabPane>
              )}
            </Tabs>
          }
        </div>
        <p>
          {this.store.listLineBase.road} {this.store.listLineBase.roadName}
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
