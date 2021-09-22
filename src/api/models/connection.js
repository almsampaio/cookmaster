const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
const DB_NAME = 'Cookmaster';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db = null;

const connection = () => (
  db 
  ? Promise.resolve(db)
  : MongoClient.connect(MONGO_DB_URL, options)
    .then((conn) => {
      db = conn.db(DB_NAME);
      return db;
    })
);

module.exports = connection;