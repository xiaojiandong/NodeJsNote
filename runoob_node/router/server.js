

/**
 * node.js 的原生模块：
 * http，fs，path，zlib，url
 */

var http = require('http');
var url = require('url');

function start(route){
  function onRequest(request,response){
    var pathname = url.parse(request.url).pathname;
    console.log('Request for ' + pathname + 'received!');

     route(pathname);

    // 响应
    response.writeHead(200,{'Content-Type' : 'text/plain'});
    response.write('p1. this content from start.js. || ');
    response.write('p2. we get a router.js for module. || ');
    response.write('p3. put the command node index.js to start the server on Git Bash');
    response.end();
  };
  http.createServer(onRequest).listen(8888);
  console.log('Server has started in start.js -> http://127.0.0.1:8888/');
};

exports.start = start;