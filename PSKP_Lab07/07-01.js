var http = require('http');

let options = {
    host: 'localhost',
    path: '/Inform',
    port: 5000,
    method:'GET'
}

const req = http.request(options, (res) => {
    console.log('http.response: statusCode: ', res.statusCode);
    console.log('http.response: statusMessage: ', res.statusMessage);
    console.log('http.response: socket.remoteAddress: ', res.socket.remoteAddress);
    console.log('http.response: socket.remotePort: ', res.socket.remotePort); 
});

req.on('error', (e) => {
    console.log('http.response: error:', e.message);
});

req.end();