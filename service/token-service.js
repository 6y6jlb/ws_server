const jwt = require("jsonwebtoken");
const {secret} = require("../mongoose/config");
const tokenModel = require('../mongoose/models/Token')

class TokenService  {
    async generateTokens(payload){
        const accessToken =  await jwt.sign(payload, secret,{expiresIn: "45m"})
        const refreshToken = await jwt.sign(payload, secret,{expiresIn: "30d"})
        return {accessToken,refreshToken}
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, secret);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, secret);
            return userData;
        } catch (e) {
            return null;
        }
    }

   async removeToken(refreshToken) {
        const tokenData = await tokenModel.deleteOne({refreshToken})
       return tokenData
    }

    async findToken(token) {
        const tokenData = await tokenModel.findOne({token})
        return tokenData
    }

    async saveToken(userId,refreshToken){
        const tokenData = await tokenModel.findOne({user:userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return await tokenData.save();
        }
        return await tokenModel.create({user:userId,refreshToken})
    }
}

module.exports = new TokenService()