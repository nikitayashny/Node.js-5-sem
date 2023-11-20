const dgram = require('dgram');

const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
  const response = `ECHO: ${msg}`;
  server.send(response, 0, response.length, rinfo.port, rinfo.address, (err) => {
    if (err) {
      console.error(err);
    }
  });
});

server.on('listening', () => {
  const address = server.address();
  console.log(`UDP server listening on ${address.address}:${address.port}`);
});

server.bind(3000); 