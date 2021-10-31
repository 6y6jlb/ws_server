const ws = require('ws')
const chalk = require('chalk')
const favicon = require('serve-favicon');
const express = require('express');
const cors = require('cors')
const path = require('path')


const app = express()
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(cors());

app.use(express.static(path.join(__dirname, 'client/build')));



const PORT = process.env.PORT || 5000;
const INDEX = '/index.html';

const server = express()
    .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
    .listen(PORT, () => console.log(chalk.green(`Listening on ${PORT}`)));


const wss = new ws.Server({server});

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

app.use(express.static(__dirname)); //here is important thing - no static directory, because all static :)

app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
})

// app.get('/ping', (req, res) => {
//     res.send('bot here')
// });
//
// app.listen(PORT, () => {
//     console.log(`Example app listening at http://localhost:${PORT}`)
// });




