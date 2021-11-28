const jwt = require('jsonwebtoken');
const {secret} = require('../mongoose/config');

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({message: 'User not authorized'})
        }
        const decodedData = jwt.verify(token, secret);
        console.log(decodedData)
        req.user = decodedData;
        next()
    } catch (e) {
        res.status(403).json({message: 'User not authorized'})
    }
};
