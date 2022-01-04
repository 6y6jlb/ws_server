
const weatherInstance = require('../http/weatherInstance')
const weather = require('../http/weatherConst')
const weather_api_key = process.env.WEATHER_API_KEY || '====';


class EnvService {
    async getWeather(city='moscow') {
       const weatherObj =  await weatherInstance.get(`${weather.weatherUrl}?q=${'moscow'}&appid=${weather_api_key}`);
       const iconUrl = `${weather.baseIconURL}${weather.iconPrefix}${weatherObj.data.weather[0].icon}${weather.iconPostfix}`;
        return {...weatherObj,data: {...weatherObj.data,weather: {...weatherObj.data.weather,icon:iconUrl}}};
    }
}
module.exports = new EnvService()