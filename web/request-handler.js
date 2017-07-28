var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelp = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    httpHelp.serveAssets(res, archive.paths.siteAssets + '/index.html');
  }

  if (req.method === 'POST') {
    var inputUrl = '';
    req.on('data', function(chunk) {
      inputUrl += chunk;
    });
    req.on('end', function() {
      inputUrl = inputUrl.slice(4);
      archive.isUrlArchived(inputUrl, function(exists) {
        if (exists) {
          httpHelp.serveAssets(res, archive.paths.archivedSites + '/' + inputUrl);
        } else {
          archive.addUrlToList(inputUrl); 
          httpHelp.serveAssets(res, archive.paths.siteAssets + '/loading.html');          
        }
      });

      //   return exists;
      // })) {
      //   httpHelp.serveAssets(res, archive.paths.archivedSites + '/' + inputUrl);
      // } else {
        // archive.addUrlToList(inputUrl); 
        // httpHelp.serveAssets(res, archive.paths.siteAssets + '/loading.html');
      // }
    });
  }
};
