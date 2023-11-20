const net = require('net');

const client = new net.Socket();

const port = 3000;
const host = '127.0.0.1';

client.connect(port, host, () => {
  console.log(`Connected to TCP server at ${host}:${port}`);
  client.write('Hello, server!');
});

client.on('data', (data) => {
  const message = data.toString().trim();
  console.log(`Message from server: ${message}`);
  client.destroy();
});

client.on('close', () => {
  console.log('Connection closed');
});