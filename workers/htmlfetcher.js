//*/01 * * * * /Users/student/.nvm/versions/node/v6.9.5/bin/node /Users/student/code/hrsf80-web-historian/workers/htmlfetcher.js
//*/01 * * * * /usr/local/bin/node /fionawong/HackReactor/hrsf80-web-historian/workers/htmlfetcher.js
// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

archive.readListOfUrls(function(arrayOfUrls) {
  archive.downloadUrls(arrayOfUrls);
  //reset archives/sites/sites.txt
});
