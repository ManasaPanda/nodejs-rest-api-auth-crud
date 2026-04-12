const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: '1h'
    });
};

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

const verifyrefreshtoken = (refreshtoken) =>{
    const decoded = jwt.verify(refreshtoken, REFRESH_TOKEN_SECRET);
    return decoded
}

module.exports = {
    generateToken,
    generateRefreshToken,
    verifyrefreshtoken
};