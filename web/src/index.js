import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom'
import Store from './stores/Store';
import {Router, Route, Link, hashHistory, useRouterHistory, IndexRoute, Redirect} from 'react-router';
import * as con from './containers';
import * as rou from './router';
const store = new Store();
import {createHashHistory} from 'history'
const appHistory = useRouterHistory(createHashHistory)({queryKey: false});


render((
  <Router history={appHistory}>
    <Redirect from='/' to='/search'/>
    <Route path="/">
      <IndexRoute component={con.Main}/>
      <Route path='search' component={con.Main}/>
      <Route path="l/:id(/:type)(/:station)" component={con.L}/>
      <Route path="line(/:id)" component={con.Line}/>
    </Route>
  </Router>
), document.getElementById('app'));
