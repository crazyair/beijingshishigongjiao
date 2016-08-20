import React, {Component, PropTypes} from 'react'
import * as Store from '../stores'
import * as com from '../components';
const store = new Store.List();
export  default class List extends Component {
  render() {
    return (
      <div>
        <com.List store={store}/>
      </div>
    )
  }
}
