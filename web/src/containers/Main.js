import React, {Component, PropTypes} from 'react'
import * as Store from '../stores'
import * as com from '../components';
const store = new Store.Main();
export  default class Main extends Component {
  render() {
    return (
      <div>
        <com.Main store={store}/>
      </div>
    )
  }
}
