const chalk = require('chalk')
const mongoose = require("mongoose");
const {MONGO_DB_URI} = require('./mongoose/config')
const onWebSocketConnection = require('./ws/wsConfig')
const wss = require('./ws/server')

mongoose.connect(MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log(chalk.greenBright('data base connected ... .'))
})


wss.on('connection', onWebSocketConnection);
wss.getUniqueID = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};


