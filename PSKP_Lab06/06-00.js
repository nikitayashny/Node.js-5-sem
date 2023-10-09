const http = require('http');
const url = require('url');
const fs = require('fs');
const mp = require('multiparty');
const parseString = require('xml2js').parseString;
const xmlbuilder = require('xmlbuilder');

let server = http.createServer();

server.keepAliveTimeout = 1000000;

let clientSocket = {};

let http_handler = (req, res) => {
    res.address ='http://localhost:5000';

    // Task 01
    if(url.parse(req.url).pathname === '/connection') { 
        if (!url.parse(req.url, true).query.set) {   
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(`<h1>KeepAliveTimeout: ${server.keepAliveTimeout}</h1>`);
        } 
        else {
            server.keepAliveTimeout = +url.parse(req.url, true).query.set;
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(`<h1>New value of KeepAliveTimeout: ${server.keepAliveTimeout}</h1>`);
        }
    }

    // Task 02
    if(url.parse(req.url).pathname === '/headers') {   
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8 ','TRIAL':3});
        res.end(`<h2>${JSON.stringify(req.headers)}</h2>`);
    }

    // Task 03
    if(url.parse(req.url).pathname === '/parameter') {
        if((x = +url.parse(req.url, true).query.x) && (y = +url.parse(req.url, true).query.y)) {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(`<h2>Sum: ${x + y}</h2> \n <h2>Sub: ${x - y}</h2> \n <h2>Mult: ${x * y}</h2> \n <h2>Division: ${x / y}</h2>`);
        } else {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(`<h2>${url.parse(req.url).pathname}</h2> \n <h2>Parameters is not number</h2>`);
        }
    }

    // Task 04
    if(RegExp(/^\/parameter\/[0-9]{1,100}\/[0-9]{1,100}/).test(url.parse(req.url).pathname)) {
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        var p = url.parse(req.url, true);
        x = +p.pathname.split('/')[2];
        y = +p.pathname.split('/')[3];

        if(Number.isInteger(x) && Number.isInteger(y)) {
            res.end('<h1>X and Y are int</h1>'
            + `<p>x = ${x}, y = ${y}</p>`
            + `<p>x + y = ${x + y}</p>`
            + `<p>x - y = ${x - y}</p>`
            + `<p>x * y = ${x * y}</p>`
            + `<p>x / y = ${x / y}</p>`);
        }
    }
    if(RegExp(/^\/parameter\/.\/./).test(url.parse(req.url).pathname)){
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        res.end(res.address + req.url);
    }


    // Task 05
    if(url.parse(req.url).pathname === '/socket') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(`<h2>localAddress: ${clientSocket.localAddress} \n localPort ${clientSocket.localPort} \n serverAddress ${JSON.stringify(server.address())}</h2>`);
    }

    // Task 06
    if(url.parse(req.url).pathname === '/resp-status') {
        if((x = +url.parse(req.url, true).query.code) && (y = url.parse(req.url, true).query.mess))  {
            res.writeHead(x,y, {'Content-Type': 'text/html; charset=utf-8'});
            res.end();
        }
    }

    // Task 07
    if(url.parse(req.url).pathname === '/formparameter') {
        if (url.parse(req.url).pathname === '/formparameter' && req.method === 'POST') {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            let data = '';
            req.on('data', chunk => { data += chunk; });
            req.on('end', () => {
                console.log(data);
                res.end(data);
            });
        }
        if (url.parse(req.url).pathname === '/formparameter' && req.method === 'GET') {
            let html = fs.readFileSync('form.html');
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(html);
        }
    }

    // Task 08
    if (url.parse(req.url).pathname === '/json' && req.method === 'POST') {
        let data = '';
        req.on('data', (chunk) => { data += chunk; });
        req.on('end', () => {
            res.writeHead(200, {'Content-type': 'application/json; charset=utf-8'});
            data = JSON.parse(data);
            let jsonResponse = {};
            jsonResponse.__comment = 'Response: ' + data.comment;
            jsonResponse.x_plus_y = data.x + data.y;
            jsonResponse.Concatenation_s_o = data.s + ': ' + data.o.surname + ', ' + data.o.name;
            jsonResponse.Length_m = data.m.length;
            res.end(JSON.stringify(jsonResponse));
        });
    }

    // Task 09
    if (url.parse(req.url).pathname === '/xml' && req.method === 'POST') {
        let data = '';
        req.on('data', (chunk) => { data += chunk; });
        req.on('end', () => {
            res.writeHead(200, {'Content-type': 'application/xml'});
            parseString(data, function(err, result) {
                let id = result.request.$.id;
                let xSum = 0;
                let mSum = '';
                result.request.x.forEach((p) => {
                    xSum += parseInt(p.$.value);
                });
                result.request.m.forEach((p) => {
                    mSum += p.$.value;
                });

                let xmlDoc = xmlbuilder.create('response').att('id', id);
                xmlDoc.ele('sum').att('element', 'x').att('result', xSum).up().ele('concat').att('element', 'm').att('result', mSum);

                res.end(xmlDoc.toString());
            });
        });
    }

    // Task 10
    if (url.parse(req.url).pathname === '/files') {
        res.setHeader('X-static-files-count', fs.readdirSync('C:\\Users\\User\\Desktop\\ПCКП\\PSKP_Lab06\\static').length);
        res.end();
    }

    // Task 11
    if (RegExp(/^\/files\/[a-z]/).test(url.parse(req.url).pathname)) {
        try {
            let parsedUrl = url.parse(req.url, true);
            let data = fs.readFileSync('static/' + parsedUrl.pathname.split('/')[2]);
            res.end(data);
        } catch (e) {
            res.writeHead(404, {'Content-type': 'text/html'});
            res.end('404 ' + e.toString());
        }
    }

    // Task 12
    if (url.parse(req.url).pathname === '/upload') {
        if(req.method === 'POST') {
            let form = new mp.Form({uploadDir: './static'});
            form.on('file', (name, file) => { });
            form.on('error', (err)=>{res.end('Not uploaded!')});
            form.on('close', () => {
                res.writeHead(200, {'Content-type': 'text/plain'});
                res.end("Uploaded!");
            });
            form.parse(req);
        }
        if(req.method === 'GET') {
            res.writeHead(200, {'Content-type': 'text/html'});
            res.end('<form method="POST" action="/upload" enctype="multipart/form-data">' +
                '<input type="file" name="file"/>' +
                '<input type="submit"/>' +
                '</form>');
        }
    }
};

server.on('connection', socket => {
    clientSocket.localAddress = socket.localAddress;
    clientSocket.localPort = socket.localPort;
});

server.on('request', http_handler);
server.listen(5000);