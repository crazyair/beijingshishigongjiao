import React from 'react';
import {observer} from 'mobx-react';
import {SearchBar, List} from 'antd-mobile';
import {createForm} from 'rc-form';
import { History,hashHistory} from 'react-router'
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

  onSearch(value) {
    const data = _.filter(this.store.ckData.line, function (n) {
      if (eval('/.*?(' + value + ').*?/g').test(n.name)) {
        return n;
      }
    });
    let filterData = [];
    if (value) {
      data.map((item, index)=> {
        if (index < 10) {
          filterData.push({
            id: item.id,
            name: item.name
          });
        }
      });
    }
    this.state.list = filterData;

    this.setState({list: this.state.list});

  }

  goClick(item, e) {
    // getLineDirOption
    hashHistory.push(`line/${item.name}`);

  }

  componentWillReceiveProps(nextProps) {
    console.log('1', 1);
  }

  render() {
    const {getFieldProps} = this.props.form;
    let ck = '';
    if (this.store.ckData) {
      ck = this.store.ckData.ck;
    }
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
          onChange={(value)=>this.onSearch(value)}
        />
        <List>
          <List.Header>查找</List.Header>
          <List.Body>
            {this.state.list.map((item, index) =>
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

Main.defaultProps = {};
Main = createForm()(Main);

export default Main;
