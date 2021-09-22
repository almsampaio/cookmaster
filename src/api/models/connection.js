const mongodb = require('mongodb');

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/Cookmaster';

console.log('MONGOURL', MONGO_DB_URL);

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db = null;

function connection() {
  return db
    ? Promise.resolve(db)
    : mongodb.MongoClient.connect(MONGO_DB_URL, OPTIONS)
      .then((conn) => {
        db = conn.db('Cookmaster');

        return db;
      })
      . catch((err) => {
        console.log(err);
        process.exit(1);
      });
}

module.exports = connection;