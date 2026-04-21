const { validationResult } = require('express-validator');
const { STATUS, MESSAGE, sendresponse } = require('../utils/response');

const validate = (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return sendresponse(res, STATUS.BAD_REQUEST, error.array()[0].msg)
    }

    next();
};

module.exports = {
    validate
}