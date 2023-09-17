const express = require('express');
const fs = require('fs');

const app = express();
const port = 5000;
const imagePath = './pic.png';

app.get('/png', (req, res) => { // маршрут для обработки GET-запроса
  fs.readFile(imagePath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.setHeader('Content-Type', 'image/png');
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});