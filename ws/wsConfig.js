const chalk = require("chalk");
const Message = require("../mongoose/models/Message");
const wss = require('./server')

async function onConnection(ws) {
    await ws.on('message', (message) => {
        ws.ws_id = wss.getUniqueID();
        message = JSON.parse(message, ws.ws_id);
        const connectionCounter = wss.clients.size;
        console.log(chalk.bgCyan('message', JSON.stringify(message)))
        switch (message.event) {
            case 'message':
                const newMessage = new Message(message);
                newMessage.save((error) => {
                    if (error) {
                        console.log(chalk.red('error', error))
                    } else {
                        console.log(chalk.bgGreen('data saved'))
                    }
                })
                broadcastMessage(newMessage)

                break
            case 'quit':
                broadcastMessage(message)
                break
            case 'connection':
                Message.find({}).sort({date: -1}).limit(10)
                    .then((data) => {
                        ws.send(JSON.stringify(data))
                    })
                    .catch((err) => {
                        console.log(chalk.red(err))
                    }).finally(()=>{
                    broadcastMessage({...message, connectionCounter})
                    }
                )
                break
            default:
                break
        }
    })
}

function broadcastMessage(message) {
    console.log(message)
    wss.clients.forEach(client => client.send(JSON.stringify([message])));
}

module.exports = onConnection