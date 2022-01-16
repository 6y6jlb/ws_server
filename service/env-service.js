const weatherInstance = require('../http/weatherInstance')
const weather = require('../http/weatherConst')
const weather_api_key = process.env.WEATHER_API_KEY || '===';


class EnvService {
    async getWeather(payload = {language : 'ru', location : {country: 'RU', city: 'moskow',}}) {
        console.log(payload)
        const params = `q=${payload.location.city},${payload.location.country.toLowerCase()}&appid=${weather_api_key}&lang=${payload.language}&units=metric`
        console.log(`
            ${weather.weatherUrl}
            ?${params}`);
        const weatherObj = await weatherInstance.get(
            `${weather.weatherUrl}?${params}`
        );
        const iconUrl = `${weather.baseIconURL}${weather.iconPrefix}${weatherObj.data.weather[0].icon}${weather.iconPostfix}`;
        return {...weatherObj, data: {...weatherObj.data, weather: {...weatherObj.data.weather, icon: iconUrl}}};
    }
}

module.exports = new EnvService()