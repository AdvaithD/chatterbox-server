// import node module requirements 
var fs = require('fs');
var path = require('path');

// define request handler
var requestHandler = function(request, response) {
  var statusCode;
  var headers = defaultCorsHeaders;
  // generate filepath for our directory with messages
  var filePath = path.join(__dirname + '/bin/messages.json');
  headers['Content-Type'] = "application/json";

  // determine GET vs. POST response and handle appropriately 
  if (request.method === 'GET') {
    statusCode = 200;

    // read file asynchronously
    fs.readFile(filePath, 'utf8', function(err, data) {
      if (err) { // handle error immediately 
        throw err;
      }

      response.writeHead(statusCode, headers);
      data = processData(data);
      response.end(JSON.stringify({results: data}));
    });

  } else if (request.method === 'POST') {
    statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end();

  } else {
    statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end();
  }

  // helper function to parse and stringify data 
  function processData(data) {
    var parseData = JSON.parse(data);
    return parseData;
  }

};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};


module.exports = requestHandler;

  // Tell the client we are sending them plain text.
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
 // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  
  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
