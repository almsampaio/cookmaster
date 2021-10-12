const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://127.0.0.1:27017/cookmaster';

let Cookmaster = null;

async function getConnection() {
  if (Cookmaster) return Promise.resolve(Cookmaster);
  return MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db('model_example'))
    .then((dbCookMaster) => {
      Cookmaster = dbCookMaster;
      return Cookmaster;
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = {
  getConnection,
};
