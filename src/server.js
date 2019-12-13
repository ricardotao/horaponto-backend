const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const seeder = require('../src/seed/user');

const app = express();
const port = process.env.PORT || 3333;

dotenv.config();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

require('./app/controllers/index')(app);

seeder.Seeder();

app.listen(port);