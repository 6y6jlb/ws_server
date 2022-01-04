const ws = require("ws");
const server = require('../http/server')

const wss = new ws.Server({server});

module.exports = wss;