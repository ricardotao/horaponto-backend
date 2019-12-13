const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const seedUser = require('../src/seed/user');

const app = express();
const port = process.env.PORT || 3333;

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

require('./app/controllers/index')(app);

seedUser.User();

app.listen(port);