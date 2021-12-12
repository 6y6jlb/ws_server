const ApiError = require('../exceptions/app-error')
const tokenService = require('../service/token-service')

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return next(ApiError.UnauthorizedError())
        }
        const userData = tokenService.validateAccessToken(token);
        if (!userData) {
            next(ApiError.UnauthorizedError())
        }
        req.user = userData;
        next()
    } catch (e) {

        return next(ApiError.UnauthorizedError())
    }
};
