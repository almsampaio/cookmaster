const { MongoClient } = require('mongodb');

const DB = 'Cookmaster';

// Evaluator
const URL = 'mongodb://mongodb:27017/Cookmaster';

// Local
// const URL = 'mongodb://127.0.0.1:27017/Cookmaster';

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db = null;

// Rafael Java me ajudou a fazer a conexão dessa forma.
const connection = () => (db
  ? Promise.resolve(db)
  : MongoClient.connect(URL, OPTIONS)
  .then((conn) => {
    db = conn.db(DB);
    return db;
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  })
);

module.exports = connection;
