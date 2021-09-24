const express = require('express');
const bodyParser = require('body-parser');

const errorMiddleware = require('../middlewares/error');
const Routes = require('../Routes');

const app = express();

app.use(bodyParser.json());
app.use(Routes);
app.use(errorMiddleware);

module.exports = app;
