const Router = require('express');
const envController = require('../controllers/envController');
const router = new Router();


router.post('/weather', envController.getWeather);
module.exports = router;