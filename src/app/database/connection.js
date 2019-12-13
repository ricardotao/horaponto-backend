'use strict';

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/connection.json')["mongodb"][env];

mongoose.connect(config.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
});
mongoose.Promise = global.Promise;

module.exports = mongoose;