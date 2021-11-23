const User = require('./User')
const Role = require('./Role')
const bcrypt = require('bcrypt');
const chalk = require('chalk')

class AuthController {
    async registration(req, res) {
        try {
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

        } catch (e) {
            console.log(chalk.red(e))
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res) {
        try {
            res.json('worked')
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