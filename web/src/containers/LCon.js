import React, {Component, PropTypes} from 'react'
import * as Store from '../stores'
import * as com from '../components';
import { withRouter } from 'react-router'
const store = new Store.L();
 class L extends Component {
  render() {
    return (
      <div>
        <com.L store={store} {...this.props}/>
      </div>
    )
  }
}
export  default withRouter(L);
