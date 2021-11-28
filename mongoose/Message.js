const  {Schema,model} = require('mongoose')
const CONNECTION_TYPE = require("../utils/type");

const Message = new Schema({
    event: typeof CONNECTION_TYPE,
    name: String,
    body: String,
    date: {
        type: String,
        default: Date.now()
    }
}, {collection: 'messages_collection'});


module.exports = model('Message', Message)