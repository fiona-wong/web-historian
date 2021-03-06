var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  var statusCode = 200;

  fs.readFile(asset, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(404, exports.headers);
      res.end();
    }
    res.writeHead(statusCode, exports.headers);
    res.write(data);
    res.end();
  });

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};

// var headers = {
//   'access-control-allow-origin': '*',
//   'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'access-control-allow-headers': 'content-type, accept',
//   'access-control-max-age': 10, // Seconds.
//   'Content-Type': 'application/json'
// };

// exports.sendResponse = function(response, data, statusCode) {
//   statusCode = statusCode || 200;
//   response.writeHead(statusCode, headers);
//   response.end(JSON.stringify(data));
// };

// exports.collectData = function(request, callback) {
//   var data = '';
//   request.on('data', function(chunk) {
//     data += chunk;
//   });
//   request.on('end', function() {
//     callback(data);
//   });
// };

// exports.makeActionHandler = function(actionMap) {
//   return function(req, res) {
//     var action = actionMap[req.method];
//     if (action) {
//       action(req, res);
//     } else {
//       exports.sendResponse(res, '', 404);
//     }
//   };
// };

// As you progress, keep thinking about what helper functions you can put here!
