const {validationResult} = require('express-validator');
const {refreshTokenAge} = require('../mongoose/config');
const ApiError = require('../exceptions/app-error')
const userService= require('../service/user-service')


class AuthController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {email, password,country, city, language,name} = req.body;
           const userData = await userService.registration({email, password,name, country, city, language})
            await res.cookie('refreshToken', userData.refreshToken, {maxAge: refreshTokenAge, httpOnly: false})
            return res.status(200).json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res,next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email,password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: refreshTokenAge, httpOnly: false})
            return res.status(200).json(userData);
        } catch (e) {
            next(e)
        }
    }

    async logout(req,res,next) {
        try {
            const {refreshToken} = req.cookies;
            console.log(refreshToken, 'refresh token')
            const token = await userService.logout(refreshToken);
            // res.clearCookie('refreshToken');
            return res.status(200).json(token);
        } catch (e) {
            next(e)
        }
    }

    async refresh(req,res,next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.refresh(refreshToken);
            res.cookie('refreshToken', token.refreshToken, {maxAge: refreshTokenAge, httpOnly: true})
            return res.status(200).json(token);
        } catch (e) {
            next(e)
        }
    }

    async getUsers(req, res,next) {
        try {
            const users = await userService.getUsers()
            res.status(200).json(users)
        } catch (e) {
            next(e)
        }
    }

    async deleteUser(req, res,next) {
        try {

        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new AuthController();