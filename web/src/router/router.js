import React from 'react';
import {NavBar, Tabs, Icon, WhiteSpace} from 'antd-mobile';
const TabPane = Tabs.TabPane;
class Router extends React.Component {
  constructor(props) {
    console.log('props', props);
    super(props);
  }

  componentWillMount() {
  }

  callback(key) {
    console.log(key);
  }

  render() {
    return (
      <div>
        <div>
          <Tabs mode="dark"  defaultActiveKey="1" onChange={this.callback.bind(this)}>
            <TabPane tab="选项卡一" key="1"></TabPane>
            <TabPane tab="选项卡二" key="2"></TabPane>
            <TabPane tab="选项卡三" key="3"></TabPane>
          </Tabs>
          <WhiteSpace />
        </div>
        {/*<div style={{padding: 8}}>*/}
        {/*<NavBar leftContent="返回"*/}
        {/*rightContent={[<Icon key="0" type="user"/>, <Icon key="1" type="search"/>,*/}
        {/*<Icon key="2" type="plus"/>]}>NavBar</NavBar>*/}
        {/*<div style={{height: 8}}/>*/}
        {/*<NavBar leftContent="返回" mode="light"*/}
        {/*rightContent={[<Icon key="0" type="user"/>, <Icon key="1" type="search"/>,*/}
        {/*<Icon key="2" type="plus"/>]}*/}
        {/*>NavBar</NavBar>*/}
        {/*</div>*/}
        <Tabs type="tabbar" mode="dark" defaultActiveKey="1" onChange={this.callback.bind(this)}>
          <TabPane tab={<span><Icon type="home"/>首页</span>} key="1"></TabPane>
          <TabPane tab={<span><Icon type="team"/>好友</span>} key="2"></TabPane>
          <TabPane tab={<span><Icon type="setting"/>设置</span>} key="3"></TabPane>
        </Tabs>

        <WhiteSpace />
        {this.props.children}
      </div>

    );
  }
}


export default Router;
