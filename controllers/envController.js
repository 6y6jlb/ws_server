const envService = require('../service/env-service');



class EnvController {
    async getWeather(req, res, next) {
        try {
           const weatherObject = await envService.getWeather();
            return res.status(200).json(weatherObject.data);
        } catch (e) {
            next(e);
        }
    }


}

module.exports = new EnvController();