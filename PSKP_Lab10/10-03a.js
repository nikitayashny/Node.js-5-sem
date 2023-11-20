const dgram = require('dgram');

const client = dgram.createSocket('udp4');

const message = 'Hello, server!';
const serverPort = 3000; 

client.send(message, serverPort, 'localhost', (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Message sent to server: ${message}`);
});

client.on('message', (msg, rinfo) => {
  console.log(`Response from server: ${msg.toString()}`);
  client.close();
});