require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import {observer} from 'mobx-react';
let yeomanImage = require('../images/yeoman.png');
@observer
class List extends React.Component {
  constructor(props) {
    super(props);
    this.store = props.store;
  }

  click() {
    console.log('    this.store', this.store);
    this.store.clickButton();
  }

  componentWillMount() {
    console.log('this', this.props);
  }

  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator"/>
        <h2>{this.store.name}</h2>
        <button onClick={this.click.bind(this)}>点我</button>
        <h4>{this.store.numClicks}</h4>
      </div>
    );
  }
}

List.defaultProps = {};

export default List;
