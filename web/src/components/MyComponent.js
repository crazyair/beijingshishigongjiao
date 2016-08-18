require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import {observer} from 'mobx-react';


function MyComponent({store}) {
  console.log('aaaaaaaaaa', store);
  const clickButton=store.clickButton.bind(store);
  return (
    <div>
      <button  onClick={clickButton}>点我</button>
      <h4>{store.numClicks}</h4>
      <h5>{store.oddOrEven}</h5>
    </div>
  )
}

MyComponent.propTypes = {
  store: React.PropTypes.object
};
export default observer(MyComponent);
