const http = require('http');
const fs = require('fs');  

const server = http.createServer((req, res) => {
  if (req.url === '/xmlhttprequest') {

    fs.readFile('xmlhttprequest.html', 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } else if (req.url === '/api/name') {
    const name = {
      firstName: 'Nikita',
      lastName: 'Yashny',
    };
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(name));
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(5000, 'localhost', () => {
  console.log('Server running at http://localhost:5000/');
});