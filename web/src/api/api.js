/**
 * Created by hjf on 2016/8/18.
 */
import superagent from  'superagent';

const http = {
  get(url, data){
    superagent
      .get(url)
      .set('Cookie', 'PHPSESSID=056407d382622455fe967c07d973efa7;SERVERID=b6e721ca8fa8f1065ade14ce5cd80b3a|1471708800|1471536000;Hm_lpvt_2c630339360dacc1fc1fd8110f283748=1471405742;Hm_lvt_2c630339360dacc1fc1fd8110f283748=1470987371,1471397218')
      .then(function (data, err) {

        return data;
      })
  }
};

module.exports = http;
