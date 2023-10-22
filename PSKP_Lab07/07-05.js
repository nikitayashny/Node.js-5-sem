var http = require('http');
let parseString = require('xml2js').parseString;
let xmlbuilder = require('xmlbuilder');
let xmldoc = xmlbuilder.create('request').att('id',33);

xmldoc.ele('x').att('value',1);
xmldoc.ele('x').att('value',2);
xmldoc.ele('x').att('value',3);
xmldoc.ele('m').att('value','a');
xmldoc.ele('m').att('value','b');
xmldoc.ele('m').att('value','c');

let path = `/XML`;
console.log(xmldoc.toString({pretty:true}));

let options = {
    host: 'localhost',
    path: path,
    port: 5000,
    method:'POST',
    headers:
    {
        'content-type':'application/xml', 'accept':'application/xml'
    }
}
const req = http.request(options, (res) => {
    console.log('http.response: statusCode: ', res.statusCode);
    let data = '';
    res.on('data',(chunk) => {
        console.log('http.response: data: body: ', data += chunk.toString('utf-8'));
    });
    res.on('end',() => { 
        parseString(data, (err, str) => {
            if(err) 
                console.log('xml parse error');
            else 
                console.log('str =', str);
            })
    }); 
});

req.on('error', (e) => {
    console.log('http.request: error:', e.message);
});

req.write(xmldoc.toString({pretty:true}));
req.end();