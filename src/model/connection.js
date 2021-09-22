const { MongoClient } = require('mongodb');
require('dotenv').config();

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_URL = process.env.DB_URL || 'mongodb://mongodb:27017/Cookmaster';
const DB_LOCAL_NAME = 'Cookmaster';

const connection = () => MongoClient
  .connect(MONGO_URL, OPTIONS)
  .then((conn) => conn.db(DB_LOCAL_NAME))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

module.exports = connection;