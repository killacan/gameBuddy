const createServer = require('http').createServer;
const PORT = 1337

const server = createServer((req, res) => {
    res.writeHead(200)
    throw new Error("test")
    res.end('Hello World')
})
.listen(PORT, () => console.log(`Listening on ${PORT}`))

server.on('upgrade', (req, socket, head) => {
    console.log({
        req, socket, head
    })
})
//  * Event listener for HTTP server "error" event.

;
[
    "uncaughtException",
    "unhandledRejection"
].forEach(event =>  
    process.on(event, (err) => {
        console.error(`something bad happened! event: ${event}, msg: ${err.stack || err}`);
}));


// inside html

const messages = document.getElementById('messages');
const socket = new WebSocket('ws://localhost:1337');
socket.onopen = (event) => console.log('Websocket is connected!')
socket.onmessage = (msg) => console.log('I got a message', msg);
socket.onerror = (error) => console.log(`WebSocket error: ${error}`);
socket.onclose = (event) => console.log('Disconnected from WebSocket server');

// 