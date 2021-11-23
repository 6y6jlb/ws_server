const mongoose = require("mongoose");
const chalk = require("chalk");
const CONNECTION_TYPE = require("./utils/type");
const ROLE = require("./utils/type");

const dbName = process.env.NAME || "=====";
const dbPass = process.env.PASS ||  "=====";
const MONGO_DB_URI = `mongodb+srv://${dbName}:${dbPass}@cluster0.ga7l9.mongodb.net/chat_base?retryWrites=true&w=majority`;


mongoose.connect(MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


mongoose.connection.on('connected', () => {
    console.log(chalk.greenBright('data base connected ... .'))
})

//schema
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
    event: typeof CONNECTION_TYPE,
    name: String,
    body: String,
    date: {
        type: String,
        default: Date.now()
    }
}, {collection: 'messages_collection'});

const UserSchema = new Schema({
    role: typeof ROLE,
    name: String,
    pass: String,

}, {collection: 'users_collection'});


//model
const MessageItem = mongoose.model('Message', MessageSchema);


module.exports = MessageItem;