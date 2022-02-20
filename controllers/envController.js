const envService = require('../service/env-service');



class EnvController {
    async getWeather(req, res, next) {
        try {
            const requestObj = {
                    language:req.body.language.toLowerCase(),
                    location:{
                        country:req.body.location.country?.slice(0,2)?.toUpperCase(),city:req.body.location.city}} || 'ru';
            const weatherObject = await envService.getWeather(requestObj);
            return res.status(200).json(weatherObject.data);
        } catch (e) {
            next(e);
        }
    }


}

module.exports = new EnvController();