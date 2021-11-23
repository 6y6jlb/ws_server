const ws = require('ws')
const chalk = require('chalk')
const favicon = require('serve-favicon');
const express = require('express');
const cors = require('cors')
const path = require('path')
const MessageItem = require('./db')
const authRouter = require('./authRouter')


const PORT = process.env.PORT || 5000;
const INDEX = '/index.html';

const server = express()
    .use(favicon(__dirname + '/public/favicon.ico'))
    .use(cors())
    .use(express.static(path.join(__dirname, 'client/build')))
    .use(express.json())
    .use('/auth', authRouter)
    .use(express.static(__dirname)) //here is important thing - no static directory, because all static :)
    .use((req, res) => res.sendFile(INDEX, {root: __dirname}))
    .listen(PORT, () => console.log(chalk.green(`Listening on ${PORT}`)));

// server.get("/*", function (req, res) {
//     res.sendFile(path.join(__dirname, "index.html"));
// })


const wss = new ws.Server({server});
wss.on('connection', onConnection);
wss.getUniqueID = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4();
};

function onConnection(ws) {
    ws.on('message', (message) => {
        ws.ws_id = wss.getUniqueID();
        message = JSON.parse(message, ws.ws_id);
        const connectionCounter = wss.clients.size;
        console.log(chalk.bgCyan('message', JSON.stringify(message)))
        switch (message.event) {
            case 'message':
                const newMessage = new MessageItem(message);
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
                MessageItem.find({})
                    .then((data) => {
                        const mappedData = data.map(item => {
                            return {
                                ...item,
                                connectionCounter
                            }
                        })
                        ws.send(JSON.stringify(data))
                    })
                    .catch((err) => {
                        console.log(chalk.red(err))
                    })
                broadcastMessage({...message, connectionCounter})
                break
            default:
                break
        }
    })
}

function broadcastMessage(message) {
    wss.clients.forEach(client => client.send(JSON.stringify([message])));
}


