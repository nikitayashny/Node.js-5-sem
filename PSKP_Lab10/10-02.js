const net = require('net');

const sums = {};

function handleClient(socket) {
  console.log('Клиент подключен:', socket.remoteAddress, socket.remotePort);

  sums[socket.remotePort] = 0;

  socket.on('data', (data) => {
    const number = parseInt(data.toString().trim());

    sums[socket.remotePort] += number;

    console.log(`Промежуточная сумма клиента ${socket.remotePort}:`, sums[socket.remotePort]);
  });

  setInterval(() => {
    socket.write(sums[socket.remotePort].toString());
  }, 5000);

  socket.on('close', () => {
    console.log('Соединение закрыто:', socket.remoteAddress, socket.remotePort);
    delete sums[socket.remotePort];
  });

  socket.on('error', (error) => {
    console.error('Ошибка соединения:', error);
  });
}

const server1 = net.createServer(handleClient);
const server2 = net.createServer(handleClient);

server1.listen(40000, 'localhost', () => {
  console.log('Сервер прослушивает порт 40000');
});

server2.listen(50000, 'localhost', () => {
  console.log('Сервер прослушивает порт 50000');
});