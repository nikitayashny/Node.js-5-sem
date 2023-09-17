const http = require('http'); // импорт модуля http

const server = http.createServer((req, res) => {  // создание сервера (req запрос, res ответ)
  // Получение информации о запросе
  const method = req.method;
  const url = req.url;
  const headers = req.headers;
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    // Формирование HTML-страницы с содержимым запроса
    const html = `
      <html>
      <head>
        <title>Request Info</title>
      </head>
      <body>
        <h1>Request Info</h1>
        <p><strong>Method:</strong> ${method}</p>
        <p><strong>URL:</strong> ${url}</p>
        <p><strong>Headers:</strong></p>
        <pre>${JSON.stringify(headers, null, 2)}</pre>
        <p><strong>Body:</strong></p>
        <pre>${body}</pre>
      </body>
      </html>
    `;

    // Отправка HTML-страницы в ответе
    res.writeHead(200, {'Content-Type': 'text/html'});  // 200 - статус ответа
    res.end(html);
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});