var http = require('http');
var query = require('querystring');

let parms = query.stringify({x: 3, y: 4, s: "fff"});
let path = `/threepar`;

console.log(path);

let options= {
    host: 'localhost',
    path: path,
    port: 5000,
    method:'POST'
}

const req = http.request(options, (res) => {
    console.log('http.response: statusCode: ', res.statusCode);
    let data = '';
    res.on('data', (chunk) =>
    {
        console.log('http.response: data: body: ', data += chunk.toString('utf-8'));
    });
});

req.on('error', (e) => {
    console.log('http.respinse: error:', e.message);
});

req.write(parms);
req.end();