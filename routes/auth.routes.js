const router = require('express').Router();

const authcontroller = require('../controller/auth.controller');

const { authMiddleware } = require('../middleware/auth.middleware');

const { registerValidation } = require('../validation/auth.validation');

const { validate } = require('../validation/auth.validationresult');

router.get('/profile',authMiddleware,authcontroller.profile);

router.post('/register',registerValidation, validate, authcontroller.register);

router.post('/login',authcontroller.login);

router.post('/refresh',authcontroller.refreshTokenHandler);


module.exports = router;