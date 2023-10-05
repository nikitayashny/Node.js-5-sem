const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Парсинг данных в формате application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Парсинг данных в формате application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(`
    <form method="POST" action="/send">
      <label for="from">Отправитель:</label>
      <input type="email" id="from" name="from" required><br><br>
      
      <label for="to">Получатель:</label>
      <input type="email" id="to" name="to" required><br><br>
      
      <label for="message">Сообщение:</label><br>
      <textarea id="message" name="message" rows="5" required></textarea><br><br>
      
      <button type="submit">Отправить</button>
    </form>
  `);
});

app.post('/send', (req, res) => {
  const { from, to, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'yashny.lsdclothing@gmail.com', 
      pass: 'hekupnuelsnecjij' 
    }
  });

  const mailOptions = {
    from: from,
    to: to,
    subject: 'Тестовое письмо',
    html: `<p>${message}</p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('Ошибка при отправке письма');
    } else {
      console.log('Письмо успешно отправлено: ' + info.response);
      res.send('Письмо успешно отправлено');
    }
  });
});

app.listen(port, () => {
  console.log(`Приложение запущено на порту ${port}`);
});