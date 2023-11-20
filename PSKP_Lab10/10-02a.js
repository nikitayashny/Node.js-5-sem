    const net = require('net');

const serverPort = process.argv[2];
const numberX = process.argv[3];

const socket = new net.Socket();

socket.on('connect', () => {
  console.log('Подключено к серверу');

  setInterval(() => {
    socket.write(numberX);
  }, 1000);
});

socket.on('data', (data) => {
  const sum = parseInt(data.toString().trim());
  console.log('Промежуточная сумма от сервера:', sum);
});

socket.on('close', () => {
  console.log('Соединение закрыто');
});

socket.on('error', (error) => {
  console.error('Ошибка соединения:', error);
});

socket.connect(serverPort, 'localhost');