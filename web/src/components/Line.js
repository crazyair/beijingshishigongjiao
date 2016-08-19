import React from 'react';
import {observer} from 'mobx-react';
import {SearchBar, List} from 'antd-mobile';
import {createForm} from 'rc-form';

@observer
class Line extends React.Component {
  constructor(props) {
    super(props);
    this.store = props.store;
    this.state = {
      list: []
    };
  }

  componentWillMount() {
    // this.store.getCk();
  }


  render() {

    return (
      <div >
        111112
      </div>
    );
  }
}

Line.defaultProps = {};
Line = createForm()(Line);

export default Line;
