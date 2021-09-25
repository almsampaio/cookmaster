const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

const connection = async () => MongoClient
  .connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((connection) => connection.db(DB_NAME))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

module.exports = connection;
