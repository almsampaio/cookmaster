const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = process.env.MONGO_DB_URL_LOCALHOST || 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

let db = null;

const connection = () => (
  db ? Promise.resolve(db)
  : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => {
      db = conn.db(DB_NAME);
      return db;
  })
);

module.exports = connection;
