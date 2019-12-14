'use strict';

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/connection.json')["mongodb"][env];

mongoose.connect(config.MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    //reconnectTries: 30,
    //reconnectInterval: 500
});
mongoose.connection.on('error', err => {
    console.error(`MongoDB Connection ERROR: ${err}`);
    process.exit(-1); // eslint-disable-line no-process-exit
});

module.exports = mongoose;