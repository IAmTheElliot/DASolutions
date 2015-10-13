// Create a simple http server using node. *
// This server should respond to a root-url request with a file called index.html. Do not use ExpressJS. Your code should have error checking and at least one callback. Put five or more html elements in your index.html. One of the elements should be a link to an external page. Things to research: node.js, callbacks, the fs module, the http module.

var fs = require('fs');
var http = require('http');

// does "/" path need to be parsed?
// sync vs async method call. Sync = if needs to blocking

var server = http.createServer(function(request, response) {
  if (request.method != "GET") {
    response.writeHead(405, {
      'Allow': 'GET'
      });
    response.end();
    return;
  }
  if (request.url != "/") {
    response.writeHead(404);
    response.end();
    return;
  }
  var file = "./index.html";
  fs.readFile(file, function (err, data) {
    if (err) {
      response.writeHead(500);
      // TODO: this response (console.log) will want to be changed later
      console.log (err);
      response.end();
      return;
    } else {
      response.writeHead(200, {
        // TODO: Are the required/additional headers needed?
        'Content-length': Buffer.byteLength(data),
        'Content-type': 'text/html'
      });
      // this can also be a single line of response.end(data). However, response.end() signifies that all header and body info has been sent, and tells server/OS/kernel/etc that method/call is complete.
      response.write(data);
      response.end();
    }
  });
});

server.listen(8000);
console.log("server created");
