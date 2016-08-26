import React from 'react';
import {observer} from 'mobx-react';
import {SearchBar, List} from 'antd-mobile';
import {createForm} from 'rc-form';
import {History, hashHistory, browserHistory, withRouter} from 'react-router';
import {get, set} from '../utils/local';

@observer
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.store = props.store;
    this.state = {
      list: []
    };
  }

  componentWillMount() {
    this.store.getCk();
  }

  goClick(item, e) {
    let localData = get('SL') || [];
    localData = [
      ...localData,
      {id: localData.length + 1, name: item.name}
    ];
    set('SL', localData);
    set('slNum', localData.length);
    this.props.router.push(`l/${item.name}/${0}/${0}`);
  }

  componentWillReceiveProps(nextProps) {
    console.log('1', 1222);
  }

  render() {
    return (
      <div >
        <SearchBar
          placeholder='请输入公交'
          onSubmit={(value) => {
            console.log(`onSubmit${value}`);
          }}
          onClear={() => {
            {/*console.log('onClear');*/
            }
          }}
          onCancel={() => {
            {/*console.log('onCancel');*/
            }
          }}
          onFocus={() => {
            {/*console.log('onFocus');*/
            }
          }}
          onBlur={() => {
            {/*console.log('onBlur');*/
            }
          }}
          onChange={(value)=>this.store.search(value)}
        />
        <List>
          {/*<List.Header>查找</List.Header>*/}
          <List.Body>
            {this.store.searchList.map((item, index) =>
              <List.Item key={index} extra={''} arrow="horizontal" onClick={this.goClick.bind(this, item)}>
                {item.name}
              </List.Item>
            )}
          </List.Body>
        </List>
      </div>
    );
  }
}
// Main.defaultProps = {};
// Main = createForm()(Main);
export default Main;
