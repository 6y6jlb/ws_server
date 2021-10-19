const ws = require('ws')
const chalk = require('chalk')


const PORT = 5000;

const wss = new ws.Server(
    {port: PORT},
    () => console.log(chalk.green(`Server started on ${PORT} port.`)));

wss.on('connection', connection);

function connection(ws) {
    ws.on('message', (message) => {
        message = JSON.parse(message);
        console.log(chalk.bgCyan(JSON.stringify(message)  + 'message'))
        switch (message.event) {
            case 'message':
            case 'quit':
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



