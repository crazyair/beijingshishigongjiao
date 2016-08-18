require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import { observer} from 'mobx-react';
import MyComponent from './MyComponent';
let yeomanImage = require('../images/yeoman.png');
@observer
class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.store = props.store;
  }

  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <h2>{this.store.name}</h2>
        <h3>{this.store.description}</h3>
        <MyComponent store={this.store}/>
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
