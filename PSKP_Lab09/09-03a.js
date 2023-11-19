const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:4000');

ws.on('open', () => {
  console.log('Connection established');

  ws.on('message', message => {
    console.log(`Received message: ${message}`);
  });

  ws.on('ping', () => {
    ws.pong();
  });
});