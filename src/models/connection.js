const { MongoClient } = require('mongodb');
require('dotenv').config();

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const MONGO_DB_URL = process.env.MONGO_LOCALHOST_URL || 'mongodb://mongodb:27017/Cookmaster';

let db = null;

function connection() { 
    return db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => {
    db = conn.db('Cookmaster');
    return db;
    });
}

module.exports = connection; 