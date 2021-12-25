const dbName = process.env.NAME || '=====';
const dbPass = process.env.PASS || '=====';

module.exports = {
    secret : process.env.KEY || '=====',
    MONGO_DB_URI : `mongodb+srv://${dbName}:${dbPass}@cluster0.ga7l9.mongodb.net/chat_base?retryWrites=true&w=majority`,
    refreshTokenAge: 2592000000 //30d
}


