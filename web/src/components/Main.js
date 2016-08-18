require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import superagent  from 'superagent';

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  constructor(props, context) {
    super(props, context);

  }

  componentWillMount() {
    superagent.get('http://localhost:8080/bj').end(function(err,data){
      // console.log(JSON.parse(JSON.parse(data.text).text).html);
    })
  }
  render() {
    return (
      <div >
        
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
