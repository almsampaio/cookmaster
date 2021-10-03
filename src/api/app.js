const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { router } = require('./routes');

const app = express();
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
dotenv.config();

app.get('/', (request, response) => {
  response.send();
});

app.use(router);

module.exports = app;
