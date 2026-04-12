const User = require('../models/user.model');
const { STATUS, MESSAGE, sendresponse } = require('../utils/response');
const { hashpassword, verifypassword } = require('../utils/passwordmanager');
const { generateToken, generateRefreshToken, verifyrefreshtoken } = require('../utils/token');
const { createError } = require('../utils/error');


const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return sendresponse(res, STATUS.BAD_REQUEST, MESSAGE.REQUIRED_FIELDS);
        }

        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return sendresponse(res, STATUS.NOT_FOUND, MESSAGE.USER_NOTFOUND);
        }


        const compare = await verifypassword(password, user.password);

        if (!compare) {
            return (res, STATUS.UNAUTHORIZED, MESSAGE.INVALID_CREDENTIALS);
        }

        const token = generateToken({
            id: user.id,
            name: user.name,
            email: user.email
        });

        const refreshtoken = generateRefreshToken({
            id: user.id,
            name: user.name,
            email: user.email
        });

        return sendresponse(res, STATUS.SUCCESS, MESSAGE.LOGIN_SUCCESS, {
            accessToken: token,
            refreshtoken: refreshtoken
        });

    } catch (error) {
        next(error)
    }
}


const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return sendresponse(res, STATUS.BAD_REQUEST, MESSAGE.REQUIRED_FIELDS);
        }


        const isexist = await User.findOne({
            where: { email }
        });

        if (isexist) {
            return sendresponse(res, STATUS.CONFLICT, MESSAGE.USER_EXISTS);
        }

        const passwordhash = await hashpassword(password);

        const user = await User.create({
            name,
            email,
            password: passwordhash
        });

        return sendresponse(res, STATUS.CREATED, MESSAGE.USER_CREATED, user);
    } catch (error) {
        next(error)
    }
}


const profile = async (req, res, next) => {
    try {
        const id = req.user.id;

        if (!id) {
            return sendresponse(res, STATUS.NOT_FOUND, MESSAGE.NO_ID);
        }

        const user = await User.findByPk(id);

        if (!user) {
            return sendresponse(res, STATUS.NOT_FOUND, MESSAGE.USER_NOTFOUND);
        }

        return sendresponse(res, STATUS.SUCCESS, MESSAGE.USER_FETCH_SUCCESSFULLY, {
            id: user.id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        next(error)
    }
};

const refreshTokenHandler = (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return sendresponse(res, STATUS.NOT_FOUND, MESSAGE.NO_REFRESH_TOKEN);
    }

    try {
        const decoded = verifyrefreshtoken(refreshToken)

        const newAccessToken = generateToken({
            id: decoded.id,
            email: decoded.email
        });

        return sendresponse(res, STATUS.SUCCESS , MESSAGE.TOKEN_REFRESHED, {
            accessToken: newAccessToken
        });

    } catch (error) {
        return sendresponse(res, 403, "Invalid refresh token");
    }
};


module.exports = {
    login,
    register,
    profile,
    refreshTokenHandler
}