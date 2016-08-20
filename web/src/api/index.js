import superagent from  'superagent';

import * as env from '../utils/env'
let baseUrl = '';
if (env.isDev) {
  baseUrl = 'http://localhost:8081';
}
if (env.isProduction) {
  baseUrl = 'http://121.42.55.211:8100';
}
console.log('base', env);

const http = {
  get(url, data){
    url = baseUrl + url;
    superagent
      .get(url)
      .set('Cookies', 'PHPSESSID=056407d382622455fe967c07d973efa7;SERVERID=b6e721ca8fa8f1065ade14ce5cd80b3a|1471708800|1471536000;Hm_lpvt_2c630339360dacc1fc1fd8110f283748=1471405742;Hm_lvt_2c630339360dacc1fc1fd8110f283748=1470987371,1471397218')
      .then(function (data, err) {
        return data;
      })
  }
};

module.exports = http;
