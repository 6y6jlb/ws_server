const Router = require('express');
const controller = require('./controllers/authController');
const {check} = require('express-validator');
const router = new Router();
const authMiddleware = require('./middleware/authMiddleware');
const roleMiddleware = require('./middleware/roleMiddleware');

router.post('/registration', [
    check('email', 'User name can`t be less 3 symbols and more 25').isLength({min: 3, max: 25}),
    check('password', 'User name can`t be less three symbols').isLength({min: 3, max: 99}),
], controller.registration);
router.post('/login', controller.login);

router.post('/refresh', controller.refresh);
router.delete('/logout', controller.logout);

router.delete('/users', controller.deleteUser);
router.get('/users',authMiddleware, controller.getUsers);

module.exports = router;