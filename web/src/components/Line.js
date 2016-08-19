import React from 'react';
import {observer} from 'mobx-react';
import {FloatMenu, Button, NavBar, Icon, WhiteSpace, Tabs, List} from 'antd-mobile';
const TabPane = Tabs.TabPane;
const Item = FloatMenu.Item;
import {createForm} from 'rc-form';
import {History, hashHistory} from 'react-router'
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
  }

  componentWillMount() {
    this.store.getLine(this.props.params.id);
  }

  callback(e) {
    this.store.getList(this.props.params.id, e);
  }

  goClick(item, e) {
    this.store.goOn(this.props.params.id,item.id);
  }

  render() {

    return (
      <div >
        <NavBar rightContent={
          <div>
            首页
          </div>
        }>
          公交实时信息
        </NavBar>
        <div>
          {this.store.list.length < 2 ? '' :
            <Tabs defaultActiveKey={this.store.list[0].id} type="capsule" onChange={this.callback}>
              {this.store.list.map((item, index)=>
                <TabPane tab="上行" key={item.id}></TabPane>
              )}
            </Tabs>
          }
        </div>
        <List>
          <List.Body>
            {this.store.listLine.map((item, index) =>
              <List.Item key={index} extra={item.msg} arrow="horizontal" onClick={this.goClick.bind(this, item)}>
                {item.name}{JSON.stringify(item)}
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
