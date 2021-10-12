const { MongoClient } = require('mongodb');
const { mongoUrl, dbName } = require('../config');

const MONGO_DB_URL = mongoUrl;
const DB_NAME = dbName;

const connection = () =>
  MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((connect) => connect.db(DB_NAME))
  .catch((error) => {
    console.error(error);
    process.exit();
  });

module.exports = connection;
