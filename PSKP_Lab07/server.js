var http = require('http');
var url = require('url');
var fs = require('fs');
let parseString = require('xml2js').parseString;
let xmlbuilder = require('xmlbuilder');
const {parse} = require('querystring');
let mp = require('multiparty');

let http_handler = (req, res) =>
{
	if(req.method == 'GET'){
		
		// 1 Task
        if(url.parse(req.url).pathname === '/Inform'){
			res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
			res.end();
		}
		
		// 2 Task
        else if(url.parse(req.url).pathname === '/twopar'){
            let q = url.parse(req.url,true).query;
			res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
    		res.end(`${+q['x']} + ${+q['y']} = ${+q['x']+(+q['y'])}`);
        }

		// 7 Task
		else if(url.parse(req.url).pathname === '/uploadfile'){
            const filePath = 'static/file.png'; 
  			const fileStream = fs.createReadStream(filePath);
  			fileStream.pipe(res);
        }
    }

    else if(req.method == 'POST')
    {
		// 3 Task
        if(url.parse(req.url).pathname === '/threepar'){
            let body='';
            req.on('data', chunk => {body += chunk.toString();});
            req.on('end',() => {
                let o = parse(body);
                res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
				res.end(`x + y + s = ${o['x']+o['y']+o['s']}`);
            });
		}
		
		// 4 Task
        else if(url.parse(req.url).pathname === '/JSON')
		{
			let result = '';
			let body = '';
			req.on('data', chunk => {
				body += chunk.toString();
			});
			req.on('end',() => {
				let os = JSON.parse(body);
				result = {
					__comment:"Ответ.Лабораторная работа 7",
					x_plus_y:os.x+os.y,
					Concatination_s_o:os.s+'.'+os.o.surname+","+os.o.name,
					Length_m:os.m.length
				};
				res.writeHead(200,{'Content-Type': 'application/json'});
				res.end(JSON.stringify(result));
			});
		}
			
		// 5 Task
        else if(url.parse(req.url).pathname === '/XML')
		{
			let sumx = 0;
			let resultm = '';
			let id = '';
			let body = '';
			req.on('data', chunk => {
				body += chunk.toString();
			});
			req.on('end',() => {
				parseString(body, function(err, result){
					id = result.request.$.id;
					result.request.m.map((e,i) => {
						resultm += e.$.value;
                    });
                    result.request.x.map((e,i) => {
						sumx += (+e.$.value);
					});
				});
				let result = xmlbuilder.create('response').att('id', id);
				result.ele('sum', sumx);
				result.ele('concat', resultm);
				res.writeHead(200,{'Content-Type': 'application/xml'});
				res.end(result.toString());
			});   
		}
			
		// 6 Task
        else if(url.parse(req.url).pathname === '/UploadFile')
		{
			let result = '';
			let form = new mp.Form({uploadDir:'./static'});
			form.on('file', (name, file)=>{
				console.log(name,file);
				result += `<br/>${name}= ${file.originalFilename}: ${file.path}`;
			});
            form.parse(req);
			res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
			res.end();
        }
    }
}
var server = http.createServer(function (req, res){
    http_handler(req,res);
}).listen(5000);