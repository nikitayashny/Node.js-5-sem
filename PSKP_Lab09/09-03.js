const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 4000 });

let messageCounter = 0;
let connectedClients = new Set();

function sendMessages() {
  messageCounter++;
  const message = `09-03-server: ${messageCounter}`;
  connectedClients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

function pingClients() {
  connectedClients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.ping();
    }
  });

  const aliveConnections = Array.from(connectedClients).filter(client => {
    return client.readyState === WebSocket.OPEN;
  }).length;

  console.log(`Number of alive connections: ${aliveConnections}`);
}

wss.on('connection', ws => {
  connectedClients.add(ws);

  ws.on('message', message => {
    console.log(`Received message: ${message}`);
  });

  ws.on('pong', () => {
    console.log('Pong received from a client');
  });

  ws.on('close', () => {
    connectedClients.delete(ws);
  });
});

setInterval(sendMessages, 15000);
setInterval(pingClients, 5000);