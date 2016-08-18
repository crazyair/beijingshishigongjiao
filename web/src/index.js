import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom'
import App from './components/Main';
import Store from './stores/Store';
import {Router, Route, Link, hashHistory} from 'react-router'

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


render((
  <Router history={hashHistory}>
    <Route path="/" component={Users}>
      <Route path="users" component={Users}>
        <Route path="/user/:userId" component={User}/>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'));


{/*ReactDOM.render(<App store={store}/>, document.getElementById('app'));*/}
