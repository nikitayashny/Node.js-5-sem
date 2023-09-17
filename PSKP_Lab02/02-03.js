const express = require('express');

const app = express();
const port = 5000;

app.get('/api/name', (req, res) => {  // маршрут для обработки GET-запроса
  const fullName = 'Яшный Никита Сергеевич';
  res.setHeader('Content-Type', 'text/plain');
  res.send(fullName);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});