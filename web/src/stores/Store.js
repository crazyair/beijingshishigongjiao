/**
 * Created by hjf on 2016/8/18.
 */

import {observable, computed, action} from  'mobx';

class Store{
  name='mobx';
  description='mobx is the best!';
  @observable numClicks=0;
  @computed get oddOrEven(){
    return this.numClicks %2  ===0 ?'even' :'odd';
  }
  @action clickButton(){
    this.numClicks++;
  }
}


export default  Store;
