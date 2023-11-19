const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:4000');

let parm = process.argv[2];
let prfx = typeof parm == 'undefined' ? 'A' : parm;

ws.on('open', ()=>{
    ws.on('message', (data)=>{
        data =  JSON.parse(data);
        console.log('on message: ', data);
    });

    setInterval(()=>{ ws.send(JSON.stringify({x: prfx, t: new Date().toISOString()})) }, 5000)
});

ws.on('error', (e)=>{console.log('wss server error', e)});