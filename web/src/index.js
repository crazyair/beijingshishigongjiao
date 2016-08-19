import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom'
import App from './components/Main';
import Store from './stores/Store';
import {Router, Route, Link, hashHistory} from 'react-router';
// import {createHashHistory} from 'history'
// import {List, Main} from './containers';
import * as con from './containers';
import * as rou from './router';
const store = new Store();

const Users = React.createClass({
  render() {
    return (
      <div>
        <h1>Users</h1>
        <div className="master">

        </div>
        <div className="detail">
          {this.props.children}
        </div>
      </div>
    )
  }
});

const User = React.createClass({
  componentDidMount() {

  },
  render() {
    return (
      <div>
        <h2>111</h2>
      </div>
    )
  }
});
class test extends React.Component {
  render() {
    return (
      <App store={store}/>
    )
  }
}


render((
  <Router history={hashHistory}>
    <Route path="/" component={con.Main}/>
    <Route path="/line(/:id)" component={con.Line}/>
    <Route path="/lndex" component={rou.Router}>
      {/*<Route path="main" component={Main}/>*/}

      <Route path="test" component={test}>
        <Route path="list" component={con.List}/>
        <Route path="/user/:userId" component={User}/>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'));
