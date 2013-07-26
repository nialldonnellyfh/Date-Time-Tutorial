//var request = require('request');
//var jsdom = require('jsdom');


exports.getCurrentTime = function(params, callback) {

  return callback(null, { response : 'Sunday, 1 January 1900, 00:00:00' });


  $fh.cache(

    {
      act: 'load',
      key: 'datetime'
    },

    function(err, res) {

      if (err || !res) {
        console.log('Returning Time - From WEB');
        return getCurrentTimeFromWeb(params, callback);
      }

      else {
        console.log('Returning Time - From CACHE');
        return callback(null, { response : res });
//        return callback(null, { response : res, cached: true });
      }

    }

  );


};


function getCurrentTimeFromWeb(params, callback){


  request(

    {
      uri: 'http://www.timeanddate.com/worldclock/city.html?n=78'
    },

    function(err, res, body) {

      console.log(body);

      jsdom.env(

        body,

        ['http://code.jquery.com/jquery.js'],

        function(errors, window) {

          var currentTime = window.$('#ct').text();

          console.log('Current Time: ', currentTime);

          $fh.cache(

            {
              act: 'save',
              key: 'datetime',
              value: currentTime,
              expire: 10
            },

            function(err, res) {
              // Success or failure not so important here - do nothing.
            }

          );

          return callback(errors, { response : currentTime });
        }
      );

  });
}