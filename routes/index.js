const route = require('express').Router();

const authroute = require('./auth.routes');
const productroute = require('./product.routes');

route.use('/auth',authroute);
route.use('/product',productroute);

module.exports = route;