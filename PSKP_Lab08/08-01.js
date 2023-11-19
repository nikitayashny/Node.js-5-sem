const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const fs = require('fs');

const httpServer = http.createServer(function(request, response) {
  if (url.parse(request.url).pathname === '/start' && request.method === 'GET') {
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    response.end(fs.readFileSync('./08-01.html'));
  } else {
    response.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'});
    response.end('<h1>400</h1>');
  }
});

httpServer.listen(3000, () => {
  console.log('HTTP server is running on port 3000');
});


const wsServer = new WebSocket.Server({ port: 4000 });

wsServer.on('connection', (ws) => {
  let lastMessage = '';
  let k = 0;
  
  ws.on('message', (message) => {
    console.log(`Message from client: ${message}`);
    lastMessage = message;
  });
  
  const interval = setInterval(() => {
    ws.send(`08-01-server: ${lastMessage}->${++k}`);
  }, 5000);
  
  setTimeout(() => {
    clearInterval(interval);
    ws.close();
    console.log('WebSocket connection closed');
  }, 25000);
});

wsServer.on('listening', () => {
  console.log('WebSocket server is running on port 4000');
});

wsServer.on('error', (err) => {
  console.log('WebSocket server error:', err);
});
