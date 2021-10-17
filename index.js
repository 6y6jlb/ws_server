const ws = require('ws')


const PORT = 5000;

const wss = new ws.Server(
    {port: PORT},
    () => console.log(`Server started on ${PORT} port.`));

wss.on('connection', connection);

function connection(ws) {
    ws.on('message', (message) => {
        message = JSON.parse(message);
        switch (message.event) {
            case 'message':
            case 'connection':
                broadcastMessage(message)
                break
            default:
                break
        }
    })
}

function broadcastMessage(message) {
    wss.clients.forEach(client => client.send(JSON.stringify(message)))
}



