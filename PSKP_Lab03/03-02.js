const http = require('http');
const fs = require('fs');

let fact = (k) => {
	return (k === 0 ? 1 : fact(k - 1) * k);
};

function factorialTick(k, callback)
{
    this.fk = k;
    this.ffact = fact;
    this.cb = callback;
    this.calc = () => process.nextTick(() => {this.cb(null, this.ffact(this.fk))})
}
function factorialImmediate(k, callback)
{
    this.fk = k;
    this.ffact = fact;
    this.cb = callback;
    this.calc = () => { setImmediate(() => {this.cb(null, this.ffact(this.fk))})}
}

http.createServer((req, res) => {
    let base = 'http://' + req.headers.host + '/'
    const myUrl = new URL(req.url, base);
    if(myUrl.pathname === '/fact')
    {
        let k = +myUrl.searchParams.get('k');
        if(Number.isInteger(k))
        {
            console.log(fact(k));
            res.writeHead(200,{'Content-Type' : 'application/json'})
            res.end(JSON.stringify({k: k, fact: fact(k)}));
        }
    }
    else if(myUrl.pathname === '/')
    {
        let result = fs.readFileSync('index.html')
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.end(result);
    }
    else if(myUrl.pathname === '/tickk')
    {
        let result = fs.readFileSync('tick.html')
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.end(result);
    }
    else if(myUrl.pathname === '/immm')
    {
        let result = fs.readFileSync('imm.html')
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.end(result);
    }
    else if(myUrl.pathname === '/tick')
    {
        let k = +myUrl.searchParams.get('k');
        if(Number.isInteger(k))
        {
            res.writeHead(200,{'Content-Type': 'application/json'})
            let f = new factorialTick(k,(err,result)=>{res.end(JSON.stringify({ k:k , fact : result}));});
            f.calc();
        }
    }
    else if(myUrl.pathname === '/imm')
    {
        let k = +myUrl.searchParams.get('k');
        if(Number.isInteger(k))
        {
            res.writeHead(200,{'Content-Type': 'application/json'})
            let f = new factorialImmediate(k,(err,result)=>{res.end(JSON.stringify({ k:k , fact : result}));});
            f.calc();
        }
    }
}).listen(5000);    