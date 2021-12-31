const express = require("express");
const favicon = require("serve-favicon");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const authRouter = require("../routers/authRouter");
const envRouter = require("../routers/envRouter");
const chalk = require("chalk");

const PORT = process.env.PORT || 5000;
const INDEX = '/index.html';


const allowedOrigins = ['http://localhost:3000',
    'https://6y6jlb.github.io'];


const server = express()
    .use(favicon(__dirname + '../../public/favicon.ico'))
    .use(cookieParser())
    .use(cors({
        withCredentials: true,
        secure:true,
        origin: function (origin, callback) {
            // allow requests with no origin
            // (like mobile apps or curl requests)
            console.log(origin)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = 'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        }
    }))
    .use(express.static(path.join(__dirname, 'client/build')))
    .use(express.json())
    .use('/auth', authRouter)
    .use('/utils', envRouter)
    .use(express.static(__dirname)) //here is important thing - no static directory, because all static :)
    .use((req, res) => res.sendFile(INDEX, {root: __dirname}))
    .listen(PORT, () => console.log(chalk.green(`Listening on ${PORT}`)));


module.exports = server;