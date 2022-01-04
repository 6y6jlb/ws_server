const Router = require('express');
const authController = require('../controllers/authController');
const envController = require('../controllers/envController');
const {check} = require('express-validator');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/weather', envController.getWeather);

module.exports = router;