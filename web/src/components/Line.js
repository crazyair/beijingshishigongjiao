import React from 'react';
import {observer} from 'mobx-react';
import {FloatMenu, Button, NavBar, Icon, WhiteSpace, Tabs, List, Toast} from 'antd-mobile';
const TabPane = Tabs.TabPane;
const Item = FloatMenu.Item;
import {createForm} from 'rc-form';
import {hashHistory} from 'react-router'
@observer
class Line extends React.Component {
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
    hashHistory.push('/');
    console.log('this', this);
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


        {this.store.listLineBase.road}
        {this.store.listLineBase.roadMsg}
        {this.store.listLineBase.roadName}

        <List>
          <List.Body>
            {this.store.listLine.map((item, index) =>
              <List.Item key={index} extra={item.msg} arrow="horizontal" onClick={this.goClick.bind(this, item)}>
                {item.id} {item.name}{JSON.stringify(item)}
              </List.Item>
            )}
          </List.Body>
        </List>

      </div>
    );
  }
}

Line.defaultProps = {};
Line = createForm()(Line);

export default Line;
