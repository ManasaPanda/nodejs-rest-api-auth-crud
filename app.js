const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const errorhandler = require('./middleware/error.middleware');
const limiter = require('./middleware/ratelimit.middleware');

const app = express();

app.use(cors({
    origin : 'http://localhost:5000/'
}));

app.use(limiter);

app.use(express.json());

app.get('/',(req, res)=>{
    res.send('Welcome to my API');
});

app.use('/api/v1',routes);

app.use(errorhandler)

module.exports = app;