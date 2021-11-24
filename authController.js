const User = require('./User');
const Role = require('./Role');
const bcrypt = require('bcrypt');
const chalk = require('chalk');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const {secret} = require('./config');


const generateAccessToken = (id, roles) => {
    const payload = {id, roles}
    return jwt.sign(payload, secret,{expiresIn: "24h"})
}

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'user exist', errors})
            }
            const {username, password} = req.body;
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: 'user exist'})
            }
            const salt = bcrypt.genSaltSync(7);
            const hashedPassword = bcrypt.hashSync(password, salt);
            const userRole = await Role.findOne({value: 'USER'})
            const user = new User({username, password: hashedPassword, roles: [userRole.value]})
            await user.save()
            return res.status(200).json({message: 'done'})
        } catch (e) {
            console.log(chalk.red(e))
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if (!user) {
                return res.status(400).json({message: `User ${username} not found or wrong password`})
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({message: `User ${username} not found or wrong password`})
            }
            const token = generateAccessToken(user._id,user.roles)
            return res.status(200).json({token})
        } catch (e) {
            console.log(chalk.red(e))
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find({})
            res.status(200).json(users)
        } catch (e) {
            console.log(chalk.red(e))
            res.status(400).json({message: 'Users error'})
        }
    }

    async deleteUser(req, res) {
        try {

        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new AuthController();