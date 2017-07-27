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
      if (archive.isUrlArchived(inputUrl, function(exists) {
        return exists;
      })) {
        httpHelp.serveAssets(res, archive.paths.archivedSites + '/' + inputUrl);
      } else {
        archive.addUrlToList(inputUrl); 
        httpHelp.serveAssets(res, archive.paths.siteAssets + '/loading.html');
      }
      console.log(inputUrl);
    });

  }
  
//  res.end(archive.paths.list);
};

// var actions = {
//   'GET': function(request, response) {
//     utils.sendResponse(response, {results: messages});
//   },
//   'POST': function(request, response) {
//     utils.collectData(request, function(message) {
//       message.objectId = ++objectIdCounter;
//       messages.push(message);
//       utils.sendResponse(response, {objectId: message.objectId}, 201);
//     });
//   },
//   'OPTIONS': function(request, response) {
//     utils.sendResponse(response, null);
//   }
// };

// exports.requestHandler = utils.makeActionHandler(actions);