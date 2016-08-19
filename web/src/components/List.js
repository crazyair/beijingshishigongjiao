// require('normalize.css/normalize.css');
// require('styles/App.css');
import React from 'react';
import {observer} from 'mobx-react';

import {Button} from 'antd-mobile';
let yeomanImage = require('../images/yeoman.png');
@observer
class List extends React.Component {
  constructor(props) {
    super(props);
    this.store = props.store;
  }

  click() {
    this.store.getCk();
  }

  click2() {
    this.store.getList();
  }

  componentWillMount() {
    console.log('this', this.props, this.store);
  }

  render() {
    return (
      <div >
        <h2>{this.store.name}</h2>
        <button onClick={this.click.bind(this) }>点我ck</button>
        <button onClick={this.click2.bind(this) }>点我获取线路</button>
        <h4>{this.store.numClicks}</h4>
        <Button>Hello World</Button>
      </div>
    );
  }
}

List.defaultProps = {};

export default List;
