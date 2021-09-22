const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/Cookmaster';

const DB = 'Cookmaster';

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = {
  conn: () => MongoClient.connect(MONGO_DB_URL, OPTIONS)
      .then((connection) => connection.db(DB))
      .catch((e) => {
        console.error(e);
        process.exit(1);
      }),
};
