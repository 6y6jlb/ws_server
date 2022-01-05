const dbName = process.env.NAME || '6y6jlb';
const dbPass = process.env.PASS || 'a6s7e8811';

module.exports = {
    secret : process.env.KEY || 'SECRET_KEY_666',
    MONGO_DB_URI : `mongodb+srv://${dbName}:${dbPass}@cluster0.ga7l9.mongodb.net/chat_base?retryWrites=true&w=majority`,
    refreshTokenAge: 2592000000 //30d
}


