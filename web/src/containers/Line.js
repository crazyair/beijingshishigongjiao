import React, {Component, PropTypes} from 'react'
import * as Store from '../stores'
import * as com from '../components';
const store = new Store.Line();
export  default class Line extends Component {
  render() {
    return (
      <div>
        <com.Line store={store}/>
      </div>
    )
  }
}
