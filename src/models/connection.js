const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { LOCAL_DB_URL } = process.env;
const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
let db = null;

const connection = () =>
  (db
    ? Promise.resolve(db)
    : MongoClient.connect(LOCAL_DB_URL || MONGO_DB_URL, OPTIONS)
      .then((conn) => {
        db = conn.db('Cookmaster');
        return db;
      })
  );

module.exports = connection;