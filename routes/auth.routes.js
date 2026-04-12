const router = require('express').Router();

const authcontroller = require('../controller/auth.controller');

const { authMiddleware } = require('../middleware/auth.middleware');

router.get('/profile',authMiddleware,authcontroller.profile);

router.post('/register',authcontroller.register);

router.post('/login',authcontroller.login);

router.post('/refresh',authcontroller.refreshTokenHandler);


module.exports = router;