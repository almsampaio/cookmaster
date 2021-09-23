const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://127.0.0.1:27017';

let cookmaster = null;

async function getConnection() {
  if (cookmaster) return Promise.resolve(cookmaster);
  return MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db('model_example'))
    .then((dbCookMaster) => {
      cookmaster = dbCookMaster;
      return cookmaster;
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  getConnection,
}
