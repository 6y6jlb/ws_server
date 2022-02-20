const Router = require('express');
const authController = require('../controllers/authController');
const envController = require('../controllers/envController');
const {check} = require('express-validator');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/registration', [
    check('name', 'User name can`t be less 3 symbols and more 25').isLength({min: 3, max: 25}),
    check('email', 'Wrong email type').isLength({min: 3, max: 25}),
    check('password', 'User password can`t be less three symbols and more 99').isLength({min: 3, max: 99}),
], authController.registration);
router.post('/login', authController.login);

router.delete('/logout', authController.logout);
router.delete('/users', authController.deleteUser);

router.get('/refresh', authController.refresh);
router.get('/users',authMiddleware, authController.getUsers);


module.exports = router;