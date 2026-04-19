const express = require('express');
const routes = require('./routes');
const errorhandler = require('./middleware/error.middleware');

const app = express();

app.use(express.json());

app.use('/api/v1',routes);

app.use(errorhandler)

module.exports = app;