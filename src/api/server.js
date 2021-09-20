const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const app = require('express')();
const routes = require('../routes');

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/StoreManager';

app.use(bodyParser.json());
app.use(routes);

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

(async () => {
  await mongoose.connect(MONGO_DB_URL);
})().then(() => console.log('Mongoose logged successfully'), console.error);