const net = require('net');

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    const message = data.toString().trim();
    const response = `ECHO: ${message}`;
    socket.write(response);
  });
});

const port = 3000;
const host = '127.0.0.1';

server.listen(port, host, () => {
  console.log(`TCP server is running on ${host}:${port}`);
});