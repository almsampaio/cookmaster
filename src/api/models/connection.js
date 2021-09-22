const { MongoClient } = require('mongodb');

const MONGO_DB_URL = process.env.LOCAL_MONGO_URL || 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

const connection = () => MongoClient
  .connect(MONGO_DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((conn) => conn.db(DB_NAME))
  .catch((error) => {
    console.error(error);
    process.exit();
  });

module.exports = connection;
