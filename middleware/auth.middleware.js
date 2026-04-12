const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const { STATUS, MESSAGE, sendresponse } = require('../utils/response');

const {generateToken} = require('../utils/token');


const authMiddleware = (req, res, next) => {
    try {
        authHeader = req.headers.authorization;
        

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return sendresponse(res, STATUS.UNAUTHORIZED, MESSAGE.NO_TOKEN)
        }

        const token = authHeader.split(' ')[1];

        const decord = jwt.verify(token, JWT_SECRET);

        req.user = decord;

        next()
    } catch (error) {
        // return sendresponse(res, STATUS.UNAUTHORIZED, MESSAGE.INVALID_EXPIRED_TOKEN);
        next(error);
    }
};

module.exports = {
    authMiddleware
}