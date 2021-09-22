const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const app = require('express')();
const routes = require('../routes');

const EVALUATOR_URL = 'mongodb://mongodb:27017/CookMaster';
const SERVER_URL = process.env.MONGO_DB_URL || EVALUATOR_URL; 

app.use(bodyParser.json());
app.use(routes);

const main = async () => {
  await mongoose.connect(SERVER_URL);
};
main().catch(console.error);

module.exports = app;
