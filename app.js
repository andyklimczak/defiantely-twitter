var Twitter = require('twitter');
var config = require('./config.js');

var T = new Twitter(config);

const params = {
  q: 'defiantely',
  count: 1,
  result_type: 'recent',
  lang: 'en'
};

T.get('search/tweets', params)
  .then(function(data) {
    console.log(data);
    return data.statuses;
  }).then(function(statuses) {
    for(status of statuses) {
      console.log(status.text);
      T.post('statuses/retweet', { id: status.id_str }, function(err, res) {
        if(err) console.log('err', err);

        console.log(res);
      });
    }
  }).catch(function(error) {
    throw error;
  });
