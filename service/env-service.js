const weatherInstance = require('../http/weatherInstance')
const weather_api_key = process.env.WEATHER_API_KEY || '=====';


class EnvService {
    async getWeather() {
       return await weatherInstance.get(`?q=${'moscow'}&appid=${weather_api_key}`)
    }
}
module.exports = new EnvService()