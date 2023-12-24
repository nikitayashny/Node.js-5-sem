const http = require('http');
const fs = require('fs');
const oracledb = require('oracledb');

oracledb.getConnection(
  {
    user: 'SYSTEM',
    password: '123',
    connectString: '//localhost:1521/XEPDB1'
  },
  (err, connection) => {
    if (err) {
      console.error('Ошибка подключения к базе данных:', err);
      return;
    }
    console.log('Подключение к базе данных успешно установлено.');

    let GET_handler = (req, res) => {
      var parseUrl = require('url').parse(req.url);

      if (parseUrl.pathname.includes('/api/')) {
        var table = parseUrl.pathname.replace('/api/', '');
        console.log('table: ' + table);

        connection.execute(`SELECT * FROM ${table}`, (err, result) => {
          if (err) {
            res.end(
              JSON.stringify({
                code: 1,
                message: `Table ${table} does not exist`,
              })
            );
          } else {
            console.log(result.rows);
            res.end(JSON.stringify(result.rows));
          }
        });
      } else if (parseUrl.pathname === '/') {
        let html = fs.readFileSync('11-03.html');
        res.writeHead(200, {
          'Content-Type': 'text/html;charset=utf-8',
        });
        res.end(html);
      }

      console.log(parseUrl);
    };

    let POST_handler = (req, res) => {
      var parseUrl = require('url').parse(req.url);

      var insertedObject = '';

      if (parseUrl.pathname.includes('/api/')) {
        var table = parseUrl.pathname.replace('/api/', '');
        console.log('table: ' + table);

        req.on('data', (data) => {
          insertedObject += data;
        });
        req.on('end', () => {
          try {
            let obj = JSON.parse(insertedObject);
            console.log(obj);

            var keys = Object.keys(obj);
            var values = Object.values(obj);

            connection.execute(
              //`INSERT INTO ${table} (${keys.join(', ')}) VALUES (${values
              `INSERT INTO ${table} VALUES (${values
                .map((v) => `'${v}'`)
                .join(', ')})`,
              (err, result) => {
                if (err) {
                  res.end(
                    JSON.stringify({
                      code: 1,
                      message: `Table ${table} does not exist`,
                    })
                  );
                } else {
                  console.log('Inserted');
                }
              }
            );
          } catch {
            console.log('PARSE ERROR');
          }
        });
      }

      res.end('POST REQUEST');
    };

    let PUT_handler = (req, res) => {
      var parseUrl = require('url').parse(req.url);

      var insertedObject = '';

      if (parseUrl.pathname.includes('/api/')) {
        var table = parseUrl.pathname.replace('/api/', '');
        console.log('table: ' + table);

        req.on('data', (data) => {
          insertedObject += data;
        });
        req.on('end', () => {
          try {
            let obj = JSON.parse(insertedObject);
            console.log(obj);

            var keys = Object.keys(obj);
            var values = Object.values(obj);
            console.log(keys);
            
            connection.execute(
              `UPDATE ${table} SET AUDITORIUM='${values[0]}', AUDITORIUM_NAME='${values[1]}', AUDITORIUM_CAPACITY=${values[2]}, AUDITORIUM_TYPE='${values[3]}' WHERE AUDITORIUM='${values[0]}'`,
              (err, result) => {
                if (err) {
                  res.end(
                    JSON.stringify({
                      code: 1,
                      message: `Table ${table} does not exist`,
                    })
                  );
                } else {
                  console.log('Updated');
                }
              }
            );
          } catch {
            console.log('PARSE ERROR');
          }
        });
      }

      res.end('PUT REQUEST');
    };

    let DELETE_handler = (req, res) => {
      var parseUrl = require('url').parse(req.url);

      var deleteObject = '';

      if (parseUrl.pathname.includes('/api/')) {
        var str = parseUrl.pathname.replace('/api/', '');

        var table = str.substring(0, str.indexOf('/'));
        var id = str.replace(table + '/', '');
        console.log('table: ' + table + ' id: ' + id);

        connection.execute(
          `DELETE FROM ${table} WHERE ${table} = '${id}'`,
          (err, result) => {
            if (err) {
              res.end(
                JSON.stringify({
                  code: 1,
                  message: `Table ${table} does not exist`,
                })
              );
            } else {
              console.log('Deleted');
            }
          }
        );
      }

      res.end('DELETE REQUEST');
    };

    const server = http.createServer((req, res) => {
      if (req.method === 'GET') {
        GET_handler(req, res);
      } else if (req.method === 'POST') {
        POST_handler(req, res);
      } else if (req.method === 'PUT') {
        PUT_handler(req, res);
      } else if (req.method === 'DELETE') {
        DELETE_handler(req, res);
      }
    });

    const PORT = process.env.PORT || 3000;

    server.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  }
);









