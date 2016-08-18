import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import Store from './stores/Store';

const store = new Store();

ReactDOM.render(<App store={store}/>, document.getElementById('app'));
