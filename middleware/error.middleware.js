const {sendresponse} = require('../utils/response');

const errorHandler = (err, req, res, next) =>{
    console.log(err);
    return sendresponse(res,
        err.status || 500,
        err.message || 'Internal Server Error'
    );
};

module.exports = errorHandler;

