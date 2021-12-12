const User = require('../mongoose/models/User');
const Role = require('../mongoose/models/Role');
const bcrypt = require('bcrypt');
const uuid = require('uuid')
const mailService = require('../service/mail-service')
const tokenService = require('../service/token-service')
const UserDTO = require('../dtos/user-dto')
const ApiError = require('../exceptions/app-error')


class UserService {
    async registration(email, password) {
        const candidate = await User.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        const activationLink = uuid.v4()
        await mailService.sendActivationMail(email,`${process.env.API_URL}/api/activate/${activationLink}`)

        const salt = bcrypt.genSaltSync(4);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const userRole = await Role.findOne({value: 'USER'})

        const user = await User.create({email, password: hashedPassword,activationLink, roles: [userRole.value]})
        const userDto = new UserDTO(user)
        const tokens = await tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async login(email, password) {
        const user = await User.findOne({email});
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const validPassword = await bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const userDto = new UserDTO(user);
        const tokens = await tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = tokenService.findToken(refreshToken);
        if (!tokenFromDB || !userData) {
            throw ApiError.UnauthorizedError()
        }
        const user = await User.findById(userData.id);
        const userDto = new UserDTO(user);
        const tokens = await tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
       const token = await tokenService.removeToken(refreshToken);
       return token
    }

    async getUsers() {
        return User.find({});
    }

    async deleteUser(email) {
     return
    }
}

module.exports = new UserService();