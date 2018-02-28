require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const watson = require('./routes/watson');
var cors = require('cors')

var corsOptions = {
  origin: 'https://chat-front.au-syd.mybluemix.net',
}

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.use('/api/v1/watson', watson);

module.exports = app;
