const http = require('http');
const fs = require('fs');

let state = 'norm';

const server = http.createServer(function(request, response) {
	if (request.url === '/state') {
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.end(state);
	} else {
		response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		fs.readFile('03-01.html', 'utf8', function(err, data) {
			if (err) {
				response.writeHead(500);
				response.end('Internal Server Error');
			} else {
				const html = data.replace('{{state}}', state);
				response.end(html);
			}
		});
	}
});

process.stdin.setEncoding('utf8');
process.stdout.write(state + '-> ');

process.stdin.on('readable', () => {
	let chunk = null;
	while ((chunk = process.stdin.read()) !== null) {
		const input = chunk.trim();

		if (input === 'exit') {
			process.exit(0);
		} else if (input === 'norm' || input === 'stop' || input === 'test' || input === 'idle') {
			state = input;
			process.stdout.write(state + '-> ');
		} else {
			process.stderr.write(state + '-> ');
			process.stderr.write(input + '\n');
		}
	}
});

server.listen(5000, () => {});
